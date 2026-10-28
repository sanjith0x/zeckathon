import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon, SparkleIcon, CheckIcon } from '../components/icons';

export const LandingPage: React.FC = () => {
  const [activeObjectionIndex, setActiveObjectionIndex] = useState(0);

  const objectionShowcases = [
    {
      objection: '"I only earn ₹48,000 and have nothing left to save at month-end."',
      advisorReply:
        'We never squeeze essentials. You have ₹21,716 in fixed rent and EMI. The gap is ₹1,450 spent on food delivery surge fees and an unused ₹499 streaming sub. Reclaiming those gives you ₹1,949/month without eating less or canceling weekend plans.',
      metric: '₹23,388/yr reclaimed',
      pillar: 'Objection Handling with Numbers',
    },
    {
      objection: '"Is a SIP actually safe? What if the market crashes tomorrow?"',
      advisorReply:
        'A SIP is not zero-risk, but keeping cash in a 3% savings account is a guaranteed 2.1% loss to inflation every single year. We lock your 2.2-month emergency cushion (₹48,000) safe in a bank deposit. Only money you do not need for 3+ years touches low-cost index funds.',
      metric: 'Zero emergency money at risk',
      pillar: 'Transparent Risk Calibration',
    },
    {
      objection: '"Why shouldn\'t I just put everything into a Bank FD like my parents do?"',
      advisorReply:
        'Top 1-Year FDs offer 7.15%. But after your 20% slab tax, you take home 5.66%. With inflation at 5.12%, your real annual growth is just 0.54%—₹270 real gain on ₹50,000. FDs are great for buffers, but index compounding is what actually builds financial freedom.',
      metric: '+0.54% real post-tax yield in FD',
      pillar: 'Clear Opportunity Cost Math',
    },
  ];

  const pipelineSteps = [
    {
      number: '01',
      title: 'Natural Voice Engine',
      action: 'Listen in plain tongue',
      description: 'You speak or type in everyday Indian context—UPI spends, college loan EMIs, rent, Swiggy orders. No financial jargon required.',
      diagram: (
        <svg viewBox="0 0 120 40" className="w-28 h-10 text-pine" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 20 Q 35 5, 60 20 T 110 20" strokeLinecap="round" />
          <circle cx="60" cy="20" r="4" fill="currentColor" />
          <path d="M45 15 L45 25 M75 12 L75 28 M90 17 L90 23" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: '02',
      title: 'Intent & Objection Detection',
      action: 'Detect pushback & fear',
      description: 'Understands when you say "I cannot afford this" or "is this safe?". Rather than repeating itself, it isolates the exact constraint.',
      diagram: (
        <svg viewBox="0 0 120 40" className="w-28 h-10 text-pine" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="15" y="8" width="90" height="24" rx="4" />
          <path d="M30 20h40M75 16l8 4-8 4" strokeLinecap="round" />
          <circle cx="24" cy="20" r="2.5" fill="currentColor" />
        </svg>
      ),
    },
    {
      number: '03',
      title: 'Financial Profile Engine',
      action: 'Telemetry & cashflow math',
      description: 'Calculates your true disposable income, emergency runway in months, safe daily spending limit, and fixed obligation ratio.',
      diagram: (
        <svg viewBox="0 0 120 40" className="w-28 h-10 text-pine" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="20" y="10" width="35" height="20" rx="3" />
          <rect x="65" y="10" width="35" height="20" rx="3" />
          <path d="M55 20h10" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      number: '04',
      title: 'Live Financial Data',
      action: 'Real benchmarks & rates',
      description: 'Pulls current RBI repo rate (6.50%), 1-Yr FD yields, Nifty 50 benchmarks, and CPI inflation (5.12%) to ground every suggestion in reality.',
      diagram: (
        <svg viewBox="0 0 120 40" className="w-28 h-10 text-pine" fill="none" stroke="currentColor" strokeWidth="1.5">
          <polyline points="15,28 45,22 75,14 105,8" strokeLinecap="round" />
          <circle cx="105" cy="8" r="3" fill="currentColor" />
        </svg>
      ),
    },
    {
      number: '05',
      title: 'Next-Best-Action Engine',
      action: 'Synthesize optimal step',
      description: 'Formulates a singular, high-leverage move: cap a leaky category, commit ₹6k to your laptop goal, or initiate an index SIP.',
      diagram: (
        <svg viewBox="0 0 120 40" className="w-28 h-10 text-pine" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="60" cy="20" r="14" strokeDasharray="3 3" />
          <circle cx="60" cy="20" r="6" fill="currentColor" fillOpacity="0.2" />
          <circle cx="60" cy="20" r="2" fill="currentColor" />
        </svg>
      ),
    },
    {
      number: '06',
      title: 'Action Engine',
      action: 'Commits state & tracks progress',
      description: 'One tap executes the advice: writes to your live budget, sets a target date on your goal, and recalibrates your safe daily burn.',
      diagram: (
        <svg viewBox="0 0 120 40" className="w-28 h-10 text-pine" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="30" y="8" width="60" height="24" rx="6" />
          <polyline points="50,20 58,24 72,16" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div className="relative">
      {/* HERO SECTION */}
      <section className="pt-12 pb-20 md:pt-20 md:pb-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Copy */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-paper-surface rounded-tag hairline-all text-xs font-mono text-pine">
              <span className="w-1.5 h-1.5 rounded-full bg-saffron" />
              <span>AI-Powered Financial Advisor for India</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-ink leading-[1.08]">
              Money advice that <span className="italic font-normal text-pine underline decoration-saffron decoration-wavy decoration-1 underline-offset-8">listens</span> first.
            </h1>

            <p className="text-lg text-ink-muted max-w-xl leading-relaxed">
              Most money apps expect you to decode spreadsheets and jargon. AlphaSeekers understands your real voice, adapts to your actual UPI cashflow, explains why with transparent numbers, and turns advice into concrete actions.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/advisor"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-btn bg-pine text-paper font-medium text-sm hover:bg-pine-hover shadow-sm transition-all"
              >
                <span>Start talking to Advisor</span>
                <ArrowRightIcon size={16} />
              </Link>
              <a
                href="#how-it-thinks"
                className="inline-flex items-center justify-center px-6 py-3.5 rounded-btn hairline-all text-ink hover:bg-paper-surface text-sm font-medium transition-colors"
              >
                See how it thinks
              </a>
            </div>

            <div className="pt-4 flex items-center gap-6 text-xs text-ink-muted font-mono">
              <div className="flex items-center gap-1.5">
                <CheckIcon size={14} className="text-positive" />
                <span>Zero sales commissions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckIcon size={14} className="text-positive" />
                <span>Deterministic fallback</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckIcon size={14} className="text-positive" />
                <span>Plain Indian context</span>
              </div>
            </div>
          </div>

          {/* Right Column: Live-looking rotated product preview (Pure HTML/CSS) */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none transform md:rotate-1 hover:rotate-0 transition-transform duration-300">
              {/* Product preview card */}
              <div className="bg-paper-elevated rounded-card hairline-all shadow-editorial p-5 space-y-4">
                {/* Header label */}
                <div className="flex items-center justify-between hairline-b pb-3 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-positive" />
                    <span className="font-mono text-ink-muted text-[11px]">Live Session Telemetry</span>
                  </div>
                  <span className="font-mono text-[11px] text-ink-faint">Bengaluru • ₹48k/mo</span>
                </div>

                {/* User Message Snippet */}
                <div className="flex justify-end">
                  <div className="bg-paper-surface hairline-all rounded-btn px-4 py-2.5 max-w-[85%] text-xs text-ink leading-relaxed">
                    "I earn ₹48,000 and can't seem to save for the ₹1.2L MacBook."
                  </div>
                </div>

                {/* Advisor Response Snippet */}
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-pine font-semibold">
                    <SparkleIcon size={14} />
                    <span>ALPHASEEKERS ADVISOR</span>
                  </div>
                  <p className="text-xs text-ink leading-relaxed">
                    You have <strong>₹26,284 disposable cash</strong> after rent and loan EMI. The friction is ₹1,450 leaked on Swiggy surge delivery. If we cap food at ₹6,000, you hit your MacBook goal in 10 months.
                  </p>

                  {/* Real mini budget card inside preview */}
                  <div className="bg-paper rounded-btn p-3 hairline-all space-y-2">
                    <div className="flex items-center justify-between text-[11px] font-mono">
                      <span className="text-ink-muted">Actionable Adjustment</span>
                      <span className="text-positive font-semibold">+₹1,450/mo freed</span>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs">
                        <span className="text-ink">Food Delivery Cap</span>
                        <span className="font-mono font-semibold">₹6,000/mo</span>
                      </div>
                      <div className="w-full bg-paper-surface h-1.5 rounded-full overflow-hidden">
                        <div className="bg-pine h-full rounded-full" style={{ width: '70%' }} />
                      </div>
                    </div>
                    <div className="flex justify-between text-xs pt-1">
                      <span className="text-ink">Dedicated Laptop RD</span>
                      <span className="font-mono text-pine font-semibold">₹6,000/mo</span>
                    </div>
                  </div>

                  {/* Action button inside preview */}
                  <div className="pt-1">
                    <div className="w-full py-2 bg-pine text-paper rounded-btn text-center text-xs font-medium cursor-default">
                      Commit this plan to Budget
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative side stamp */}
              <div className="hidden sm:block absolute -bottom-4 -left-4 bg-paper px-3 py-1.5 rounded-tag hairline-all shadow-sm text-[11px] font-mono text-ink-muted">
                Runway: 2.2 months
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section className="py-16 bg-paper-surface hairline-t hairline-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="label-subtle">01 / The Money Dilemma</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-2 leading-tight">
              Young earners do not lack money. They lack guidance that accounts for their real lives.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-paper p-6 rounded-card hairline-all space-y-3">
              <div className="font-mono text-4xl sm:text-5xl font-bold text-pine tracking-tight">
                73%
              </div>
              <h3 className="font-serif text-base font-semibold text-ink">
                Rely on generic rules of thumb
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Generic "save 20%" advice fails when student loans and metropolitan rents consume 45% of first-year salary.
              </p>
              <div className="text-[10px] font-mono text-ink-faint pt-1">
                Illustrative benchmark: Young Earner Survey 2026
              </div>
            </div>

            <div className="bg-paper p-6 rounded-card hairline-all space-y-3">
              <div className="font-mono text-4xl sm:text-5xl font-bold text-warning tracking-tight">
                2.1%
              </div>
              <h3 className="font-serif text-base font-semibold text-ink">
                Annual loss to real purchasing power
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                With savings accounts paying 3% and CPI inflation at 5.12%, sitting in "safe" cash actively destroys wealth.
              </p>
              <div className="text-[10px] font-mono text-ink-faint pt-1">
                Based on MoSPI CPI & RBI Savings Rates
              </div>
            </div>

            <div className="bg-paper p-6 rounded-card hairline-all space-y-3">
              <div className="font-mono text-4xl sm:text-5xl font-bold text-ink tracking-tight">
                ₹1,450
              </div>
              <h3 className="font-serif text-base font-semibold text-ink">
                Average monthly leak in micro-friction
              </h3>
              <p className="text-xs text-ink-muted leading-relaxed">
                Rain surcharges, surge deliveries, and duplicate OTT services erode margins without people realizing where it went.
              </p>
              <div className="text-[10px] font-mono text-ink-faint pt-1">
                Sampled from urban UPI & delivery data
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW ALPHASEEKERS THINKS (PIPELINE TIMELINE) */}
      <section id="how-it-thinks" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-2xl mb-14">
          <span className="label-subtle">02 / Architecture & Thought Flow</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-2">
            How AlphaSeekers thinks through your money
          </h2>
          <p className="text-sm text-ink-muted mt-3">
            Every conversation travels through six distinct engines. Advice is never a generic chatbot guess; it is calculated financial engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pipelineSteps.map((step) => (
            <div
              key={step.number}
              className="bg-paper-elevated p-6 rounded-card hairline-all flex flex-col justify-between hover:bg-paper-surface/50 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-pine bg-pine-light px-2 py-0.5 rounded-tag">
                    {step.number}
                  </span>
                  <div className="text-ink-muted">{step.diagram}</div>
                </div>
                <h3 className="font-serif text-lg font-bold text-ink mb-1">
                  {step.title}
                </h3>
                <div className="text-xs font-mono text-pine font-medium mb-3">
                  {step.action}
                </div>
                <p className="text-xs text-ink-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
              <div className="pt-4 hairline-t mt-4 text-[11px] font-mono text-ink-faint">
                Engine: {step.title}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FIVE THINGS IT DOES DIFFERENTLY (INTERACTIVE EDITORIAL) */}
      <section className="py-20 bg-paper-surface hairline-t hairline-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-left max-w-2xl mb-12">
            <span className="label-subtle">03 / The Five Pillars</span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-2">
              Five things AlphaSeekers does differently
            </h2>
            <p className="text-sm text-ink-muted mt-2">
              Click an objection below to see how our objection-handling engine responds with numbers rather than repetition.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left selector */}
            <div className="lg:col-span-5 space-y-3">
              {objectionShowcases.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveObjectionIndex(idx)}
                  className={`w-full text-left p-4 rounded-btn hairline-all transition-all ${
                    activeObjectionIndex === idx
                      ? 'bg-paper shadow-editorial border-pine'
                      : 'bg-paper/40 hover:bg-paper/70'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-mono text-ink-muted mb-1">
                    <span>Pillar Showcase #{idx + 1}</span>
                    <span className="text-pine font-semibold">{item.pillar}</span>
                  </div>
                  <p className="text-xs font-medium text-ink italic">
                    {item.objection}
                  </p>
                </button>
              ))}

              <div className="p-4 bg-paper rounded-btn hairline-all text-xs text-ink-muted space-y-2 mt-4">
                <div className="font-mono text-pine font-semibold text-[11px] uppercase tracking-wider">
                  The Core Philosophy
                </div>
                <p className="leading-relaxed">
                  When a user says "I don't trust this" or "Why not just FD?", standard AI prompts apologize and repeat the same advice. AlphaSeekers acknowledges the human emotion, calculates the opportunity cost with math, and presents a safer hybrid alternative.
                </p>
              </div>
            </div>

            {/* Right response viewer */}
            <div className="lg:col-span-7 bg-paper p-7 rounded-card hairline-all shadow-editorial space-y-6">
              <div className="flex items-center justify-between hairline-b pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-saffron" />
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-ink">
                    Transparent Objection Resolution
                  </span>
                </div>
                <span className="font-mono text-xs text-positive font-bold">
                  {objectionShowcases[activeObjectionIndex].metric}
                </span>
              </div>

              <div>
                <span className="text-[11px] font-mono text-ink-muted uppercase tracking-wider">
                  User pushback:
                </span>
                <p className="font-serif text-lg font-bold text-ink italic mt-1">
                  {objectionShowcases[activeObjectionIndex].objection}
                </p>
              </div>

              <div className="bg-paper-surface/70 p-4 rounded-btn hairline-all space-y-2">
                <span className="text-[11px] font-mono text-pine uppercase font-semibold">
                  Advisor reasoning:
                </span>
                <p className="text-sm text-ink leading-relaxed">
                  {objectionShowcases[activeObjectionIndex].advisorReply}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="text-xs font-mono text-ink-muted">
                  Pipeline Step: Intent & Objection Detection → Math Resolution
                </div>
                <Link
                  to="/advisor"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-pine hover:text-pine-hover"
                >
                  <span>Try your own question in chat</span>
                  <ArrowRightIcon size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OUTCOMES / LEDGER SECTION */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left max-w-2xl mb-12">
          <span className="label-subtle">04 / Measurable Benefits</span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-2">
            The measurable outcomes of conversational guidance
          </h2>
        </div>

        {/* Ledger-style table */}
        <div className="bg-paper rounded-card hairline-all overflow-hidden shadow-editorial">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-paper-surface hairline-b text-ink-muted font-mono uppercase text-[11px]">
                  <th className="py-3.5 px-4 font-semibold">Dimension</th>
                  <th className="py-3.5 px-4 font-semibold">Traditional Apps</th>
                  <th className="py-3.5 px-4 font-semibold text-pine">AlphaSeekers Advisor</th>
                  <th className="py-3.5 px-4 font-semibold">Real-world Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-paper-border">
                <tr className="hover:bg-paper-surface/40 transition-colors">
                  <td className="py-4 px-4 font-serif font-bold text-sm text-ink">Smart Budgeting</td>
                  <td className="py-4 px-4 text-ink-muted">Rigid 50/30/20 templates that do not fit loans</td>
                  <td className="py-4 px-4 font-medium text-pine">Dynamic categories that adjust to rent & EMIs</td>
                  <td className="py-4 px-4 font-mono text-ink">Zero unrealistic budget guilt</td>
                </tr>
                <tr className="hover:bg-paper-surface/40 transition-colors">
                  <td className="py-4 px-4 font-serif font-bold text-sm text-ink">Objection Handling</td>
                  <td className="py-4 px-4 text-ink-muted">Ignored or repeated verbatim</td>
                  <td className="py-4 px-4 font-medium text-pine">Acknowledges fear first, counters with numbers</td>
                  <td className="py-4 px-4 font-mono text-ink">Transparent confidence</td>
                </tr>
                <tr className="hover:bg-paper-surface/40 transition-colors">
                  <td className="py-4 px-4 font-serif font-bold text-sm text-ink">Live Data Retrieval</td>
                  <td className="py-4 px-4 text-ink-muted">Static assumptions (e.g. fixed 8% return)</td>
                  <td className="py-4 px-4 font-medium text-pine">Live RBI repo rate, bank FD yields, CPI inflation</td>
                  <td className="py-4 px-4 font-mono text-ink">Accurate post-tax projections</td>
                </tr>
                <tr className="hover:bg-paper-surface/40 transition-colors">
                  <td className="py-4 px-4 font-serif font-bold text-sm text-ink">Real Actions</td>
                  <td className="py-4 px-4 text-ink-muted">Passive graphs and pie charts</td>
                  <td className="py-4 px-4 font-medium text-pine">Single-click commits to live budget and goals</td>
                  <td className="py-4 px-4 font-mono text-ink">Advice becomes execution</td>
                </tr>
                <tr className="hover:bg-paper-surface/40 transition-colors">
                  <td className="py-4 px-4 font-serif font-bold text-sm text-ink">Financial Awareness</td>
                  <td className="py-4 px-4 text-ink-muted">Complex financial terminology</td>
                  <td className="py-4 px-4 font-medium text-pine">Plain language conversation (English + தமிழ்)</td>
                  <td className="py-4 px-4 font-mono text-ink">Everyday comprehension</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* FINAL CTA ON DARK INK SECTION */}
      <section className="bg-ink text-paper py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="font-mono text-xs uppercase tracking-widest text-saffron">
            Hackathon Demo Ready
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight leading-tight">
            Take control of your money with an advisor that actually understands you.
          </h2>
          <p className="text-sm sm:text-base text-paper/80 max-w-2xl mx-auto leading-relaxed">
            Test the live pipeline: natural voice or text, objection handling, live rate checks, and real budget actions.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/advisor"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-btn bg-saffron text-ink font-semibold text-sm hover:bg-saffron-hover transition-colors shadow-hover"
            >
              <span>Launch AI Advisor</span>
              <ArrowRightIcon size={16} />
            </Link>
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 rounded-btn border border-paper/30 text-paper hover:bg-paper/10 text-sm font-medium transition-colors"
            >
              View Financial Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
