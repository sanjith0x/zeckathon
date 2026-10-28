import React from 'react';
import { Link } from 'react-router-dom';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-paper-surface hairline-t mt-20 text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-6 rounded-btn bg-pine flex items-center justify-center text-paper font-serif text-sm">
                α
              </span>
              <span className="font-serif text-lg font-bold tracking-tight">
                Alpha<span className="italic font-normal text-pine">Seekers</span>
              </span>
            </div>
            <p className="text-sm text-ink-muted max-w-md leading-relaxed">
              Conversational money advice built for young Indian earners. Talks in plain words, adapts as life changes, handles objections with transparent math, and turns advice into real financial action.
            </p>
            <div className="mt-4 flex items-center gap-3 text-xs font-mono text-ink-faint">
              <span>INR Currency (₹)</span>
              <span>•</span>
              <span>UPI & SIP Telemetry</span>
              <span>•</span>
              <span>Gemini AI Engine</span>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold font-mono text-ink-muted mb-3">
              Core Architecture
            </h4>
            <ul className="space-y-2 text-xs text-ink-muted">
              <li>01. Natural Voice Engine</li>
              <li>02. Intent & Objection Detection</li>
              <li>03. Financial Profile Engine</li>
              <li>04. Live Financial Data</li>
              <li>05. Next-Best-Action Engine</li>
              <li>06. Action Engine</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-wider font-semibold font-mono text-ink-muted mb-3">
              Explore Pages
            </h4>
            <ul className="space-y-2 text-xs text-ink">
              <li>
                <Link to="/advisor" className="hover:text-pine transition-colors">
                  AI Advisor Chat
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="hover:text-pine transition-colors">
                  Financial Dashboard
                </Link>
              </li>
              <li>
                <Link to="/budget" className="hover:text-pine transition-colors">
                  50/30/20 Budget Planner
                </Link>
              </li>
              <li>
                <Link to="/goals" className="hover:text-pine transition-colors">
                  Goals & What-if Engine
                </Link>
              </li>
              <li>
                <Link to="/markets" className="hover:text-pine transition-colors">
                  Live RBI & Market Rates
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory & Hackathon Disclaimer */}
        <div className="hairline-t pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[11px] text-ink-muted">
          <p className="max-w-2xl leading-relaxed">
            <strong className="font-semibold text-ink">Demo Disclaimer:</strong> AlphaSeekers is an illustrative prototype created for hackathon demonstration. It is not registered with SEBI as an Investment Adviser or Research Analyst. Mutual fund investments are subject to market risks. All figures and calculations are illustrative.
          </p>
          <div className="font-mono text-right shrink-0">
            <span>Built by Team AlphaSeekers • 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
