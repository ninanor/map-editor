/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call */
import { useState } from 'react';

export function KeyValueEditor({
  form,
  fieldPath,
  label,
  description,
  keyPlaceholder = 'Key',
  valuePlaceholder = 'Value',
}: {
  form: any;
  fieldPath: string;
  label: string;
  description?: string;
  keyPlaceholder?: string;
  valuePlaceholder?: string;
}) {
  const data = form.watch(fieldPath) || {};
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [newKeyValue, setNewKeyValue] = useState<string>('');

  const handleKeyChange = (oldKey: string, newKey: string) => {
    if (!newKey || newKey === oldKey) {
      setEditingKey(null);
      setNewKeyValue('');
      return;
    }

    if (newKey in data) {
      alert('Key already exists');
      return;
    }

    const newData = { ...data };
    const value = newData[oldKey];
    delete newData[oldKey];
    newData[newKey] = value;
    form.setValue(fieldPath, newData);
    setEditingKey(null);
    setNewKeyValue('');
  };

  return (
    <div className="mt-3">
      <label className="label">
        <span className="label-text">{label}</span>
      </label>
      {description && <p className="text-sm text-base-content/60 mb-2">{description}</p>}

      <div className="space-y-2">
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className="flex gap-2">
            {editingKey === key ? (
              <input
                type="text"
                className="input input-bordered w-1/3"
                placeholder={keyPlaceholder}
                value={newKeyValue}
                onChange={e => setNewKeyValue(e.target.value)}
                onBlur={() => handleKeyChange(key, newKeyValue)}
                onKeyDown={e => {
                  if (e.key === 'Enter') {
                    handleKeyChange(key, newKeyValue);
                  } else if (e.key === 'Escape') {
                    setEditingKey(null);
                    setNewKeyValue('');
                  }
                }}
              />
            ) : (
              <input
                type="text"
                className="input input-bordered w-1/3 cursor-pointer"
                placeholder={keyPlaceholder}
                value={key}
                onClick={() => {
                  setEditingKey(key);
                  setNewKeyValue(key);
                }}
                readOnly
              />
            )}
            <input
              type="text"
              className="input input-bordered flex-1"
              placeholder={valuePlaceholder}
              {...form.register(`${fieldPath}.${key}`)}
              defaultValue={String(value)}
            />
            <button
              type="button"
              className="btn btn-sm btn-error"
              onClick={() => {
                const newData = { ...data };
                delete newData[key];
                form.setValue(fieldPath, newData);
              }}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        className="btn btn-sm btn-secondary mt-2"
        onClick={() => {
          const newKey = `ITEM_${Date.now()}`;
          form.setValue(fieldPath, {
            ...data,
            [newKey]: '',
          });
        }}
      >
        Add Item
      </button>
    </div>
  );
}
