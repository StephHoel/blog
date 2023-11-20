import ReactMarkdown from 'react-markdown'

interface MarkdownViewerProps {
  markdown: string
}

export default function MarkdownViewer({ markdown }: MarkdownViewerProps) {
  return (
    <div>
      <ReactMarkdown>{markdown}</ReactMarkdown>
    </div>
  )
}
