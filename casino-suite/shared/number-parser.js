/* ============================================================
   CASINO SUITE — Multi-Locale Currency & Number Parser
   Complies with prompt-antigravity-kick-suite section 6.2 (M3 GTB)
   
   Rules:
   - Strips currency symbols ($, €, £, ARS, USD, etc.) and whitespace
   - Suffixes: 'k' / 'K' multiplied by 1,000, 'm' / 'M' multiplied by 1,000,000
   - Both separators present (. and ,):
       - First separator is thousands, second is decimal
   - Single separator present (. or ,):
       - Single separator followed by EXACTLY 3 digits = thousands separator
       - Otherwise = decimal separator
   - Multiple identical separators = thousands separators (e.g. 1.000.000 or 1,000,000)
   - Rejects negative numbers, zero, NaN, Infinity, and amounts above max (default 1,000,000)
   ============================================================ */

(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CasinoNumberParser = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {

  /**
   * Parses a user guess string into a validated positive number.
   * @param {string|number} input - Raw input from chat or admin
   * @param {Object} options - Configuration options
   * @param {number} [options.maxAmount=1000000] - Maximum allowed guess
   * @param {number} [options.minAmount=0.01] - Minimum allowed guess
   * @returns {{ valid: boolean, value?: number, raw: string, error?: string }}
   */
  function parseGuess(input, options = {}) {
    const maxAmount = options.maxAmount !== undefined ? options.maxAmount : 1000000;
    const minAmount = options.minAmount !== undefined ? options.minAmount : 0.01;

    if (input === null || input === undefined) {
      return { valid: false, raw: '', error: 'Input is empty' };
    }

    if (typeof input === 'number') {
      if (isNaN(input) || !isFinite(input) || input <= 0) {
        return { valid: false, raw: String(input), error: 'Must be a positive number' };
      }
      if (input > maxAmount) {
        return { valid: false, raw: String(input), error: `Amount exceeds maximum limit ($${maxAmount.toLocaleString()})` };
      }
      if (input < minAmount) {
        return { valid: false, raw: String(input), error: `Amount below minimum ($${minAmount})` };
      }
      return { valid: true, value: Math.round(input * 100) / 100, raw: String(input) };
    }

    let raw = String(input).trim();
    if (!raw) {
      return { valid: false, raw, error: 'Input is empty' };
    }

    // Check for negative signs
    if (raw.startsWith('-') || raw.includes('-')) {
      return { valid: false, raw, error: 'Negative numbers are not allowed' };
    }

    // Strip currency symbols and letters except k, K, m, M
    // e.g. "$ 12,500.50 ARS" -> "12,500.50"
    let cleaned = raw
      .replace(/^(ars|usd|eur|gbp|\$|€|£)\s*/i, '')
      .replace(/\s*(ars|usd|eur|gbp)$/i, '')
      .replace(/[\$\€\£]/g, '')
      .trim();

    // Check multiplier suffix (k/m)
    let multiplier = 1;
    const suffixMatch = cleaned.match(/([0-9.,]+)\s*([kmKM])$/);
    if (suffixMatch) {
      cleaned = suffixMatch[1];
      const suffix = suffixMatch[2].toLowerCase();
      if (suffix === 'k') multiplier = 1000;
      if (suffix === 'm') multiplier = 1000000;
    }

    // Remove any remaining whitespace inside digits
    cleaned = cleaned.replace(/\s+/g, '');

    if (!cleaned) {
      return { valid: false, raw, error: 'No numeric characters found' };
    }

    // Detect dots and commas
    const hasDot = cleaned.includes('.');
    const hasComma = cleaned.includes(',');

    let normalizedStr = '';

    if (hasDot && hasComma) {
      const firstDot = cleaned.indexOf('.');
      const firstComma = cleaned.indexOf(',');

      if (firstDot < firstComma) {
        // e.g. 1.250,50 -> dot is thousands, comma is decimal
        normalizedStr = cleaned.replace(/\./g, '').replace(',', '.');
      } else {
        // e.g. 1,250.50 -> comma is thousands, dot is decimal
        normalizedStr = cleaned.replace(/,/g, '');
      }
    } else if (hasDot || hasComma) {
      const sep = hasDot ? '.' : ',';
      const parts = cleaned.split(sep);

      if (parts.length > 2) {
        // Multiple separators: e.g. 1.000.000 or 1,000,000 -> thousands separators
        normalizedStr = parts.join('');
      } else {
        // Exactly one separator: e.g. "12.557" or "12.5" or "12,557" or "12,5"
        const intPart = parts[0];
        const decPart = parts[1];

        // Rule from prompt: a single separator followed by EXACTLY 3 digits = thousands separator;
        // otherwise = decimal separator.
        // Exception: when multiplier suffix was present (like 12.5k), 12.5 was intended as decimal!
        if (multiplier > 1) {
          // e.g. "12.5k" -> decimal 12.5 * 1000
          normalizedStr = intPart + '.' + decPart;
        } else if (decPart.length === 3) {
          // Exactly 3 digits -> thousands separator: 12.557 -> 12557
          normalizedStr = intPart + decPart;
        } else {
          // Decimal: 12.5 -> 12.5, 12.50 -> 12.50
          normalizedStr = intPart + '.' + decPart;
        }
      }
    } else {
      // Plain integer
      normalizedStr = cleaned;
    }

    // Verify it only contains digits and at most one decimal dot
    if (!/^[0-9]+(\.[0-9]+)?$/.test(normalizedStr)) {
      return { valid: false, raw, error: 'Invalid numeric format' };
    }

    let parsedVal = parseFloat(normalizedStr);
    if (isNaN(parsedVal) || !isFinite(parsedVal)) {
      return { valid: false, raw, error: 'Could not parse number' };
    }

    parsedVal = parsedVal * multiplier;
    // Round to 2 decimal places
    parsedVal = Math.round(parsedVal * 100) / 100;

    if (parsedVal <= 0) {
      return { valid: false, raw, error: 'Amount must be greater than zero' };
    }

    if (parsedVal > maxAmount) {
      return { valid: false, raw, error: `Amount exceeds maximum limit ($${maxAmount.toLocaleString()})` };
    }

    if (parsedVal < minAmount) {
      return { valid: false, raw, error: `Amount below minimum ($${minAmount})` };
    }

    return {
      valid: true,
      value: parsedVal,
      raw
    };
  }

  /**
   * Formats a monetary value according to standard stream display.
   * @param {number} amount
   * @param {string} [currency='$']
   * @returns {string}
   */
  function formatMoney(amount, currency = '$') {
    if (typeof amount !== 'number' || isNaN(amount)) return `${currency}0.00`;
    return `${currency}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }

  return {
    parseGuess,
    formatMoney
  };
});
