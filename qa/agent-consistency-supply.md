# QA Audit: module-01-2-supply.html
**File audited:** `/Users/jacobjameson/Desktop/prep-textbook/chapters/module-01-2-supply.html`
**Audit date:** 2026-03-04
**Auditor:** Claude Sonnet 4.6 (automated cross-context consistency audit)

---

## Supply Equations Reference

| Context | Equation | P range | Q range |
|---|---|---|---|
| Agriculture | Q_s = 15P | 1, 2, 3, 4, 5 (€/kg) | 15, 30, 45, 60, 75 (M kg/yr) |
| Healthcare | Q_s = 3P | 2, 4, 6, 8, 10 ($/month) | 6, 12, 18, 24, 30 (M Rx/month) |
| Energy | Q_s = 20P | 1, 2, 3, 4, 5 ($/gal) | 20, 40, 60, 80, 100 (B gal/yr) |
| Cannabis | Q_s = 2P | 2, 4, 6, 8, 10 ($/gram) | 4, 8, 12, 16, 20 (M g/month) |

---

## Full Audit Table

### 1. Equation-to-Table Consistency

Each `tbody[data-context]` row verified against Q_s = dP.

| Context | P | Expected Q | HTML Q | Result |
|---|---|---|---|---|
| Agriculture | 1 | 15 | 15(1) = 15 | PASS |
| Agriculture | 2 | 30 | 15(2) = 30 | PASS |
| Agriculture | 3 | 45 | 15(3) = 45 | PASS |
| Agriculture | 4 | 60 | 15(4) = 60 | PASS |
| Agriculture | 5 | 75 | 15(5) = 75 | PASS |
| Healthcare | 2 | 6 | 3(2) = 6 | PASS |
| Healthcare | 4 | 12 | 3(4) = 12 | PASS |
| Healthcare | 6 | 18 | 3(6) = 18 | PASS |
| Healthcare | 8 | 24 | 3(8) = 24 | PASS |
| Healthcare | 10 | 30 | 3(10) = 30 | PASS |
| Energy | 1 | 20 | 20(1) = 20 | PASS |
| Energy | 2 | 40 | 20(2) = 40 | PASS |
| Energy | 3 | 60 | 20(3) = 60 | PASS |
| Energy | 4 | 80 | 20(4) = 80 | PASS |
| Energy | 5 | 100 | 20(5) = 100 | PASS |
| Cannabis | 2 | 4 | 2(2) = 4 | PASS |
| Cannabis | 4 | 8 | 2(4) = 8 | PASS |
| Cannabis | 6 | 12 | 2(6) = 12 | PASS |
| Cannabis | 8 | 16 | 2(8) = 16 | PASS |
| Cannabis | 10 | 20 | 2(10) = 20 | PASS |

**Verdict: All 20 table cells correct.**

---

### 2. Equation-to-JS Consistency (SUPPLY_CONTEXTS object)

| Context | fn | schedulePoints | dfltD | slopeLabel | stepDesc |
|---|---|---|---|---|---|
| Agriculture | x/15 ✓ | [[15,1],[30,2],[45,3],[60,4],[75,5]] ✓ | 15 ✓ | '1/15' ✓ | 'right 15, up 1' ✓ |
| Healthcare | x/3 ✓ | [[6,2],[12,4],[18,6],[24,8],[30,10]] ✓ | 3 ✓ | '1/3' ✓ | 'right 3, up 1' ✓ |
| Energy | x/20 ✓ | [[20,1],[40,2],[60,3],[80,4],[100,5]] ✓ | 20 ✓ | '1/20' ✓ | 'right 20, up 1' ✓ |
| Cannabis | x/2 ✓ | [[4,2],[8,4],[12,6],[16,8],[20,10]] ✓ | 2 ✓ | '1/2' ✓ | 'right 2, up 1' ✓ |

**Verdict: All JS values correct and consistent with HTML equations.**

---

### 3. Market Bleed

| Block | Scope | Finding |
|---|---|---|
| Line 98 (shared `<p>`, no data-context) | All contexts | **FAIL — FIXED** (see below) |
| `data-context="agriculture"` blocks | Agriculture only | PASS — no healthcare/energy/cannabis refs |
| `data-context="healthcare"` blocks | Healthcare only | PASS — no oil/sugar/cannabis refs |
| `data-context="energy"` blocks | Energy only | PASS — no prescriptions/sugar/cannabis refs |
| `data-context="criminal_justice"` blocks | Cannabis only | PASS — no oil/sugar/prescriptions refs |

**Issue found and fixed:** The shared introductory paragraph at line 98 (no `data-context` attribute, visible to all contexts) contained: *"When oil prices rise, energy companies expand drilling operations, invest in new refineries, and increase production capacity... When grain prices increase, farmers allocate more land to grain cultivation rather than other crops."*

