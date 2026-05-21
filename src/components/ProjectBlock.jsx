/**
 * components/ProjectBlock.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * A single case-study section used by both ProjectPage and Project2Page.
 *
 * The `data-num` attribute is read by a CSS ::after pseudo-element to render
 * the large decorative numeral in the background.
 *
 * Props
 *   num   {string}   – 2-digit numeral shown as a background decoration.
 *   title {string}   – section heading.
 *   desc  {string}   – body paragraph.
 *   tags  {string[]} – pill labels.
 */
export default function ProjectBlock({ num, title, desc, tags }) {
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
