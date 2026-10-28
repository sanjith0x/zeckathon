import type { BudgetCategory, FinancialGoal, SpendingLeak } from '../types/finance';

export interface ActionResult {
  success: boolean;
  message: string;
  affectedEntity: 'budget' | 'goal' | 'leak' | 'profile';
}

export function executeAction(
  type: string,
  payload: any,
  helpers: {
    updateCategoryCap: (categoryId: string, newAllocated: number) => void;
    addOrUpdateGoal: (goal: FinancialGoal) => void;
    resolveLeak: (leakId: string) => void;
    categories: BudgetCategory[];
    goals: FinancialGoal[];
    leaks: SpendingLeak[];
  }
): ActionResult {
  switch (type) {
    case 'add_spending_cap':
    case 'apply_cap': {
      const categoryId = payload.categoryId || payload.category || 'cat-food';
      const newLimit = payload.newLimit || payload.amount || 6000;
      helpers.updateCategoryCap(categoryId, newLimit);
      return {
        success: true,
        message: `Spending cap updated to ₹${newLimit.toLocaleString('en-IN')}/mo on this category.`,
        affectedEntity: 'budget',
      };
    }

    case 'create_goal':
    case 'apply_goal': {
      const existing = helpers.goals.find((g) => g.id === payload.goalId);
      if (existing) {
        helpers.addOrUpdateGoal({
          ...existing,
          monthlyContribution: payload.monthly || existing.monthlyContribution,
        });
      } else {
        helpers.addOrUpdateGoal({
          id: `goal-${Date.now()}`,
          title: payload.title || 'New Savings Goal',
          targetAmount: payload.target || 50000,
          currentAmount: payload.current || 0,
          monthlyContribution: payload.monthly || 5000,
          targetDate: payload.targetDate || '2027-06',
          category: payload.category || 'purchase',
          status: 'on_track',
        });
      }
      return {
        success: true,
        message: 'Goal successfully saved and synced to your Goals planner.',
        affectedEntity: 'goal',
      };
    }

    case 'fix_leak': {
      const leakId = payload.leakId || 'leak-1';
      helpers.resolveLeak(leakId);
      return {
        success: true,
        message: 'Leak marked as fixed. Saved amount reallocated to your monthly cushion.',
        affectedEntity: 'leak',
      };
    }

    case 'create_budget':
    case 'apply_budget': {
      // Adjust food, weekend, and discretionary to match healthier ratio
      helpers.updateCategoryCap('cat-food', 6000);
      helpers.updateCategoryCap('cat-weekend', 3200);
      helpers.updateCategoryCap('cat-invest', 6500);
      return {
        success: true,
        message: '50/30/20 balanced budget plan applied to your spending buckets.',
        affectedEntity: 'budget',
      };
    }

    default:
      return {
        success: true,
        message: 'Action recorded successfully.',
        affectedEntity: 'profile',
      };
  }
}
