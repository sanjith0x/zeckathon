import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useFinanceStore } from '../../store/useFinanceStore';
import { computeProfileMetrics } from '../../services/profileEngine';
import { formatINR } from '../../utils/formatters';
import { TAMIL_TRANSLATIONS } from '../../data/mockData';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { profile, categories, setLanguage, resetDemoData } = useFinanceStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const metrics = computeProfileMetrics(profile, categories);
  const isTamil = profile.language === 'ta';

  const t = (key: string, fallback: string) => {
    if (isTamil && TAMIL_TRANSLATIONS[key]) {
      return TAMIL_TRANSLATIONS[key];
    }
    return fallback;
  };

  const navLinks = [
    { path: '/', label: t('nav.landing', 'Overview') },
    { path: '/advisor', label: t('nav.advisor', 'Advisor (AI)'), highlight: true },
    { path: '/dashboard', label: t('nav.dashboard', 'Dashboard') },
    { path: '/budget', label: t('nav.budget', 'Budget') },
    { path: '/goals', label: t('nav.goals', 'Goals') },
    { path: '/markets', label: t('nav.markets', 'Markets') },
    { path: '/profile', label: t('nav.profile', 'Profile') },
  ];

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur-sm hairline-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Wordmark & Mark */}
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="w-8 h-8 rounded-btn bg-pine flex items-center justify-center text-paper font-serif font-bold text-lg shadow-sm group-hover:bg-pine-hover transition-colors">
              α
            </span>
            <div className="flex flex-col">
              <span className="font-serif text-xl font-bold tracking-tight text-ink leading-tight">
                Alpha<span className="italic font-normal text-pine">Seekers</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-ink-muted font-mono leading-none">
                Fintech Advisory
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const active = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-3 py-1.5 rounded-tag text-xs font-medium tracking-wide transition-colors ${
                    active
                      ? 'bg-paper-surface text-pine font-semibold shadow-sm'
                      : 'text-ink-muted hover:text-ink hover:bg-paper-surface/60'
                  } ${link.highlight ? 'relative pr-4' : ''}`}
                >
                  {link.label}
                  {link.highlight && (
                    <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-saffron" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Safe Spend Widget (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-paper-surface/80 rounded-btn hairline-all text-xs">
            <span className="text-ink-muted text-[11px]">Today's Safe Spend:</span>
            <span className="font-mono font-semibold text-pine">
              {formatINR(metrics.safeToSpendToday)}
            </span>
          </div>

          {/* Language Toggle */}
          <button
            onClick={() => setLanguage(isTamil ? 'en' : 'ta')}
            className="text-[11px] font-mono px-2.5 py-1 rounded-tag hairline-all hover:bg-paper-surface text-ink transition-colors"
            title="Toggle English / தமிழ்"
          >
            {isTamil ? 'தமிழ் (TA)' : 'English'}
          </button>

          {/* Reset Demo Button */}
          <button
            onClick={() => {
              if (confirm('Reset demo state to initial ₹48k Indian persona?')) {
                resetDemoData();
              }
            }}
            className="text-[11px] text-ink-muted hover:text-negative transition-colors px-2 py-1"
            title="Reset to default seeded demo state"
          >
            Reset Demo
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-ink hover:bg-paper-surface rounded-btn"
            aria-label="Toggle navigation menu"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              {mobileMenuOpen ? (
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-paper hairline-t px-4 pt-3 pb-5 space-y-1">
          {navLinks.map((link) => {
            const active = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-btn text-sm font-medium ${
                  active ? 'bg-pine text-paper' : 'text-ink hover:bg-paper-surface'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3 hairline-t mt-3 flex items-center justify-between text-xs text-ink-muted">
            <span>Today's Safe Spend:</span>
            <span className="font-mono font-semibold text-pine text-sm">
              {formatINR(metrics.safeToSpendToday)}
            </span>
          </div>
        </div>
      )}
    </header>
  );
};
