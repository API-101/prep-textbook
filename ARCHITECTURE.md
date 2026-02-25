# Preparation for Resources, Incentives, and Choices — Architecture Guide

## 1. PROJECT OVERVIEW

**What This Is**: A static HTML interactive learning experience for incoming HKS students to build foundational microeconomics knowledge before API-101.

**Target Audience**: Incoming MPP students at the Harvard Kennedy School who need to prepare for the core microeconomics course (API-101: Resources, Incentives, and Choices I: Markets and Market Failures).

**Course Mapping**:
- Title: Preparation for Resources, Incentives, and Choices
- Original Platform: Canvas LMS (exported as .imscc)
- Policy Thread: European Union's Common Agricultural Policy (CAP)

**Philosophy**:
- Preparation, not instruction. Students build comfort with foundational tools before the full course.
- Interactive over passive. Replace static PDFs and embedded videos with manipulable graphs, self-checks, and drawing tools.
- Policy-grounded from day one. The EU CAP example threads through all three modules.
- Static HTML for portability. No server, no LMS dependency, works offline.

---

## 2. DIRECTORY STRUCTURE

```
prep-textbook/
├── index.html                          # Homepage with module overview and navigation
├── css/
│   └── theme.css                       # Master design system (from api101-textbook)
├── js/
│   └── textbook.js                     # Core framework (EconGraph, SidebarNav, etc.)
├── chapters/
│   ├── module-01-demand-supply-equilibrium.html
│   ├── module-02-demand-supply-shifters.html
│   └── module-03-consumer-producer-surplus.html
├── assets/
│   ├── images/                         # Banner images, icons, course imagery
│   └── quiz-images/                    # Graph images used in quiz questions (Q1Q4*, Q1Q6*, etc.)
├── source-materials/
│   ├── module-01-demand-supply-equilibrium/   # Original Canvas HTML pages (1.1-1.6)
│   ├── module-02-demand-supply-shifters/      # Original Canvas HTML pages (2.1-2.5)
│   ├── module-03-consumer-producer-surplus/   # Original Canvas HTML pages (3.1-3.5)
│   ├── readings/                              # OpenStax PDFs + extracted text
│   │   ├── principles-of-microeconomics-11.9-Ch3_3.1.pdf
│   │   ├── principles-of-microeconomics-11.9-Ch3_3.2.pdf
│   │   ├── principles-of-microeconomics-11.9-Ch3_3.3.pdf
│   │   ├── principles-of-microeconomics-11.9-Ch3_3.5.pdf
│   │   ├── Key Terms.pdf
│   │   ├── ch3_3.1_text.txt           # Extracted: Demand, Supply, Equilibrium
│   │   ├── ch3_3.2_text.txt           # Extracted: Shifts in Demand and Supply
│   │   ├── ch3_3.3_text.txt           # Extracted: Changes in Equilibrium (4-Step Process)
│   │   ├── ch3_3.5_text.txt           # Extracted: Demand, Supply, and Efficiency
│   │   └── key_terms_text.txt         # Extracted: Glossary of key terms
│   ├── quizzes/                       # QTI assessment XML files from Canvas
│   ├── home-microeconomics-summer-preparation.html  # Original Canvas homepage
│   └── Microeconomics Preparation Media Credits.pdf
└── ARCHITECTURE.md                     # This file
```

---

## 3. CONTENT MAP

The Canvas course has 3 modules, each with a consistent structure. Here is the complete content inventory:

### Module 1: The Basics of Demand, Supply, and Equilibrium (~60 min)

| Section | Canvas Page | Content Type | Key Content |
|---------|-------------|-------------|-------------|
| 1.1 | Module Introduction | Video + text | Meet the teaching fellow, module overview |
| 1.2 | Policy Connections | Video | "What's Under the CAP?" — EU agricultural policy intro |
| 1.3 | Background Text | PDF reading | OpenStax 3.1: Demand, Supply, Equilibrium basics |
| 1.4 | Demonstrations | 3 videos + self-checks | Graphing demand, graphing supply, solving for equilibrium |
| 1.5 | Practice Quiz | Assessment (20 questions) | Multiple choice + short answer on D/S/equilibrium |
| 1.6 | Conclusion | Video | Returning to the CAP example |

