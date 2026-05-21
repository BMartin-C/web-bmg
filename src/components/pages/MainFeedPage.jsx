/**
 * pages/MainFeedPage.jsx
 * ─────────────────────────────────────────────────────────────────────────────
 * Layout
 * ───────
 *   .feed-sticky
 *     .feed-top-row
 *       .feed-top          — scrollable entry list (left, ~50% width)
 *       BetweenBanner      — fills remaining right space
 *     CarouselBanner       — full-width banner above the post carousel
 *
 *   .posts-scroll-wrap
 *     .posts-scroll        — vertically scrollable PostCard list (native bar hidden)
 *     .scroll-track        — custom scrollbar track (right edge)
 *       .scroll-thumb      — thumb, position driven by JS via top/height %
 *
 * BACKGROUND TRANSITIONS
 * ───────────────────────
 * Each PostCard fades its bottom edge into the next post's heroBg via a
 * linear-gradient overlay, creating a continuous colour flow while scrolling.
 *
 * CUSTOM SCROLLBAR
 * ─────────────────
 * Native scrollbar hidden in CSS. An onScroll handler keeps --thumb-top and
 * --thumb-h in sync with the scroll position so the custom thumb tracks correctly.
 */

import { useRef, useState, useEffect, useCallback } from 'react'
import {
  FEED_ENTRIES,
  BETWEEN_BANNER,
  CAROUSEL_BANNER,
  BANNER_SECTION_BG,
} from '../../data/content'
import renderBlock from "../BlockRenderer"
import '../../styles/pages/feed.css'

// ─── PostCard ─────────────────────────────────────────────────────────────────

/**
 * Props
 *   entry   {object} – a FEED_ENTRIES item
 *   nextBg  {string} – heroBg of the following post (gradient transition target)
 *   postRef {fn}     – callback ref used by the parent for scrollIntoView
 */
