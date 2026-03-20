/**
 * content.js — Central data store
 * ─────────────────────────────────────────────────────────────────────────────
 * This is the single file you edit to customise all visible text and colours
 * across the site.  Nothing here requires React knowledge — plain JS objects.
 *
 * HOW TO REPLACE PLACEHOLDERS
 * ────────────────────────────
 * 1. NAV_ITEMS        – change the menu labels shown in the top navigation bar.
 * 2. DECORATION_MAP   – for each menu item, set the four decoration strip labels
 *                       and the CSS colour-class suffix that controls their colour.
 *                       To add a new colour theme, also add matching CSS rules in
 *                       styles/decorations.css (look for the "deco-top-*" block).
 * 3. FEED_CARDS       – replace with your own blog posts / highlights.
 * 4. PROJECT_PAGES    – replace with your real projects.  Each project can have
 *                       as many `blocks` as you need.
 * 5. CONTACT_CONTENT  – update heading, body copy, and field labels.
 * 6. ABOUT_CONTENT    – update biography text and skills list.
 *
 * LOGO PLACEHOLDER
 * ─────────────────
 * The logo currently renders as the text "MK".  To use a real image:
 *   • Drop your logo files into /public/  (e.g. logo-main.svg, logo-sub.svg).
 *   • In components/NavBar.jsx, replace the text node inside <Logo> with:
 *       <img src="/logo-main.svg" alt="Logo" />   (main-feed variant)
 *       <img src="/logo-sub.svg"  alt="Logo" />   (all-other-pages variant)
 *
 * NAV BANNER PLACEHOLDER
 * ───────────────────────
 * The nav banner is currently a CSS diagonal-stripe gradient.  To use a real image:
 *   • In styles/nav.css, find ".nav-links { background: repeating-linear-gradient … }"
 *   • Replace that `background` value with:
 *       background: url('/your-banner.jpg') center / cover no-repeat;
 */

// ─── Navigation ──────────────────────────────────────────────────────────────

/**
 * The ordered list of menu items shown in the top navigation bar.
 * The first item is treated as the "home" / main-feed page.
 *
 * TO CHANGE: edit the strings here; component code adapts automatically.
 */
export const NAV_ITEMS = [
  'MAIN FEED',
  'PROJECT 1',
  'PROJECT 2',
  'CONTACT',
  'ABOUT ME',
]

// ─── Decoration Map ───────────────────────────────────────────────────────────

/**
 * DECORATION_MAP
 * Controls the four coloured decoration strips that surround the content area:
 *   topLabel   – thin stripe just below the nav bar
 *   leftLabel  – left vertical side strip
 *   rightLabel – right vertical side strip
 *   botLabel   – thin stripe at the very bottom
 *   cls        – short slug used to pick a colour theme via CSS class names.
 *                Valid values: 'feed' | 'proj1' | 'proj2' | 'contact' | 'about'
 *                To add a new theme slug, add corresponding rules in
 *                styles/decorations.css.
 *
 * Keys must exactly match the strings in NAV_ITEMS above.
 */
export const DECORATION_MAP = {
  'MAIN FEED': {
    cls:        'feed',
    topLabel:   'Vol. 04 · Main Feed · 2025',
    leftLabel:  'Selected Works · Studio',
    rightLabel: 'Editorial · Portfolio',
    botLabel:   'Main Feed · End',
  },
  'PROJECT 1': {
    cls:        'proj1',
    topLabel:   'Project One · Identity & Brand',
    leftLabel:  'Branding · Print · Motion',
    rightLabel: 'Case Study · 01',
    botLabel:   'Project 1 · End',
  },
  'PROJECT 2': {
    cls:        'proj2',
    topLabel:   'Project Two · Publication',
    leftLabel:  'Editorial · Typography',
    rightLabel: 'Case Study · 02',
    botLabel:   'Project 2 · End',
  },
  'CONTACT': {
    cls:        'contact',
    topLabel:   'Contact · Get In Touch',
    leftLabel:  'Open For Work · 2025',
    rightLabel: 'Say Hello · Studio',
    botLabel:   'Contact · End',
  },
  'ABOUT ME': {
    cls:        'about',
    topLabel:   'About · Multidisciplinary Designer',
    leftLabel:  'Experience · Skills',
    rightLabel: 'Biography · Studio',
    botLabel:   'About · End',
  },
}

