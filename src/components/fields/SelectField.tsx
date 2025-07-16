import { useFieldContext } from '../../hooks/form';

export function SelectField({ label, options }: { label: string; options: { value: string; label: string }[] }) {
  const field = useFieldContext<string>();
  return (
    <>
      <label htmlFor={field.name} className="label">
        {label}
      </label>
      <select
        className="select"
        name={field.name}
        value={field.state.value}
        onChange={e => field.handleChange(e.target.value)}
        onBlur={field.handleBlur}
      >
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}
