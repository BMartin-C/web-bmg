/**
 * NavBar.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the full top navigation area, which consists of three parts:
 *
 *   1. Logo block  – left-most cell; switches between two colour variants
 *                    depending on whether the active page is the home feed.
 *   2. Link strip  – fills the rest of the nav bar; uses a banner image/gradient
 *                    as a continuous background across all buttons.  The active
 *                    button gets a solid rust overlay so it stands out clearly.
 *   3. Deco stripe – a thin strip immediately below the nav bar whose colour
 *                    changes with the active page (driven by DECORATION_MAP).
 *
 * Props
 * ─────
 *   navItems  {string[]}  – ordered list of page names to render as buttons.
 *   active    {string}    – the currently selected page name.
 *   deco      {object}    – decoration config for the active page (from DECORATION_MAP).
 *   onSelect  {function}  – called with the page name when a button is clicked.
 */

import './nav.css'

// ─── Logo ─────────────────────────────────────────────────────────────────────

/**
 * Logo
 * Shows the brand mark.  Switches between two placeholder colour variants:
 *   logo-main  (dark ink)  – when the active page is the home / main feed.
 *   logo-sub   (rust red)  – on all other pages.
 *
 * TO REPLACE THE PLACEHOLDER:
 *   Swap the text node "MK" with an <img> tag pointing to your logo file.
 *   Example:
 *     <img src="/logo-main.svg" alt="My Studio" />   ← place in /public/
 *
 * Props
 *   isHome   {boolean}  – true when viewing the main feed.
 *   onClick  {function} – navigates back to the main feed on click.
 */
function Logo({ isHome, onClick }) {
  const variant = isHome ? 'logo-main' : 'logo-sub'

  return (
    <div className={`nav-logo ${variant}`} onClick={onClick}>
      {/* ─── PLACEHOLDER: replace "MK" with your real logo ─── */}
      MK
    </div>
  )
}

// ─── NavLink ──────────────────────────────────────────────────────────────────

/**
 * NavLink
 * A single navigation button.  Transparent by default so the banner background
 * shows through; gets a solid colour when active.
 *
 * Props
 *   label     {string}   – the page name to display.
 *   isActive  {boolean}  – whether this is the currently selected page.
 *   onClick   {function} – called when this link is clicked.
 */
function NavLink({ label, isActive, onClick }) {
  return (
    <div
      className={`nav-link${isActive ? ' active' : ''}`}
      onClick={onClick}
    >
      {label}
    </div>
  )
}

// ─── NavBar ───────────────────────────────────────────────────────────────────

/**
 * NavBar  (default export)
 * Composes Logo + NavLink strip + decoration stripe into the full top bar.
 */
export default function NavBar({ navItems, active, deco, onSelect }) {
  return (
    <div className="nav-wrapper">

      {/* Main bar row: logo cell + link strip */}
      <div className="nav-bar">

        <Logo
          isHome={active === navItems[0]}
          onClick={() => onSelect(navItems[0])}
        />

        {/* Link strip
            The banner background is applied to this container in nav.css.
            Each NavLink is transparent so the banner shows through by default. */}
        <div className="nav-links">
          {/* Thin decorative rule at the very top of the link strip */}
          <div className="nav-deco-top" />

          {navItems.map(item => (
            <NavLink
              key={item}
              label={item}
              isActive={active === item}
              onClick={() => onSelect(item)}
            />
          ))}
        </div>

      </div>

      {/* Per-page decoration stripe directly below the nav bar.
          Colour + label both change with the active page. */}
      <div className={`nav-deco-bottom deco-top-${deco.cls}`}>
        <span>{deco.topLabel}</span>
      </div>

    </div>
  )
}
