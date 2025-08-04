import { MDXEditor } from '@mdxeditor/editor';
import { PLUGINS } from '../../mdxPlugins';
import { WidgetProps } from '@rjsf/utils';

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
