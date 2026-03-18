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
 * Cards shown in the 2-column grid on the Main Feed page.
 * Fields:
 *   num   – displayed as a zero-padded card number (e.g. "001")
 *   title – headline text on the card
 *   tag   – small category + year label at the bottom of each card
 *
 * TO CHANGE: add, remove, or edit objects in this array.
 */
export const FEED_CARDS = [
  { num: '001', title: 'Reimagining Editorial Layouts', tag: 'Design · 2025' },
  { num: '002', title: 'Brutalist Web Aesthetics',      tag: 'Frontend · 2025' },
  { num: '003', title: 'Type as Architecture',          tag: 'Typography · 2024' },
  { num: '004', title: 'The Texture Manifesto',         tag: 'Visual · 2024' },
]

/** Hero text shown above the feed grid. */
export const FEED_HERO = {
  line1:    'Creative',
  line2:    'Studio',   // rendered in italic + accent colour
  line3:    '& Portfolio',
  subtitle: 'Vol. 04 · Selected Works · 2025',
  divider:  'latest entries',
}

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
