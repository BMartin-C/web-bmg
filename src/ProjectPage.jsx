/**
 * pages/ProjectPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Generic project page renderer.  A single component handles all project pages
 * (PROJECT 1, PROJECT 2, …) by accepting a `project` prop that contains all
 * the data for one entry in PROJECT_PAGES (data/content.js).
 *
 * Structure rendered:
 *   • Project header  – eyebrow label + large title.
 *   • One or more ProjectBlock sections – each with a title, description,
 *     tag pills, and a large background numeral for visual interest.
 *
 * TO ADD A NEW PROJECT PAGE:
 *   1. Add a new entry to PROJECT_PAGES in data/content.js.
 *   2. Add the matching menu key to NAV_ITEMS in data/content.js.
 *   3. Add a DECORATION_MAP entry for that menu key in data/content.js.
 *   4. In App.jsx, add a case for the new key inside renderPage().
 *      Example:  case 'PROJECT 3': return <ProjectPage project={findProject('PROJECT 3')} />
 *
 * Props
 * ─────
 *   project {object} – one entry from PROJECT_PAGES:
 *     { menuKey, label, title, blocks: [{ num, title, desc, tags }] }
 */

import './project.css'

// ─── ProjectBlock ─────────────────────────────────────────────────────────────

/**
 * ProjectBlock
 * A single case-study section within a project page.
 * The `data-num` attribute is picked up by a CSS ::after pseudo-element to
 * render the large decorative numeral in the background.
 *
 * Props
 *   num   {string}   – 2-digit numeral shown as a background decoration.
 *   title {string}   – section heading rendered in Playfair Display italic.
 *   desc  {string}   – body paragraph.
 *   tags  {string[]} – array of tag strings rendered as bordered pill labels.
 */
function ProjectBlock({ num, title, desc, tags }) {
  return (
    <div className="project-block" data-num={num}>
      <div className="proj-title">{title}</div>
      <p className="proj-desc">{desc}</p>
      <div className="proj-tags">
        {tags.map(tag => (
          <span className="proj-tag" key={tag}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

// ─── ProjectPage ──────────────────────────────────────────────────────────────

export default function ProjectPage({ project }) {
  return (
    <div className="page visible">

      {/* Eyebrow label + large display title */}
      <div className="project-header">
        <div className="proj-label">{project.label}</div>
        <h2>{project.title}</h2>
      </div>

      {/* One ProjectBlock per entry in project.blocks */}
      {project.blocks.map(block => (
        <ProjectBlock key={block.num} {...block} />
      ))}

    </div>
  )
}
