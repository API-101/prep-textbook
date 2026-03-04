# Economist Accuracy Review — Module 1 Part 1: Demand
*Run: 2026-03-04 | Scope: `chapters/module-01-1-demand.html`*

---

## Role
Introductory microeconomics instructor reviewing for factual accuracy, equation plausibility, policy mechanics, algebra correctness, and appropriate terminology.

---

## Direct Fixes Applied

### 1. Factual error — EU population figure
- **Location:** Policy Connections > Agriculture > CAP section
- **Was:** "ensuring a stable food supply for Europe's 500 million consumers"
- **Fix:** Removed the figure — EU never had 500M people; peaked at ~447M post-Brexit. Now reads "Europe's consumers."

### 2. Nixon price controls — incomplete framing
- **Location:** Policy Connections > Energy > "Why Did Price Controls Make It Worse?"
- **Was:** "President Nixon had already imposed price controls on gasoline in 1971"
- **Fix:** "President Nixon had already imposed economy-wide price controls in August 1971, which covered gasoline and petroleum products." Nixon's August 1971 action was a broad wage-price freeze, not a gasoline-specific measure.

### 3. Slope direction inversion error — interactive graph descriptions
- **Location:** Graph container description (`graph-container__description`) + agriculture ctx-block + healthcare ctx-block
- **Was:** "Increasing the slope coefficient (b) makes the curve steeper"
- **Fix:** Now correctly says the curve becomes **flatter** when b increases. In the graphed inverted form P = a/b − Q/b, the slope is −1/b; larger b shrinks the magnitude of that slope.
- *Note: Energy and cannabis were fixed in the same session by the consistency checker.*

---

## ECON-FLAGS → Implemented as Student-Facing Notes

All four equation intro paragraphs now include clarifying language:

| Context | Clarification added |
|---------|-------------------|
| Agriculture | "Stylized illustration — numbers chosen to keep the algebra clean, not to match actual EU market volumes or intervention prices." |
| Healthcare | P explicitly labeled as **co-pay** (out-of-pocket after insurance, not pharmacy retail). Brand-name Lipitor was $150–200/month; $25 choke price only makes sense as an insured co-pay. |
| Energy | "Simplified model — slope is steeper than real-world estimates; actual short-run price elasticity of gasoline demand is much lower (~0.25–0.50)." Q_d=150−30P implies ε≈−2.3 at $3.50/gal vs. empirical −0.25 to −0.50. |
| Cannabis | "Illustrative rather than calibrated to Colorado data; actual Colorado retail prices were $8–15/gram in the early years." |

---

## Verified Correct — No Changes Needed

| Claim | Verdict |
|-------|---------|
| Lipitor/atorvastatin patent expiry "November 2011" | ✅ Correct (Nov 30, 2011) |
| Colorado Amendment 64 "November 2012" | ✅ Correct (Nov 6, 2012) |
| OAPEC embargo "fall of 1973" | ✅ Correct (announced Oct 17–19, 1973) |
| All four demand equation inversion sequences | ✅ Arithmetically correct |
| Graph It Panel 3 inversion (Q_d = 40 − 4P → P = 10 − Q/4) | ✅ Correct |
| All demand schedule table values | ✅ Correct for each equation |
| All self-check answer calculations | ✅ Correct |
| Stated intercepts match equations | ✅ Correct for all four contexts |
| Hatch-Waxman Act description | ✅ Accurate |
| CAP "Butter Mountains" / "Wine Lakes" | ✅ Historically accurate |
| Colorado cannabis tax "roughly 30%" | ✅ Approximately correct (15% excise + 15% special sales + local ≈ 30%+) |
| "Demand vs. quantity demanded" callout | ✅ Economically correct; appropriately placed |

---

## Re-run Checklist (for future passes)
- [ ] Check new policy-context content in Parts 2 & 3 for same historical/mechanical accuracy
- [ ] If energy equation is ever updated, verify elasticity calculation at midpoint price
- [ ] Healthcare: if P framing changes (co-pay → retail), update choke price and schedule values