// ─── Main Feed ────────────────────────────────────────────────────────────────

/**
 * FEED_ENTRIES
 * ─────────────────────────────────────────────────────────────────────────────
 * The ordered list of posts shown in the scrollable "older posts" list.
 * Sorted newest-first — add new entries at the top.
 *
 * Each entry is also a full post: clicking a row loads it in the featured
 * post section below.
 *
 * Fields:
 *   id      – unique key (must be unique across all entries)
 *   date    – display date string
 *   title   – post headline
 *   tag     – category label
 *   excerpt – one-line summary shown in the list row
 *   heroBg  – CSS background for the full-bleed image layer
 *             Placeholder: solid colour. For a real image:
 *               heroBg: "url('/hero.jpg') center / cover no-repeat"
 *   blocks  – array of content blocks (same types as FEATURED_POST.blocks)
 *             See the block type reference in FEATURED_POST below.
 *
 * TO ADD A NEW POST: prepend a new object to this array.
 */
export const FEED_ENTRIES = [
  {
    id:      '006',
    date:    'Mar 2025',
    title:   'Grid Systems in Motion',
    tag:     'Motion',
    excerpt: 'Applying typographic grid logic to animation timing and easing.',
    heroBg:  '#2c3e50',
    blocks: [
      { type: 'text',       content: 'The grid is not a cage — it is a score. When we apply typographic grid logic to time-based media, the result is animation that feels inevitable rather than arbitrary. Every easing curve becomes a rhythm, every delay a beat.' },
      { type: 'text-image', text: 'This piece documents a series of experiments applying Müller-Brockmann\'s spatial rules to motion design: fixed intervals, proportional relationships, and the deliberate use of negative space as a timing device.', bg: '#4a235a', caption: 'Fig. 01 — Grid overlay applied to a 24-frame motion sequence.' },
      { type: 'quote',      content: 'The grid system is an aid, not a guarantee.', author: '— Josef Müller-Brockmann' },
      { type: 'divider' },
      { type: 'text',       content: 'Subsequent experiments moved beyond static grids into dynamic ones — grids whose column widths respond to audio amplitude, whose baseline shifts with motion blur.' },
    ],
  },
  {
    id:      '005',
    date:    'Feb 2025',
    title:   'Low-Poly as Aesthetic Choice',
    tag:     '3D',
    excerpt: 'Why constraints in geometry produce more expressive results.',
    heroBg:  '#1a3a2a',
    blocks: [
      { type: 'text',  content: 'Low-poly is not a limitation — it is a vocabulary. When you reduce a form to its fewest possible faces, you force every remaining edge to carry meaning. The silhouette becomes the statement.' },
      { type: 'image', bg: '#1a3a2a', caption: 'Fig. 01 — Icosahedron detail at subdivision level 1.' },
      { type: 'text',  content: 'The flat-shaded face is the pixel of three-dimensional space. It is honest about its own construction in a way that smooth meshes rarely are.' },
    ],
  },
  {
    id:      '004',
    date:    'Jan 2025',
    title:   'The Texture Manifesto',
    tag:     'Visual',
    excerpt: 'Surface quality as the primary carrier of material honesty.',
    heroBg:  '#3d2008',
    blocks: [
      { type: 'text',  content: 'Texture is not decoration applied after the fact. It is the evidence of how a thing was made — the grain of the paper, the weave of the fabric, the oxidation of the metal. To remove texture is to erase provenance.' },
      { type: 'quote', content: 'Every surface tells a story of time and process.', author: '— Studio Notes, Jan 2025' },
    ],
  },
  {
    id:      '003',
    date:    'Nov 2024',
    title:   'Type as Architecture',
    tag:     'Typography',
    excerpt: 'Letterforms as load-bearing structural elements, not decoration.',
    heroBg:  '#2c3e50',
    blocks: [
      { type: 'text',       content: 'A typeface is a building. Its proportions determine how much light passes through, how the eye moves from room to room, where the weight settles and where it lifts.' },
      { type: 'text-image', text: 'The counter of a letter is as important as the stroke itself. White space is not absence — it is structure.', bg: '#2c3e50', caption: 'Fig. 01 — Counter study, Bebas Neue vs DM Mono.' },
    ],
  },
  {
    id:      '002',
    date:    'Sep 2024',
    title:   'Brutalist Web Aesthetics',
    tag:     'Frontend',
    excerpt: 'Exposing the grid, the border, and the raw document underneath.',
    heroBg:  '#1a1410',
    blocks: [
      { type: 'text',  content: 'Brutalism on the web is not ugliness. It is a refusal to disguise the structure — to let the border be a border, the grid be visible, the document honest about itself.' },
      { type: 'divider' },
      { type: 'text',  content: 'The most interesting brutalist sites are not chaotic. They are rigidly systematic, their rawness the product of strict rules applied without softening.' },
    ],
  },
  {
    id:      '001',
    date:    'Jul 2024',
    title:   'Reimagining Editorial Layouts',
    tag:     'Design',
    excerpt: 'Breaking the magazine template open and rebuilding from first principles.',
    heroBg:  '#4a235a',
    blocks: [
      { type: 'text',  content: 'The magazine grid emerged from the constraints of hot metal typesetting. We are no longer constrained by metal. Why are we still constrained by its ghost?' },
      { type: 'quote', content: 'Design is the conscious effort to impose a meaningful order.', author: '— Victor Papanek' },
      { type: 'text',  content: 'This series of layouts explores what editorial design looks like when every assumption about columns, gutters, and baseline grids is treated as optional rather than mandatory.' },
    ],
  },
]

