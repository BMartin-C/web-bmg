# Portfolio Site

A React + Vite portfolio with a structured editorial layout.  
Built with component-oriented architecture — each UI concern lives in its own file.

---

## Requirements

- **Node.js 18 or newer** — check with `node -v`  
  Download from https://nodejs.org if needed.

---

## Installation & Running

```bash
# 1. Install dependencies (once)
npm install

# 2. Start development server with hot-reload
npm run dev
# → Open http://localhost:5173
```

Other commands:

```bash
npm run build    # Production build → /dist
npm run preview  # Preview the production build locally
```

---

## Project Structure

```
src/
├── main.jsx                    # App entry point
├── App.jsx                     # Root component — routing & layout composition
│
├── data/
│   └── content.js              # ★ ALL placeholder text & config lives here
│
├── components/
│   ├── NavBar.jsx              # Top navigation bar (logo + links + banner)
│   ├── DecorationFrame.jsx     # Four coloured strips framing the content
│   └── pages/
│       ├── MainFeedPage.jsx    # Home / feed page
│       ├── ProjectPage.jsx     # Reusable project page (used for all projects)
│       ├── ContactPage.jsx     # Contact form page
│       └── AboutPage.jsx       # About + skills page
│
└── styles/
    ├── global.css              # Resets, CSS tokens, shell layout
    ├── nav.css                 # Navigation bar styles
    ├── decorations.css         # Decoration strip layout + colour themes
    └── pages/
        ├── feed.css
        ├── project.css
        ├── contact.css
        └── about.css
```

---

## How to Replace Placeholders

### 1. Text content — `src/data/content.js`
This is the **only file you need to edit** for most content changes:
- `NAV_ITEMS` — menu labels
- `DECORATION_MAP` — strip labels and colour theme per page
- `FEED_CARDS` / `FEED_HERO` — main feed content
- `PROJECT_PAGES` — project titles, descriptions, tags
- `CONTACT_CONTENT` — form heading, body copy, field labels
- `ABOUT_CONTENT` — biography paragraphs and skill bars

### 2. Logo — `src/components/NavBar.jsx`
Find the `Logo` component.  Replace the text `MK` with an `<img>` tag:
```jsx
// Drop your files in /public/, then:
<img src="/logo-main.svg" alt="My Studio" />   // main feed variant
<img src="/logo-sub.svg"  alt="My Studio" />   // all other pages variant
```

### 3. Nav banner — `src/styles/nav.css`
Find `.nav-links { background: repeating-linear-gradient … }` and replace:
```css
background: url('/your-banner.jpg') center / cover no-repeat;
```
Drop the image in `/public/`.

### 4. Decoration colours — `src/styles/decorations.css`
Each page theme is three CSS rules (`deco-top-*`, `deco-side-*`, `deco-col-*`).  
Edit the `background` and `color` values, or add new themes for new pages.

### 5. Adding a new page
1. Add a label to `NAV_ITEMS` in `content.js`
2. Add a `DECORATION_MAP` entry for it in `content.js`
3. Create `src/components/pages/YourPage.jsx`
4. Add a `case` for it in `renderPage()` in `App.jsx`

---

## Tech Stack

| Tool | Purpose |
|------|---------|
| [React 18](https://react.dev) | UI components |
| [Vite](https://vitejs.dev) | Dev server & bundler |
| CSS Modules (plain CSS) | Scoped styles per component |
| Google Fonts | Bebas Neue · DM Mono · Playfair Display |
