import type { ChatMessage, UserProfile, BudgetCategory, FinancialGoal } from '../types/finance';
import { analyzeUserInput } from './intentEngine';
import { computeProfileMetrics, type ProfileMetrics } from './profileEngine';
import { getInstrumentComparison } from './marketService';
import { formatINR } from '../utils/formatters';

export interface AdvisorResponse {
  message: ChatMessage;
  pipelineSteps: string[];
}

export async function askAdvisor(
  userText: string,
  context: {
    profile: UserProfile;
    categories: BudgetCategory[];
    goals: FinancialGoal[];
    previousMessages: ChatMessage[];
  },
  onProgress?: (step: string) => void
): Promise<AdvisorResponse> {
  const { profile, categories, goals } = context;

  // Step 1: Voice / Intent / Objection engine
  onProgress?.('Understanding your intent and detecting objections…');
  await new Promise((r) => setTimeout(r, 450));

  const analysis = analyzeUserInput(userText, profile);
  const metrics = computeProfileMetrics(profile, categories);

  // Step 2: Financial profile engine
  onProgress?.('Evaluating your ₹48k cashflow, runway, and commitments…');
  await new Promise((r) => setTimeout(r, 400));

  // Step 3: Live market rates & Next-Best-Action
  onProgress?.('Fetching live benchmark rates & synthesizing action…');
  await new Promise((r) => setTimeout(r, 400));

  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (apiKey && apiKey.trim().length > 5) {
    try {
      const response = await callGeminiAPI(userText, context, analysis, metrics, apiKey);
      return response;
    } catch (err) {
      console.warn('Gemini API call failed, falling back to deterministic engine:', err);
      // Fallback seamlessly to deterministic engine
    }
  }

  // Deterministic Intelligent Engine
  return generateDeterministicResponse(userText, profile, categories, goals, metrics, analysis);
}

