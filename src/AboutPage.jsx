/**
 * pages/AboutPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the About Me page in a two-column layout:
 *   Left column  – heading + biography paragraphs.
 *   Right column – skill list with thin percentage-bar indicators.
 *
 * All content is sourced from ABOUT_CONTENT in data/content.js.
 * To update biography text or skill percentages, edit that file only.
 *
 * Props  – none.
 */

import { ABOUT_CONTENT } from './data/content'
import './about.css'

// ─── SkillBar ─────────────────────────────────────────────────────────────────

/**
 * SkillBar
 * A single row in the skills list.  Renders the skill name on the left and a
 * thin filled bar on the right whose width represents the proficiency level.
 *
 * Props
 *   name {string} – skill label.
 *   pct  {number} – proficiency percentage (0–100); used as CSS width value.
 */
function SkillBar({ name, pct }) {
  return (
    <div className="skill-row">
      <span className="skill-name">{name}</span>
      <div className="skill-bar">
        {/* Inline width drives the fill; the colour comes from CSS */}
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

        {/* Left column: biography */}
        <div className="about-left">
          <h2>{ABOUT_CONTENT.heading}</h2>
          {/* Each string in the bio array becomes its own paragraph */}
          {ABOUT_CONTENT.bio.map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>

        {/* Right column: skill bars */}
        <div className="about-right">
          {ABOUT_CONTENT.skills.map(skill => (
            <SkillBar key={skill.name} {...skill} />
          ))}
        </div>

      </div>
    </div>
  )
}
