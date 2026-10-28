/**
 * Formats a number into Indian Rupee (INR) representation
 * Follows the Indian number system: 1,00,000 (Lakhs) and 1,00,00,000 (Crores)
 */
export function formatINR(value: number, includeSymbol: boolean = true): string {
  const rounded = Math.round(value);
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 0,
  }).format(rounded);
  return includeSymbol ? `₹${formatted}` : formatted;
}

/**
 * Short Indian currency format (e.g. ₹1.24L, ₹45K)
 */
export function formatINRCompact(value: number): string {
  if (Math.abs(value) >= 10000000) {
    return `₹${(value / 10000000).toFixed(2)} Cr`;
  }
  if (Math.abs(value) >= 100000) {
    return `₹${(value / 100000).toFixed(1)}L`;
  }
  if (Math.abs(value) >= 1000) {
    return `₹${(value / 1000).toFixed(0)}k`;
  }
  return `₹${value}`;
}

/**
 * Format date in clean editorial format: "28 Oct 2026"
 */
export function formatEditorialDate(dateStr: string): string {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  return d.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Calculate days remaining in the current calendar month
 */
export function getDaysRemainingInMonth(): number {
  const now = new Date();
  const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
  const currentDay = now.getDate();
  return Math.max(1, lastDay - currentDay + 1);
}
