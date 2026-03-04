# QA Report: module-01-2-supply.html — Economist Review

**File reviewed:** `/Users/jacobjameson/Desktop/prep-textbook/chapters/module-01-2-supply.html`
**Review date:** 2026-03-04
**Reviewer:** Economist agent (Claude Sonnet 4.6)
**Scope:** Factual accuracy, equation plausibility, algebra correctness, appropriate terminology

---

## 1. Direct Fixes Applied

### Fix 1 — Colorado Cannabis Tax Rates (line 432)

**Location:** `<div class="ctx-block" data-context="criminal_justice">` policy paragraph

**Problem:** The original text read:
> "Colorado's excise tax — roughly 15% excise plus 15% special sales tax — creates a wedge..."

This is inaccurate for the period when Colorado legal cannabis sales began. Under Amendment 64, when recreational sales launched in January 2014:
- Wholesale excise tax: **15%** (correct)
- Special retail sales tax: **10%** (not 15%)

The 15% special retail sales tax was only adopted by Colorado voters in November 2016 (effective July 1, 2017). Presenting "15% + 15%" without qualification implies these were the original Amendment 64 rates, which is historically incorrect.

**Fix applied:** Replaced the tax rate claim with an accurate, period-specific statement and added an `<em>` clarifying note:
> "Colorado's cannabis taxes include a 15% wholesale excise tax and a special retail sales tax (10% when legal sales began in January 2014 under Amendment 64, raised to 15% in 2017); *the "15% plus 15%" figures sometimes cited reflect the post-2017 rates.*"

---

## 2. ECON-FLAGS Implemented as Student-Facing Notes

No new `<em>` disclaimer flags were needed beyond the cannabis tax fix above. All four contexts already had "stylized illustration" disclaimers on their equation introduction paragraphs:

| Context | Disclaimer present? |
|---------|-------------------|
| Agriculture | Yes — "Stylized illustration — numbers chosen to keep the algebra clean, not to match actual EU market volumes or intervention prices." |
| Healthcare | Yes — "Stylized illustration — numbers chosen to keep the algebra clean." |
| Energy | Yes — "Simplified model — actual short-run supply is more inelastic than this equation implies; refineries cannot quickly expand throughput." |
| Cannabis | Yes — "Illustrative rather than calibrated to Colorado data; actual market volumes and prices varied considerably across the early years of legalization." |

The cannabis tax fix (Fix 1 above) also added a new student-facing `<em>` note about the post-2017 rate timing.

---

## 3. Verified-Correct Items

### 3a. Inversion Algebra

| Context | Q_s equation | Inverted form in file | Correct inversion | Verdict |
|---------|-------------|----------------------|-------------------|---------|
| Agriculture | Q_s = 15P | P = Q_s/15 | P = Q_s/15 | CORRECT |
| Healthcare | Q_s = 3P | P = Q_s/3 | P = Q_s/3 | CORRECT |
| Energy | Q_s = 20P | P = Q_s/20 | P = Q_s/20 | CORRECT |
| Cannabis | Q_s = 2P | P = Q_s/2 | P = Q_s/2 | CORRECT |

### 3b. Schedule Table Spot Checks

| Context | P | Expected Q_s | Table value | Verdict |
|---------|---|-------------|-------------|---------|
| Agriculture | 3 | 15×3 = 45 | "15(3) = 45" | CORRECT |
| Agriculture | 5 | 15×5 = 75 | "15(5) = 75" | CORRECT |
| Healthcare | 6 | 3×6 = 18 | "3(6) = 18" | CORRECT |
| Healthcare | 10 | 3×10 = 30 | "3(10) = 30" | CORRECT |
| Energy | 3 | 20×3 = 60 | "20(3) = 60" | CORRECT |
| Energy | 5 | 20×5 = 100 | "20(5) = 100" | CORRECT |
| Cannabis | 6 | 2×6 = 12 | "2(6) = 12" | CORRECT |
| Cannabis | 10 | 2×10 = 20 | "2(10) = 20" | CORRECT |

All five rows of each table were also checked in full:
- Agriculture (P=1..5): 15, 30, 45, 60, 75 — all correct.
- Healthcare (P=2,4,6,8,10): 6, 12, 18, 24, 30 — all correct.
- Energy (P=1..5): 20, 40, 60, 80, 100 — all correct.
- Cannabis (P=2,4,6,8,10): 4, 8, 12, 16, 20 — all correct.

### 3c. Self-Check Arithmetic

| Context | Question | Expected answer | File answer | Verdict |
|---------|---------|----------------|-------------|---------|
| Agriculture (upper) | Q_s at P=3? | 15(3) = 45 | 45 million kg/year | CORRECT |
| Agriculture (lower) | ΔQ_s from P=2 to P=4? | 30→60, Δ=30 | 30 million kg | CORRECT |
| Healthcare (upper) | Q_s at P=6? | 3(6) = 18 | 18 million Rx/month | CORRECT |
| Healthcare (lower) | ΔQ_s from P=4 to P=8? | 12→24, Δ=12 | 12 million Rx | CORRECT |
| Energy (upper) | Q_s at P=3? | 20(3) = 60 | 60 billion gal/year | CORRECT |
| Energy (lower) | ΔQ_s from P=2 to P=4? | 40→80, Δ=40 | 40 billion gal | CORRECT |
| Cannabis (upper) | Q_s at P=6? | 2(6) = 12 | 12 million g/month | CORRECT |
| Cannabis (lower) | ΔQ_s from P=4 to P=8? | 8→16, Δ=8 | 8 million grams | CORRECT |

