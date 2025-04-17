import {
  BlockTypeSelect,
  BoldItalicUnderlineToggles,
  CreateLink,
  MDXEditor,
  UndoRedo,
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  quotePlugin,
  thematicBreakPlugin,
  toolbarPlugin,
} from '@mdxeditor/editor';
import '@mdxeditor/editor/style.css';

import { useAppStore } from '../hooks/app';

const PLUGINS = [
  headingsPlugin(),
  listsPlugin(),
  quotePlugin(),
  thematicBreakPlugin(),
  markdownShortcutPlugin(),
  toolbarPlugin({
    toolbarContents: () => (
      <>
        <UndoRedo />
        <BoldItalicUnderlineToggles />
        <CreateLink />
        <BlockTypeSelect />
      </>
    ),
  }),
];

export function DescriptionEditor() {
  const description = useAppStore(state => state.description);
  const setDescription = useAppStore(state => state.setDescription);

  return (
    <>
      <MDXEditor
        contentEditableClassName="prose prose-slate prose-md"
        markdown={description}
        onChange={setDescription}
        plugins={PLUGINS}
      />
    </>
  );
}