**Key Concepts**: Law of Demand, Law of Supply, demand/supply schedules, demand/supply curves, equilibrium price, equilibrium quantity, surplus, shortage

### Module 2: Demand and Supply Shifters (~80 min)

| Section | Canvas Page | Content Type | Key Content |
|---------|-------------|-------------|-------------|
| 2.1 | Module Introduction | Text | Overview, best practices, module contents |
| 2.2 | Background Text | PDF readings | OpenStax 3.2 (Shifts) + 3.3 (4-Step Process) |
| 2.3 | Policy + Demos | Self-check + 3 videos | CAP policy connection, demand shifts, supply shifts |
| 2.4 | Practice Quiz | Assessment (23 questions) | Multiple choice + short answer on shifters |
| 2.5 | Conclusion | Video | Returning to CAP |

**Key Concepts**: Demand shifters (income, tastes, substitutes, complements, expectations, population), supply shifters (input prices, technology, regulations, expectations), shift vs. movement along curve, new equilibrium after shift, 4-step process

### Module 3: Consumer and Producer Surplus (~70 min)

| Section | Canvas Page | Content Type | Key Content |
|---------|-------------|-------------|-------------|
| 3.1 | Module Introduction | Text | Overview, module contents |
| 3.2 | Background Text | PDF reading | OpenStax 3.5: Demand, Supply, and Efficiency |
| 3.3 | Demonstrations | Self-check + video | Calculating surplus (triangle area) |
| 3.4 | Practice Quiz | Assessment (8 questions) | Multiple choice + short answer on surplus |
| 3.5 | Conclusion | Video + survey | Wrapping up, learning outcomes, feedback survey |

**Key Concepts**: Consumer surplus, producer surplus, social surplus (total surplus), allocative efficiency, deadweight loss, willingness to pay, willingness to sell

---

## 4. VIDEO INVENTORY

All videos are hosted on Harvard's Panopto platform. The original Canvas pages embed these via LTI iframes. In the new textbook, we will reference these videos and eventually replace them with interactive equivalents.

| Video | Module | Panopto Delivery ID | Duration (est.) |
|-------|--------|---------------------|-----------------|
| Faculty Welcome | Home | 8a2ee080-7088-49c0-ba95-b1aa01041540 | ~3 min |
| Meet the Teaching Fellow | 1.1 | e2e64157-0026-4773-8f5d-b1aa01013486 | ~2 min |
| What's Under the CAP? | 1.2 | 688a8702-804c-46cb-b2cb-b1aa0104a8d3 | ~5 min |
| Interpreting and Graphing Demand | 1.4 | 4dda176d-f76e-4963-a919-b1aa01063cd7 | ~8 min |
| Interpreting and Graphing Supply | 1.4 | 563e1612-1164-43c6-bcc9-b1aa01075c8a | ~8 min |
| Graphing S&D, Solving for Equilibrium | 1.4 | 3c4a48c6-f2e1-494f-a45f-b1aa0108af6a | ~8 min |
| Returning to the CAP Example | 1.6 | 782a9692-8bec-495f-bcbc-b1aa01095a3b | ~3 min |
| Connecting to Policy (Shifters) | 2.3 | 55c2ff08-f9b6-44f2-a55a-b1aa010a9958 | ~5 min |
| Shifts in Demand | 2.3 | dc4e43bb-3e77-435e-b23c-b1aa010b573e | ~8 min |
| Shifts in Supply | 2.3 | 61cd2442-e07a-42b9-8133-b1aa010bae77 | ~8 min |
| Returning to CAP (Shifters) | 2.5 | b9209a8f-0231-4417-bdc4-b1aa010c6d15 | ~3 min |
| Calculating Surplus | 3.3 | 352bd6b6-68b0-4b4c-bdfc-b1aa010e6372 | ~8 min |
| Wrapping Up | 3.5 | 18abc59c-9fae-437b-af9e-b1af0144bb9c | ~3 min |

