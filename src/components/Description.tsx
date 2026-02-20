import classNames from 'classnames';
import { useMemo } from 'react';
import Markdown from 'react-markdown';
import { autoLinkMd } from 'react-markdown-autolink';

export function Description({ text, className = 'prose prose-slate prose-md' }: { text?: string; className?: string }) {
  const linked = useMemo(() => (text ? autoLinkMd(text) : ''), [text]);

  return (
    <div className={classNames(className, 'dont-break-out')}>
      <Markdown>{linked}</Markdown>
    </div>
  );
}
