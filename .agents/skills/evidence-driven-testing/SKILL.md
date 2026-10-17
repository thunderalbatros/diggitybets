---
name: evidence-driven-testing
description: Records or produces verifiable proof while testing runtime or UI behavior before claiming a task is done. Use when runtime behavior, tests, or visual UI changes need observable verification.
---

# Evidence-Driven Testing

Record proof of behavior before claiming work is finished.

## The Rule
- **No assertions without evidence:** Never state "all tests pass" or "the UI works" without presenting real command outputs, test run reports, or before/after visual proof.
- **For bug fixes:** Capture the reproduction of the failure **before** writing the fix. Capture the successful run **after** the fix.
- **For UI changes:** Verify rendering in 390px, 768px, and 1440px viewports with zero horizontal overflow, zero clipping, and verified contrast.
- **For backend/APIs:** Run the exact test suite command and show raw terminal exit codes and output lines.
