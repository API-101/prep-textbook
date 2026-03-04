# UX Review: module-01-2-supply.html
Agent: Claude Sonnet 4.6 — Learning Design & Educational UX
Date: 2026-03-04

---

## Must-Fix Items (Applied)

### 1. Method 1 Intro — WHY the origin, not just THAT it is the origin
**Location:** `.graphing-method__intro` for Method 1 (line ~345)
**Problem:** The original text said "The supply curve passes through the origin (0, 0) — our known starting point, requiring no calculation." This told students *what* to do but not *why* the curve starts there. Students who don't see the reasoning will not understand what would change if c ≠ 0.
**Fix applied:** Rewrote to: "The supply curve passes through the origin (0, 0) — *because c = 0 in our equation, meaning producers supply nothing when the price is zero*. This gives us a free starting point that requires no calculation."
The fix connects the graphical feature to the algebraic parameter students already know.

---

### 2. Bridge Paragraph Before DrawGraph — Too Thin
**Location:** `<h3>Try It: Draw the Supply Curve</h3>` intro paragraph (line ~438)
**Problem:** Original read: "You've seen both graphing methods in action. Now apply them: place two points that define the supply curve for your market and connect them." This did not name the methods, invite student choice, or explain what a correct answer looks like. Compare with demand module bridge at line 600–605, which explicitly names all three methods and says "Use whichever method feels most natural."
**Fix applied:** Replaced with: "You have now seen two methods for graphing a supply curve: starting at the origin and stepping along the slope (Method 1), and plotting points from the supply schedule (Method 2). Both produce the same line. Use whichever approach feels most natural — the goal is to accurately place an upward-sloping straight line that passes through the origin."
This mirrors the demand module's explicit framing and gives students permission to choose.

---

### 3. Bottom Self-Checks — Pure Arithmetic, No Conceptual Transfer
**Location:** Four context-specific `.self-check` blocks after the interactive graph (lines ~501–548)
**Problem:** All four checks asked students to substitute a number into the supply equation and compute quantity supplied (e.g., "how much does Q_s increase if price doubles?"). These test arithmetic, not understanding. The answers were visible in the schedule table directly above, so students could look them up without learning anything. The `agriculture` version even contained its own answer in the explanation ("a doubling of output in response to a doubling of price — this proportional relationship holds whenever c = 0"), making it self-defeating.
**Fix applied:** Replaced all four with questions that test interpretation of the slope coefficient d in each policy context:

| Context | New question focus |
|---|---|
| Agriculture | What does d = 15 tell us about farmer behavior? How would a larger d change interpretation? |
| Healthcare | What does d = 3 represent? Why might d be larger several years after patent expiry? |
| Energy | Why does d = 20 overstate short-run reality? When is a high-d equation acceptable vs. misleading? |
| Criminal Justice | How does Colorado's licensing regime show up in d? What would happen to d if more licenses were issued? |

Each answer now requires students to reason about what the slope coefficient means in a real-world market, not just substitute a number.

---

### 4. Premature Jargon: "equilibrium" in Healthcare Policy Parallel
**Location:** `.ctx-block[data-context="healthcare"]` paragraph (line ~420)
**Problem:** "When we overlay supply and demand in Part 3, *the equilibrium will show* the lower price and higher quantity..." — uses "equilibrium" before it is introduced in Part 3.
**Fix applied:** Replaced "the equilibrium will show" with "we will find the price and quantity at which the two sides of the market are in balance — and see precisely how much prices fell and quantities rose..." This preserves the forward-reference without using unexplained vocabulary.

---

### 5. Premature Jargon: "inelastic" in Energy Footnote and Slope Comparison
**Locations:**
- Energy equation footnote (line ~155): "actual short-run supply is more inelastic than this equation implies"
- Energy slope comparison paragraph (line ~393): "short-run gasoline demand is highly inelastic"
**Problem:** "Inelastic" / "elastic" are not defined anywhere in Module 1. Students reading these phrases will encounter unexplained technical vocabulary.
**Fix applied:**
- Footnote rewritten to: "in reality, refineries cannot quickly expand throughput, so short-run supply responds less strongly to price changes than this equation implies."
- Slope comparison rewritten to: "short-run gasoline consumers respond very little to price changes (they still need to commute regardless)."
Both convey the same economic intuition without requiring knowledge of elasticity.

---

### 6. Premature Jargon: "leftward supply shift" in Energy Policy Parallel
**Location:** `.ctx-block[data-context="energy"]` paragraph (line ~426)
**Problem:** "in supply-demand terms, this acts as a *leftward supply shift*" — "supply shift" is introduced in Module 2, not here.
**Fix applied:** Rewritten as: "producers could supply far less gasoline at every price level than before" followed by "Part 3 will show what happens to price and quantity when the amount producers can supply at every price suddenly falls." This describes the phenomenon without naming the technical term, and the forward-reference is framed as Part 3 analysis (price/quantity consequences) rather than Module 2 analysis (causes of shifts), which is accurate.

