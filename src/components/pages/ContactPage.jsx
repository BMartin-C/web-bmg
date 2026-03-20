/**
 * pages/ContactPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the Contact page: a heading, a short intro paragraph, a set of form
 * fields, and a submit button.
 *
 * Form fields are driven by CONTACT_CONTENT.fields in data/content.js, so you
 * can add, remove, or relabel fields without touching this JSX.
 *
 * WIRING UP FORM SUBMISSION
 * ──────────────────────────
 * The form currently logs to the console on submit.  To connect a real backend:
 *   1. Replace the `handleSubmit` function body with your fetch/axios call.
 *   2. Common services: Formspree, EmailJS, Netlify Forms, or your own API.
 *   Example (Formspree):
 *     const res = await fetch('https://formspree.io/f/YOUR_ID', {
 *       method: 'POST',
 *       body: JSON.stringify(formData),
 *       headers: { 'Content-Type': 'application/json' },
 *     })
 *
 * Props  – none (reads from CONTACT_CONTENT in data/content.js).
 */

import { useState } from 'react'
import { CONTACT_CONTENT } from '../../data/content'
import '../../styles/pages/contact.css'

// ─── FormField ────────────────────────────────────────────────────────────────

/**
 * FormField
 * Renders either an <input> or a <textarea> depending on field.type.
 *
 * Props
 *   field   {object} – one entry from CONTACT_CONTENT.fields:
 *                      { id, label, type, placeholder }
 *   value   {string} – controlled value from parent state.
 *   onChange {function} – update handler passed down from ContactPage.
 */
function FormField({ field, value, onChange }) {
  const inputProps = {
    id:          field.id,
    placeholder: field.placeholder,
    value,
    onChange:    e => onChange(field.id, e.target.value),
  }

  return (
    <div className="contact-field">
      <label htmlFor={field.id}>{field.label}</label>
      {field.type === 'textarea'
        ? <textarea rows="5" {...inputProps} />
        : <input   type={field.type} {...inputProps} />
      }
    </div>
  )
}

// ─── ContactPage ──────────────────────────────────────────────────────────────

export default function ContactPage() {
  // Initialise one state key per field, using each field's id.
  const initialState = Object.fromEntries(
    CONTACT_CONTENT.fields.map(f => [f.id, ''])
  )
  const [formData, setFormData] = useState(initialState)

  /** Update a single field value by its id. */
  function handleChange(id, value) {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  /**
   * Form submission handler.
   * TO REPLACE: swap the console.log with your real submission logic.
   */
  function handleSubmit() {
    // ─── PLACEHOLDER: replace with real submission logic ───
    console.log('Form submitted:', formData)
    alert('Message sent! (placeholder — wire up a real endpoint in ContactPage.jsx)')
  }

  return (
    <div className="page visible">
      <div className="contact-wrap">

        <h2>{CONTACT_CONTENT.heading}</h2>
        <p>{CONTACT_CONTENT.body}</p>

        {/* Render each field defined in CONTACT_CONTENT.fields */}
        {CONTACT_CONTENT.fields.map(field => (
          <FormField
            key={field.id}
            field={field}
            value={formData[field.id]}
            onChange={handleChange}
          />
        ))}

        <button className="contact-btn" onClick={handleSubmit}>
          {CONTACT_CONTENT.submitLabel}
        </button>

      </div>
    </div>
  )
}
