import type {
    CodeBlockNode,
    CodeNode,
    ConversationLine,
    HeadingNode,
    ImageNode,
    LinkNode,
    OrderedListNode,
    QuoteNode,
    UnorderedListNode,
} from '../type'

export function hrToMarkdown() {
    return '---'
}

export function headingToMarkdown(node: HeadingNode) {
    return `${'#'.repeat(node.level)} ${node.text}`
}

export function quoteToMarkdown(node: QuoteNode) {
    return `> ${node.text}`
}

export function imageToMarkdown(node: ImageNode) {
    return `![image](${node.src})`
}

export function linkToMarkdown(node: LinkNode) {
    return `[${node.text}](${node.href})`
}

type LineMapper = (line: ConversationLine) => string

export function orderedListToMarkdown(node: OrderedListNode, lineMapper: LineMapper) {
    const start = node.start ?? 1
    return node.items
        .map((item, index) => `${start + index}. ${lineMapper(item)}`)
        .join('\r\n')
}

export function unorderedListToMarkdown(node: UnorderedListNode, lineMapper: LineMapper) {
    return node.items
        .map(item => `- ${lineMapper(item)}`)
        .join('\r\n')
}

export function codeToMarkdown(node: CodeNode) {
    return `\`${node.code}\``
}

export function codeBlockToMarkdown(node: CodeBlockNode) {
    return `\`\`\`${node.lang}\r\n${node.code}\`\`\``
}

export function tableToMarkdown(headers: string[], rows: string[][]): string {
    let markdown = ''

    // Find the maximum width of each column
    const columnWidths: number[] = []
    for (let i = 0; i < headers.length; i++) {
        let maxWidth = headers[i].length
        rows.forEach((row) => {
            maxWidth = Math.max(maxWidth, row[i].length)
        })
        columnWidths.push(maxWidth)
    }

    // Add the headers
    markdown += `${headers.map((header, i) => header.padEnd(columnWidths[i])).join(' | ')}\n`
    markdown += `${headers.map((_header, i) => '-'.repeat(columnWidths[i])).join(' | ')}\n`

    // Add the rows
    rows.forEach((row) => {
        markdown += `${row.map((cell, i) => cell.padEnd(columnWidths[i])).join(' | ')}\n`
    })

    return markdown
}