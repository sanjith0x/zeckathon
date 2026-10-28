import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useFinanceStore } from '../store/useFinanceStore';
import { computeProfileMetrics } from '../services/profileEngine';
import { formatINR, formatEditorialDate } from '../utils/formatters';
import {
  SparkleIcon,
  PlusIcon,
  CloseIcon,
} from '../components/icons';

export const DashboardPage: React.FC = () => {
  const { profile, categories, transactions, leaks, resolveLeak, addTransaction } =
    useFinanceStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTx, setNewTx] = useState({
    merchant: '',
    category: 'Food Delivery',
    amount: '',
    type: 'debit' as 'debit' | 'credit',
    method: 'UPI' as const,
  });

  const metrics = computeProfileMetrics(profile, categories);

  const handleCreateTx = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAmount = Number(newTx.amount);
    if (!newTx.merchant || isNaN(parsedAmount) || parsedAmount <= 0) return;

    addTransaction({
      merchant: newTx.merchant,
      category: newTx.category,
      amount: parsedAmount,
      type: newTx.type,
      method: newTx.method,
      date: new Date().toISOString().split('T')[0],
    });

    setIsModalOpen(false);
    setNewTx({
      merchant: '',
      category: 'Food Delivery',
      amount: '',
      type: 'debit',
      method: 'UPI',
    });
  };

  // 6-Month Income vs Expense historical trend
  const historicalTrend = [
    { month: 'May', income: 45000, expense: 39500 },
    { month: 'Jun', income: 45000, expense: 41200 },
    { month: 'Jul', income: 48000, expense: 42000 },
    { month: 'Aug', income: 48000, expense: 38400 },
    { month: 'Sep', income: 48000, expense: 40100 },
    { month: 'Oct', income: 48000, expense: metrics.totalSpent },
  ];

  const maxVal = 55000;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Top Greeting & Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-6">
        <div>
          <span className="label-subtle">Financial Command Center</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-1">
            Good evening, {profile.name.split(' ')[0]}.
          </h1>
          <p className="text-xs text-ink-muted font-mono mt-1">
            October 2026 Cycle • {metrics.daysRemainingInMonth} days remaining • Bengaluru
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/advisor"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn bg-paper-surface hairline-all hover:bg-paper-surface/80 text-xs font-semibold text-pine transition-colors"
          >
            <SparkleIcon size={14} />
            <span>Consult Advisor</span>
          </Link>
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn bg-pine text-paper hover:bg-pine-hover text-xs font-semibold transition-colors shadow-sm"
          >
            <PlusIcon size={14} />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      {/* Hero Metric: Safe to Spend Today & Quick Runway Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Big Mono Safe to Spend Card (7 Cols) */}
        <div className="lg:col-span-7 bg-paper-elevated rounded-card hairline-all p-6 sm:p-8 shadow-editorial flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="label-subtle">Daily Burn Allowance</span>
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-tag bg-positive-light text-positive font-semibold">
                Paced for Month-End
              </span>
            </div>
            <div className="flex items-baseline gap-3">
              <div className="font-mono text-5xl sm:text-6xl font-bold text-ink tracking-tight">
                {formatINR(metrics.safeToSpendToday)}
              </div>
              <span className="text-xs text-ink-muted font-mono">/ day safe</span>
            </div>
            <p className="text-xs text-ink-muted mt-3 max-w-lg leading-relaxed">
              Calculated from your <strong>{formatINR(metrics.discretionaryRemaining)}</strong> remaining discretionary cushion divided across the <strong>{metrics.daysRemainingInMonth} days</strong> left in October. Spending within this preserves your ₹6,000 laptop goal contribution.
            </p>
          </div>

          <div className="pt-6 hairline-t mt-6 grid grid-cols-3 gap-4 text-xs font-mono">
            <div>
              <span className="text-ink-muted block text-[11px]">Monthly In-Hand</span>
              <span className="font-bold text-ink">{formatINR(profile.monthlyIncome)}</span>
            </div>
            <div>
              <span className="text-ink-muted block text-[11px]">Fixed Commitments</span>
              <span className="font-bold text-ink">{formatINR(metrics.totalFixed)}</span>
            </div>
            <div>
              <span className="text-ink-muted block text-[11px]">Discretionary Left</span>
              <span className="font-bold text-pine">{formatINR(metrics.discretionaryRemaining)}</span>
            </div>
          </div>
        </div>

        {/* 2 Vital Health Gauges (5 Cols) */}
        <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
          {/* Emergency Fund Runway */}
          <div className="bg-paper rounded-card hairline-all p-5 shadow-editorial flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="label-subtle">Emergency Buffer</span>
              <span className="font-mono text-xs text-pine font-bold">Target: 6.0 mo</span>
            </div>
            <div className="my-2">
              <div className="font-mono text-3xl font-bold text-pine">
                {metrics.emergencyRunwayMonths} <span className="text-sm font-normal text-ink-muted">months</span>
              </div>
              <p className="text-[11px] text-ink-muted mt-1">
                {formatINR(profile.emergencyFund)} in liquid FD covers your ₹21,716 fixed obligations.
              </p>
            </div>
            <div className="w-full bg-paper-surface h-2 rounded-full overflow-hidden">
              <div
                className="bg-pine h-full rounded-full"
                style={{ width: `${Math.min(100, (metrics.emergencyRunwayMonths / 6) * 100)}%` }}
              />
            </div>
          </div>

          {/* Savings Rate */}
          <div className="bg-paper rounded-card hairline-all p-5 shadow-editorial flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="label-subtle">Savings Rate</span>
              <span className="font-mono text-xs text-positive font-bold">50/30/20 Target: 20%</span>
            </div>
            <div className="my-2">
              <div className="font-mono text-3xl font-bold text-ink">
                {metrics.savingsRatePercent}%
              </div>
              <p className="text-[11px] text-ink-muted mt-1">
                ₹5,000 automated to Nifty 50 SIP and Recurring Deposit on salary day.
              </p>
            </div>
            <div className="w-full bg-paper-surface h-2 rounded-full overflow-hidden">
              <div
                className="bg-positive h-full rounded-full"
                style={{ width: `${Math.min(100, (metrics.savingsRatePercent / 20) * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mid Section: Custom Category Breakdown & 6-Month Income vs Expenses Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Category Breakdown (7 Cols) */}
        <div className="lg:col-span-7 bg-paper rounded-card hairline-all p-6 shadow-editorial space-y-6">
          <div className="flex items-center justify-between hairline-b pb-3">
            <div>
              <span className="label-subtle">October Spending</span>
              <h3 className="font-serif text-lg font-bold text-ink">Category Allocations</h3>
            </div>
            <Link to="/budget" className="text-xs font-mono text-pine hover:underline">
              Manage Caps →
            </Link>
          </div>

          {/* Custom SVG Horizontal Stacked Progress & Bars */}
          <div className="space-y-4">
            {categories.map((c) => {
              const percent = Math.min(100, Math.round((c.spent / c.allocated) * 100));
              const isOver = c.spent > c.allocated;

              return (
                <div key={c.id} className="space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-ink flex items-center gap-1.5">
                      <span
                        className="w-2 h-2 rounded-full inline-block"
                        style={{ backgroundColor: c.color }}
                      />
                      {c.name}
                    </span>
                    <span className="font-mono text-ink">
                      <strong>{formatINR(c.spent)}</strong> / {formatINR(c.allocated)}
                      <span
                        className={`ml-2 text-[10px] font-semibold ${
                          isOver ? 'text-negative' : 'text-ink-muted'
                        }`}
                      >
                        ({percent}%)
                      </span>
                    </span>
                  </div>
                  <div className="w-full bg-paper-surface h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, percent)}%`,
                        backgroundColor: isOver ? '#B83A3A' : c.color,
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 6-Month Income vs Expense Trend (5 Cols) */}
        <div className="lg:col-span-5 bg-paper rounded-card hairline-all p-6 shadow-editorial flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between hairline-b pb-3">
              <div>
                <span className="label-subtle">Historical Discipline</span>
                <h3 className="font-serif text-lg font-bold text-ink">6-Month Trend</h3>
              </div>
              <div className="flex items-center gap-3 text-[10px] font-mono">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-pine inline-block" />
                  Income
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-warning inline-block" />
                  Expense
                </span>
              </div>
            </div>

            {/* Custom SVG Bar Chart */}
            <div className="pt-6">
              <svg viewBox="0 0 320 180" className="w-full h-44">
                {/* Baseline rules */}
                <line x1="10" y1="150" x2="310" y2="150" stroke="rgba(20, 32, 27, 0.1)" strokeWidth="1" />
                <line x1="10" y1="90" x2="310" y2="90" stroke="rgba(20, 32, 27, 0.05)" strokeDasharray="2 2" />
                <line x1="10" y1="30" x2="310" y2="30" stroke="rgba(20, 32, 27, 0.05)" strokeDasharray="2 2" />

                {historicalTrend.map((d, i) => {
                  const x = 30 + i * 48;
                  const incomeH = (d.income / maxVal) * 120;
                  const expenseH = (d.expense / maxVal) * 120;

                  return (
                    <g key={i}>
                      {/* Income Bar */}
                      <rect
                        x={x}
                        y={150 - incomeH}
                        width="14"
                        height={incomeH}
                        fill="#0F4C3A"
                        rx="2"
                      />
                      {/* Expense Bar */}
                      <rect
                        x={x + 16}
                        y={150 - expenseH}
                        width="14"
                        height={expenseH}
                        fill="#C96528"
                        rx="2"
                      />
                      {/* Month label */}
                      <text
                        x={x + 15}
                        y="168"
                        textAnchor="middle"
                        fontSize="10"
                        fontFamily="JetBrains Mono"
                        fill="#5C6A64"
                      >
                        {d.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          <div className="pt-4 hairline-t text-xs text-ink-muted">
            Average monthly surplus over 6 months: <strong>₹7,400</strong>. Consistent compounding discipline.
          </div>
        </div>
      </div>

      {/* Bottom Section: Spending Leaks Panel & Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Detected Spending Leaks (6 Cols) */}
        <div className="lg:col-span-6 bg-paper rounded-card hairline-all p-6 shadow-editorial space-y-4">
          <div className="flex items-center justify-between hairline-b pb-3">
            <div>
              <span className="label-subtle">Micro-Waste Telemetry</span>
              <h3 className="font-serif text-lg font-bold text-ink">Detected Leaks</h3>
            </div>
            <span className="text-xs font-mono text-warning font-semibold">
              3 active leaks
            </span>
          </div>

          <div className="space-y-3">
            {leaks.map((leak) => (
              <div
                key={leak.id}
                className={`p-4 rounded-btn hairline-all transition-colors ${
                  leak.fixed ? 'bg-positive/5 opacity-60' : 'bg-paper-surface/60'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-xs font-bold text-ink flex items-center gap-1.5">
                      {leak.title}
                      {leak.fixed && (
                        <span className="text-[10px] font-mono text-positive bg-positive/10 px-1.5 py-0.2 rounded-tag">
                          Fixed
                        </span>
                      )}
                    </h4>
                    <p className="text-xs text-ink-muted mt-1 leading-relaxed">
                      {leak.description}
                    </p>
                    <div className="text-[11px] font-mono text-pine mt-2">
                      💡 {leak.recommendedAction}
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-mono text-xs font-bold text-negative block">
                      -{formatINR(leak.monthlyLoss)}/mo
                    </span>
                    {!leak.fixed && (
                      <button
                        onClick={() => resolveLeak(leak.id)}
                        className="mt-2 text-[11px] font-semibold text-pine bg-paper px-2.5 py-1 rounded-tag hairline-all hover:bg-pine hover:text-paper transition-colors"
                      >
                        Fix this
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions List (6 Cols) */}
        <div className="lg:col-span-6 bg-paper rounded-card hairline-all p-6 shadow-editorial space-y-4">
          <div className="flex items-center justify-between hairline-b pb-3">
            <div>
              <span className="label-subtle">Statement Telemetry</span>
              <h3 className="font-serif text-lg font-bold text-ink">Recent Activity</h3>
            </div>
            <span className="text-xs font-mono text-ink-muted">
              UPI • Auto-Debit
            </span>
          </div>

          <div className="divide-y divide-paper-border overflow-hidden">
            {transactions.slice(0, 6).map((tx) => {
              const isCredit = tx.type === 'credit';
              return (
                <div key={tx.id} className="py-3 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-medium text-ink">{tx.merchant}</div>
                    <div className="text-[11px] text-ink-muted font-mono flex items-center gap-1.5 mt-0.5">
                      <span>{formatEditorialDate(tx.date)}</span>
                      <span>•</span>
                      <span>{tx.category}</span>
                      <span>•</span>
                      <span className="text-pine font-semibold">{tx.method}</span>
                    </div>
                  </div>
                  <div
                    className={`font-mono text-sm font-semibold ${
                      isCredit ? 'text-positive' : 'text-ink'
                    }`}
                  >
                    {isCredit ? '+' : '-'}{formatINR(tx.amount)}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Add Transaction Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-paper rounded-card hairline-all shadow-editorial max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between hairline-b pb-3">
              <h3 className="font-serif text-lg font-bold text-ink">Add Transaction</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-ink-muted hover:text-ink p-1"
              >
                <CloseIcon size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateTx} className="space-y-4 text-xs">
              <div>
                <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                  Merchant / Payee Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Swiggy, Zepto, BESCOM, Uber"
                  value={newTx.merchant}
                  onChange={(e) => setNewTx({ ...newTx, merchant: e.target.value })}
                  className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="480"
                    value={newTx.amount}
                    onChange={(e) => setNewTx({ ...newTx, amount: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                    Category
                  </label>
                  <select
                    value={newTx.category}
                    onChange={(e) => setNewTx({ ...newTx, category: e.target.value })}
                    className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink text-xs"
                  >
                    <option value="Food Delivery">Food Delivery</option>
                    <option value="Groceries">Groceries</option>
                    <option value="Commute">Commute</option>
                    <option value="Weekend Outings">Weekend Outings</option>
                    <option value="Bills & Wi-Fi">Bills & Wi-Fi</option>
                    <option value="Subscriptions">Subscriptions</option>
                    <option value="Investments">Investments</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                    Type
                  </label>
                  <select
                    value={newTx.type}
                    onChange={(e) => setNewTx({ ...newTx, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink text-xs"
                  >
                    <option value="debit">Debit (Expense)</option>
                    <option value="credit">Credit (Income)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                    Payment Method
                  </label>
                  <select
                    value={newTx.method}
                    onChange={(e) => setNewTx({ ...newTx, method: e.target.value as any })}
                    className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink text-xs"
                  >
                    <option value="UPI">UPI</option>
                    <option value="Auto-debit">Auto-debit</option>
                    <option value="Card">Card</option>
                    <option value="Salary">Salary Transfer</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-btn hairline-all text-ink hover:bg-paper-surface"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-btn bg-pine text-paper font-semibold hover:bg-pine-hover"
                >
                  Record Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
