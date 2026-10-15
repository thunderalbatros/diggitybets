# Domain Glossary — Casino Stream Engagement & HuntHub

### 1. Casino & Slots Terminology
- **Bonus Hunt:** The process where a streamer plays slot games with high volatility, triggers the bonus feature (free spins), but pauses and exits the game before playing the bonus, accumulating multiple bonuses to open them consecutively in a single live event.
- **Start Balance:** The total monetary cost spent to collect all bonuses in the hunt.
- **Current Balance:** Starting balance minus bet costs, plus all payouts accumulated from opened bonuses.
- **Multiplier ($X$):** The payout divided by the base bet size (e.g., $100 payout on a $1 bet is a $100X$).
- **Average Multiplier ($\text{Avg } X$):** Total money won from already opened bonuses divided by total bets spent on those opened bonuses.
- **Required Average ($\text{Req Avg } X$):** The average multiplier needed across all remaining unopened bonuses for the streamer to finish at break-even ($\ge \text{Start Balance}$). Formula: $\frac{\max(0, \text{Start Balance} - \text{Current Balance})}{\text{Remaining Unopened Bets}}$.
- **Break-Even ($X$):** The point at which total hunt payouts equal or exceed the total money invested.
- **RTP (Return to Player):** Theoretical statistical percentage of wagered money a slot pays back over millions of spins (typically 94%–96.5%).

### 2. Streaming & Interactivity Terminology
- **Guess the Balance (GTB):** Community prediction game where chat viewers submit their estimate (`!guess <amount>`) of the final balance after all bonuses are opened.
- **Closest to the Pin:** Resolution rule where the guess closest to the final number wins (with optional tie-breaking based on submission timestamp).
- **Active Pool (30s Window):** The set of viewers who have sent at least one chat message in the preceding 30 seconds, ensuring giveaways reward attentive live viewers rather than lurkers or bots.
- **1v1 Slot Battle:** Head-to-head match between two participants (streamer vs viewer, or viewer vs viewer) competing on a predetermined slot or fixed spin count, won by the highest single hit or total multiplier.
- **8-Bracket Tournament:** Single-elimination 3-round tournament (Quarterfinals $\rightarrow$ Semifinals $\rightarrow$ Grand Final) pitting 8 community members against each other.
- **Custom Browser Dock:** An interactive web panel docked directly inside OBS Studio's user interface, allowing the streamer or moderator to operate controls without switching desktop windows.
- **OBS Browser Source:** Transparent CEF (Chromium Embedded Framework) layer rendered on top of stream video at 60 FPS.
