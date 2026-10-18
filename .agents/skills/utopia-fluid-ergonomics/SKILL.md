---
name: utopia-fluid-ergonomics
description: Mathematical fluid scaling laws using Utopia clamp() formulas to ensure 100% zoom native fit across all viewport resolutions.
---

# Utopia Fluid Ergonomics (100% Zoom Native Fit)

## 1. Core Rule: The 100% Zoom Standard
**No view or page in DiggityBets / HuntHub shall require the user to set their browser zoom to 80% or 90% to fit content without awkward clipping.**
Every layout must automatically calculate its vertical and horizontal boundaries to fit the native viewport at 100% standard DPI zoom.

## 2. Utopia Math & Fluid Clamp Formulas
Derived from `references/design-mastery/utopia-core`:
Instead of hardcoded media query step-jumps, use continuous mathematical fluid bounds:
```css
/* Typography Scale */
--step--1: clamp(0.7813rem, 0.7747rem + 0.0326vw, 0.8rem);
--step-0: clamp(1rem, 0.9783rem + 0.1087vw, 1.0625rem);
--step-1: clamp(1.2rem, 1.1522rem + 0.2391vw, 1.3281rem);
--step-2: clamp(1.44rem, 1.3533rem + 0.4337vw, 1.6602rem);
--step-3: clamp(1.728rem, 1.5857rem + 0.7117vw, 2.0752rem);

/* Spacing Scale */
--space-xs: clamp(0.5rem, 0.4565rem + 0.2174vw, 0.625rem);
--space-s: clamp(0.75rem, 0.6848rem + 0.3261vw, 0.9375rem);
--space-m: clamp(1rem, 0.913rem + 0.4348vw, 1.25rem);
--space-l: clamp(1.5rem, 1.3696rem + 0.6522vw, 1.875rem);
```

## 3. Vertical Viewport Constraint Formula
To ensure `#watch` fits cleanly on a standard 1366x768 or 1440x900 laptop at 100% zoom:
```css
/* Stream Player Height Fit */
.watch-stream-container {
  height: clamp(380px, calc(100dvh - 280px), 720px);
  max-height: calc(100dvh - var(--header-height, 74px) - 220px);
  width: 100%;
}

/* Overall Viewport Fit */
.main-wrapper {
  min-height: calc(100dvh - var(--header-height, 74px));
  box-sizing: border-box;
}
```

## 4. Verification Check
- Test viewports: 1366x768, 1440x900, 1920x1080 at 100% scale.
- Check: Player, Stake companions, and chat must be comfortably accessible without vertical double-scrollbars.
