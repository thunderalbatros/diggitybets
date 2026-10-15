---
name: fair-draws
description: Cryptographically secure random selection, zero modulo bias, and auditable commit-reveal draws.
---

# Cryptographically Secure Draws (Zero Modulo Bias)

## Rejection Sampling Pattern
Never use `crypto.getRandomValues() % count` directly, as this introduces modulo bias when the range does not divide $2^{32}$.

```typescript
export function secureRandomIndex(count: number): number {
  if (count <= 1) return 0;
  const maxValid = Math.floor(0xFFFFFFFF / count) * count;
  const buffer = new Uint32Array(1);
  do {
    crypto.getRandomValues(buffer);
  } while (buffer[0] >= maxValid);
  return buffer[0] % count;
}
```

## Auditable Commit-Reveal
1. Snapshot eligible participants and record their IDs.
2. Generate a random cryptographic seed: `seed = crypto.randomUUID()`.
3. Compute `hash = SHA256(seed + participants)`.
4. Publish the hash before the draw, and reveal the seed after the draw so viewers can independently verify the result.
