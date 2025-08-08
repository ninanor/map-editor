import { useFieldContext } from '../../hooks/form';

export function CheckboxField({ label }: { label: string }) {
  const field = useFieldContext<boolean>();
  return (
    <div className="form-control">
      <label className="label cursor-pointer">
        <span className="label-text">{label}</span>
        <input
          type="checkbox"
          className="checkbox"
          name={field.name}
          checked={field.state.value || false}
          onChange={e => field.handleChange(e.target.checked)}
          onBlur={field.handleBlur}
        />
      </label>
    </div>
  );
}