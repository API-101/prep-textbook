# Consistency Checker Review — Module 1 Part 1: Demand
*Run: 2026-03-04 | Scope: `chapters/module-01-1-demand.html`*

---

## Role
Cross-context coherence auditor ensuring no market bleed, correct equation-to-table-to-graph consistency, and no anachronistic language across all four policy contexts.

---

## Direct Fixes Applied

### 1. Energy context interactive description — slope direction
- **Location:** Interactive slider ctx-block `data-context="energy"`
- **Was:** "Increasing the slope coefficient (b) makes the curve steeper"
- **Fix:** "flatter" — P = a/b − Q/b has slope −1/b; increasing b shrinks the magnitude.

### 2. Cannabis context interactive description — slope direction
- **Location:** Interactive slider ctx-block `data-context="criminal_justice"`
- **Was:** "Increasing the slope coefficient (b) makes the curve steeper"
- **Fix:** "flatter" — same reasoning as Energy.

*(Agriculture and Healthcare were fixed in the same session by the Economist agent.)*

---

## Full Audit Table

### Agriculture
| Check | Result |
|-------|--------|
| Equation (Q_d = 50−10P) matches schedule table (tbody ag) | ✅ |
| Schedule P/Q values correct for Q_d = 50−10P | ✅ |
| Static graph domain [0,60] × [0,6] matches fn P = 5−Q/10 | ✅ |
| Interactive defaults a=50, b=10 reproduce baseline | ✅ |
| Policy Connections text refers only to EU/CAP/wheat | ✅ |
| No forward references (supply, equilibrium) in intro | ✅ |
| Currency: € throughout | ✅ |
| Self-check Q/A uses ag equation and correct answer | ✅ |

### Healthcare
| Check | Result |
|-------|--------|
| Equation (Q_d = 50−2P) matches schedule table (tbody hc) | ✅ |
| Schedule P/Q values correct for Q_d = 50−2P | ✅ |
| Static graph domain [0,60] × [0,30] matches fn P = 25−Q/2 | ✅ |
| Interactive defaults a=50, b=2 reproduce baseline | ✅ |
| Policy Connections text refers only to generic atorvastatin/Lipitor | ✅ |
| No forward references (supply, equilibrium) in intro | ✅ |
| Currency: $ (USD), P = co-pay not retail price | ✅ |
| Self-check Q/A uses healthcare equation and correct answer | ✅ |
| **FLAG:** Law of Demand callout uses gasoline example | ⚠️ See note below |

### Energy
| Check | Result |
|-------|--------|
| Equation (Q_d = 150−30P) matches schedule table (tbody en) | ✅ |
| Schedule P/Q values correct for Q_d = 150−30P | ✅ |
| Static graph domain [0,180] × [0,6] matches fn P = 5−Q/30 | ✅ |
| Interactive defaults a=150, b=30 reproduce baseline | ✅ |
| Policy Connections text refers only to gasoline/OPEC/Nixon | ✅ |
| No forward references (supply, equilibrium) in intro | ✅ |
| Currency: $ (USD) per gallon | ✅ |
| Self-check Q/A uses energy equation and correct answer | ✅ |
| Interactive description slope direction | ✅ Fixed → "flatter" |

### Cannabis (Criminal Justice)
| Check | Result |
|-------|--------|
| Equation (Q_d = 20−2P) matches schedule table (tbody cj) | ✅ |
| Schedule P/Q values correct for Q_d = 20−2P | ✅ |
| Static graph domain [0,24] × [0,12] matches fn P = 10−Q/2 | ✅ |
| Interactive defaults a=20, b=2 reproduce baseline | ✅ |
| Policy Connections text refers only to Colorado/Amendment 64/cannabis | ✅ |
| No forward references (supply, equilibrium) in intro | ✅ |
| Currency: $ (USD) per gram | ✅ |
| Self-check Q/A uses cannabis equation and correct answer | ✅ |
| Interactive description slope direction | ✅ Fixed → "flatter" |

---

## FLAG: Cross-Market Reference in Law of Demand Callout

- **Location:** "Demand vs. Quantity Demanded" callout box (appears in all contexts)
- **Issue:** When on the healthcare context, a callout internally references a gasoline example to illustrate ceteris paribus. This is pedagogically intentional (the callout is context-independent, illustrating a general principle). However, a student on the healthcare track may be briefly confused.
- **Verdict:** Left as-is — the cross-market example is a general teaching point, not a continuity error. Could be revisited in a future pass if student feedback indicates confusion.

---

## Equation-to-Table Cross-Check (Spot Verification)

| Context | P | Expected Q_d | Table value |
|---------|---|-------------|-------------|
| Agriculture | €2/kg | 50−10(2)=30 | 30 ✅ |
| Healthcare | $10/month | 50−2(10)=30 | 30 ✅ |
| Energy | $3/gal | 150−30(3)=60 | 60 ✅ |
| Cannabis | $4/gram | 20−2(4)=12 | 12 ✅ |

---

## Re-run Checklist (for future passes)
- [ ] Run same audit on `module-01-2-supply.html` when supply ctx-blocks are added
- [ ] Run same audit on `module-01-3-equilibrium.html` equilibrium ctx-blocks
- [ ] Verify Graph It panels: each panel's equation/hint matches active context
- [ ] Re-check `data-context` attribute values match keys used in `textbook.js` (`criminal_justice` not `cannabis`)
- [ ] If any equation is ever updated, re-verify all 8 check items for that context
