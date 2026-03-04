# UX/Learning Design Review — Module 1 Part 1: Demand
*Run: 2026-03-04 | Scope: `chapters/module-01-1-demand.html`*

---

## Role
Learning design and educational UX reviewer assessing scaffolding quality, cognitive load, terminology clarity, exercise design, and whether the page functions as a "learning laboratory."

---

## Must-Fix Items (All Implemented)

### 1. Missing ceteris paribus translation
- **Location:** Law of Demand section, ceteris paribus first use
- **Was:** "ceteris paribus" with no inline translation
- **Fix:** Added "(all else equal)" immediately after first use

### 2. Parameter `a` mislabeled as "horizontal intercept"
- **Location:** Interactive slider section, parameter description for `a`
- **Was:** "horizontal intercept — the quantity at which price equals zero"
- **Fix:** "quantity intercept — the quantity demanded when price equals zero"
- **Rationale:** "Horizontal intercept" conflates axis orientation with graph terminology; "quantity intercept" maps directly to the axis label students see.

### 3. Method 2 missing starting-point rationale
- **Location:** Graphing Methods — Method 2 (Slope + Point) intro paragraph
- **Was:** Told students to "start at the vertical intercept" with no reason
- **Fix:** Added "Because the vertical intercept (P = 0, Q = a/b) is already a known point from our equation — no calculation needed."
- **Rationale:** Removes a cognitive gap; students should understand *why* a method step is taken, not just follow instructions.

### 4. No bridge between Methods section and Graph It exercises
- **Location:** Between the Graphing Methods demo and the Graph It section
- **Was:** Abrupt transition — "Now you try it" appeared without connecting back to the three methods just taught
- **Fix:** Added a bridge paragraph: "You've seen all three methods in action. In the exercises below, choose whichever approach feels most natural — they all produce the same line."
- **Rationale:** Scaffolding principle: consolidate before transfer.

### 5. Graph It Panel 2 hint gave away both endpoints
- **Location:** Graph It panel 2 hint text
- **Was:** "Draw the curve from (0, 6) to (12, 0)" — specifies both endpoints exactly
- **Fix:** "Find the intercepts to place your two points."
- **Rationale:** The exercise's learning goal is intercept identification; providing both coordinates reduces it to a connect-the-dots task.

### 6. Second self-check block: plug-and-chug vs. conceptual
- **Location:** Self-check block after the From Equation to Graph section
- **Was:** Two questions that just asked students to compute Q_d at a given P (arithmetic practice, not conceptual check)
- **Fix:** Replaced with intercept identification questions — "What is the vertical intercept of this demand curve?" and "What does the slope tell you about how consumers respond to a $1 price increase?"
- **Rationale:** The From Equation to Graph section teaches intercepts and slope interpretation; the self-check should test that, not arithmetic already covered earlier.

---

## Polish Items (Implemented as UX-NOTE Comments in HTML)

### P1. "All Three Methods, One Line" callout
- **Location:** After Graphing Methods section, before Graph It
- **Action:** Added a `.callout--insight` box titled "All Three Methods, One Line" summarizing that intercepts method, slope+point method, and schedule method produce the same graph — different starting points, same result.
- **Rationale:** Students who saw all three demos need an explicit consolidation moment before transfer to exercises.

### P2. Method 1 visual: could label which dot is the intercept
- **UX-NOTE added:** Consider adding an arrow label "Vertical intercept" pointing to the top dot in the Method 1 demo. Current: dots are placed without callout.

### P3. Demand schedule table: no running total or pattern callout
- **UX-NOTE added:** A "What do you notice?" prompt after the table would help students articulate the constant ΔQ/ΔP pattern before they encounter the slope discussion.

### P4. Interactive slider feedback is numeric only
- **UX-NOTE added:** When a or b changes, the feedback text updates correctly, but there's no moment of "this is what changed and why." Consider adding one sentence of narrative: e.g., "Increasing a shifts the curve right — at every price, consumers want more."

---

## Verified Clean — No Changes Needed

| Element | Verdict |
|---------|---------|
| Learning objectives — specific and measurable | ✅ |
| Policy Connections intro — no forward references | ✅ After main rewrite |
| Equation intro paragraph order (equation → table → graph) | ✅ |
| Self-check 1 block (first equation check) | ✅ Correct answers, no ambiguity |
| Graph It Panel 1 hint text | ✅ Appropriately general |
| Graph It Panel 3 hint text | ✅ Appropriately general |
| "Demand vs. Quantity Demanded" callout placement | ✅ Well-timed after law of demand |
| Graphing Methods — step counter and reset button | ✅ Functional and clear |
| Sidebar navigation labels | ✅ Match section headings |

---

## Re-run Checklist (for future passes)
- [ ] Apply same audit to `module-01-2-supply.html` (method bridge paragraph, self-check conceptual focus)
- [ ] Apply same audit to `module-01-3-equilibrium.html` (algebraic solve section scaffold, surplus callout)
- [ ] Implement P2–P4 UX-NOTE items if feedback from pilot students indicates confusion at those spots
- [ ] Review Graph It evaluation feedback messages — current "wrong slope" message could be more diagnostic (e.g., distinguish "slightly off" from "opposite direction")
- [ ] Consider adding a "Why does this work?" expandable aside for the two-endpoint method once DrawGraph is updated
