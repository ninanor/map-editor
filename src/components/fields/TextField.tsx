import { useFieldContext } from '../../hooks/form';

export function TextField({ label, required = false }: { label: string; required?: boolean }) {
  const field = useFieldContext<string>();
  return (
    <>
      <label htmlFor={field.name} className="label">
        {label}
      </label>
      <input
        type="text"
        className="input"
        required={required}
        name={field.name}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      />
    </>
  );
}
