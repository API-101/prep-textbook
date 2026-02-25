# CLAUDE.md

This file provides guidance to Claude Code when working with this project.

## Project Overview

An interactive online preparation textbook for incoming Harvard Kennedy School MPP students. Covers foundational microeconomics (demand, supply, equilibrium, shifters, surplus) to prepare students for API-101. Built as static HTML — no server, no build system required.

## Running Locally

```bash
python3 -m http.server 8000
# Then open http://localhost:8000
```

Or simply open `index.html` directly in a browser. No build step needed.

## Architecture

**Stack:** HTML5 + CSS3 + Vanilla JS (ES6+) + D3.js v7.8.5 (CDN) + KaTeX v0.16.9 (CDN)

**Design system inherited from api101-textbook:**
- `css/theme.css` — Master design system with CSS custom properties, all component classes
- `js/textbook.js` — Four auto-initializing modules: `PolicyExampleSwitcher`, `EconGraph`, `SidebarNav`, `TextbookStructure`

**3 modules** in `chapters/`:
1. `module-01-demand-supply-equilibrium.html` — Law of Demand, Law of Supply, equilibrium
2. `module-02-demand-supply-shifters.html` — Demand/supply shifters, 4-step process
3. `module-03-consumer-producer-surplus.html` — Consumer surplus, producer surplus, efficiency

## Content Sources

All reading content is from **OpenStax "Principles of Microeconomics"** (CC BY 4.0). Extracted text is in `source-materials/readings/ch3_3.*.txt`. Policy thread throughout: **EU Common Agricultural Policy (CAP)**.

Original Canvas export: `source-materials/` contains HTML pages, QTI quiz XML, and PDFs.

## EconGraph API

See `ARCHITECTURE.md` Section 5 (inherited from api101-textbook) or `js/textbook.js` for full API. Quick reference:

```javascript
const graph = EconGraph.create('#container-id', {
  xLabel: 'Quantity', yLabel: 'Price',
  xDomain: [0, 100], yDomain: [0, 100]
});
graph.addLine(x => 100 - 2*x, '#2e86c1', { label: 'D' });
graph.addLine(x => 10 + 0.8*x, '#c0392b', { label: 'S' });
graph.addPoint(50, 50, { label: 'E*' });
graph.addShaded({ xRange: [0, 50], yTop: x => 100 - 2*x, yBottom: 50 }, '#2e86c1', { opacity: 0.15 });
```

## Key CSS Components

- `.definition-box` — Term definitions
- `.callout--insight` / `--warning` / `--example` — Callout boxes
- `.equation-block` — Math/formula display
- `.graph-container` — D3 graph wrapper with controls
- `.learning-objectives` — Module outcomes
- `.chapter-header` — Hero header

## Color Coding

| Color | Hex | Economics Meaning |
|-------|-----|------------------|
| Blue | #2e86c1 | Demand, consumer surplus |
| Red | #c0392b | Supply, costs |
| Green | #1e8449 | Producer surplus, efficiency |
| Orange | #d35400 | Deadweight loss, inefficiency |
| Purple | #8e44ad | Government revenue |

## Content Workflow

1. Read `ARCHITECTURE.md` for full content map and inventory
2. Source materials in `source-materials/` (Canvas HTML, extracted text, QTI quizzes)
3. Build chapter content from extracted readings + original Canvas structure
4. Add interactive graphs using EconGraph API
5. Replace Qualtrics self-checks with in-page interactive components
6. Test in browser
