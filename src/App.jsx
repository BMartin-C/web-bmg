/**
 * App.jsx — Root component
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the top-level component.  Its only responsibilities are:
 *   1. Tracking which page is currently active (router state).
 *   2. Looking up the matching decoration config for that page.
 *   3. Rendering the two structural components (NavBar + DecorationFrame)
 *      and delegating to renderPage() to display the correct page component.
 *
 * Component tree:
 *   App
 *   ├── NavBar            (top bar + logo + banner)
 *   └── DecorationFrame   (4 coloured strips around content)
 *        └── [active page]
 *             ├── MainFeedPage
 *             ├── ProjectPage  (reused for each project)
 *             ├── ContactPage
 *             └── AboutPage
 *
 * HOW TO ADD A NEW PAGE
 * ──────────────────────
 * 1. Add the menu label to NAV_ITEMS in data/content.js.
 * 2. Add a DECORATION_MAP entry for it in data/content.js.
 * 3. Create a new component in components/pages/.
 * 4. Add a case for it in the renderPage() switch below.
 */

import { useState } from 'react'

// ── Data & config ──────────────────────────────────────────────────────────
import { NAV_ITEMS, DECORATION_MAP, PROJECT_PAGES } from './data/content'

// ── Structural components ──────────────────────────────────────────────────
import NavBar          from './components/NavBar'
import DecorationFrame from './components/DecorationFrame'

// ── Page components ────────────────────────────────────────────────────────
import MainFeedPage  from './components/pages/MainFeedPage'
import ProjectPage   from './components/pages/ProjectPage'
import Project2Page  from './components/pages/Project2Page'  // 3D viewer page
import ContactPage   from './components/pages/ContactPage'
import AboutPage     from './components/pages/AboutPage'

// ── Global styles (resets, tokens, shell layout) ───────────────────────────
import './styles/global.css'

export default function App() {
  // `active` holds the currently selected menu label — must match NAV_ITEMS strings.
  const [active, setActive] = useState(NAV_ITEMS[0])

  // Decoration config for the active page (colours + strip labels).
  const deco = DECORATION_MAP[active]

  /**
   * renderPage
   * Maps the active menu key to the correct page component.
   * ProjectPage is reused for every project — it receives its data object
   * from PROJECT_PAGES so no new case is needed for additional projects.
   */
  function renderPage() {
    switch (active) {
      case 'MAIN FEED': return <MainFeedPage />
      case 'CONTACT':   return <ContactPage />
      case 'ABOUT ME':  return <AboutPage />

      // Project 2 has a custom layout with 3D model viewers.
      // All other projects fall through to the generic ProjectPage.
      case 'PROJECT 2': return <Project2Page />

      default: {
        // Generic project handler — matches any menuKey in PROJECT_PAGES.
        const project = PROJECT_PAGES.find(p => p.menuKey === active)
        if (project) return <ProjectPage project={project} />
        return <p style={{ padding: 48 }}>Page not found: "{active}"</p>
      }
    }
  }

  return (
    <div className="shell">
      {/* Top navigation bar */}
      <NavBar
        navItems={NAV_ITEMS}
        active={active}
        deco={deco}
        onSelect={setActive}
      />

      {/* Content area surrounded by the four decoration strips */}
      <DecorationFrame deco={deco}>
        {renderPage()}
      </DecorationFrame>
    </div>
  )
}
