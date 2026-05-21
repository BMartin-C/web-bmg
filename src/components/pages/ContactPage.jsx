/**
 * pages/ContactPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Heading, intro paragraph, dynamic form fields, submit button.
 * Fields are driven by CONTACT_CONTENT.fields in data/content.js.
 *
 * WIRING UP FORM SUBMISSION
 * ──────────────────────────
 * Replace the handleSubmit body with your real submission logic, e.g.:
 *
 *   const res = await fetch('https://formspree.io/f/YOUR_ID', {
 *     method: 'POST',
 *     body: JSON.stringify(formData),
 *     headers: { 'Content-Type': 'application/json' },
 *   })
 *
 * Props – none.
 */

import { useState } from 'react'
import { CONTACT_CONTENT } from '../../data/content'
import FormField from '../FormField'
import '../../styles/pages/contact.css'

export default function ContactPage() {
  const [formData, setFormData] = useState(
    // One state key per field, keyed by field.id
    () => Object.fromEntries(CONTACT_CONTENT.fields.map(f => [f.id, '']))
  )

  function handleChange(id, value) {
    setFormData(prev => ({ ...prev, [id]: value }))
  }

  function handleSubmit() {
    // ── PLACEHOLDER: replace with real submission logic ──
    console.log('Form submitted:', formData)
    alert('Message sent! (placeholder — wire up a real endpoint in ContactPage.jsx)')
  }

  return (
    <div className="page visible">
      <div className="contact-wrap">

        <h2>{CONTACT_CONTENT.heading}</h2>
        <p>{CONTACT_CONTENT.body}</p>

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
