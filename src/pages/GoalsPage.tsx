import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFinanceStore } from '../store/useFinanceStore';
import type { FinancialGoal } from '../types/finance';
import { formatINR } from '../utils/formatters';
import {
  SparkleIcon,
  PlusIcon,
  SlidersIcon,
  CloseIcon,
  TrashIcon,
} from '../components/icons';

export const GoalsPage: React.FC = () => {
  const { goals, addOrUpdateGoal, deleteGoal } = useFinanceStore();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [whatIfBoost, setWhatIfBoost] = useState<number>(2000); // What-if slider boost ₹
  const [newGoal, setNewGoal] = useState({
    title: '',
    targetAmount: '',
    currentAmount: '',
    monthlyContribution: '',
    targetDate: '2027-04',
    category: 'purchase' as FinancialGoal['category'],
  });

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    const target = Number(newGoal.targetAmount);
    const current = Number(newGoal.currentAmount || 0);
    const monthly = Number(newGoal.monthlyContribution || 3000);

    if (!newGoal.title || isNaN(target) || target <= 0) return;

    addOrUpdateGoal({
      id: `goal-${Date.now()}`,
      title: newGoal.title,
      targetAmount: target,
      currentAmount: current,
      monthlyContribution: monthly,
      targetDate: newGoal.targetDate,
      category: newGoal.category,
      status: 'on_track',
    });

    setIsAddModalOpen(false);
    setNewGoal({
      title: '',
      targetAmount: '',
      currentAmount: '',
      monthlyContribution: '',
      targetDate: '2027-04',
      category: 'purchase',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-6">
        <div>
          <span className="label-subtle">05 / Targets & Compounding</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-1">
            Financial Goals & Timeline
          </h1>
          <p className="text-xs text-ink-muted mt-1 max-w-xl">
            Track real progress toward short and long-term milestones. Dynamic adaptation automatically recalibrates timelines when cashflow shifts.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/advisor"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn bg-paper-surface hairline-all hover:bg-paper-surface/80 text-xs font-semibold text-pine transition-colors"
          >
            <SparkleIcon size={14} />
            <span>Ask Advisor About Goals</span>
          </Link>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn bg-pine text-paper hover:bg-pine-hover text-xs font-semibold transition-colors shadow-sm"
          >
            <PlusIcon size={14} />
            <span>Create New Goal</span>
          </button>
        </div>
      </div>

      {/* Dynamic Adaptation Notice Banner */}
      <div className="p-4 bg-paper-elevated rounded-btn hairline-all shadow-editorial flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-saffron animate-pulse shrink-0" />
          <div>
            <strong className="text-ink font-semibold">Dynamic Engine Active: </strong>
            <span className="text-ink-muted">
              Because ₹1,450 in food delivery surge leaks was detected, your MacBook timeline can move forward by <strong>1.5 months</strong> if that leak is redirected into your goal RD.
            </span>
          </div>
        </div>
        <Link
          to="/advisor"
          className="text-pine font-mono font-semibold underline shrink-0 hover:text-pine-hover"
        >
          View Telemetry →
        </Link>
      </div>

      {/* "What-if" Interactive Accelerator Slider */}
      <div className="bg-paper-elevated rounded-card hairline-all p-6 sm:p-8 shadow-editorial space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 hairline-b pb-3">
          <div className="flex items-center gap-2">
            <SlidersIcon size={16} className="text-pine" />
            <h3 className="font-serif text-base font-bold text-ink">
              "What-If" Savings Accelerator
            </h3>
          </div>
          <span className="font-mono text-xs text-pine font-bold">
            Boosting Monthly Savings by: +{formatINR(whatIfBoost)}/mo
          </span>
        </div>

        <p className="text-xs text-ink-muted leading-relaxed">
          Drag the slider to see how reclaiming micro-leaks or adding freelance cash moves your projected completion dates forward across all active targets.
        </p>

        <div className="space-y-2 pt-2">
          <div className="flex justify-between text-xs font-mono text-ink-muted">
            <span>+₹500/mo</span>
            <span className="text-pine font-bold">+{formatINR(whatIfBoost)}/mo</span>
            <span>+₹10,000/mo</span>
          </div>
          <input
            type="range"
            min="500"
            max="10000"
            step="500"
            value={whatIfBoost}
            onChange={(e) => setWhatIfBoost(Number(e.target.value))}
            className="w-full accent-pine cursor-pointer"
          />
        </div>
      </div>

      {/* Goal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const progressPercent = Math.min(
            100,
            Math.round((goal.currentAmount / goal.targetAmount) * 100)
          );
          const remainingAmount = Math.max(0, goal.targetAmount - goal.currentAmount);

          // Standard months remaining at current contribution
          const standardMonths = Math.ceil(
            remainingAmount / (goal.monthlyContribution || 1)
          );

          // Accelerated months with whatIfBoost added
          const boostedMonthly = goal.monthlyContribution + whatIfBoost;
          const acceleratedMonths = Math.ceil(remainingAmount / (boostedMonthly || 1));
          const monthsSaved = Math.max(0, standardMonths - acceleratedMonths);

          return (
            <div
              key={goal.id}
              className="bg-paper rounded-card hairline-all p-6 shadow-editorial flex flex-col justify-between space-y-6 hover:shadow-hover transition-all"
            >
              <div className="space-y-4">
                {/* Header status */}
                <div className="flex items-start justify-between gap-2">
                  <span
                    className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded-tag font-semibold ${
                      goal.status === 'ahead'
                        ? 'bg-positive-light text-positive'
                        : goal.status === 'on_track'
                        ? 'bg-pine-light text-pine'
                        : 'bg-warning-light text-warning'
                    }`}
                  >
                    {goal.status.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => {
                      if (confirm(`Remove goal "${goal.title}"?`)) {
                        deleteGoal(goal.id);
                      }
                    }}
                    className="text-ink-faint hover:text-negative transition-colors p-1"
                    title="Delete goal"
                  >
                    <TrashIcon size={14} />
                  </button>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-ink leading-snug">
                    {goal.title}
                  </h3>
                  <div className="text-xs text-ink-muted font-mono mt-1">
                    Target: <strong>{formatINR(goal.targetAmount)}</strong> • By {goal.targetDate}
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-pine font-bold">
                      {formatINR(goal.currentAmount)} saved
                    </span>
                    <span className="text-ink-muted">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-paper-surface h-2.5 rounded-full overflow-hidden hairline-all">
                    <div
                      className="bg-pine h-full rounded-full transition-all duration-500"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                  <div className="text-[11px] text-ink-muted font-mono flex justify-between pt-1">
                    <span>Remaining: {formatINR(remainingAmount)}</span>
                    <span>{goal.monthlyContribution ? `${formatINR(goal.monthlyContribution)}/mo` : ''}</span>
                  </div>
                </div>

                {/* What-if projection tag */}
                <div className="p-3 bg-paper-surface/60 rounded-btn space-y-1 text-xs">
                  <div className="text-[10px] font-mono uppercase text-ink-muted font-semibold">
                    Projection with +{formatINR(whatIfBoost)}/mo
                  </div>
                  <p className="text-xs text-ink font-sans">
                    Completion moves up by{' '}
                    <strong className="text-positive font-mono font-bold">
                      {monthsSaved} month{monthsSaved === 1 ? '' : 's'}
                    </strong>{' '}
                    (hits target in {acceleratedMonths} months instead of {standardMonths}).
                  </p>
                </div>

                {goal.notes && (
                  <p className="text-[11px] text-ink-muted italic border-l-2 border-pine/30 pl-2">
                    "{goal.notes}"
                  </p>
                )}
              </div>

              <div className="pt-3 hairline-t flex items-center justify-between text-xs">
                <Link
                  to="/advisor"
                  className="font-mono text-pine font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Strategize in Chat</span>
                  <span>→</span>
                </Link>
                <span className="text-[10px] font-mono text-ink-faint">
                  Cat: {goal.category}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Goal Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-paper rounded-card hairline-all shadow-editorial max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between hairline-b pb-3">
              <h3 className="font-serif text-lg font-bold text-ink">Create Financial Goal</h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="text-ink-muted hover:text-ink p-1"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateGoal} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                  Goal Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Goa Trip, iPhone, Emergency Buffer"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                    Target ₹
                  </label>
                  <input
                    type="number"
                    required
                    min="1000"
                    placeholder="120000"
                    value={newGoal.targetAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                    Already Saved ₹
                  </label>
                  <input
                    type="number"
                    min="0"
                    placeholder="0"
                    value={newGoal.currentAmount}
                    onChange={(e) => setNewGoal({ ...newGoal, currentAmount: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink font-mono text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                    Monthly Allocation ₹
                  </label>
                  <input
                    type="number"
                    min="500"
                    placeholder="4000"
                    value={newGoal.monthlyContribution}
                    onChange={(e) =>
                      setNewGoal({ ...newGoal, monthlyContribution: e.target.value })
                    }
                    className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                    Target Date
                  </label>
                  <input
                    type="month"
                    value={newGoal.targetDate}
                    onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink text-xs"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-btn hairline-all text-ink hover:bg-paper-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-btn bg-pine text-paper font-semibold hover:bg-pine-hover"
                >
                  Save Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