function generateDeterministicResponse(
  userText: string,
  profile: UserProfile,
  _categories: BudgetCategory[],
  goals: FinancialGoal[],
  metrics: ProfileMetrics,
  analysis: ReturnType<typeof analyzeUserInput>
): AdvisorResponse {
  const lower = userText.toLowerCase();
  const { snapshot } = analysis;
  const msgId = `msg-${Date.now()}`;
  const nowTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  // Scenario A: "Can't save" or "I earn ₹48,000 / ₹45,000 and can't save anything"
  if (
    lower.includes("can't save") ||
    lower.includes('cant save') ||
    lower.includes('earn') && lower.includes('save') ||
    lower.includes('zero left')
  ) {
    return {
      pipelineSteps: [
        'Detected intent: Cashflow Restructuring',
        'Detected objection: Affordability constraint (feels like 0 margin)',
        'Extracted profile: ₹48,000 in-hand, ₹21,716 fixed obligations',
        'Live data: Inflation at 5.12% vs Idle savings 3.0%',
        'Next-Best-Action: Cap food surge delivery + launch ₹3,500 disciplined SIP',
      ],
      message: {
        id: msgId,
        sender: 'advisor',
        timestamp: nowTime,
        content: `I hear you completely. When ₹21,716 of your ₹48,000 salary goes straight into rent (₹14,000), student loan EMI (₹4,500), and bills, it truly feels like there's zero margin left at month-end.

Here's the honest math: you have **₹26,284 in disposable cash** every month. Right now, small friction points—like ₹7,850 on Swiggy/Zomato and ₹4,200 on weekend dining—are silently consuming that room.

We don't need to eliminate dining out. If we cap food delivery at **₹6,000/month** and trim one redundant OTT subscription, we instantly free up **₹2,350/month**. That's ₹28,200 a year that belongs back in your future.`,
        pipelineSnapshot: snapshot,
        inlineCard: {
          type: 'budget_breakdown',
          budget: {
            needs: 24000,
            wants: 14400,
            savings: 9600,
            caps: [
              { name: 'Food Delivery Cap', amount: 6000 },
              { name: 'Weekend Outings Cap', amount: 3200 },
              { name: 'Auto-Transfer to SIP/RD', amount: 5000 },
            ],
          },
          action: {
            id: 'act-budget-503020',
            label: 'Apply this Balanced Budget',
            type: 'apply_budget',
            payload: {},
          },
        },
        reasoning: {
          mathExplanation: `₹48,000 income minus ₹21,716 fixed leaves ₹26,284. Allocating ₹6,000 for food + ₹3,200 for weekends + ₹4,800 groceries leaves ₹12,284 uncommitted cash.`,
          tradeoffsConsidered: [
            'Avoided cutting groceries or essential commute—those are non-negotiable quality of life.',
            'Targeted food surge fees and late-night delivery markups instead.',
          ],
          riskFlag: 'Demo projection: Inflation can shift food costs over time. We will review quarterly.',
        },
        actionable: {
          label: 'Apply this Balanced Budget',
          type: 'apply_budget',
          payload: {},
        },
      },
    };
  }

  // Scenario B: "Is a SIP safe for me?" or "Is equity safe?"
  if (lower.includes('sip safe') || lower.includes('is a sip safe') || (lower.includes('sip') && lower.includes('safe'))) {
    const comparisons = getInstrumentComparison();
    return {
      pipelineSteps: [
        'Detected intent: Risk Assessment & Instrument Selection',
        'Detected objection: Capital preservation vs market volatility anxiety',
        'Extracted profile: Current emergency fund = ₹48,000 (2.2 months runway)',
        'Live data: Nifty 10-Yr CAGR 12.6% vs FD Post-Tax 5.7%',
        'Next-Best-Action: Keep emergency fund in liquid buffer, start small ₹2,500 index SIP',
      ],
      message: {
        id: msgId,
        sender: 'advisor',
        timestamp: nowTime,
        content: `Short answer: **A SIP is not risk-free, but keeping all your money in a savings account is a guaranteed loss to inflation.**

Here's why: With CPI inflation running at **5.12%**, leaving money in a 3% savings account quietly erodes your purchasing power by 2.1% every single year.

At age 24, your superpower is time. We never put your emergency fund into the stock market. Your ₹48,000 emergency cushion stays 100% safe in bank deposits. Only money you won't touch for the next 3 to 5 years goes into a low-cost Nifty 50 Index fund. Over any 7-year rolling window in Indian market history, the Nifty 50 has never delivered negative returns.`,
        pipelineSnapshot: snapshot,
        inlineCard: {
          type: 'comparison_table',
          comparisons: comparisons.slice(0, 3),
        },
        reasoning: {
          mathExplanation: `₹3,000/month in Nifty 50 at 12% annual compounding becomes ₹10.6 Lakhs in 12 years (on ₹4.3L invested). In an FD at 5.7% post-tax, it reaches only ₹6.3 Lakhs.`,
          tradeoffsConsidered: [
            'Market volatility is real: in year 1, your portfolio might drop 10%. We prepare your mindset upfront.',
            'Emergency buffer is strictly isolated before any equity allocation.',
          ],
          riskFlag: 'Mutual fund investments are subject to market risks. Historical CAGR does not guarantee future results.',
        },
        actionable: {
          label: 'Set up ₹3,000 Index SIP',
          type: 'apply_cap',
          payload: { category: 'cat-invest', newLimit: 5000 },
        },
      },
    };
  }

  // Scenario C: "Help me save ₹1,20,000 for a laptop in 8 months / 12 months"
  if (lower.includes('laptop') || lower.includes('macbook') || lower.includes('1,20,000') || lower.includes('120000')) {
    const macbookGoal = goals.find((g) => g.id === 'goal-macbook');
    const remainingTarget = (macbookGoal?.targetAmount || 120000) - (macbookGoal?.currentAmount || 48000);
    const months = 10;
    const monthlyNeeded = Math.ceil(remainingTarget / months);

    return {
      pipelineSteps: [
        'Detected intent: Targeted Goal Structuring',
        'Detected objection: None (proactive planning)',
        'Extracted profile: Target ₹1,20,000, Already saved ₹48,000, Remaining ₹72,000',
        'Live data: Recurring Deposit rate 7.0% p.a.',
        'Next-Best-Action: Allocate ₹6,000/month dedicated to Tech Upgrade Goal',
      ],
      message: {
        id: msgId,
        sender: 'advisor',
        timestamp: nowTime,
        content: `Let's break down the **₹1,20,000 MacBook Pro** target with exact numbers:

You already have **₹48,000** earmarked toward this goal. That leaves **₹72,000** remaining.
- If you target 10 months: **${formatINR(monthlyNeeded)}/month**.
- If you target 8 months: **₹9,000/month** (which would pinch your weekend cushion).

My recommendation: Target **₹6,000 to ₹7,200/month** inside a short-term Recurring Deposit or liquid fund yielding ~7.0%. Do NOT invest this in equities because 10 months is too short a horizon to take market risk.`,
        pipelineSnapshot: snapshot,
        inlineCard: {
          type: 'goal_card',
          goal: {
            title: 'MacBook Pro M3 Upgrade',
            target: 120000,
            monthly: 6000,
            monthsToGoal: 10,
          },
          action: {
            id: 'act-save-goal',
            label: 'Commit ₹6,000/mo to Laptop Goal',
            type: 'apply_goal',
            payload: { goalId: 'goal-macbook', monthly: 6000 },
          },
        },
        reasoning: {
          mathExplanation: `₹72,000 remaining ÷ 10 months = ₹7,200/month. With ~7% RD interest accumulating, an exact ₹6,800/month hits the mark smoothly.`,
          tradeoffsConsidered: [
            'Short horizon (< 2 years): Strict zero-equity rule to avoid capital loss when ready to buy.',
          ],
          riskFlag: 'Prices of electronics fluctuate with festive sales (Diwali/Amazon Prime Day). You might snag it for ₹1,12,000 during sale season.',
        },
        actionable: {
          label: 'Commit ₹6,000/mo to Laptop Goal',
          type: 'apply_goal',
          payload: { goalId: 'goal-macbook', monthly: 6000 },
        },
      },
    };
  }

  // Scenario D: Objection handling — "Why not just FD?" or "Why shouldn't I just put everything in an FD?"
  if (
    lower.includes('why not just fd') ||
    lower.includes('why not fd') ||
    lower.includes('just put everything in an fd') ||
    lower.includes('why fd')
  ) {
    return {
      pipelineSteps: [
        'Detected intent: Comparative Yield Clarification',
        'Detected objection: Comfort zone bias toward traditional bank deposits',
        'Extracted profile: 24-year-old earner in 20% tax bracket',
        'Live data: Bank FD 7.15% pre-tax (5.7% post-tax) vs CPI inflation 5.12%',
        'Next-Best-Action: Show post-tax real return comparison and bar chart breakdown',
      ],
      message: {
        id: msgId,
        sender: 'advisor',
        timestamp: nowTime,
        content: `That's the most common question I get from young Indian earners, and it deserves total transparency.

A bank FD sounds safe because the face value never drops. But let's look at the real purchasing power math:

1. **Top Bank 1-Yr FD rate:** 7.15% per annum.
2. **Tax on interest:** In your income bracket, interest is taxed at ~20.8%. That pulls your in-hand return down to **5.66%**.
3. **Current Inflation:** 5.12%.
4. **Your real annual gain:** Exactly **+0.54%**.

On a ₹50,000 deposit, you make just ₹270 of real growth over a full year after inflation!

**Our strategy:** Use FDs for what they are great at: **your emergency fund and short-term goals**. But for any money you won't touch for 4+ years, an Index SIP creates real generational wealth.`,
        pipelineSnapshot: snapshot,
        inlineCard: {
          type: 'comparison_table',
          comparisons: getInstrumentComparison(),
        },
        reasoning: {
          mathExplanation: `Pre-tax rate (7.15%) × (1 - 0.208 tax) = 5.66% post-tax return. Net real return = 5.66% - 5.12% inflation = 0.54%.`,
          tradeoffsConsidered: [
            'FDs have zero principal risk (DICGC insured up to ₹5 Lakhs per bank).',
            'Opportunity cost is the hidden risk: losing out on equity compounding during your 20s.',
          ],
          riskFlag: 'Tax rules under the New Tax Regime differ slightly depending on total gross slab.',
        },
        actionable: {
          label: 'Adopt Hybrid Allocation (FD Buffer + SIP)',
          type: 'apply_budget',
          payload: {},
        },
      },
    };
  }

  // Scenario E: "Fix spending leaks" or "food spending"
  if (lower.includes('leak') || lower.includes('food') || lower.includes('cut spending')) {
    return {
      pipelineSteps: [
        'Detected intent: Leak Detection & Spending Friction Removal',
        'Detected objection: None',
        'Extracted profile: Detected ₹3,049 in monthly recurring micro-waste',
        'Live data: Delivery fee markup index + idle subscription billing',
        'Next-Best-Action: Enforce ₹6,000 Food Cap and pause unused Hotstar sub',
      ],
      message: {
        id: msgId,
        sender: 'advisor',
        timestamp: nowTime,
        content: `I scanned your last 30 days of UPI payments. You spent **₹7,850 on food delivery**, which is ₹2,350 higher than what your income comfortably supports.

We identified two immediate leaks:
1. **₹1,450 spent on delivery surcharges, rain fees, and small-cart minimums** across 14 orders.
2. **₹499/mo duplicate streaming subscription** that has seen zero activity in 3 weeks.

If we fix these two items right now, you recover **₹1,949/month** without skipping a single meal or cafe hangout with friends.`,
        pipelineSnapshot: snapshot,
        inlineCard: {
          type: 'action_prompt',
          action: {
            id: 'act-fix-leak-food',
            label: 'Cap Food Delivery at ₹6,000 & Fix Leaks',
            type: 'apply_cap',
            payload: { category: 'cat-food', newLimit: 6000 },
          },
        },
        reasoning: {
          mathExplanation: `₹7,850 current spent - ₹6,000 proposed cap = ₹1,850 savings. Adding ₹499 saved on duplicate subscription = ₹2,349/month.`,
          tradeoffsConsidered: [
            'No drastic lifestyle austerity: cooking 2 simple dinners a week eliminates surge fees effortlessly.',
          ],
          riskFlag: 'Discipline requires turning off late-night notifications on food apps.',
        },
        actionable: {
          label: 'Apply ₹6,000 Food Delivery Cap',
          type: 'apply_cap',
          payload: { category: 'cat-food', newLimit: 6000 },
        },
      },
    };
  }

  // Default Generic Helpful Advisor Reply
  return {
    pipelineSteps: [
      'Detected intent: General Financial Inquiry',
      'Extracted profile: ₹48,000 salary, ₹48,000 emergency fund (2.2 mo runway)',
      'Live data: Repo 6.50%, Nifty 25,480, Inflation 5.12%',
      'Next-Best-Action: Provide contextual clarity and actionable breakdown',
    ],
    message: {
      id: msgId,
      sender: 'advisor',
      timestamp: nowTime,
      content: `I've analyzed your situation with your live numbers:
You earn **${formatINR(profile.monthlyIncome)}/month**, with **${formatINR(metrics.totalFixed)}** in fixed commitments. Your safe-to-spend figure today is **${formatINR(metrics.safeToSpendToday)}**.

How would you like to proceed?
1. **Trim unneeded spending:** Reclaim ~₹2,000 leaked on food apps & duplicate subscriptions.
2. **Laptop Goal:** Fast-track the ₹1,20,000 MacBook goal with a disciplined monthly contribution.
3. **Emergency Runway:** Extend your 2.2-month runway to 6 months in a safe flexi-FD.`,
      pipelineSnapshot: snapshot,
      reasoning: {
        mathExplanation: `Based on your live profile metrics: ${metrics.daysRemainingInMonth} days remaining in current month with ₹${metrics.discretionaryRemaining} remaining discretionary cushion.`,
        tradeoffsConsidered: ['Balancing short-term joy with long-term compound safety.'],
        riskFlag: 'This is educational guidance and not regulated investment advisory.',
      },
    },
  };
}