/**
 * BETWEEN_BANNER
 * ─────────────────────────────────────────────────────────────────────────────
 * The centred banner shown between the entry list and the featured post.
 * Does not reach the edges — it is horizontally centred at ~60% width.
 *
 * Fields:
 *   label  – text shown when no real image is set (placeholder label)
 *   bg     – CSS background value
 *             Placeholder: solid colour.
 *             For a real image: "url('/banner.jpg') center / cover no-repeat"
 *   height – banner height in pixels (default 80)
 */
export const BETWEEN_BANNER = {
  label:  'BANNER',
  bg:     '#d4c5a9',
  height: 80,
}

/**
 * CAROUSEL_BANNER
 * ─────────────────────────────────────────────────────────────────────────────
 * Small banner attached to the top edge of the vertical posts carousel.
 * Shares the same full-bleed width as the carousel (reaches the side strips).
 * The space between the central banner, this banner, and the entry list is
 * preserved — this banner sits directly above the carousel with no extra gap.
 *
 * Fields:
 *   label  – placeholder text (remove once a real image is set)
 *   bg     – CSS background value
 *             For a real image: "url('/carousel-banner.jpg') center / cover no-repeat"
 *   height – height in pixels
 */
export const CAROUSEL_BANNER = {
  label:  'CAROUSEL BANNER',
  bg:     '#8a7d6b',
  height: 36,
}

/**
 * BANNER_SECTION_BG
 * ─────────────────────────────────────────────────────────────────────────────
 * Background of the right section of the sticky row (behind the banner).
 * Currently a placeholder colour. To use a real image:
 *   bg: "url('/banner-bg.jpg') center / cover no-repeat"
 * Drop the file in /public/ and update the path.
 */
export const BANNER_SECTION_BG = {
  bg: '#3d2e1e',
}


/**
 * FEATURED_POST
 * ─────────────────────────────────────────────────────────────────────────────
 * The default post shown when the page first loads (before any entry is clicked).
 * Clicking any row in the entry list will replace this with that entry's content.
 *
 * This object has the same shape as a FEED_ENTRIES item, so you can also just
 * point it at one:
 *   import { FEED_ENTRIES } from './content'
 *   const FEATURED_POST = FEED_ENTRIES[0]
 *
 * BLOCK TYPES
 * ─────────────
 *   { type: 'text',       content: '...' }
 *   { type: 'image',      bg: '#hex|url(...)', caption: '...' }
 *   { type: 'text-image', text: '...', bg: '#hex|url(...)', caption: '...' }
 *   { type: 'quote',      content: '...', author: '...' }
 *   { type: 'divider' }
 */
