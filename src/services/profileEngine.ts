import type { UserProfile, BudgetCategory } from '../types/finance';
import { getDaysRemainingInMonth } from '../utils/formatters';

export interface ProfileMetrics {
  totalFixed: number;
  totalAllocated: number;
  totalSpent: number;
  discretionaryRemaining: number;
  safeToSpendToday: number;
  emergencyRunwayMonths: number;
  savingsRatePercent: number;
  needsPercentage: number;
  wantsPercentage: number;
  savingsPercentage: number;
  daysRemainingInMonth: number;
}

export function computeProfileMetrics(
  profile: UserProfile,
  categories: BudgetCategory[]
): ProfileMetrics {
  const { fixedExpenses, monthlyIncome, emergencyFund } = profile;
  const totalFixed =
    fixedExpenses.rent +
    fixedExpenses.emi +
    fixedExpenses.utilities +
    fixedExpenses.subscriptions;

  const totalAllocated = categories.reduce((sum, c) => sum + c.allocated, 0);
  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);

  // Group by category type
  const needsAllocated = categories
    .filter((c) => c.type === 'needs')
    .reduce((sum, c) => sum + c.allocated, 0);
  const wantsAllocated = categories
    .filter((c) => c.type === 'wants')
    .reduce((sum, c) => sum + c.allocated, 0);
  const savingsAllocated = categories
    .filter((c) => c.type === 'savings')
    .reduce((sum, c) => sum + c.allocated, 0);

  const needsPercentage = Math.round((needsAllocated / monthlyIncome) * 100);
  const wantsPercentage = Math.round((wantsAllocated / monthlyIncome) * 100);
  const savingsPercentage = Math.round((savingsAllocated / monthlyIncome) * 100);

  // Unspent discretionary (wants)
  const wantsCategories = categories.filter((c) => c.type === 'wants');
  const discretionaryAllocated = wantsCategories.reduce((sum, c) => sum + c.allocated, 0);
  const discretionarySpent = wantsCategories.reduce((sum, c) => sum + c.spent, 0);
  const discretionaryRemaining = Math.max(0, discretionaryAllocated - discretionarySpent);

  const daysRemaining = getDaysRemainingInMonth();
  const safeToSpendToday = Math.max(0, Math.floor(discretionaryRemaining / daysRemaining));

  // Monthly burn needed to survive = totalFixed + baseline grocery (~₹4,000)
  const baselineMonthlyBurn = totalFixed + 4000;
  const emergencyRunwayMonths = Number((emergencyFund / (baselineMonthlyBurn || 1)).toFixed(1));

  // Current savings rate
  const savingsRatePercent = Math.round((savingsAllocated / monthlyIncome) * 100);

  return {
    totalFixed,
    totalAllocated,
    totalSpent,
    discretionaryRemaining,
    safeToSpendToday,
    emergencyRunwayMonths,
    savingsRatePercent,
    needsPercentage,
    wantsPercentage,
    savingsPercentage,
    daysRemainingInMonth: daysRemaining,
  };
}
