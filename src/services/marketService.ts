import type { MarketRate, ComparisonItem } from '../types/finance';
import { LIVE_MARKET_RATES } from '../data/mockData';

export interface MarketDataSummary {
  rates: MarketRate[];
  lastUpdated: string;
  isDemoData: boolean;
  benchmarkOverview: string;
}

export function getMarketRates(): MarketDataSummary {
  const now = new Date();
  const timeFormatted = now.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }) + ' ' + now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  return {
    rates: LIVE_MARKET_RATES,
    lastUpdated: timeFormatted,
    isDemoData: true,
    benchmarkOverview: 'RBI Repo steady at 6.50%. 1-Year Bank FDs yield ~7.15%, while 10-Yr Equity CAGR trends around 12.6%. Inflation stands at 5.12%.',
  };
}

export function getInstrumentComparison(): ComparisonItem[] {
  return [
    {
      instrument: 'Bank Fixed Deposit (FD)',
      expectedReturn: '7.10% – 7.25% p.a.',
      riskLevel: 'Zero Risk',
      liquidity: 'Instant (1% penalty for premature break)',
      taxTreatment: 'Taxed at your income tax slab (effective ~5.6% post-tax)',
      verdictForYou: 'Safe for emergency fund, but loses purchasing power to inflation over 3+ years.',
    },
    {
      instrument: 'Recurring Deposit (RD)',
      expectedReturn: '6.80% – 7.10% p.a.',
      riskLevel: 'Zero Risk',
      liquidity: 'Fixed monthly discipline, breakable with small penalty',
      taxTreatment: 'TDS applicable if interest exceeds ₹40,000/yr',
      verdictForYou: 'Ideal for short-term 6–12 month targets (like your MacBook or travel fund).',
    },
    {
      instrument: 'Nifty 50 Index SIP',
      expectedReturn: '11.0% – 13.0% (historical 7-yr CAGR)',
      riskLevel: 'Market Linked',
      liquidity: 'T+2 days redemption anytime',
      taxTreatment: '12.5% Long-Term Capital Gains above ₹1.25 Lakh profit',
      verdictForYou: 'The essential vehicle to build wealth and comfortably outpace 5.1% inflation.',
    },
    {
      instrument: 'Public Provident Fund (PPF)',
      expectedReturn: '7.10% p.a. (Govt Guaranteed)',
      riskLevel: 'Zero Risk',
      liquidity: 'Locked for 15 years (partial withdrawal after 6 yrs)',
      taxTreatment: 'Completely Tax-Free (Exempt-Exempt-Exempt)',
      verdictForYou: 'Great for ultra long-term retirement safety, not suitable for 1-year goals.',
    },
  ];
}
