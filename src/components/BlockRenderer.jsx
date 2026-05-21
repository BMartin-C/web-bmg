/**
 * components/BlockRenderer.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Renders a single content block from a FEED_ENTRIES post.
 * Block shapes and their required fields:
 *
 *   { type: 'text',       content }
 *   { type: 'image',      bg?, caption? }
 *   { type: 'text-image', text, bg?, caption? }
 *   { type: 'quote',      content, author? }
 *   { type: 'divider' }
 *
 * Usage
 *   import renderBlock from './BlockRenderer'
 *   {entry.blocks.map((block, i) => renderBlock(block, i))}
 */
export default function renderBlock(block, index) {
  switch (block.type) {

    case 'text':
      return <p key={index} className="block-text">{block.content}</p>

    case 'image':
      return (
        <div key={index} className="block-image-wrap">
          <div className="block-image" style={{ background: block.bg ?? 'rgba(255,255,255,0.1)' }} />
          {block.caption && <p className="block-image-caption">{block.caption}</p>}
        </div>
      )

    case 'text-image':
      return (
        <div key={index} className="block-text-image">
          <p className="block-text">{block.text}</p>
          <div className="block-image-wrap">
            <div className="block-image" style={{ background: block.bg ?? 'rgba(255,255,255,0.1)' }} />
            {block.caption && <p className="block-image-caption">{block.caption}</p>}
          </div>
        </div>
      )

    case 'quote':
      return (
        <blockquote key={index} className="block-quote">
          <p>{block.content}</p>
          {block.author && <cite>{block.author}</cite>}
        </blockquote>
      )

    case 'divider':
      return <hr key={index} className="block-divider" />

    default:
      return (
        <div key={index} className="block-unknown">
          Unknown block type: "{block.type}"
        </div>
      )
  }
}