### 3d. Slope Comparison Paragraphs

These paragraphs compare supply slope (in inverted form) to demand slope, using the demand equations established in Part 1. Cross-checked against Part 1 demand equations (Q_d = 50−10P, 50−2P, 150−30P, 20−2P).

| Context | Supply slope | Demand slope magnitude | Claim in file | Verdict |
|---------|------------|----------------------|---------------|---------|
| Agriculture | 1/15 ≈ 0.067 | 1/10 = 0.100 | Demand steeper | CORRECT |
| Healthcare | 1/3 ≈ 0.333 | 1/2 = 0.500 | Demand steeper | CORRECT |
| Energy | 1/20 = 0.050 | 1/30 ≈ 0.033 | Supply steeper | CORRECT |
| Cannabis | 1/2 = 0.500 | 1/2 = 0.500 | Equally steep | CORRECT |

### 3e. Interactive Graph Inversion Formula

The graph container description (line ~470) states:
> "The equation is Q_s = c + dP, which inverts to P = −(c/d) + (1/d)Q_s for graphing."

Verification: Q_s = c + dP → dP = Q_s − c → P = (1/d)Q_s − c/d = −(c/d) + (1/d)Q_s. CORRECT.

### 3f. Law of Supply Definition

The definition box correctly states: "Holding all else equal (ceteris paribus), when the price of a good rises, the quantity supplied rises; when the price falls, the quantity supplied falls. The supply curve slopes upward from left to right." Appropriate and accurate.

### 3g. Supply Equation Coefficient Interpretation

The description of Q_s = c + dP correctly identifies:
- c as "baseline quantity supplied at price zero" (noting negative values imply a minimum supply price)
- d as "slope coefficient, positive number, tells us how much Q_s increases per unit price increase"

The c description is a minor simplification — strictly, c is the intercept parameter, and when c < 0 the "reservation price" framing (minimum price before supply is positive) is pedagogically appropriate at this level. ACCEPTABLE.

### 3h. Supply vs. Quantity Supplied Callout

The distinction is correctly stated: "Supply" refers to the entire curve; "quantity supplied" is a point on it. Changes in price cause movements along the curve (changes in quantity supplied); supply (curve) changes are covered in Module 2. CORRECT.

### 3i. Historical Policy Facts

| Claim | Verdict |
|-------|---------|
| Atorvastatin (Lipitor) patent expiry: "November 2011" | CORRECT — US patent on Lipitor expired November 30, 2011 |
| Hatch-Waxman Act enabled generic entry after patent expiry | CORRECT — the Drug Price Competition and Patent Term Restoration Act (1984) is the legal basis for generic entry |
| 1973 OPEC oil embargo reduced crude reaching US refineries | CORRECT — the Arab oil embargo began October 1973 |
| Colorado Amendment 64 as the legal basis for recreational cannabis sales | CORRECT — Amendment 64 passed November 2012; recreational sales began January 1, 2014 |
| Cannabis tax rates (post-fix) | CORRECTED — see Fix 1 above |

---

## 4. Flagged Issue Not in Scope of Supply.html

### Cross-file unit inconsistency: healthcare Q units

The demand module (`module-01-1-demand.html`, line 278) states Q_d is measured in "millions of prescriptions **per year**."

The supply module (`module-01-2-supply.html`, line 149) states Q_s is measured in "millions of prescriptions **per month**."

For supply and demand curves to be overlaid in Part 3 (equilibrium), the quantity units must be consistent. The equilibrium module (`module-01-3-equilibrium.html`, line 139) uses "million prescriptions/month," which is consistent with supply.html.

**Conclusion:** The inconsistency is in `module-01-1-demand.html`, not in `module-01-2-supply.html`. Supply.html is internally consistent with equilibrium.html. **This fix should be made in the demand module** (change "per year" to "per month" in the healthcare context equation introduction paragraph). This is outside the current scope.

---

## 5. Re-Run Checklist for Future Passes

Use this checklist for any future QA pass on supply.html or when equations are changed:

- [ ] Re-spot-check all five rows of each schedule table after any equation change
- [ ] Re-verify all four inversion steps if supply equations are modified
- [ ] Re-verify all four self-check answers if supply equations are modified
- [ ] Re-check slope comparison paragraphs any time demand equations (in Part 1) are updated
- [ ] Confirm healthcare Q units match demand.html (per month vs. per year) — known cross-file inconsistency in demand.html
- [ ] Confirm Colorado cannabis tax rates reflect the relevant policy period being discussed; update if historical framing changes
- [ ] Check that all four ctx-blocks have "stylized illustration" or equivalent disclaimers on equation paragraphs
- [ ] Verify no ctx-block bleeds into another market (check manually: search each ctx-block for names of the other three markets)
- [ ] Confirm no forward references to "equilibrium" or "supply shifts" appear without "In Part 3" or "In Module 2" framing
- [ ] Run the interactive graph in a browser with each context to confirm schedule points render correctly on the D3 canvas
