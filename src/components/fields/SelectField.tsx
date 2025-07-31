import { useFieldContext } from '../../hooks/form';

export function SelectField({
  label,
  options,
}: {
  label: string;
  options: { value: string; label: string }[] | string[];
}) {
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
        {options.map(opt => {
          if (typeof opt === 'string') {
            return (
              <option key={opt} value={opt}>
                {opt}
              </option>
            );
          }
          const { value, label } = opt;
          return (
            <option key={value} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </>
  );
}