---

## 5. QUIZ / ASSESSMENT INVENTORY

Original quizzes are in QTI (Question and Test Interoperability) XML format. Total: 53 questions across 3 practice quizzes.

| Quiz | Module | Questions | Types | Images Used |
|------|--------|-----------|-------|-------------|
| 1.5: Demand, Supply, Equilibrium | 1 | 20 | MC + Short Answer | Q1Q4AA-AE, Q1Q6AA-AE |
| 2.4: Demand and Supply Shifters | 2 | 23 | MC + Short Answer | Q2Q8, Q2Q8b, Q2Q9, Q2Q9b |
| 3.4: Consumer and Producer Surplus | 3 | 8 | MC + Short Answer | Q3Q2Q, Q3Q2F1, Q3Q2F2 |

Quiz images are in `assets/quiz-images/`. QTI XML source files are in `source-materials/quizzes/`.

---

## 6. SELF-CHECK INVENTORY

The original Canvas course uses embedded Qualtrics surveys for self-checks (formative assessment between readings and videos):

| Self-Check | Module.Section | Qualtrics ID |
|------------|----------------|--------------|
| Demand graphing check | 1.4 | SV_73xfAZlhCKdCBpj |
| Supply graphing check | 1.4 | SV_3yrn2x3j2B7PS29 |
| Shifters reading check | 2.3 | SV_6x1MCJQbH6Zqm7b |
| Surplus concepts check | 3.3 | SV_bENGSh16yHcw5nf |

These should be replaced with interactive in-page self-check components in the new textbook.

---

## 7. DESIGN SYSTEM

This project inherits the full design system from `api101-textbook`. See `css/theme.css` and `js/textbook.js`.

### Key Components Available

- `.definition-box` — Term definitions with gold left border
- `.callout--insight` / `--warning` / `--example` — Emphasized callout boxes
- `.equation-block` — Math display blocks
- `.graph-container` — Interactive D3.js graph wrapper with sliders
- `.learning-objectives` — Module outcomes at start
- `.chapter-header` — Hero section with module title
- `.policy-example` — Tabbed policy domain switcher
- `EconGraph` — D3.js-powered economics graph builder

### Economics Color Coding

| Element | Color | Hex |
|---------|-------|-----|
| Demand curves | Blue | #2e86c1 |
| Supply curves | Red | #c0392b |
| Consumer surplus | Blue | #2e86c1 |
| Producer surplus | Green | #1e8449 |
| Deadweight loss | Orange | #d35400 |
| Equilibrium | Dark blue | #1a5276 |

---

## 8. READING CONTENT (OpenStax CC BY 4.0)

All reading content comes from OpenStax "Principles of Microeconomics" (CC BY 4.0, adapted for API-101). Senior contributing authors: Timothy Taylor and Steven A. Greenlaw.

| Reading | File | Module | Topics |
|---------|------|--------|--------|
| 3.1 | ch3_3.1_text.txt | 1 | Demand schedules/curves, supply schedules/curves, equilibrium |
| 3.2 | ch3_3.2_text.txt | 2 | Factors shifting demand, factors shifting supply |
| 3.3 | ch3_3.3_text.txt | 2 | 4-step process for equilibrium changes |
| 3.5 | ch3_3.5_text.txt | 3 | Consumer surplus, producer surplus, social surplus, efficiency |
| Key Terms | key_terms_text.txt | All | Full glossary |

Extracted text is in `source-materials/readings/`.

---

## 9. INTERACTIVE FEATURES TO BUILD

The primary goal of this project is to transform the passive Canvas experience into an interactive textbook. Key interactive elements to implement:

