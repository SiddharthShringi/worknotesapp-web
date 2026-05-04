import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownProps = {
  children: string;
};

export default function Markdown({ children }: MarkdownProps) {
  return (
    <div className="text-sm text-foreground/80">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Lists
          ul: ({ children }) => (
            <ul className="list-disc pl-5 space-y-1">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal pl-5 space-y-1">{children}</ol>
          ),
          li: ({ children }) => <li>{children}</li>,

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-blue underline underline-offset-2"
            >
              {children}
            </a>
          ),

          strong: ({ children }) => (
            <strong className="font-semibold text-foreground/70">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-foreground">{children}</em>
          ),

          // Everything else → plain text (flattened)

          p: ({ children }) => <>{children}</>, // no extra spacing
          h1: ({ children }) => <>{children}</>,
          h2: ({ children }) => <>{children}</>,
          h3: ({ children }) => <>{children}</>,
          // strong: ({ children }) => <>{children}</>,
          // em: ({ children }) => <>{children}</>,
          blockquote: ({ children }) => <>{children}</>,
          code: ({ children }) => <>{children}</>,
          pre: ({ children }) => <>{children}</>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
