"use client";

import { useState } from "react";

import { Button, CopyIcon } from "@fried-ui/react";

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
    <Button variant="secondary" size="sm" onPress={handleCopy}>
      <CopyIcon className="size-match-font" />
      {copied ? "Copied!" : "Copy for LLM"}
    </Button>
  );
}

export { CopyMarkdown };