### Per-Module Interactive Graphs

**Module 1:**
1. Interactive demand curve plotter — students enter an equation (e.g., Qd = 10 - 2P), see the curve drawn
2. Interactive supply curve plotter — same for supply
3. Equilibrium finder — plot both curves, auto-calculate and highlight equilibrium point
4. Free-draw canvas — students sketch their own demand/supply curves

**Module 2:**
1. Demand shifter simulator — sliders for income, population, price of substitutes/complements to shift demand
2. Supply shifter simulator — sliders for input costs, technology, regulation to shift supply
3. 4-step process walkthrough — guided step-by-step with progressive reveal

**Module 3:**
1. Surplus calculator — interactive graph where students can see CS/PS triangles form
2. Surplus with price changes — adjust price above/below equilibrium, see DWL appear
3. CAP policy simulator — apply EU CAP-style price floor, see surplus redistribution

### Self-Check Replacements
- Replace all Qualtrics embeds with in-page interactive quiz components
- Immediate feedback with explanations
- Graph-based questions where students can click on the graph to answer

### Drawing / Input Tools
- Canvas-based free-draw for students to sketch curves
- Equation input → graph plotter (type an equation, see the graph)
- Click-to-place points on a graph (for identifying equilibrium, surplus areas)

---

## 10. MODULE TEMPLATE

Each module follows this structure (adapted from api101-textbook chapter template):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Module N: [Title] — Preparation for API-101</title>
  <link rel="stylesheet" href="../css/theme.css">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/7.8.5/d3.min.js"></script>
</head>
<body>
  <nav class="site-nav">
    <a href="../index.html" class="site-nav__brand">API-101 <span>Preparation</span></a>
    <ul class="site-nav__links">
      <li><a href="../index.html">Home</a></li>
    </ul>
  </nav>

  <div class="page-wrapper">
    <aside class="sidebar">
      <span class="sidebar__part-label">Module N</span>
      <!-- Section links -->
    </aside>

    <main class="main-content">
      <header class="chapter-header">
        <div class="chapter-header__part">Preparation Module N</div>
        <div class="chapter-header__number">Module N</div>
        <h1 class="chapter-header__title">[Title]</h1>
        <p class="chapter-header__subtitle">[Subtitle]</p>
      </header>

      <div class="learning-objectives">
        <div class="learning-objectives__title">Learning Objectives</div>
        <ul>...</ul>
      </div>

      <!-- Content sections: reading, interactive graphs, self-checks, quiz -->

      <nav class="chapter-nav">
        <!-- prev/next module links -->
      </nav>
    </main>
  </div>

  <script src="../js/textbook.js"></script>
</body>
</html>
```

---

## 11. CURRENT STATUS

### Phase 1: Organization and Scaffolding (CURRENT)
- [x] Extract and organize all Canvas export content
- [x] Set up project directory structure
- [x] Copy design system from api101-textbook
- [x] Extract text from PDF readings
- [x] Catalog all videos, quizzes, self-checks, and images
- [x] Create ARCHITECTURE.md
- [ ] Build index.html homepage
- [ ] Create module HTML scaffolding (3 modules)

### Phase 2: Content Migration
- [ ] Migrate reading content into module HTML
- [ ] Embed or reference Panopto videos
- [ ] Migrate quiz questions into interactive format
- [ ] Replace Qualtrics self-checks with in-page components

### Phase 3: Interactive Features
- [ ] Build interactive demand/supply graph plotter
- [ ] Build equilibrium finder graph
- [ ] Build demand/supply shifter simulators
- [ ] Build surplus calculator with shaded regions
- [ ] Build free-draw canvas for student sketching
- [ ] Build equation input → graph tool
- [ ] Build CAP policy simulator

### Phase 4: Polish
- [ ] Responsive design testing
- [ ] Accessibility review
- [ ] Print styles
- [ ] Cross-browser testing
