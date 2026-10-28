import React from 'react';
import { Link } from 'react-router-dom';
import { getMarketRates } from '../services/marketService';
import { SparkleIcon, ArrowRightIcon } from '../components/icons';

export const MarketsPage: React.FC = () => {
  const market = getMarketRates();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="label-subtle">06 / Live Telemetry Feeds</span>
            <span className="px-2 py-0.5 rounded-tag bg-warning-light text-warning text-[10px] font-mono font-semibold">
              Demo Data (RBI & NSE Feeds)
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-1">
            Rates & Benchmark Telemetry
          </h1>
          <p className="text-xs text-ink-muted mt-1 max-w-xl">
            Live macroeconomic markers anchored to India. Updated {market.lastUpdated}. AlphaSeekers uses these rates to ensure your savings comfortably outpace inflation.
          </p>
        </div>

        <Link
          to="/advisor"
          className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-btn bg-pine text-paper hover:bg-pine-hover text-xs font-semibold transition-colors shadow-sm self-start sm:self-auto"
        >
          <SparkleIcon size={14} />
          <span>Ask Advisor How Rates Affect You</span>
        </Link>
      </div>

      {/* Benchmark Overview Editorial Banner */}
      <div className="bg-paper-elevated p-6 rounded-card hairline-all shadow-editorial space-y-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="font-semibold text-pine">Macro Summary for Young Earners</span>
          <span className="text-ink-muted">As of Today</span>
        </div>
        <p className="text-sm font-serif text-ink leading-relaxed">
          "{market.benchmarkOverview}"
        </p>
      </div>

      {/* Grid of Rate Cards with Sparklines */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {market.rates.map((rate) => {
          const min = Math.min(...rate.sparkline);
          const max = Math.max(...rate.sparkline);
          const range = max - min || 1;

          // Build SVG points for sparkline
          const points = rate.sparkline
            .map((val, idx) => {
              const x = 10 + (idx / (rate.sparkline.length - 1)) * 140;
              const y = 35 - ((val - min) / range) * 25;
              return `${x},${y}`;
            })
            .join(' ');

          return (
            <div
              key={rate.id}
              className="bg-paper rounded-card hairline-all p-6 shadow-editorial flex flex-col justify-between space-y-6 hover:shadow-hover transition-all"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-mono text-ink-muted uppercase tracking-wider block">
                      {rate.category}
                    </span>
                    <h3 className="font-serif text-base font-bold text-ink mt-0.5">
                      {rate.name}
                    </h3>
                  </div>

                  {/* Change badge */}
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded-tag font-semibold ${
                      rate.isPositive
                        ? 'bg-positive-light text-positive'
                        : 'bg-warning-light text-warning'
                    }`}
                  >
                    {rate.change}
                  </span>
                </div>

                {/* Big figure + sparkline */}
                <div className="flex items-baseline justify-between mt-4">
                  <div className="font-mono text-3xl font-bold text-ink">
                    {rate.value}
                  </div>

                  {/* Sparkline SVG */}
                  <svg viewBox="0 0 160 40" className="w-28 h-8 text-pine">
                    <polyline
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={points}
                    />
                  </svg>
                </div>

                {/* Plain-English Note */}
                <div className="mt-4 p-3 bg-paper-surface/60 rounded-btn space-y-1">
                  <div className="text-[10px] font-mono text-pine uppercase font-semibold">
                    What this means for you:
                  </div>
                  <p className="text-xs text-ink leading-relaxed">
                    {rate.impactExplanation}
                  </p>
                </div>
              </div>

              <div className="pt-3 hairline-t flex items-center justify-between text-[11px] font-mono text-ink-faint">
                <span>Source: {rate.asOf}</span>
                <Link
                  to="/advisor"
                  className="text-pine font-semibold hover:underline flex items-center gap-1"
                >
                  <span>Chat</span>
                  <ArrowRightIcon size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Editorial Explainer: Why FDs vs Inflation Matters */}
      <div className="bg-paper-surface rounded-card hairline-all p-6 sm:p-8 space-y-4">
        <h3 className="font-serif text-xl font-bold text-ink">
          The Anatomy of Real Purchasing Power in India
        </h3>
        <p className="text-xs text-ink-muted leading-relaxed max-w-3xl">
          Nominal rates deceive young earners. If a Bank Fixed Deposit guarantees <strong>7.15%</strong>, and you pay <strong>20.8% tax</strong> on the interest income, your nominal in-hand yield drops to <strong>5.66%</strong>. With CPI food & service inflation at <strong>5.12%</strong>, your true real growth is only <strong>0.54%</strong>. This is why AlphaSeekers uses a dual engine: FDs for liquid safety, and low-cost Index Funds for beating inflation.
        </p>
      </div>
    </div>
  );
};
