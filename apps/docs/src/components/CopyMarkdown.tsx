"use client";

import { useState } from "react";

interface CopyMarkdownProps {
  url: string;
}

function CopyMarkdown(props: Readonly<CopyMarkdownProps>): React.JSX.Element {
  const { url } = props;
  const [copied, setCopied] = useState(false);

  async function handleCopy(): Promise<void> {
    const res = await fetch(url);
    const text = await res.text();

    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      className="border-border bg-surface text-surface-foreground hover:bg-surface-hover inline-flex items-center gap-[8.65px] border px-3.5 py-1.5 text-sm leading-none font-medium"
      type="button"
      onClick={handleCopy}
    >
      <svg className="size-match-font" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <rect height="13" rx="2" ry="2" width="13" x="9" y="9" />
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
      </svg>

      {copied ? "Copied!" : "Copy for LLM"}
    </button>
  );
}

export { CopyMarkdown };
