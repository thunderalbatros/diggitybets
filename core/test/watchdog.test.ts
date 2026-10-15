import assert from 'node:assert';
import { KickWatchdog } from '../src/ingestor/kick-watchdog.ts';

console.log('--- Running KickWatchdog Tests ---');

const watchdog = KickWatchdog.getInstance();

// Test 1: Singleton instance
assert(watchdog, 'Watchdog instance must exist');

// Test 2: Health report structure
const report = watchdog.getHealthReport(true);
assert.strictEqual(typeof report.status, 'string');
assert.strictEqual(report.circuitBreakerState, 'CLOSED');
assert.strictEqual(typeof report.pusherKey, 'string');

// Test 3: Circuit breaker failure tripping
watchdog.recordFailure();
watchdog.recordFailure();
watchdog.recordFailure();
const trippedReport = watchdog.getHealthReport(false);
assert.strictEqual(trippedReport.circuitBreakerState, 'OPEN', 'Circuit should be OPEN after 3 failures');

// Test 4: Reset on success
watchdog.recordSuccess();
const recoveredReport = watchdog.getHealthReport(true);
assert.strictEqual(recoveredReport.circuitBreakerState, 'CLOSED', 'Circuit should be CLOSED after success');

console.log('✅ All KickWatchdog Tests Passed Successfully!');
