/**
 * pages/MainFeedPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * The home / landing page of the site.  Renders:
 *   • A large display-type hero heading.
 *   • A labelled divider.
 *   • A 2-column grid of feed cards (blog posts, highlights, etc.).
 *
 * All text content is sourced from data/content.js (FEED_HERO, FEED_CARDS).
 * To change text or add/remove cards, edit that file — no JSX changes needed.
 *
 * Props  – none (reads directly from the shared content module).
 */

import { FEED_HERO, FEED_CARDS } from '../../data/content'
import '../../styles/pages/feed.css'

// ─── FeedCard ─────────────────────────────────────────────────────────────────

/**
 * FeedCard
 * A single card in the main feed grid.
 *
 * Props
 *   num   {string} – zero-padded card number shown in small type at the top.
 *   title {string} – card headline.
 *   tag   {string} – category + year label at the bottom.
 */
function FeedCard({ num, title, tag }) {
  return (
    <div className="feed-card">
      <div className="card-num">{num}</div>
      <div className="card-title">{title}</div>
      <div className="card-tag">{tag}</div>
    </div>
  )
}

// ─── MainFeedPage ─────────────────────────────────────────────────────────────

export default function MainFeedPage() {
  return (
    <div className="page visible">

      {/* Hero heading — line2 is italicised and coloured via CSS */}
      <div className="feed-hero">
        <h1>
          {FEED_HERO.line1}<br />
          <em>{FEED_HERO.line2}</em><br />
          {/* &amp; renders the & symbol safely in JSX */}
          {FEED_HERO.line3}
        </h1>
        <p className="feed-subtitle">{FEED_HERO.subtitle}</p>
      </div>

      {/* Horizontal rule with a centred label */}
      <div className="feed-divider">
        <span>{FEED_HERO.divider}</span>
      </div>

      {/* 2-column card grid — populated from FEED_CARDS in content.js */}
      <div className="feed-grid">
        {FEED_CARDS.map(card => (
          <FeedCard key={card.num} {...card} />
        ))}
      </div>

    </div>
  )
}
