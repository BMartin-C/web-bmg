/**
 * components/FormField.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A controlled form field that renders either an <input> or a <textarea>
 * depending on field.type.
 *
 * Props
 *   field    {object}   – { id, label, type, placeholder }
 *   value    {string}   – controlled value.
 *   onChange {function} – (id, value) => void
 */
export default function FormField({ field, value, onChange }) {
  const sharedProps = {
    id:          field.id,
    placeholder: field.placeholder,
    value,
    onChange:    e => onChange(field.id, e.target.value),
  }

  return (
    <div className="contact-field">
      <label htmlFor={field.id}>{field.label}</label>
      {field.type === 'textarea'
        ? <textarea rows="5" {...sharedProps} />
        : <input type={field.type} {...sharedProps} />
      }
    </div>
  )
}
