import { create } from 'zustand';
import type {
  UserProfile,
  BudgetCategory,
  FinancialGoal,
  Transaction,
  SpendingLeak,
  ChatMessage,
  PipelineSnapshot,
  Language,
} from '../types/finance';
import {
  INITIAL_USER_PROFILE,
  INITIAL_BUDGET_CATEGORIES,
  INITIAL_GOALS,
  INITIAL_TRANSACTIONS,
  INITIAL_LEAKS,
} from '../data/mockData';

interface FinanceStore {
  profile: UserProfile;
  categories: BudgetCategory[];
  goals: FinancialGoal[];
  transactions: Transaction[];
  leaks: SpendingLeak[];
  messages: ChatMessage[];
  activePipelineSnapshot: PipelineSnapshot | null;
  isThinking: boolean;
  thinkingStep: string;

  // Actions
  updateProfile: (profile: Partial<UserProfile>) => void;
  updateCategoryCap: (categoryId: string, newAllocated: number) => void;
  addCategory: (category: BudgetCategory) => void;
  addOrUpdateGoal: (goal: FinancialGoal) => void;
  deleteGoal: (goalId: string) => void;
  addTransaction: (tx: Omit<Transaction, 'id'>) => void;
  resolveLeak: (leakId: string) => void;
  addMessage: (msg: ChatMessage) => void;
  setThinking: (isThinking: boolean, step?: string) => void;
  setPipelineSnapshot: (snapshot: PipelineSnapshot | null) => void;
  setLanguage: (lang: Language) => void;
  resetDemoData: () => void;
}

const STORAGE_KEY = 'alphaseekers_fintech_store_v1';

const getInitialState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        profile: parsed.profile || INITIAL_USER_PROFILE,
        categories: parsed.categories || INITIAL_BUDGET_CATEGORIES,
        goals: parsed.goals || INITIAL_GOALS,
        transactions: parsed.transactions || INITIAL_TRANSACTIONS,
        leaks: parsed.leaks || INITIAL_LEAKS,
        messages: parsed.messages || [],
      };
    }
  } catch (e) {
    console.warn('Failed to parse localStorage data:', e);
  }
  return {
    profile: INITIAL_USER_PROFILE,
    categories: INITIAL_BUDGET_CATEGORIES,
    goals: INITIAL_GOALS,
    transactions: INITIAL_TRANSACTIONS,
    leaks: INITIAL_LEAKS,
    messages: [
      {
        id: 'msg-seed-1',
        sender: 'advisor' as const,
        timestamp: '10:00 AM',
        content: `Hey Karthik! I've loaded your ₹48,000 monthly income and verified your accounts.

You're running about **₹26,284 in discretionary money** after rent (₹14,000) and your education loan EMI (₹4,500). Your safe-to-spend figure today is **₹840**.

What's on your mind? You can ask me anything in plain words—like *"Why am I struggling to save?"*, *"Is a SIP safe for me?"*, or *"Help me save for a MacBook"*.`,
        pipelineSnapshot: {
          intent: 'Initial Workspace Calibration',
          confidence: 0.98,
          objection: null,
          extractedProfile: {
            disposableIncome: 26284,
            runwayMonths: 2.2,
            savingsRatePercent: 14,
            needsWantsRatio: '52% Needs / 34% Wants / 14% Savings',
          },
          liveMarketFact: {
            indicator: 'Top Bank 1-Yr FD',
            value: '7.15%',
            relevance: 'Pre-tax baseline. Effective ~5.68% post-tax vs 5.12% inflation.',
          },
          nextBestAction: {
            type: 'create_budget',
            title: 'Verify Monthly Commitments',
            summary: 'Ensure rent, EMI and essential utilities match your bank statement.',
            payload: {},
          },
        },
        reasoning: {
          mathExplanation: '₹48,000 in-hand - ₹21,716 fixed commitments = ₹26,284 discretionary cushion.',
          tradeoffsConsidered: ['Kept ₹48,000 emergency fund intact before suggesting investments.'],
          riskFlag: 'This is educational fintech guidance, not SEBI-regulated investment advice.',
        },
      },
    ],
  };
};

const initial = getInitialState();

