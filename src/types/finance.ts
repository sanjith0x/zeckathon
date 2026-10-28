export type RiskComfort = 'conservative' | 'balanced' | 'growth';
export type Language = 'en' | 'ta';

export interface UserProfile {
  name: string;
  age: number;
  city: string;
  occupation: string;
  monthlyIncome: number;
  fixedExpenses: {
    rent: number;
    emi: number;
    utilities: number;
    subscriptions: number;
  };
  currentSavings: number;
  emergencyFund: number;
  riskComfort: RiskComfort;
  language: Language;
}

export interface BudgetCategory {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  color: string;
  type: 'needs' | 'wants' | 'savings';
}

export interface FinancialGoal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  monthlyContribution: number;
  targetDate: string; // YYYY-MM
  category: 'purchase' | 'security' | 'travel' | 'investment';
  status: 'on_track' | 'behind' | 'ahead';
  notes?: string;
}

export interface Transaction {
  id: string;
  date: string;
  merchant: string;
  category: string;
  amount: number;
  type: 'debit' | 'credit';
  method: 'UPI' | 'Auto-debit' | 'Card' | 'Salary';
}

export interface SpendingLeak {
  id: string;
  title: string;
  description: string;
  monthlyLoss: number;
  potentialAnnualSavings: number;
  recommendedAction: string;
  fixed: boolean;
  category: string;
}

export interface PipelineSnapshot {
  intent: string;
  confidence: number;
  objection: {
    detected: boolean;
    category?: 'risk_aversion' | 'affordability' | 'liquidity_fear' | 'complexity' | 'fomo';
    userConcern?: string;
    transparentResolution?: string;
  } | null;
  extractedProfile: {
    disposableIncome: number;
    runwayMonths: number;
    savingsRatePercent: number;
    needsWantsRatio: string;
  };
  liveMarketFact: {
    indicator: string;
    value: string;
    relevance: string;
  };
  nextBestAction: {
    type: 'create_budget' | 'create_goal' | 'add_spending_cap' | 'fix_leak' | 'rebalance_savings';
    title: string;
    summary: string;
    payload: any;
  };
}

export interface ComparisonItem {
  instrument: string;
  expectedReturn: string;
  riskLevel: 'Zero Risk' | 'Low Risk' | 'Moderate' | 'Market Linked';
  liquidity: string;
  taxTreatment: string;
  verdictForYou: string;
}

export interface InlineCardData {
  type: 'budget_breakdown' | 'goal_card' | 'comparison_table' | 'action_prompt';
  budget?: {
    needs: number;
    wants: number;
    savings: number;
    caps: Array<{ name: string; amount: number }>;
  };
  goal?: {
    title: string;
    target: number;
    monthly: number;
    monthsToGoal: number;
  };
  comparisons?: ComparisonItem[];
  action?: {
    id: string;
    label: string;
    type: string;
    payload: any;
    executed?: boolean;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'advisor';
  content: string;
  timestamp: string;
  pipelineSnapshot?: PipelineSnapshot;
  inlineCard?: InlineCardData;
  reasoning?: {
    mathExplanation: string;
    tradeoffsConsidered: string[];
    riskFlag: string;
  };
  actionable?: {
    label: string;
    type: 'apply_budget' | 'apply_goal' | 'apply_cap';
    payload: any;
  };
}

export interface MarketRate {
  id: string;
  name: string;
  category: 'deposit' | 'benchmark' | 'inflation' | 'commodity' | 'currency';
  value: string;
  change: string;
  isPositive: boolean;
  asOf: string;
  impactExplanation: string;
  sparkline: number[];
}