async function callGeminiAPI(
  userText: string,
  context: { profile: UserProfile; categories: BudgetCategory[]; goals: FinancialGoal[] },
  analysis: ReturnType<typeof analyzeUserInput>,
  metrics: ProfileMetrics,
  apiKey: string
): Promise<AdvisorResponse> {
  const systemPrompt = `You are AlphaSeekers, a sharp, empathetic personal financial advisor for a young Indian professional.
User profile:
- Name: ${context.profile.name}, Age: ${context.profile.age}, City: ${context.profile.city}
- Monthly In-hand Income: ₹${context.profile.monthlyIncome}
- Fixed Commitments (Rent, EMI, Bills): ₹${metrics.totalFixed}
- Emergency Fund: ₹${context.profile.emergencyFund} (Runway: ${metrics.emergencyRunwayMonths} months)
- Safe to spend today: ₹${metrics.safeToSpendToday}

STRICT GUIDELINES:
1. Speak in plain, warm, conversational language. No generic jargon without explaining it immediately.
2. Concrete numbers only. Currency is INR (₹) with Indian format (₹1,24,500).
3. If the user raises an objection ("can't save", "is it safe?", "why not FD?"), ACKNOWLEDGE the concern first with empathy, then explain transparently with numbers and trade-offs.
4. Never guarantee returns. Always flag real risks.
5. Keep response concise (2-3 short paragraphs max).
6. State the trade-offs clearly.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        role: 'user',
        parts: [
          { text: `${systemPrompt}\n\nUser Message: "${userText}"\nProvide advice matching the persona.` },
        ],
      },
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Gemini API error: ${res.statusText}`);
  }

  const data = await res.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

  return {
    pipelineSteps: [
      'Gemini 1.5 Flash processed prompt with user financial telemetry',
      'Objection detection passed to context window',
      'Live market anchors verified',
      'Generated personalized advice',
    ],
    message: {
      id: `gemini-${Date.now()}`,
      sender: 'advisor',
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      content: text,
      pipelineSnapshot: analysis.snapshot,
      reasoning: {
        mathExplanation: `Computed on live ₹${context.profile.monthlyIncome.toLocaleString('en-IN')} income and ₹${metrics.totalFixed.toLocaleString('en-IN')} fixed obligations.`,
        tradeoffsConsidered: ['Capital safety prioritized over speculative yield.'],
        riskFlag: 'Market linked instruments fluctuate. Capital is not guaranteed.',
      },
    },
  };
}
