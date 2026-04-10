/**
 * pages/Project2Page.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * The Project 2 page.  Unlike the generic ProjectPage, this page has a
 * dedicated layout that includes interactive 3D model viewers alongside the
 * standard case-study blocks.
 *
 * LAYOUT
 * ───────
 *   ┌──────────────────────────────────────────┐
 *   │  Project header (label + title)           │
 *   ├──────────────────────────────────────────┤
 *   │  3D Viewer — Model Slot A                 │ ← placeholder geometry
 *   │  Caption: "Model A — …"                  │
 *   ├────────────────────┬─────────────────────┤
 *   │  Case-study block  │  3D Viewer — Slot B  │ ← side-by-side
 *   │  (text + tags)     │  Caption: "Model B"  │
 *   ├────────────────────┴─────────────────────┤
 *   │  Case-study block (full width)            │
 *   └──────────────────────────────────────────┘
 *
 * HOW TO ADD A REAL 3D MODEL
 * ───────────────────────────
 * 1. Place your .glb or .gltf file in /public/models/
 *    (create the folder if it doesn't exist).
 * 2. Pass the path as the `modelPath` prop to <ModelViewer>:
 *      <ModelViewer modelPath="/models/my-sculpture.glb" label="Sculpture 01" />
 * 3. In ModelViewer.jsx, uncomment the GLTFLoader import and the loader block
 *    inside the `loadModel` section.
 *
 * CHANGING VIEWER HEIGHT
 * ───────────────────────
 * Pass a `height` number (pixels) to any <ModelViewer>:
 *   <ModelViewer height={500} label="…" />
 *
 * Content for the text blocks comes from PROJECT_PAGES in data/content.js
 * (the entry with menuKey === 'PROJECT 2').
 */

import { PROJECT_PAGES } from '../../data/content'
import ModelViewer from '../ModelViewer'
import '../../styles/pages/project.css'
import '../../styles/pages/project2.css'

// ─── ProjectBlock (local copy — same as generic ProjectPage) ──────────────────

/**
 * ProjectBlock
 * A bordered case-study section with a large decorative numeral.
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

// ─── Project2Page ─────────────────────────────────────────────────────────────

export default function Project2Page() {
  // Pull this project's data from the shared content store.
  const project = PROJECT_PAGES.find(p => p.menuKey === 'PROJECT 2')

  return (
    <div className="page visible">

      {/* ── Header ── */}
      <div className="project-header">
        <div className="proj-label">{project.label}</div>
        <h2>{project.title}</h2>
      </div>

      {/* ── 3D Viewer A — full width ──────────────────────────────────────────
          The main model slot.  Shows a low-poly placeholder by default.
          To load a real model: add modelPath="/models/your-file.glb"
          and follow the GLTFLoader instructions in ModelViewer.jsx.        */}
      <ModelViewer
        label="Model Slot A — drop a .glb file here (see ModelViewer.jsx)"
        height={460}
        /* modelPath="/models/your-model-a.glb" */
      />

      {/* ── Side-by-side: text block + Viewer B ─────────────────────────────── */}
      <div className="proj2-split">

        {/* Left: first case-study block from content.js */}
        {project.blocks[2] && (
          <ProjectBlock {...project.blocks[0]} />
        )}

        {/* Right: second model slot — shorter height to match the text block */}
        <ModelViewer
          label="Model Slot B"
          height={280}
          /* modelPath="/models/your-model-b.glb" */
        />
        {/* ── Second text block — full width ── */}
      {project.blocks[2] && (
        <ProjectBlock {...project.blocks[2]} />
         )}
         <ModelViewer
          label="Model Slot B"
          height={280}
          /* modelPath="/models/your-model-b.glb" */
        />

      </div>

      {/* ── Second text block — full width ── */}
      {project.blocks[2] && (
        <ProjectBlock {...project.blocks[1]} />
      )}
       

    </div>
  )
}
