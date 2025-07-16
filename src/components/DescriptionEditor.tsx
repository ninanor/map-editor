import { MDXEditor } from '@mdxeditor/editor';

import { useAppActions, useAppStore } from '../hooks/app';
import { PLUGINS } from '../mdxPlugins';

export function DescriptionEditor() {
  const description = useAppStore(state => state.description);
  const { setDescription } = useAppActions();

  return (
    <>
      <MDXEditor
        contentEditableClassName="prose prose-slate prose-md border-neutral-content border rounded min-h-64 bg-base-100"
        markdown={description}
        onChange={setDescription}
        plugins={PLUGINS}
      />
    </>
  );
}