export const FEATURED_POST = FEED_ENTRIES[0]


// ─── Projects ─────────────────────────────────────────────────────────────────

/**
 * PROJECT_PAGES
 * One entry per project menu item.  Each entry contains:
 *   menuKey – must match the corresponding NAV_ITEMS string exactly.
 *   label   – small eyebrow text above the project title (e.g. "Selected Work · 01").
 *   title   – large project title rendered with Bebas Neue.
 *   blocks  – array of case-study blocks shown below the header.
 *             Each block has:
 *               num   – 2-digit string shown as a large background numeral.
 *               title – case-study section title.
 *               desc  – paragraph description.
 *               tags  – array of tag strings shown as bordered pill labels.
 *
 * TO CHANGE: edit the strings; add/remove blocks as needed.
 */
export const PROJECT_PAGES = [
  {
    menuKey: 'PROJECT 1',
    label:   'Selected Work · 01',
    title:   'Project One',
    blocks: [
      {
        num:   '01',
        title: 'Identity & Brand System',
        desc:  'A comprehensive visual identity created for a forward-thinking architecture firm. The system spans print collateral, digital presence, signage, and motion graphics, unified by a strict typographic grid.',
        tags:  ['Branding', 'Print', 'Motion'],
      },
      {
        num:   '02',
        title: 'Digital Experience Design',
        desc:  "Redesign of the client's web presence, focusing on editorial storytelling and navigating large portfolios with clarity and elegance.",
        tags:  ['UX', 'Web', 'React'],
      },
    ],
  },
  {
    menuKey: 'PROJECT 2',
    label:   'Selected Work · 02',
    title:   'Project Two',
    blocks: [
      {
        num:   '01',
        title: 'Publication & Editorial',
        desc:  'Annual report and editorial design for a cultural institution, blending archival photography with contemporary typography. Printed in two-colour risograph.',
        tags:  ['Editorial', 'Print', 'Typography'],
      },
      {
        num:   '02',
        title: 'Exhibition Catalogue',
        desc:  'Art direction and layout design for a travelling exhibition catalogue, distributed across twelve venues in six countries.',
        tags:  ['Art Direction', 'Catalogue'],
      },
    ],
  },
]

// ─── Contact ──────────────────────────────────────────────────────────────────

/**
 * All text content for the Contact page.
 * TO CHANGE: update heading, body, and field labels below.
 * The form does not yet submit anywhere — wire up `onSubmit` in
 * components/pages/ContactPage.jsx when you add a backend or service.
 */
export const CONTACT_CONTENT = {
  heading:     'Get in Touch',
  body:        "Have a project in mind? Fill out the form and I'll respond within 48 hours.",
  fields: [
    { id: 'name',    label: 'Your Name',     type: 'text',  placeholder: 'Jane Doe' },
    { id: 'email',   label: 'Email Address', type: 'email', placeholder: 'jane@studio.com' },
    { id: 'message', label: 'Message',       type: 'textarea', placeholder: 'Tell me about your project…' },
  ],
  submitLabel: 'Send Message →',
}

// ─── About ────────────────────────────────────────────────────────────────────

/**
 * Content for the About Me page.
 * bio   – array of paragraph strings (each rendered as a separate <p>).
 * skills – array of { name, pct } objects drawn as thin progress bars.
 *          pct must be a number 0–100.
 *
 * TO CHANGE: rewrite bio paragraphs and adjust skill names / percentages.
 */
export const ABOUT_CONTENT = {
  heading: 'About Me',
  bio: [
    "I'm a multidisciplinary designer working at the intersection of editorial craft and digital experience. My practice is rooted in typographic rigour, spatial thinking, and an obsessive attention to detail.",
    'With over a decade of experience working with cultural institutions, technology companies, and independent studios, I bring a considered approach to every brief.',
  ],
  skills: [
    { name: 'Design',      pct: 90 },
    { name: 'React',       pct: 85 },
    { name: 'Typography',  pct: 95 },
    { name: 'Branding',    pct: 80 },
    { name: 'Motion',      pct: 70 },
  ],
}