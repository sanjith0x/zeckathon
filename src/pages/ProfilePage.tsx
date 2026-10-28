import React, { useState } from 'react';
import { useFinanceStore } from '../store/useFinanceStore';
import type { RiskComfort, Language } from '../types/finance';
import { CheckIcon } from '../components/icons';

export const ProfilePage: React.FC = () => {
  const { profile, updateProfile, resetDemoData, setLanguage } = useFinanceStore();

  const [formData, setFormData] = useState({
    name: profile.name,
    age: profile.age,
    city: profile.city,
    occupation: profile.occupation,
    monthlyIncome: profile.monthlyIncome,
    rent: profile.fixedExpenses.rent,
    emi: profile.fixedExpenses.emi,
    utilities: profile.fixedExpenses.utilities,
    subscriptions: profile.fixedExpenses.subscriptions,
    currentSavings: profile.currentSavings,
    emergencyFund: profile.emergencyFund,
    riskComfort: profile.riskComfort,
    language: profile.language,
  });

  const [savedNotice, setSavedNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      name: formData.name,
      age: Number(formData.age),
      city: formData.city,
      occupation: formData.occupation,
      monthlyIncome: Number(formData.monthlyIncome),
      fixedExpenses: {
        rent: Number(formData.rent),
        emi: Number(formData.emi),
        utilities: Number(formData.utilities),
        subscriptions: Number(formData.subscriptions),
      },
      currentSavings: Number(formData.currentSavings),
      emergencyFund: Number(formData.emergencyFund),
      riskComfort: formData.riskComfort as RiskComfort,
      language: formData.language as Language,
    });

    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 hairline-b pb-6">
        <div>
          <span className="label-subtle">07 / User Calibration</span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-ink mt-1">
            Financial Profile & Settings
          </h1>
          <p className="text-xs text-ink-muted mt-1">
            Calibrate your income, obligations, and risk mindset. Changes immediately update your live safe-spend figure and advisor answers.
          </p>
        </div>

        {savedNotice && (
          <div className="px-3 py-1.5 bg-positive-light text-positive rounded-tag text-xs font-mono font-semibold flex items-center gap-1.5 animate-fade-in">
            <CheckIcon size={14} />
            <span>Profile Synchronized</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Persona */}
        <div className="bg-paper rounded-card hairline-all p-6 shadow-editorial space-y-4">
          <h3 className="font-serif text-base font-bold text-ink hairline-b pb-2">
            Persona & Context
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink text-sm font-sans"
              />
            </div>
            <div>
              <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                City / Location
              </label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink text-sm font-sans"
              />
            </div>
            <div>
              <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                Occupation / Role
              </label>
              <input
                type="text"
                value={formData.occupation}
                onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink text-sm font-sans"
              />
            </div>
            <div>
              <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                Age
              </label>
              <input
                type="number"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Cashflow & Fixed Obligations */}
        <div className="bg-paper rounded-card hairline-all p-6 shadow-editorial space-y-4">
          <h3 className="font-serif text-base font-bold text-ink hairline-b pb-2">
            Monthly In-Hand & Fixed Burn (INR ₹)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                Monthly In-Hand Salary (Post-PF)
              </label>
              <input
                type="number"
                value={formData.monthlyIncome}
                onChange={(e) =>
                  setFormData({ ...formData, monthlyIncome: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink font-mono text-sm"
              />
            </div>
            <div>
              <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                House Rent / Maintenance
              </label>
              <input
                type="number"
                value={formData.rent}
                onChange={(e) => setFormData({ ...formData, rent: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink font-mono text-sm"
              />
            </div>
            <div>
              <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                Education / Vehicle Loan EMI
              </label>
              <input
                type="number"
                value={formData.emi}
                onChange={(e) => setFormData({ ...formData, emi: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink font-mono text-sm"
              />
            </div>
            <div>
              <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                Electricity, Gas & Broadband
              </label>
              <input
                type="number"
                value={formData.utilities}
                onChange={(e) =>
                  setFormData({ ...formData, utilities: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink font-mono text-sm"
              />
            </div>
            <div>
              <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                Active Streaming Subscriptions
              </label>
              <input
                type="number"
                value={formData.subscriptions}
                onChange={(e) =>
                  setFormData({ ...formData, subscriptions: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink font-mono text-sm"
              />
            </div>
            <div>
              <label className="block font-mono text-ink-muted uppercase text-[10px] mb-1">
                Emergency Fund Buffer (in FD / Liquid)
              </label>
              <input
                type="number"
                value={formData.emergencyFund}
                onChange={(e) =>
                  setFormData({ ...formData, emergencyFund: Number(e.target.value) })
                }
                className="w-full px-3 py-2 bg-paper-surface rounded-btn hairline-all focus:outline-none focus:border-pine text-ink font-mono text-sm"
              />
            </div>
          </div>
        </div>

        {/* Plain-Language Risk Comfort */}
        <div className="bg-paper rounded-card hairline-all p-6 shadow-editorial space-y-4">
          <h3 className="font-serif text-base font-bold text-ink hairline-b pb-2">
            Risk Comfort Mindset (Plain Language)
          </h3>
          <p className="text-xs text-ink-muted leading-relaxed">
            Choose what best describes your psychological relationship with volatility. No financial acronyms.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                id: 'conservative',
                title: 'Peace of Mind First',
                tag: 'Zero Market Drops',
                description:
                  'I get anxious if my account balance dips even 2%. I prioritize bank FDs, post office PPF, and guaranteed capital safety above all else.',
              },
              {
                id: 'balanced',
                title: 'Balanced Growth',
                tag: 'Recommended (Young Earner)',
                description:
                  'Keep my emergency fund 100% safe in bank deposits, but put monthly surplus into low-cost Nifty index funds to beat 5.1% inflation.',
              },
              {
                id: 'growth',
                title: 'Long-Term Compounding',
                tag: 'High Horizon Focus',
                description:
                  'I am 24 with decades ahead. I can easily stomach market swings of -15% because I am investing for 7+ years into equity indices.',
              },
            ].map((opt) => (
              <label
                key={opt.id}
                onClick={() => setFormData({ ...formData, riskComfort: opt.id as any })}
                className={`p-4 rounded-btn hairline-all cursor-pointer transition-all flex flex-col justify-between ${
                  formData.riskComfort === opt.id
                    ? 'bg-paper-surface border-pine shadow-sm'
                    : 'bg-paper hover:bg-paper-surface/60'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-serif text-sm font-bold text-ink">
                      {opt.title}
                    </span>
                    <input
                      type="radio"
                      name="risk"
                      checked={formData.riskComfort === opt.id}
                      onChange={() => {}}
                      className="accent-pine"
                    />
                  </div>
                  <span className="text-[10px] font-mono text-pine font-semibold block mb-2">
                    {opt.tag}
                  </span>
                  <p className="text-[11px] text-ink-muted leading-relaxed">
                    {opt.description}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Language Preference */}
        <div className="bg-paper rounded-card hairline-all p-6 shadow-editorial space-y-4">
          <h3 className="font-serif text-base font-bold text-ink hairline-b pb-2">
            Language Preference / மொழி
          </h3>
          <div className="flex items-center gap-4 text-xs">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="lang"
                value="en"
                checked={formData.language === 'en'}
                onChange={() => {
                  setFormData({ ...formData, language: 'en' });
                  setLanguage('en');
                }}
                className="accent-pine"
              />
              <span>English (Default)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="lang"
                value="ta"
                checked={formData.language === 'ta'}
                onChange={() => {
                  setFormData({ ...formData, language: 'ta' });
                  setLanguage('ta');
                }}
                className="accent-pine"
              />
              <span>தமிழ் (Tamil UI Strings)</span>
            </label>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={() => {
              if (confirm('Reset to default ₹48k Indian persona demo state?')) {
                resetDemoData();
              }
            }}
            className="px-4 py-2.5 rounded-btn hairline-all text-xs font-mono text-negative hover:bg-negative-light transition-colors"
          >
            Reset Demo Persona
          </button>

          <button
            type="submit"
            className="px-6 py-2.5 rounded-btn bg-pine text-paper hover:bg-pine-hover text-xs font-semibold shadow-sm transition-colors"
          >
            Save & Recalibrate Advisor
          </button>
        </div>
      </form>
    </div>
  );
};
