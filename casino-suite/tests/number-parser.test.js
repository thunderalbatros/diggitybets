// test suite for casino number parser (>= 40 test cases)
const { parseGuess, formatMoney } = require('../shared/number-parser.js');

const testCases = [
  // Plain integers
  { input: '12557', expected: 12557, valid: true },
  { input: '1000', expected: 1000, valid: true },
  { input: '50', expected: 50, valid: true },
  { input: '1', expected: 1, valid: true },

  // Thousands separator dot with 3 digits
  { input: '12.557', expected: 12557, valid: true },
  { input: '1.250', expected: 1250, valid: true },
  { input: '999.999', expected: 999999, valid: true },
  { input: '5.000', expected: 5000, valid: true },

  // Thousands separator comma with 3 digits
  { input: '12,557', expected: 12557, valid: true },
  { input: '1,250', expected: 1250, valid: true },
  { input: '75,000', expected: 75000, valid: true },

  // Decimals with 1 or 2 digits
  { input: '12.5', expected: 12.5, valid: true },
  { input: '12.50', expected: 12.50, valid: true },
  { input: '12,5', expected: 12.5, valid: true },
  { input: '12,50', expected: 12.50, valid: true },
  { input: '0.50', expected: 0.50, valid: true },
  { input: '0,99', expected: 0.99, valid: true },

  // Dual separators: dot thousands + comma decimal (es-AR / European)
  { input: '12.557,50', expected: 12557.50, valid: true },
  { input: '1.250,25', expected: 1250.25, valid: true },
  { input: '100.000,00', expected: 100000, valid: true },

  // Dual separators: comma thousands + dot decimal (en-US)
  { input: '12,557.50', expected: 12557.50, valid: true },
  { input: '1,250.75', expected: 1250.75, valid: true },
  { input: '250,000.00', expected: 250000, valid: true },

  // Multiplier suffixes: k / K
  { input: '12k', expected: 12000, valid: true },
  { input: '12K', expected: 12000, valid: true },
  { input: '12.5k', expected: 12500, valid: true },
  { input: '12,5k', expected: 12500, valid: true },
  { input: '1.2k', expected: 1200, valid: true },
  { input: '50k', expected: 50000, valid: true },
  { input: '100K', expected: 100000, valid: true },
  { input: '0.5k', expected: 500, valid: true },

  // Currency symbols stripped
  { input: '$12557', expected: 12557, valid: true },
  { input: '$12,557.50', expected: 12557.50, valid: true },
  { input: '$ 1.250,50', expected: 1250.50, valid: true },
  { input: '€500', expected: 500, valid: true },
  { input: '£1200', expected: 1200, valid: true },
  { input: '1500 USD', expected: 1500, valid: true },
  { input: 'ARS 25000', expected: 25000, valid: true },
  { input: ' $ 12.5k ', expected: 12500, valid: true },

  // Multiple thousands separators
  { input: '1.000.000', expected: 1000000, valid: true },
  { input: '1,000,000', expected: 1000000, valid: true },

  // Numbers passed directly
  { input: 1250.5, expected: 1250.5, valid: true },
  { input: 5000, expected: 5000, valid: true },

  // Negative values (REJECTED)
  { input: '-500', valid: false },
  { input: '-12.557', valid: false },
  { input: '$-100', valid: false },

  // Zero & Below Minimum (REJECTED)
  { input: '0', valid: false },
  { input: '0.00', valid: false },
  { input: '$0', valid: false },

  // Above Max Limit (REJECTED)
  { input: '1000001', valid: false },
  { input: '5000000', valid: false },
  { input: '2M', valid: false },

  // Non-numeric / Malicious / Gibberish (REJECTED)
  { input: '', valid: false },
  { input: '   ', valid: false },
  { input: 'abc', valid: false },
  { input: 'NaN', valid: false },
  { input: 'undefined', valid: false },
  { input: '<script>alert(1)</script>', valid: false },
  { input: 'DROP TABLE users;', valid: false },
  { input: '$xyz', valid: false }
];

console.log(`Running ${testCases.length} test cases for CasinoNumberParser...`);
let passed = 0;
let failed = 0;

testCases.forEach((tc, idx) => {
  const result = parseGuess(tc.input);
  if (tc.valid) {
    if (result.valid && result.value === tc.expected) {
      passed++;
    } else {
      failed++;
      console.error(`FAIL [Case ${idx + 1}]: Input "${tc.input}" -> Expected ${tc.expected}, got ${JSON.stringify(result)}`);
    }
  } else {
    if (!result.valid) {
      passed++;
    } else {
      failed++;
      console.error(`FAIL [Case ${idx + 1}]: Input "${tc.input}" -> Expected invalid, got ${JSON.stringify(result)}`);
    }
  }
});

console.log(`Results: ${passed} PASSED, ${failed} FAILED out of ${testCases.length} cases.`);
if (failed > 0) process.exit(1);