export const useFinanceStore = create<FinanceStore>((set) => ({
  profile: initial.profile,
  categories: initial.categories,
  goals: initial.goals,
  transactions: initial.transactions,
  leaks: initial.leaks,
  messages: initial.messages,
  activePipelineSnapshot: initial.messages[0]?.pipelineSnapshot || null,
  isThinking: false,
  thinkingStep: '',

  updateProfile: (updated) => {
    set((state) => {
      const newProfile = { ...state.profile, ...updated };
      const next = { ...state, profile: newProfile };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { profile: newProfile };
    });
  },

  updateCategoryCap: (categoryId, newAllocated) => {
    set((state) => {
      const newCategories = state.categories.map((c) =>
        c.id === categoryId ? { ...c, allocated: newAllocated } : c
      );
      const next = { ...state, categories: newCategories };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { categories: newCategories };
    });
  },

  addCategory: (category) => {
    set((state) => {
      const newCategories = [...state.categories, category];
      const next = { ...state, categories: newCategories };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { categories: newCategories };
    });
  },

  addOrUpdateGoal: (goal) => {
    set((state) => {
      const index = state.goals.findIndex((g) => g.id === goal.id);
      let newGoals: FinancialGoal[];
      if (index >= 0) {
        newGoals = [...state.goals];
        newGoals[index] = goal;
      } else {
        newGoals = [...state.goals, goal];
      }
      const next = { ...state, goals: newGoals };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { goals: newGoals };
    });
  },

  deleteGoal: (goalId) => {
    set((state) => {
      const newGoals = state.goals.filter((g) => g.id !== goalId);
      const next = { ...state, goals: newGoals };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { goals: newGoals };
    });
  },

  addTransaction: (txData) => {
    set((state) => {
      const newTx: Transaction = {
        ...txData,
        id: `tx-${Date.now()}`,
      };
      const newTransactions = [newTx, ...state.transactions];

      // Update category spent if matching
      const newCategories = state.categories.map((c) => {
        if (
          txData.type === 'debit' &&
          (c.name.toLowerCase().includes(txData.category.toLowerCase()) ||
            txData.category.toLowerCase().includes(c.name.toLowerCase()))
        ) {
          return { ...c, spent: c.spent + txData.amount };
        }
        return c;
      });

      const next = { ...state, transactions: newTransactions, categories: newCategories };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { transactions: newTransactions, categories: newCategories };
    });
  },

  resolveLeak: (leakId) => {
    set((state) => {
      const newLeaks = state.leaks.map((l) =>
        l.id === leakId ? { ...l, fixed: true } : l
      );
      const next = { ...state, leaks: newLeaks };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { leaks: newLeaks };
    });
  },

  addMessage: (msg) => {
    set((state) => {
      const newMessages = [...state.messages, msg];
      const snapshot = msg.pipelineSnapshot || state.activePipelineSnapshot;
      const next = { ...state, messages: newMessages, activePipelineSnapshot: snapshot };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { messages: newMessages, activePipelineSnapshot: snapshot };
    });
  },

  setThinking: (isThinking, step = '') => {
    set({ isThinking, thinkingStep: step });
  },

  setPipelineSnapshot: (snapshot) => {
    set({ activePipelineSnapshot: snapshot });
  },

  setLanguage: (language) => {
    set((state) => {
      const newProfile = { ...state.profile, language };
      const next = { ...state, profile: newProfile };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      return { profile: newProfile };
    });
  },

  resetDemoData: () => {
    localStorage.removeItem(STORAGE_KEY);
    set({
      profile: INITIAL_USER_PROFILE,
      categories: INITIAL_BUDGET_CATEGORIES,
      goals: INITIAL_GOALS,
      transactions: INITIAL_TRANSACTIONS,
      leaks: INITIAL_LEAKS,
      messages: [
        {
          id: 'msg-seed-reset',
          sender: 'advisor',
          timestamp: 'Just now',
          content: `Workspace reset to pristine demo state! You are Karthik Ramanathan (24, ₹48k/mo income). All numbers, caps, goals, and leaks have been re-calibrated. Ask away!`,
          pipelineSnapshot: {
            intent: 'Workspace Reset Calibration',
            confidence: 1.0,
            objection: null,
            extractedProfile: {
              disposableIncome: 26284,
              runwayMonths: 2.2,
              savingsRatePercent: 14,
              needsWantsRatio: '52% Needs / 34% Wants / 14% Savings',
            },
            liveMarketFact: {
              indicator: 'Top Bank 1-Yr FD',
              value: '7.15%',
              relevance: 'Pre-tax baseline vs 5.12% inflation.',
            },
            nextBestAction: {
              type: 'create_budget',
              title: 'Review Starter Cashflow',
              summary: 'Check the 50/30/20 breakdown in the Budget tab.',
              payload: {},
            },
          },
        },
      ],
      activePipelineSnapshot: null,
      isThinking: false,
      thinkingStep: '',
    });
  },
}));