This paragraph is shown regardless of active context, so a healthcare student reading about atorvastatin sees oil drilling and grain farming examples before any context-specific content appears. This violates the market bleed rule.

**Fix applied:** Replaced oil/grain-specific examples with context-neutral production language:
- Before: `...When oil prices rise, energy companies expand drilling operations, invest in new refineries, and increase production capacity—all motivated by the expectation of higher profits. When grain prices increase, farmers allocate more land to grain cultivation rather than other crops.`
- After: `...When the price of a good rises, producers find it profitable to expand output—by hiring more workers, running facilities longer, or diverting resources from lower-value uses. When price falls, those incentives weaken and producers scale back.`

---

### 4. Currency Consistency

| Context | Expected currency | Price mentions in HTML | Result |
|---|---|---|---|
| Agriculture | € (euros) | €/kg throughout all agriculture blocks | PASS |
| Healthcare | $ (dollars) | $/month throughout all healthcare blocks | PASS |
| Energy | $ (dollars) | $/gallon throughout all energy blocks | PASS |
| Cannabis | $ (dollars) | $/gram throughout all cannabis blocks | PASS |

No cross-currency contamination found in any `data-context` block.

---

### 5. Units Consistency (HTML text vs JS axis labels)

| Context | HTML quantity unit | JS xLabel | HTML price unit | JS yLabel |
|---|---|---|---|---|
| Agriculture | millions of kilograms per year | 'Quantity (millions of kg/year)' | €/kg | 'Price (€/kg)' |
| Healthcare | millions of prescriptions per month | 'Quantity (millions of Rx/month)' | $/month co-pay | 'Price ($/month co-pay)' |
| Energy | billions of gallons per year | 'Quantity (billions of gal/year)' | $/gallon | 'Price ($/gallon)' |
| Cannabis | millions of grams per month | 'Quantity (millions of g/month)' | $/gram | 'Price ($/gram)' |

**Verdict: All axis labels match HTML text within this file.**

---

### 6. Slope Comparison Paragraphs

Demand equations (from module-01-1-demand.html) and their inverted slopes:
- Agriculture: Q_d = 50 - 10P → P = 5 - Q/10 → |demand slope| = 1/10 = 0.100
- Healthcare: Q_d = 50 - 2P → P = 25 - Q/2 → |demand slope| = 1/2 = 0.500
- Energy: Q_d = 150 - 30P → P = 5 - Q/30 → |demand slope| = 1/30 ≈ 0.033
- Cannabis: Q_d = 20 - 2P → P = 10 - Q/2 → |demand slope| = 1/2 = 0.500

| Context | File says (supply slope) | Correct supply slope | File says (demand slope) | Correct |demand slope| | Steeper claim | Arithmetic check | Result |
|---|---|---|---|---|---|---|---|
| Agriculture | 1/15 ≈ 0.067 | 1/15 ✓ | 1/10 = 0.10 | 1/10 ✓ | demand steeper | 0.067 < 0.10 → demand steeper ✓ | PASS |
| Healthcare | 1/3 ≈ 0.33 | 1/3 ✓ | 1/2 = 0.50 | 1/2 ✓ | demand steeper | 0.33 < 0.50 → demand steeper ✓ | PASS |
| Energy | 1/20 = 0.05 | 1/20 ✓ | 1/30 ≈ 0.033 | 1/30 ✓ | supply steeper | 0.05 > 0.033 → supply steeper ✓ | PASS |
| Cannabis | 1/2 = 0.50 | 1/2 ✓ | 1/2 = 0.50 | 1/2 ✓ | equal | equal ✓ | PASS |

**Verdict: All slope comparison paragraphs are arithmetically correct.**

---

### 7. Self-Check Answers

#### Top self-checks (first calculation per context)

| Context | Question | Expected | File answer | Result |
|---|---|---|---|---|
| Agriculture | Q_s = 15P, P = 3 | 45 M kg/yr | 15(3) = 45 M kg/yr | PASS |
| Healthcare | Q_s = 3P, P = 6 | 18 M Rx/month | 3(6) = 18 M Rx/month | PASS |
| Energy | Q_s = 20P, P = 3 | 60 B gal/yr | 20(3) = 60 B gal/yr | PASS |
| Cannabis | Q_s = 2P, P = 6 | 12 M g/month | 2(6) = 12 M g/month | PASS |

#### Bottom self-checks (change in quantity over price interval)

| Context | Question | P_low | Q_low | P_high | Q_high | Expected increase | File answer | Result |
|---|---|---|---|---|---|---|---|---|
| Agriculture | Q_s=15P, P: €2→€4 | 2 | 30 | 4 | 60 | 30 M kg | 30 M kg ✓ | PASS |
| Healthcare | Q_s=3P, P: $4→$8 | 4 | 12 | 8 | 24 | 12 M Rx | 12 M Rx ✓ | PASS |
| Energy | Q_s=20P, P: $2→$4 | 2 | 40 | 4 | 80 | 40 B gal | 40 B gal ✓ | PASS |
| Cannabis | Q_s=2P, P: $4→$8 | 4 | 8 | 8 | 16 | 8 M g | 8 M g ✓ | PASS |