---

## Polish Items — HTML UX-NOTEs Added

### UX-NOTE A: "Supply vs. Quantity Supplied" callout — abstract without concrete example
**Location:** Immediately before the callout at line ~401
**Note added:** The callout correctly defines the distinction but the only example given ("when the supply curve shifts") is circular for students who don't yet know what causes a shift. Suggested addition: a brief non-example sentence using one of the policy contexts to ground the distinction before the formal definition.

### UX-NOTE B: Agriculture interactive description — slider lacks concrete policy mapping
**Location:** `data-context="agriculture"` paragraph in the interactive section (line ~489)
**Note added:** The description says "perhaps due to a productivity improvement" for a positive c, but doesn't name a specific EU CAP mechanism (e.g., a fertilizer subsidy, a guaranteed procurement price). Suggesting a named mechanism would tie the slider directly to the policy thread and better prepare students for Module 2 supply-shifter analysis.

### UX-NOTE C: Criminal justice policy parallel — tax incidence preview
**Location:** Immediately before the `.ctx-block[data-context="criminal_justice"]` paragraph (line ~430)
**Note added:** The phrase "how the tax burden is split between consumers and producers" foreshadows Module 3 incidence analysis. This may be too abstract for students at this stage without more scaffolding. A shorter teaser pointing to Part 3 without implying they should understand the mechanism now would be less potentially confusing.

---

## Items Verified Clean (No Change Needed)

| Checklist Item | Status | Notes |
|---|---|---|
| Ceteris paribus translated on first use | Clean | Line 93 in definition box: "Holding all else equal *(ceteris paribus)*" — identical pattern to demand module |
| "Both Methods, One Line" callout present | Clean | Lines 373–378, placed correctly after both graphing methods and before the DrawGraph exercise |
| "Supply vs. Quantity Supplied" callout placement | Clean | Lines 402–407, placed after students have seen the full curve from both methods, before the DrawGraph exercise — correct pedagogical moment |
| Energy interactive description — OPEC slider suggestion | Clean | Line 495: "Try setting c to a negative value: this represents a supply contraction (like an embargo that reduces the amount reaching the market at any given price). This is exactly what happened in 1973 — use this slider to visualize the supply shock." — Correctly connects slider to real-world policy story |
| Healthcare interactive description | Clean | d explanation is clear; c interpretation is grounded |
| Criminal justice interactive description | Clean | Licensing mechanism and d interpretation are coherent |
| General sentence length and paragraph breaks | Clean | Paragraphs are short, sentences are readable. No run-ons or overly dense blocks found. |
| Equations, table values, JS logic | Not changed | Per scope: no equations, table values, or JS logic were modified |

---

## Re-Run Checklist for Part 3 (module-01-3-equilibrium.html)

Use this list when reviewing the equilibrium module:

1. **Ceteris paribus** — verify "all else equal" appears with the Latin gloss on first use (equilibrium concept likely doesn't need it, but any new concept that uses the phrase should translate it)

2. **Jargon introduced for first time** — "equilibrium," "surplus," "shortage" all appear in Part 3. Verify each is defined in a `.definition-box` or inline gloss before use in prose.

3. **"Supply shift" and "demand shift"** — Part 3 may reference shifts as motivation for the CAP analysis. If so, verify the term is defined or explicitly deferred to Module 2. The supply module's energy policy parallel already points to Part 3 for the consequence analysis; make sure Part 3 doesn't assume students know *why* supply shifts (that's Module 2).

4. **Premature Module 3 jargon** — "consumer surplus," "producer surplus," "deadweight loss" belong in Module 3. If any of these appear in Part 3 equilibrium analysis, flag for removal or deferral.

5. **Self-check quality** — verify any equilibrium self-checks test conceptual understanding (e.g., "if price is above equilibrium, which side of the market adjusts and why?") rather than arithmetic substitution.

6. **Bridge before Practice Quiz** — Part 3 ends with a Practice Quiz. Verify there is a consolidating bridge paragraph that reminds students what they've learned across all three parts before asking them to synthesize.

7. **"Both supply and demand" consolidation callout** — consider whether a callout parallel to "All Three Methods, One Line" (demand) and "Both Methods, One Line" (supply) is needed before the combined-graph section, reminding students they are overlaying the two curves they built in Parts 1 and 2.

8. **Policy connection for each context** — verify each policy context paragraph in Part 3 connects the equilibrium finding to the specific real-world policy outcome (CAP price support → surplus; atorvastatin patent expiry → lower prices; OPEC embargo → price spike; cannabis tax → price wedge). Each should feel like a payoff for the work done in Parts 1 and 2.

9. **Navigation links** — verify Part 3 links back to Part 2 (supply) and forward to Module 2 (demand/supply shifters), and that the module card on `index.html` still points correctly.
