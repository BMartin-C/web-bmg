/**
 * pages/Project2Page.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Dedicated layout for Project 2: interleaves 3D model viewers with the
 * standard case-study blocks from content.js.
 *
 * LAYOUT
 * ───────
 *   ┌─────────────────────────────────────┐
 *   │ Project header (label + title)       │
 *   ├─────────────────────────────────────┤
 *   │ ModelViewer — Slot A  (full width)   │
 *   ├───────────────────┬─────────────────┤
 *   │ ProjectBlock [0]  │ ModelViewer — B  │ ← side-by-side
 *   ├───────────────────┴─────────────────┤
 *   │ ProjectBlock [1]  (full width)       │
 *   ├─────────────────────────────────────┤
 *   │ ModelViewer — Slot C  (full width)   │
 *   ├─────────────────────────────────────┤
 *   │ ProjectBlock [2]  (full width)       │
 *   └─────────────────────────────────────┘
 *
 * HOW TO LINK A REAL 3D MODEL TO A VIEWER
 * ─────────────────────────────────────────
 * Each <ModelViewer> accepts a unique `modelPath` prop.
 * Place your .glb / .gltf files in /public/models/, then pass the path:
 *
 *   <ModelViewer modelPath="/models/sculpture-front.glb" label="Front view" />
 *   <ModelViewer modelPath="/models/sculpture-detail.glb" label="Detail" />
 *
 * Different paths → different models rendered in each slot.
 * See ModelViewer.jsx for GLTFLoader wiring instructions.
 *
 * Content for the text blocks comes from the PROJECT_PAGES entry whose
 * menuKey is 'PROJECT 2' in data/content.js.
 */

import { PROJECT_PAGES } from '../../data/content'
import ModelViewer from '../ModelViewer'
import ProjectBlock from '../ProjectBlock'
import '../../styles/pages/project.css'
import '../../styles/pages/project2.css'

export default function Project2Page() {
  const project = PROJECT_PAGES.find(p => p.menuKey === 'PROJECT 2')
  const { blocks } = project

  return (
    <div className="page visible">

      {/* ── Header ── */}
      <div className="project-header">
        <div className="proj-label">{project.label}</div>
        <h2>{project.title}</h2>
      </div>

      {/* ── Slot A: full-width model ── */}
      <ModelViewer
        modelPath="/assets/gislinge_viking_boat.glb"
        label="Model Slot A — overview"
        height={460}
      />

      {/* ── Side-by-side: first text block + Slot B model ── */}
      <div className="proj2-split">
        {blocks[0] && <ProjectBlock {...blocks[0]} />}

        <ModelViewer
          modelPath="/assets/gislinge_viking_boat.glb"
          label="Model Slot B — detail"
          height={280}
        />
      </div>

      {/* ── Second text block: full width ── */}
      {blocks[1] && <ProjectBlock {...blocks[1]} />}

      {/* ── Slot C: full-width model ── */}
      <ModelViewer
        modelPath="/assets/gislinge_viking_boat.glb"
        label="Model Slot C — close-up"
        height={360}
      />

      {/* ── Third text block: full width ── */}
      {blocks[2] && <ProjectBlock {...blocks[2]} />}

    </div>
  )
}
