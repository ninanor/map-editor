import Markdown from 'react-markdown';
import { useAppStore } from '../hooks/app';
import classNames from 'classnames';

export function Footer() {
  const footer = useAppStore(state => state.config.footer);
  if (!footer) {
    return null;
  }

  return (
    <div
      id="footer"
      className={classNames(
        'flex gap-4 order-last px-5 py-2 bg-accent text-accent-content',
        footer.justify ?? 'justify-start',
        footer.align ?? 'items-center',
      )}
    >
      {footer.items.map(i => (
        <div key={i} className="prose prose-slate prose-md">
          <Markdown>{i}</Markdown>
        </div>
      ))}
    </div>
  );
}
