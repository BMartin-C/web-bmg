/**
 * pages/MainFeedPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Layout:
 *   .feed-top           — 50%-wide entry list (scroll to navigate)
 *   .between-banner-wrap — centred banner
 *   .posts-scroll-wrap   — posts area with custom scrollbar
 *     .posts-scroll      — scrollable, native bar hidden
 *       PostCard × N     — all posts stacked vertically
 *     .scroll-track      — custom scrollbar track (right edge)
 *       .scroll-thumb    — thumb moves proportionally to scroll position
 *
 * CUSTOM SCROLLBAR
 * ─────────────────
 * The native scrollbar is hidden via CSS. A custom track + thumb are
 * absolutely positioned on the right edge of the wrapper. An onScroll
 * handler updates --thumb-top (% from top of track) and --thumb-h
 * (thumb height as % of track), both as CSS custom properties.
 *
 * BACKGROUND TRANSITIONS
 * ───────────────────────
 * Each PostCard receives the next post's heroBg as `nextBg`.
 * A gradient div (.post-bg-transition) sits at the bottom of .post-bg-image,
 * fading from transparent to nextBg over ~160px.
 * This creates a continuous colour flow as you scroll from post to post.
 * The last post fades to a dark fallback (#0a0a0a).
 */

import { useRef, useState, useEffect, useCallback } from 'react'
import { FEED_ENTRIES, BETWEEN_BANNER, CAROUSEL_BANNER, BANNER_SECTION_BG } from '../../data/content'
import '../../styles/pages/feed.css'

// ─── Block renderers ──────────────────────────────────────────────────────────

