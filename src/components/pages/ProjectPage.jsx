/**
 * pages/ProjectPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Generic project page — one component handles every standard project entry.
 * Renders a header (label + title) followed by one ProjectBlock per block
 * defined in the project's data.
 *
 * TO ADD A NEW PROJECT PAGE
 * ──────────────────────────
 *   1. Add an entry to PROJECT_PAGES in data/content.js.
 *   2. Add the matching key to NAV_ITEMS in data/content.js.
 *   3. Add a DECORATION_MAP entry for the new key in data/content.js.
 *   4. In App.jsx → renderPage(), add:
 *        case 'PROJECT 3': return <ProjectPage project={findProject('PROJECT 3')} />
 *
 * Props
 *   project {object} – one PROJECT_PAGES entry:
 *     { menuKey, label, title, blocks: [{ num, title, desc, tags }] }
 */

import ProjectBlock from '../ProjectBlock'
import '../../styles/pages/project.css'

export default function ProjectPage({ project }) {
  return (
    <div className="page visible">

      <div className="project-header">
        <div className="proj-label">{project.label}</div>
        <h2>{project.title}</h2>
      </div>

      {project.blocks.map(block => ( //.slice() to define range if needed
        <ProjectBlock key={block.num} {...block} />
      ))}

    </div>
  )
}