function PostCard({ entry, nextBg, postRef }) {
  return (
    <div className="post-card" ref={postRef} data-id={entry.id}>

      {/* z:0 — solid background colour / image */}
      <div className="post-bg-image" style={{ background: entry.heroBg }} />

      {/* z:1 — gradient bleeding into the next post's colour */}
      <div
        className="post-bg-transition"
        style={{ background: `linear-gradient(to bottom, transparent 0%, ${nextBg} 100%)` }}
      />

      {/* z:2 — semi-transparent readable overlay */}
      <div className="post-bg-overlay" />

      {/* z:3 — content */}
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

// ─── EntryRow ─────────────────────────────────────────────────────────────────

function EntryRow({ entry, isActive, onClick, entryRef }) {
  return (
    <div
      ref={entryRef}
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

// ─── BetweenBanner ────────────────────────────────────────────────────────────

/**
 * Centred banner that fills the right side of the feed-top-row.
 * To use a real image: set BETWEEN_BANNER.bg in data/content.js.
 */
function BetweenBanner() {
  return (
    <div className="between-banner-wrap" style={{ background: BANNER_SECTION_BG.bg }}>
      <div className="between-banner" style={{ background: BETWEEN_BANNER.bg }}>
        <span className="between-banner-label">{BETWEEN_BANNER.label}</span>
      </div>
    </div>
  )
}

// ─── CarouselBanner ───────────────────────────────────────────────────────────

/**
 * Full-width banner sitting directly above the post carousel.
 * To use a real image: set CAROUSEL_BANNER.bg in data/content.js, e.g.:
 *   bg: "url('/carousel-banner.jpg') center / cover no-repeat"
 */
function CarouselBanner() {
  return (
    <div
      className="carousel-banner"
      style={{ background: CAROUSEL_BANNER.bg, height: CAROUSEL_BANNER.height }}
    >
      <span className="carousel-banner-label">{CAROUSEL_BANNER.label}</span>
    </div>
  )
}

// ─── useCustomScrollbar ───────────────────────────────────────────────────────

/**
 * Keeps the custom scrollbar thumb in sync with a scrollable element.
 * Returns { thumbTop, thumbHeight, handleScroll } to spread onto the element.
 */
function useCustomScrollbar() {
  const [thumbTop,    setThumbTop]    = useState(0)
  const [thumbHeight, setThumbHeight] = useState(20)

  const handleScroll = useCallback((el) => {
    if (!el) return
    const { scrollTop, scrollHeight, clientHeight } = el
    const scrollable = scrollHeight - clientHeight
    const ratio      = scrollable > 0 ? scrollTop / scrollable : 0
    const h          = Math.max(6, (clientHeight / scrollHeight) * 100)
    setThumbHeight(h)
    setThumbTop(ratio * (100 - h))
  }, [])

  return { thumbTop, thumbHeight, handleScroll }
}

// ─── MainFeedPage ─────────────────────────────────────────────────────────────

export default function MainFeedPage() {
  const scrollContainerRef = useRef(null)
  const feedListRef        = useRef(null)
  const postRefs           = useRef({})      // entry.id → post DOM node
  const entryRowRefs       = useRef({})      // entry.id → row DOM node

  const [activeId, setActiveId] = useState(FEED_ENTRIES[0].id)
  const { thumbTop, thumbHeight, handleScroll } = useCustomScrollbar()

  // ── Keep the active entry row visible in the entry list ──────────────────
  useEffect(() => {
    const list = feedListRef.current
    const row  = entryRowRefs.current[activeId]
    if (!list || !row) return

    const listTop    = list.scrollTop
    const listBottom = listTop + list.clientHeight
    const rowTop     = row.offsetTop
    const rowBottom  = rowTop + row.offsetHeight

    if      (rowTop    < listTop)    list.scrollTo({ top: rowTop,                          behavior: 'smooth' })
    else if (rowBottom > listBottom) list.scrollTo({ top: rowBottom - list.clientHeight,   behavior: 'smooth' })
  }, [activeId])

  // ── IntersectionObserver: sync entry list as the carousel scrolls ─────────
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Initialise thumb size once the container is measured
    handleScroll(container)

    const observer = new IntersectionObserver(
      (entries) => {
        const topVisible = entries
          .filter(e => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (topVisible) {
          const id = topVisible.target.getAttribute('data-id')
          if (id) setActiveId(id)
        }
      },
      { root: container, threshold: 0.2 }
    )

    Object.values(postRefs.current).forEach(el => el && observer.observe(el))
    return () => observer.disconnect()
  }, [handleScroll])

  function scrollToPost(id) {
    setActiveId(id)
    const container = scrollContainerRef.current
    const el        = postRefs.current[id]
    if (container && el) container.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  }

  return (
    <div className="page visible feed-page">

      {/* ── Sticky header row ── */}
      <div className="feed-sticky">
        <div className="feed-top-row">

          <div className="feed-top">
            <div className="feed-list-col">
              <div className="feed-list-labels">
                <span className="feed-list-label-top">OLDER POSTS</span>
                <span className="feed-list-label-sub">LISTA DE POSTS</span>
              </div>
              <div className="feed-list" ref={feedListRef}>
                {FEED_ENTRIES.map(entry => (
                  <EntryRow
                    key={entry.id}
                    entry={entry}
                    isActive={entry.id === activeId}
                    entryRef={el => { entryRowRefs.current[entry.id] = el }}
                    onClick={() => scrollToPost(entry.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <BetweenBanner />
        </div>

        <CarouselBanner />
      </div>

      {/* ── Posts + custom scrollbar ── */}
      <div className="posts-scroll-wrap">

        <div
          className="posts-scroll"
          ref={scrollContainerRef}
          onScroll={e => handleScroll(e.currentTarget)}
        >
          {FEED_ENTRIES.map((entry, i) => (
            <PostCard
              key={entry.id}
              entry={entry}
              nextBg={FEED_ENTRIES[i + 1]?.heroBg ?? '#0a0a0a'}
              postRef={el => { postRefs.current[entry.id] = el }}
            />
          ))}
        </div>

        <div className="scroll-track">
          <div
            className="scroll-thumb"
            style={{ top: `${thumbTop}%`, height: `${thumbHeight}%` }}
          />
        </div>

      </div>

    </div>
  )
}