function renderBlock(block, index) {
  switch (block.type) {
    case 'text':
      return <p key={index} className="block-text">{block.content}</p>

    case 'image':
      return (
        <div key={index} className="block-image-wrap">
          <div className="block-image" style={{ background: block.bg || 'rgba(255,255,255,0.1)' }} />
          {block.caption && <p className="block-image-caption">{block.caption}</p>}
        </div>
      )

    case 'text-image':
      return (
        <div key={index} className="block-text-image">
          <p className="block-text">{block.text}</p>
          <div className="block-image-wrap">
            <div className="block-image" style={{ background: block.bg || 'rgba(255,255,255,0.1)' }} />
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

// ─── PostCard ─────────────────────────────────────────────────────────────────

/**
 * PostCard
 * A single post with four layers:
 *   .post-bg-image       z:0  solid colour / image — full bleed
 *   .post-bg-transition  z:1  gradient at the bottom bleeding into nextBg
 *   .post-bg-overlay     z:2  centred readable overlay
 *   .post-content        z:3  text content
 *
 * Props
 *   entry   {object}  – FEED_ENTRIES item
 *   nextBg  {string}  – heroBg of the following post (for the transition gradient)
 *   postRef {fn}      – callback ref for scrollIntoView
 */
function PostCard({ entry, nextBg, postRef }) {
  return (
    <div className="post-card" ref={postRef} data-id={entry.id}>

      {/* Layer 1 — background colour/image */}
      <div className="post-bg-image" style={{ background: entry.heroBg }} />

      {/* Layer 2 — gradient transition at the bottom into the next post's colour.
          Uses a linear gradient from transparent → nextBg.
          Gives the illusion of continuous colour flow between posts.          */}
      <div
        className="post-bg-transition"
        style={{
          background: `linear-gradient(to bottom, transparent 0%, ${nextBg} 100%)`,
        }}
      />

      {/* Layer 3 — semi-transparent overlay, narrower than the post */}
      <div className="post-bg-overlay" />

      {/* Layer 4 — readable content */}
      <div className="post-content">
        <div className="post-header">
          <div className="post-meta">
            <span className="post-tag">{entry.tag}</span>
            <span className="post-date">{entry.date}</span>
          </div>
          <h2 className="post-title">{entry.title}</h2>
          <div className="post-rule" />
        </div>

        <div className="post-blocks">
          {entry.blocks.map((block, i) => renderBlock(block, i))}
        </div>
      </div>

    </div>
  )
}

// ─── BetweenBanner ────────────────────────────────────────────────────────────

function BetweenBanner() {
  return (
    <div
      className="between-banner-wrap"
      style={{ background: BANNER_SECTION_BG.bg }}
    >
      <div
        className="between-banner"
        style={{ background: BETWEEN_BANNER.bg }}
      >
        {/* PLACEHOLDER label — remove once a real banner image is set */}
        <span className="between-banner-label">{BETWEEN_BANNER.label}</span>
      </div>
    </div>
  )
}

// ─── CarouselBanner ───────────────────────────────────────────────────────────

/**
 * CarouselBanner
 * A small banner attached directly to the top of the posts carousel.
 * Uses the same full-bleed margins as .posts-scroll-wrap so it connects
 * seamlessly — no gap between this banner and the carousel below it.
 *
 * TO REPLACE THE PLACEHOLDER:
 *   Set CAROUSEL_BANNER.bg in content.js to a CSS background value:
 *     bg: "url('/carousel-banner.jpg') center / cover no-repeat"
 */
function CarouselBanner() {
  return (
    <div
      className="carousel-banner"
      style={{
        background: CAROUSEL_BANNER.bg,
        height:     CAROUSEL_BANNER.height,
      }}
    >
      <span className="carousel-banner-label">{CAROUSEL_BANNER.label}</span>
    </div>
  )
}

function EntryRow({ entry, isActive, onClick }) {
  return (
    <div
      className={`entry-row${isActive ? ' entry-row--active' : ''}`}
      onClick={onClick}
      title={entry.excerpt}
    >
      <span className="entry-date">{entry.date}</span>
      <span className="entry-title">{entry.title}</span>
      <span className="entry-tag">{entry.tag}</span>
    </div>
  )
}

// ─── MainFeedPage ─────────────────────────────────────────────────────────────

export default function MainFeedPage() {
  const postRefs           = useRef({})
  const scrollContainerRef = useRef(null)
  const [activeId, setActiveId]     = useState(FEED_ENTRIES[0].id)
  const [thumbTop,  setThumbTop]    = useState(0)    // % from top of track
  const [thumbHeight, setThumbHeight] = useState(20) // % of track height

  // ── Custom scrollbar: update thumb on scroll ──────────────────────────────
  const handleScroll = useCallback(() => {
    const el = scrollContainerRef.current
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const scrollable = scrollHeight - clientHeight
    const ratio      = scrollable > 0 ? scrollTop / scrollable : 0
    // Thumb height is proportional to visible / total content
    const h = Math.max(6, (clientHeight / scrollHeight) * 100)
    setThumbHeight(h)
    setThumbTop(ratio * (100 - h))
  }, [])

  // ── IntersectionObserver: keep entry list in sync with scroll ─────────────
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Initialise scrollbar thumb size on mount
    handleScroll()

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          const id = visible[0].target.getAttribute('data-id')
          if (id) setActiveId(id)
        }
      },
      { root: container, threshold: 0.2 }
    )

    Object.values(postRefs.current).forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [handleScroll])

  function scrollToPost(id) {
    setActiveId(id)
    const container = scrollContainerRef.current
    const el = postRefs.current[id]
    if (!container || !el) return
    container.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  }

  return (
    <div className="page visible feed-page">

      {/* ── Sticky top: [entry list | banner] row + carousel banner ── */}
      <div className="feed-sticky">
        <div className="feed-top-row">
          {/* Left: entry list */}
          <div className="feed-top">
            <div className="feed-list-col">
              <div className="feed-list-labels">
                <span className="feed-list-label-top">OLDER POSTS</span>
                <span className="feed-list-label-sub">LISTA DE POSTS</span>
              </div>
              <div className="feed-list">
                {FEED_ENTRIES.map(entry => (
                  <EntryRow
                    key={entry.id}
                    entry={entry}
                    isActive={entry.id === activeId}
                    onClick={() => scrollToPost(entry.id)}
                  />
                ))}
              </div>
            </div>
          </div>
          {/* Right: banner fills remaining space */}
          <BetweenBanner />
        </div>
        <CarouselBanner />
      </div>

      {/* Posts + custom scrollbar */}
      <div className="posts-scroll-wrap">

        {/* Scrollable post area — native bar hidden via CSS */}
        <div
          className="posts-scroll"
          ref={scrollContainerRef}
          onScroll={handleScroll}
        >
          {FEED_ENTRIES.map((entry, i) => {
            // nextBg: the heroBg of the following post, or dark fallback for the last
            const nextBg = FEED_ENTRIES[i + 1]?.heroBg ?? '#0a0a0a'
            return (
              <PostCard
                key={entry.id}
                entry={entry}
                nextBg={nextBg}
                postRef={el => { postRefs.current[entry.id] = el }}
              />
            )
          })}
        </div>

        {/* Custom scrollbar — track + thumb */}
        <div className="scroll-track">
          <div
            className="scroll-thumb"
            style={{
              top:    `${thumbTop}%`,
              height: `${thumbHeight}%`,
            }}
          />
        </div>

      </div>

    </div>
  )
}