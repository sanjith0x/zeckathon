# AlphaSeekers (α) — AI-Powered Personal Financial Advisor

> Built for young Indian professionals, students, and first-time earners. Plain language guidance, dynamic cashflow adaptation, transparent objection handling with numbers, live macroeconomic telemetry, and real financial action.

---

## 🏛 Architecture & Thought Flow

AlphaSeekers visibly mirrors the 6-engine architecture from our product deck:

```
[ Natural Voice / Everyday Text ]
               │
               ▼
   [ 01. Natural Voice Engine ]
      • Web Speech API (speechSynthesis + SpeechRecognition)
      • Real waveform visualization + live transcription
               │
               ▼
   [ 02. Intent & Objection Detection ]
      • Classifies intent (Affordability, Risk, Debt, Goal, Tax)
      • Detects objections ("can't save", "is it safe?", "why not FD?")
      • Formulates transparent resolution acknowledging fear first
               │
               ▼
   [ 03. Financial Profile Engine ]
      • Cashflow telemetry: In-hand income, fixed obligations, disposable cash
      • Computes emergency runway (months) & Safe-to-Spend Daily Burn
      • 50/30/20 Needs / Wants / Savings balance
               │
               ▼
   [ 04. Live Financial Data Retrieval ]
      • RBI Repo Rate (6.50%), 1-Yr Bank FD yields (7.15%), PPF (7.10%)
      • Nifty 50 Index (25,480), CPI Inflation (5.12%), 24K Gold
      • Grounded post-tax real purchasing power math
               │
               ▼
   [ 05. Next-Best-Action Engine ]
      • Synthesizes singular high-leverage recommendation
      • Formats rich inline cards (Budget, Goal, Comparison Table)
               │
               ▼
   [ 06. Action Engine ]
      • Single-click commits state into live budget caps, goals & leaks
      • Persists to localStorage & recalculates safe daily burn
```

---

## 🎨 Editorial Design Direction ("Warm & Trustworthy")

- **Palette**: Warm paper background (`#F6F2EA`), Deep Ink typography (`#14201B`), Forest Pine (`#0F4C3A`), Saffron Accent (`#E8A317`), Muted Sage (`#2D7A58`), Burnt Orange (`#C96528`), Brick Red (`#B83A3A`).
- **Typography**: 
  - Headlines: *Fraunces* (expressive serif with italic emphasis)
  - UI / Body: *Instrument Sans* (crisp, clean grotesk — strictly no Inter/Poppins)
  - Figures & Currency: *JetBrains Mono* tabular figures for alignment
- **Zero Icon Libraries**: Handcrafted custom SVG set (`1.5px` stroke, `24px` grid, rounded caps) located in `/src/components/icons`. Zero external icon packages.
- **Zero AI Slop**: No purple/blue neon blobs, no floating glowing orbs, no generic stock cards, no fake testimonial claims.

---

## 🚀 Quickstart & Running Locally

### Prerequisites
- Node.js `v18+` or `v20+` (Tested on `v24.18.0`)
- npm `v9+` or `v11+`

### Installation & Run
```bash
# 1. Install dependencies
npm install

# 2. Run local development server
npm run dev

# 3. Open in browser:
# http://127.0.0.1:5173/
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 🔑 Environment Variables

The application contains an intelligent deterministic simulation engine by default, ensuring **zero demo breaks** during hackathon judging even without an API key.

To connect live Gemini intelligence, create a `.env.local` file:

```env
# Optional: Google Gemini API Key
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

When `VITE_GEMINI_API_KEY` is present, the advisor calls Gemini 1.5 Flash with telemetry-augmented prompts and falls back gracefully to the deterministic engine if network fails.

---

## 📱 Page Catalog & Capabilities

1. **Landing Page (`/`)**:
   - Editorial serif hero with rotated pure-CSS product exchange preview
   - The Problem statement with big mono statistics
   - Interactive 6-step architecture timeline with custom diagrams
   - 5 Pillars with interactive objection-handling switcher
   - Ledger comparison table & dark ink closing section

2. **Advisor Chat (`/advisor`) — Centerpiece**:
   - Two-pane desktop layout / mobile slide-up sheet
   - Live "What I Understood" pipeline telemetry panel (Intent, Objection, Profile, Live Fact, Next-Best-Action)
   - Starter prompts for instant demoing
   - Objection handling with transparent mathematical reasoning
   - Expandable *"Why this advice?"* tradeoff breakdown
   - Web Speech voice mic with real waveform audio visualizer & live transcript
   - Read aloud voice synthesis
   - Rich inline cards: Budget breakdown, Goal cards, Instrument comparison tables
   - Real action buttons that commit directly into application state

3. **Dashboard (`/dashboard`)**:
   - Large mono "Safe to spend today" daily allowance figure
   - Emergency runway gauge (months) & savings rate
   - Custom SVG category allocation bars with warning color thresholds
   - 6-month historical income vs expense bar chart
   - Spending Leaks detector with 1-tap "Fix this" button
   - Statement activity list & "Add Transaction" modal

4. **Budget Planner (`/budget`)**:
   - Macro 50/30/20 slider tuning with live cashflow feedback
   - Instant goal impact calculations
   - Granular category caps with green/orange/red progress alerts
   - In-place cap editing and advisor deep links

5. **Goals Planner (`/goals`)**:
   - Active milestone tracker (MacBook Pro, Emergency Runway, Goa Workation)
   - "What-If" savings accelerator slider (+₹500 to +₹10,000/mo) showing timeline shifts
   - Dynamic adaptation notifications when spending changes
   - Create goal modal

6. **Markets & Rates (`/markets`)**:
   - Live benchmarks: RBI Repo Rate, 1-Yr Bank FD, PPF, Nifty 50, CPI Inflation, 24K Gold
   - SVG sparklines & plain-English *"what this means for you"* impact notes
   - Clear "Demo data (RBI & NSE Feeds)" badge and timestamps
   - Real vs nominal return explainer

7. **Profile & Settings (`/profile`)**:
   - Financial telemetry editor (income, rent, loan EMI, broadband, emergency fund)
   - Plain-language risk comfort selector ("Peace of mind first", "Balanced growth", "Long-term compounding")
   - Language toggle (English / தமிழ் UI strings)
   - One-tap "Reset Demo" button to restore pristine Indian persona

---

## ⚖️ Regulatory & Demo Disclaimer
*AlphaSeekers is an illustrative prototype designed for hackathon demonstration and educational money management. It is not registered with SEBI as an Investment Adviser or Research Analyst. Mutual fund investments are subject to market risks. Past returns are not indicative of future performance.*
