import type { PipelineSnapshot, UserProfile } from '../types/finance';
import { getMarketRates } from './marketService';

export interface AnalysisResult {
  snapshot: PipelineSnapshot;
  detectedTopic: string;
}

export function analyzeUserInput(text: string, profile: UserProfile): AnalysisResult {
  const lower = text.toLowerCase();
  const market = getMarketRates();

  // 1. Objection Detection
  let objection: PipelineSnapshot['objection'] = null;

  if (
    lower.includes("can't save") ||
    lower.includes('cant save') ||
    lower.includes('too tight') ||
    lower.includes('not enough') ||
    lower.includes('zero left') ||
    lower.includes('nothing left') ||
    lower.includes("can't afford") ||
    lower.includes('too much')
  ) {
    objection = {
      detected: true,
      category: 'affordability',
      userConcern: "Feeling that current salary leaves zero margin to put money aside.",
      transparentResolution:
        "Valid concern. We never squeeze essentials. Instead of asking for ₹10,000 upfront, we start with reclaiming ₹1,450 leaked on surge delivery fees, which frees up ₹1,450/month with zero pain.",
    };
  } else if (
    lower.includes('safe') ||
    lower.includes('risk') ||
    lower.includes('lose money') ||
    lower.includes('market crash') ||
    lower.includes('scared') ||
    lower.includes('trust')
  ) {
    objection = {
      detected: true,
      category: 'risk_aversion',
      userConcern: "Anxiety about losing hard-earned capital in equity or market-linked instruments.",
      transparentResolution:
        "Totally understandable. We keep your 2.2-month emergency cushion (₹48,000) 100% in a liquid bank account/FD. Only long-term money you don't need for 3+ years touches index funds.",
    };
  } else if (
    lower.includes('why not just fd') ||
    lower.includes('why fd') ||
    lower.includes('keep in bank') ||
    lower.includes('just fd') ||
    lower.includes('why that fund')
  ) {
    objection = {
      detected: true,
      category: 'complexity',
      userConcern: "Why not stick to a familiar Bank Fixed Deposit instead of index funds?",
      transparentResolution:
        "Bank FDs offer ~7.15%, but after 20% slab tax you get ~5.7%. With CPI inflation at 5.12%, your real annual growth is barely 0.58%. A low-cost Nifty 50 Index fund historical return (~12.6%) is what truly builds wealth.",
    };
  } else if (
    lower.includes('emergency') ||
    lower.includes('sudden') ||
    lower.includes('hospital') ||
    lower.includes('need money') ||
    lower.includes('locked')
  ) {
    objection = {
      detected: true,
      category: 'liquidity_fear',
      userConcern: "Fear that savings will be locked and inaccessible during emergencies.",
      transparentResolution:
        "We never lock emergency funds. We maintain 3 months of survival expenses in instant-withdrawal instruments with zero lock-in.",
    };
  }

  // 2. Intent Detection
  let intent = 'General Financial Assessment';
  let nextBestAction: PipelineSnapshot['nextBestAction'] = {
    type: 'create_budget',
    title: 'Review Monthly Cashflow',
    summary: 'Balance your 50/30/20 allocation across essentials and leisure.',
    payload: {},
  };

  if (lower.includes('laptop') || lower.includes('macbook') || lower.includes('buy') || lower.includes('goal')) {
    intent = 'Goal Planning: Tech Asset Purchase';
    nextBestAction = {
      type: 'create_goal',
      title: 'Target ₹1,20,000 for MacBook Pro',
      summary: 'Commit ₹6,000/month across 12 months in an ultra-short debt fund or RD.',
      payload: { goalId: 'goal-macbook', monthly: 6000 },
    };
  } else if (lower.includes('food') || lower.includes('swiggy') || lower.includes('zomato') || lower.includes('delivery') || lower.includes('eating out')) {
    intent = 'Expense Control: Food Delivery Surge';
    nextBestAction = {
      type: 'add_spending_cap',
      title: 'Cap Food Delivery at ₹6,000/mo',
      summary: 'Trim ₹1,850/mo from food delivery to fund your MacBook goal.',
      payload: { category: 'cat-food', newLimit: 6000 },
    };
  } else if (lower.includes('sip') || lower.includes('invest') || lower.includes('mutual fund') || lower.includes('nifty')) {
    intent = 'Investment Allocation: Wealth Compounding';
    nextBestAction = {
      type: 'rebalance_savings',
      title: 'Setup ₹3,500/month Nifty 50 SIP',
      summary: 'Automate SIP on the 5th of every month right after salary credit.',
      payload: { sipAmount: 3500 },
    };
  } else if (lower.includes('emergency') || lower.includes('runway') || lower.includes('buffer')) {
    intent = 'Financial Security: Emergency Runway';
    nextBestAction = {
      type: 'rebalance_savings',
      title: 'Extend Runway to 4.5 Months',
      summary: 'Route ₹2,500/month into High-Yield Savings / Flexi-FD.',
      payload: { monthlyAdd: 2500 },
    };
  } else if (lower.includes('earn') && lower.includes('save')) {
    intent = 'Budget Architecture: 50/30/20 Restructure';
    nextBestAction = {
      type: 'create_budget',
      title: 'Apply 50/30/20 Rule for ₹48,000 Salary',
      summary: 'Needs: ₹24,000 (50%), Wants: ₹14,400 (30%), Savings: ₹9,600 (20%).',
      payload: { needs: 24000, wants: 14400, savings: 9600 },
    };
  }

  // 3. Extracted Profile snapshot
  const totalFixed = profile.fixedExpenses.rent + profile.fixedExpenses.emi + profile.fixedExpenses.utilities + profile.fixedExpenses.subscriptions;
  const disposable = profile.monthlyIncome - totalFixed;
  const runway = Number((profile.emergencyFund / (totalFixed + 4000)).toFixed(1));

  // 4. Live market fact to anchor advice
  const fdRate = market.rates.find((r) => r.id === 'mkt-fd');

  const snapshot: PipelineSnapshot = {
    intent,
    confidence: 0.94,
    objection,
    extractedProfile: {
      disposableIncome: disposable,
      runwayMonths: runway,
      savingsRatePercent: Math.round(((profile.monthlyIncome - totalFixed - 15000) / profile.monthlyIncome) * 100),
      needsWantsRatio: '52% Needs / 34% Wants / 14% Savings',
    },
    liveMarketFact: {
      indicator: fdRate?.name || '1-Yr Bank FD',
      value: fdRate?.value || '7.15%',
      relevance: 'Pre-tax rate. Inflation at 5.12% means real return is ~0.58% after 20% slab tax.',
    },
    nextBestAction,
  };

  return {
    snapshot,
    detectedTopic: intent,
  };
}
