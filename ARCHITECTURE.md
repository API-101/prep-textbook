# API-101 Microeconomics Modules

Static HTML interactive learning modules for Harvard Kennedy School's API-101 course. The site is designed to work as an evergreen reference: Canvas provides course-specific timing, completion, and reflection guidance.

## Run Locally

```bash
python3 -m http.server 8000
```

Open `http://localhost:8000`.

## Runtime Structure

```text
index.html                         Landing page and module path
chapters/                          Five content modules and three practice quizzes
css/theme.css                      Shared design system
js/textbook.js                     Shared graphs, self-checks, quizzes, glossary, and flashcards
assets/images/                     HKS logo and the CAP butter-barrels photograph
assets/quizzes/                    Runtime JSON question banks for the three practice quizzes
```

The module sequence is:

1. Demand Basics
2. Supply Basics
3. Equilibrium Basics
4. Demand and Supply Shifters
5. Consumer and Producer Surplus

Practice quizzes follow Modules 1-3, Module 4, and Module 5.

## Frontend Stack

- HTML5, CSS3, and vanilla JavaScript
- D3.js `7.8.5` from CDN for economics graphs
- KaTeX `0.16.9` from CDN where equations need rendering
- No build step or application server

Shared interactive behavior lives in `js/textbook.js`. Reuse its existing components before adding page-specific implementations:

- `EconGraph`
- `DrawGraph`
- `PracticeQuiz`
- `SelfCheck`
- `CheckUnderstanding`
- `CumulativeGlossary`
- `Flashcards`
- `SidebarNav`

## Content Notes

The European Union's Common Agricultural Policy (CAP) is the running policy example. Learning-objective wording and policy copy are adapted for this interactive sequence rather than copied directly from a single source.

The original Canvas exports, readings, transcripts, media credits, and QTI quiz sources were removed from `main` to keep the published repository focused on runtime files. They remain available on:

```text
archive/source-materials-2026-06-01
```

The three JSON quiz banks used by the live site remain in `assets/quizzes/`.
