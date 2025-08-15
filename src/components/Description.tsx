import Markdown from 'react-markdown';
import { autoLinkMd } from 'react-markdown-autolink';

import { useMemo } from 'react';

export function Description({ text, className = 'prose prose-slate prose-md' }: { text: string; className?: string }) {
  const linked = useMemo(() => autoLinkMd(text), [text]);

  return (
    <div className={className}>
      <Markdown>{linked}</Markdown>
    </div>
  );
}
