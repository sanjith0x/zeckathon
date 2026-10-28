import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFinanceStore } from '../store/useFinanceStore';
import { formatINR } from '../utils/formatters';
import { SparkleIcon, SlidersIcon, AlertIcon } from '../components/icons';

export const BudgetPlannerPage: React.FC = () => {
  const { profile, categories, updateCategoryCap } = useFinanceStore();

  // Flexible 50/30/20 proportions
  const [needsRatio, setNeedsRatio] = useState(50);
  const [wantsRatio, setWantsRatio] = useState(30);
  const [editingCapId, setEditingCapId] = useState<string | null>(null);
  const [capInputValue, setCapInputValue] = useState<string>('');

  const savingsRatio = Math.max(0, 100 - needsRatio - wantsRatio);

  const targetNeeds = (profile.monthlyIncome * needsRatio) / 100;
  const targetWants = (profile.monthlyIncome * wantsRatio) / 100;
  const targetSavings = (profile.monthlyIncome * savingsRatio) / 100;

  const currentNeeds = categories
    .filter((c) => c.type === 'needs')
    .reduce((sum, c) => sum + c.allocated, 0);
  const currentWants = categories
    .filter((c) => c.type === 'wants')
    .reduce((sum, c) => sum + c.allocated, 0);
  const currentSavings = categories
    .filter((c) => c.type === 'savings')
    .reduce((sum, c) => sum + c.allocated, 0);

  const handleSaveCap = (categoryId: string) => {
    const val = Number(capInputValue);
    if (!isNaN(val) && val >= 0) {
      updateCategoryCap(categoryId, val);
    }
    setEditingCapId(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-6">
        <div>
          <span className="label-subtle">04 / Spending Limits & Rules</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-1">
            Budget Architecture & Caps
          </h1>
          <p className="text-xs text-ink-muted mt-1 max-w-xl">
            A flexible rule calibrated to Indian living costs. Adjust the sliders below to see live cashflow recalculation.
          </p>
        </div>

        <Link
          to="/advisor"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn bg-pine text-paper hover:bg-pine-hover text-xs font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          <SparkleIcon size={14} />
          <span>Ask Advisor to Review Budget</span>
        </Link>
      </div>

      {/* Interactive 50/30/20 Tuning Sliders */}
      <div className="bg-paper-elevated rounded-card hairline-all p-6 sm:p-8 shadow-editorial space-y-6">
        <div className="flex items-center justify-between hairline-b pb-3">
          <div className="flex items-center gap-2">
            <SlidersIcon size={16} className="text-pine" />
            <h3 className="font-serif text-base font-bold text-ink">
              Macro Allocation Tuning ({needsRatio}% / {wantsRatio}% / {savingsRatio}%)
            </h3>
          </div>
          <span className="text-xs font-mono text-ink-muted">
            Total Income: {formatINR(profile.monthlyIncome)}
          </span>
        </div>

        {/* 3 Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Needs */}
          <div className="bg-paper p-5 rounded-btn hairline-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-pine">Needs & Fixed</span>
              <span className="font-bold">{needsRatio}%</span>
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatINR(targetNeeds)}
            </div>
            <input
              type="range"
              min="35"
              max="65"
              value={needsRatio}
              onChange={(e) => setNeedsRatio(Number(e.target.value))}
              className="w-full accent-pine cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-ink-muted font-mono">
              <span>Actual Allocated:</span>
              <span className={currentNeeds > targetNeeds ? 'text-warning font-bold' : ''}>
                {formatINR(currentNeeds)}
              </span>
            </div>
          </div>

          {/* Wants */}
          <div className="bg-paper p-5 rounded-btn hairline-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-warning">Wants & Discretionary</span>
              <span className="font-bold">{wantsRatio}%</span>
            </div>
            <div className="font-mono text-2xl font-bold text-ink">
              {formatINR(targetWants)}
            </div>
            <input
              type="range"
              min="15"
              max="45"
              value={wantsRatio}
              onChange={(e) => setWantsRatio(Number(e.target.value))}
              className="w-full accent-warning cursor-pointer"
            />
            <div className="flex justify-between text-[11px] text-ink-muted font-mono">
              <span>Actual Allocated:</span>
              <span className={currentWants > targetWants ? 'text-warning font-bold' : ''}>
                {formatINR(currentWants)}
              </span>
            </div>
          </div>

          {/* Savings */}
          <div className="bg-paper p-5 rounded-btn hairline-all space-y-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="font-semibold text-positive">Wealth & Buffer</span>
              <span className="font-bold">{savingsRatio}%</span>
            </div>
            <div className="font-mono text-2xl font-bold text-pine">
              {formatINR(targetSavings)}
            </div>
            <div className="h-2 bg-paper-surface rounded-full overflow-hidden mt-4">
              <div
                className="bg-positive h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (savingsRatio / 30) * 100)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-ink-muted font-mono">
              <span>Actual Allocated:</span>
              <span className="text-positive font-bold">{formatINR(currentSavings)}</span>
            </div>
          </div>
        </div>

        {/* Live Goal Impact Banner */}
        <div className="p-4 bg-pine-light rounded-btn hairline-all border-pine/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div>
            <strong className="text-pine font-semibold block sm:inline">Goal Impact: </strong>
            <span className="text-ink">
              Allocating <strong>{formatINR(targetSavings)}</strong> into monthly savings would allow you to hit your ₹1.2L MacBook goal in{' '}
              <strong>{Math.ceil(72000 / (targetSavings || 1))} months</strong> while keeping your emergency fund funded.
            </span>
          </div>
          <Link
            to="/goals"
            className="text-pine font-mono font-semibold underline shrink-0 hover:text-pine-hover"
          >
            Review Goals →
          </Link>
        </div>
      </div>

      {/* Per-Category Spending Limits with Progress Bars */}
      <div className="bg-paper rounded-card hairline-all p-6 sm:p-8 shadow-editorial space-y-6">
        <div className="flex items-center justify-between hairline-b pb-3">
          <div>
            <span className="label-subtle">Granular Control</span>
            <h3 className="font-serif text-lg font-bold text-ink">
              Category Spending Caps & Warnings
            </h3>
          </div>
          <span className="text-xs font-mono text-ink-muted">
            Tap 'Adjust Cap' to modify any limit
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((c) => {
            const percent = Math.round((c.spent / c.allocated) * 100);
            const isNearLimit = percent >= 85 && percent <= 100;
            const isOverLimit = percent > 100;
            const isEditing = editingCapId === c.id;

            // Warning colors: sage green -> burnt orange -> brick red
            let barColor = '#2D7A58'; // sage green
            if (isOverLimit) {
              barColor = '#B83A3A'; // brick red
            } else if (isNearLimit) {
              barColor = '#C96528'; // burnt orange
            }

            return (
              <div
                key={c.id}
                className="p-5 bg-paper-surface/50 rounded-btn hairline-all space-y-3 hover:bg-paper-surface/80 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2.5 h-2.5 rounded-full inline-block"
                      style={{ backgroundColor: c.color }}
                    />
                    <h4 className="font-serif text-sm font-bold text-ink">{c.name}</h4>
                    <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded-tag bg-paper text-ink-muted hairline-all">
                      {c.type}
                    </span>
                  </div>

                  {/* Warning Tag */}
                  {isOverLimit && (
                    <span className="text-[10px] font-mono text-negative bg-negative-light px-2 py-0.5 rounded-tag flex items-center gap-1 font-semibold">
                      <AlertIcon size={12} />
                      Exceeded Limit
                    </span>
                  )}
                  {isNearLimit && (
                    <span className="text-[10px] font-mono text-warning bg-warning-light px-2 py-0.5 rounded-tag flex items-center gap-1 font-semibold">
                      <AlertIcon size={12} />
                      85%+ Burned
                    </span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-ink-muted">
                      Spent: <strong className="text-ink">{formatINR(c.spent)}</strong>
                    </span>
                    <span className="text-ink-muted">
                      Cap: <strong>{formatINR(c.allocated)}</strong> ({percent}%)
                    </span>
                  </div>
                  <div className="w-full bg-paper h-2.5 rounded-full overflow-hidden hairline-all">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${Math.min(100, percent)}%`,
                        backgroundColor: barColor,
                      }}
                    />
                  </div>
                </div>

                {/* Plain language note */}
                <p className="text-[11px] text-ink-muted leading-relaxed">
                  {isOverLimit
                    ? `You've exceeded this cap by ${formatINR(c.spent - c.allocated)}. Cut back here to preserve your month-end cushion.`
                    : isNearLimit
                    ? `Only ${formatINR(c.allocated - c.spent)} remaining for the rest of October. Pace daily orders carefully.`
                    : `${formatINR(c.allocated - c.spent)} cushion remaining. Safe and well within boundary.`}
                </p>

                {/* Edit Cap Form / Trigger */}
                <div className="pt-2 hairline-t flex items-center justify-between text-xs">
                  {isEditing ? (
                    <div className="flex items-center gap-2 w-full">
                      <input
                        type="number"
                        className="px-2 py-1 bg-paper rounded-tag hairline-all font-mono text-xs w-28 text-ink focus:outline-none"
                        value={capInputValue}
                        onChange={(e) => setCapInputValue(e.target.value)}
                        placeholder="New Cap ₹"
                      />
                      <button
                        onClick={() => handleSaveCap(c.id)}
                        className="px-3 py-1 bg-pine text-paper rounded-tag text-[11px] font-semibold"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingCapId(null)}
                        className="text-ink-muted text-[11px] hover:text-ink"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingCapId(c.id);
                          setCapInputValue(c.allocated.toString());
                        }}
                        className="text-[11px] font-mono text-pine hover:underline font-semibold"
                      >
                        Edit Cap
                      </button>
                      <Link
                        to="/advisor"
                        className="text-[11px] text-ink-muted hover:text-pine flex items-center gap-1 font-mono"
                      >
                        <span>Ask Advisor</span>
                        <span>→</span>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
