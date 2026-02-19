import { MDXEditor } from '@mdxeditor/editor';
import type { WidgetProps } from '@rjsf/utils';
import { PLUGINS } from '../../mdxPlugins';

export function MDXField(props: WidgetProps) {
  return (
    <MDXEditor
      markdown={(props.value as string) ?? ''}
      onChange={value => props.onChange(value)}
      plugins={PLUGINS}
      contentEditableClassName="prose prose-slate prose-md bg-base-100 border-neutral-content border rounded min-h-64"
    />
  );
}