**Verdict: All self-check answers correct in equation, units, and arithmetic.**

---

### 8. Interactive Graph Defaults

Verifying that `dfltD` in SUPPLY_CONTEXTS matches d in the supply equation, and the slider default value (line 481: `value="15"`) targets agriculture as the page default context.

| Context | d in equation | dfltD in JS | Matches? |
|---|---|---|---|
| Agriculture | 15 | 15 | PASS |
| Healthcare | 3 | 3 | PASS |
| Energy | 20 | 20 | PASS |
| Cannabis | 2 | 2 | PASS |

Slider HTML default value at line 481: `value="15"` → matches agriculture dfltD=15 ✓

**Verdict: All interactive graph defaults correct.**

---

## Fixes Applied

| # | Location | Issue | Fix |
|---|---|---|---|
| 1 | Line 98, shared `<p>` (no data-context) | Market bleed: mentioned oil prices/energy companies and grain/farmers in text visible to ALL contexts | Replaced with context-neutral production language: "When the price of a good rises, producers find it profitable to expand output—by hiring more workers, running facilities longer, or diverting resources from lower-value uses. When price falls, those incentives weaken and producers scale back." |

---

## Flags for Future Review

### FLAG-1: Healthcare prescription units cross-file inconsistency (not a bug in supply.html itself)
- `module-01-1-demand.html` describes healthcare Q_d as "millions of prescriptions **per year**" (line 278, and self-check answer at line 353)
- `module-01-2-supply.html` describes healthcare Q_s as "millions of prescriptions **per month**" (line 149, line 231)
- `module-01-3-equilibrium.html` uses "per month" for the equilibrium conclusion (line 174)
- **Impact:** If a student reads demand in Part 1 and carries that "per year" unit mental model into Part 3, the equilibrium arithmetic will seem inconsistent (supply and demand quantities are measured in different time periods).
- **Recommended fix:** Update module-01-1-demand.html line 278 and line 353 to change "per year" to "per month" for the healthcare context, OR update all healthcare supply references to "per year". The equilibrium file should also be verified to use a single consistent unit.
- **Action required:** Edit module-01-1-demand.html (outside scope of this audit).

### FLAG-2: Interactive graph y-axis label for healthcare
- The interactive slider graph (buildInteractiveSupplyGraph) inherits `cfg.yLabel = 'Price ($/month co-pay)'`
- This is technically correct, but "$/month co-pay" may read awkwardly as a y-axis tick label if space is limited. Low priority cosmetic issue.

### FLAG-3: Shared Law of Supply paragraph still contains only generic examples
- After the fix, the introductory paragraph uses general production language. The per-context policy parallel section (lines 412-434) provides context-specific supply narrative. This structure is appropriate.
- No further action needed for this flag.

---

## Re-Run Checklist for Part 3 Equilibrium Equations

When auditing `module-01-3-equilibrium.html`, verify the following supply-demand pairs produce the claimed equilibrium (P*, Q*):

| Context | Demand | Supply | Solve: set Q_d = Q_s | P* | Q* |
|---|---|---|---|---|---|
| Agriculture | Q_d = 50 - 10P | Q_s = 15P | 50 - 10P = 15P → 50 = 25P → P = 2 | 2 €/kg | 30 M kg |
| Healthcare | Q_d = 50 - 2P | Q_s = 3P | 50 - 2P = 3P → 50 = 5P → P = 10 | $10/month | 30 M Rx |
| Energy | Q_d = 150 - 30P | Q_s = 20P | 150 - 30P = 20P → 150 = 50P → P = 3 | $3/gal | 60 B gal |
| Cannabis | Q_d = 20 - 2P | Q_s = 2P | 20 - 2P = 2P → 20 = 4P → P = 5 | $5/gram | 10 M g |

**Key checks to perform in module-01-3-equilibrium.html:**
1. Verify each context's P* and Q* match the table above
2. Verify supply and demand equations cited in equilibrium text match Part 1 and Part 2 exactly
3. Verify equilibrium quantity units are consistent with the supply module (note FLAG-1: healthcare should use per month)
4. Verify surplus/shortage calculations at non-equilibrium prices use correct Q_d and Q_s values
5. Verify interactive equilibrium graph uses correct fn values (demand slope = 1/b, supply slope = 1/d)
6. Verify CAP/policy application uses the agriculture equilibrium P*=2, Q*=30
7. Confirm the static graph intersection labels match P* and Q* for each context
