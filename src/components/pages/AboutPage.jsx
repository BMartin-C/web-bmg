/**
 * pages/AboutPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Two-column layout: biography on the left, skill bars on the right.
 * All content comes from ABOUT_CONTENT in data/content.js — edit there only.
 *
 * Props – none.
 */

import { ABOUT_CONTENT } from '../../data/content'
import '../../styles/pages/about.css'

// ─── SkillBar ─────────────────────────────────────────────────────────────────

/**
 * Props
 *   name {string} – skill label.
 *   pct  {number} – proficiency 0–100; drives the fill width.
 */
function SkillBar({ name, pct }) {
  return (
    <div className="skill-row">
      <span className="skill-name">{name}</span>
      <div className="skill-bar">
        <div className="skill-fill" style={{ width: `${pct}%` }} />
      </div>
    </div>
  )
}

// ─── AboutPage ────────────────────────────────────────────────────────────────

export default function AboutPage() {
  return (
    <div className="page visible">
      <div className="about-wrap">

        <div className="about-left">
          <h2>{ABOUT_CONTENT.heading}</h2>
          {ABOUT_CONTENT.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        <div className="about-right">
          {ABOUT_CONTENT.skills.map(skill => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>

      </div>
    </div>
  )
}
