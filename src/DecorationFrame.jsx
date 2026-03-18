/**
 * DecorationFrame.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders the four decoration strips that frame the main content area:
 *
 *   Left side strip   – vertical bar on the left edge of the content column.
 *   Right side strip  – vertical bar on the right edge.
 *   Top col strip     – thin horizontal rule above the scrollable content.
 *   Bottom col strip  – thin horizontal rule below the scrollable content.
 *
 * Each strip has its own background colour, text colour, and label, all driven
 * by the `deco` prop which is looked up from DECORATION_MAP in content.js.
 *
 * HOW COLOURS WORK
 * ─────────────────
 * The `deco.cls` string (e.g. "feed", "proj1") is appended to class-name
 * prefixes ("deco-side-", "deco-top-", "deco-col-") to form the final CSS
 * class.  Colour rules for each cls live in styles/decorations.css.
 * To add a new colour theme:
 *   1. Add a new entry with a unique `cls` value in DECORATION_MAP (content.js).
 *   2. Add matching CSS rules in styles/decorations.css under each prefix.
 *
 * Props
 * ─────
 *   deco     {object}    – decoration config for the active page.
 *   children {ReactNode} – the content column (top strip, scrollable area, bottom strip).
 */

import './decorations.css'

// ─── SideStrip ────────────────────────────────────────────────────────────────

/**
 * SideStrip
 * A narrow vertical bar placed on either the left or right side of the layout.
 * Renders a thin divider line and a rotated text label.
 *
 * Props
 *   cls      {string}  – colour-theme slug (e.g. "feed").
 *   label    {string}  – rotated text shown inside the strip.
 *   side     {string}  – "left" | "right"; adds the .right modifier class.
 */
function SideStrip({ cls, label, side }) {
  return (
    <div className={`side-deco${side === 'right' ? ' right' : ''} deco-side-${cls}`}>
      {/* Vertical centre-line for visual rhythm */}
      <div className="side-deco-line v" />
      <span className="side-deco-text">{label}</span>
    </div>
  )
}

// ─── ColStrip ─────────────────────────────────────────────────────────────────

/**
 * ColStrip
 * A thin horizontal strip placed at the top or bottom of the content column.
 *
 * Props
 *   cls      {string}  – colour-theme slug.
 *   label    {string}  – text shown horizontally inside the strip.
 *   position {string}  – "top" | "bottom"; adds the .bot modifier class.
 */
function ColStrip({ cls, label, position }) {
  return (
    <div className={`col-deco${position === 'bottom' ? ' bot' : ''} deco-col-${cls}`}>
      <span>{label}</span>
    </div>
  )
}

// ─── DecorationFrame ──────────────────────────────────────────────────────────

/**
 * DecorationFrame  (default export)
 * Composes the full three-column layout:
 *   [ SideStrip left ] [ content column ] [ SideStrip right ]
 *
 * The content column itself is a three-row grid:
 *   [ ColStrip top ]
 *   [ scrollable content (children) ]
 *   [ ColStrip bottom ]
 */
export default function DecorationFrame({ deco, children }) {
  return (
    <div className="body-row">

      <SideStrip cls={deco.cls} label={deco.leftLabel}  side="left"  />

      {/* Centre column: top strip + content + bottom strip */}
      <div className="content-col">
        <ColStrip cls={deco.cls} label={deco.topLabel} position="top"    />
        <div className="content-area">
          {children}
        </div>
        <ColStrip cls={deco.cls} label={deco.botLabel} position="bottom" />
      </div>

      <SideStrip cls={deco.cls} label={deco.rightLabel} side="right" />

    </div>
  )
}
