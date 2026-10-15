import crypto from 'node:crypto';

export interface BonusItem {
  id: string;
  slotName: string;
  slotProvider: string;
  slotImage: string;
  callerUsername: string;
  callerKickId: number;
  betSize: number;
  payout: number;
  multiplier: number;
  status: 'PENDING' | 'OPENING' | 'OPENED';
}

export interface BonusGuess {
  username: string;
  kickId: number;
  amount: number;
  timestamp: number;
}

export interface BonusHuntMetrics {
  startCost: number;
  totalBonuses: number;
  openedBonuses: number;
  remainingBonuses: number;
  winnings: number;
  endingBalance: number;
  profit: number;
  runAverageX: number;
  reqAverageX: number;
  reqAvgDollars: number;
  bestWin: BonusItem | null;
  luckyWin: BonusItem | null;
  closestGuess: { username: string; guess: number; diff: number } | null;
}

export type BonusHuntStatus = 'COLLECTING' | 'OPENING' | 'FINISHED';

export interface BonusHuntState {
  id: string;
  title: string;
  startCost: number;
  status: BonusHuntStatus;
  bonuses: BonusItem[];
  guesses: BonusGuess[];
  metrics: BonusHuntMetrics;
  createdAt: number;
}

export class BonusHuntManager {
  private state: BonusHuntState;
  private onStateChange: ((state: BonusHuntState) => void) | null = null;

  constructor(listener?: (state: BonusHuntState) => void) {
    this.onStateChange = listener || null;
    this.state = this.createEmptyState();
  }

  private createEmptyState(): BonusHuntState {
    const startCost = 1000;
    return {
      id: crypto.randomUUID(),
      title: 'Community Bonus Hunt',
      startCost,
      status: 'COLLECTING',
      bonuses: [],
      guesses: [],
      metrics: this.computeMetrics([], [], startCost),
      createdAt: Date.now(),
    };
  }

  public getState(): BonusHuntState {
    return { ...this.state };
  }

  public startNewHunt(title: string = 'Community Bonus Hunt', startCost: number = 1000): BonusHuntState {
    this.state = {
      id: crypto.randomUUID(),
      title,
      startCost: Math.max(0, startCost),
      status: 'COLLECTING',
      bonuses: [],
      guesses: [],
      metrics: this.computeMetrics([], [], startCost),
      createdAt: Date.now(),
    };
    this.emitChange();
    return this.getState();
  }

  public addBonus(
    slot: { name: string; provider?: string; image?: string },
    caller: { username: string; kickId?: number },
    betSize: number = 1.0
  ): BonusItem {
    const item: BonusItem = {
      id: `b_${Date.now()}_${crypto.randomInt(100, 999)}`,
      slotName: slot.name,
      slotProvider: slot.provider || 'Casino',
      slotImage: slot.image || '',
      callerUsername: caller.username,
      callerKickId: caller.kickId || 0,
      betSize: Math.max(0.1, betSize),
      payout: 0,
      multiplier: 0,
      status: 'PENDING',
    };

    this.state.bonuses.push(item);
    this.state.metrics = this.computeMetrics(this.state.bonuses, this.state.guesses, this.state.startCost);
    this.emitChange();
    return item;
  }

  public removeBonus(id: string): boolean {
    const idx = this.state.bonuses.findIndex((b) => b.id === id);
    if (idx === -1) return false;
    this.state.bonuses.splice(idx, 1);
    this.state.metrics = this.computeMetrics(this.state.bonuses, this.state.guesses, this.state.startCost);
    this.emitChange();
    return true;
  }

  public setBonusOpening(id: string): void {
    const b = this.state.bonuses.find((x) => x.id === id);
    if (b) {
      this.state.status = 'OPENING';
      b.status = 'OPENING';
      this.emitChange();
    }
  }

  public setBonusPayout(id: string, payout: number): BonusHuntState {
    const b = this.state.bonuses.find((x) => x.id === id);
    if (!b) throw new Error(`Bonus ${id} not found.`);

    b.payout = Math.max(0, payout);
    b.multiplier = b.betSize > 0 ? Number((b.payout / b.betSize).toFixed(2)) : 0;
    b.status = 'OPENED';
    this.state.status = 'OPENING';

    this.state.metrics = this.computeMetrics(this.state.bonuses, this.state.guesses, this.state.startCost);

    // If all opened, mark finished
    if (this.state.bonuses.length > 0 && this.state.bonuses.every((x) => x.status === 'OPENED')) {
      this.state.status = 'FINISHED';
    }

    this.emitChange();
    return this.getState();
  }

  public recordGuess(username: string, amount: number, kickId: number = 0): { success: boolean; error?: string } {
    if (this.state.status === 'FINISHED') {
      return { success: false, error: 'Bonus Hunt is already finished.' };
    }
    if (amount <= 0 || isNaN(amount)) {
      return { success: false, error: 'Invalid guess amount.' };
    }

    const cleanUser = username.toLowerCase();
    const existingIdx = this.state.guesses.findIndex((g) => g.username.toLowerCase() === cleanUser);

    const guessObj: BonusGuess = {
      username,
      kickId,
      amount: Number(amount.toFixed(2)),
      timestamp: Date.now(),
    };

    if (existingIdx !== -1) {
      // Update existing guess
      this.state.guesses[existingIdx] = guessObj;
    } else {
      this.state.guesses.push(guessObj);
    }

    this.state.metrics = this.computeMetrics(this.state.bonuses, this.state.guesses, this.state.startCost);
    this.emitChange();
    return { success: true };
  }

  public finishHunt(): BonusHuntState {
    this.state.status = 'FINISHED';
    this.state.metrics = this.computeMetrics(this.state.bonuses, this.state.guesses, this.state.startCost);
    this.emitChange();
    return this.getState();
  }

  public reset(): BonusHuntState {
    this.state = this.createEmptyState();
    this.emitChange();
    return this.getState();
  }

  public loadDemoHunt(): BonusHuntState {
    const startCost = 500;
    const demoItems = [
      { name: 'Wanted Dead or a Wild', prov: 'Hacksaw', caller: 'LuckyStriker', bet: 2, win: 245.5, status: 'OPENED' as const },
      { name: 'Gates of Olympus 1000', prov: 'Pragmatic', caller: 'VegasKing', bet: 1, win: 85.0, status: 'OPENED' as const },
      { name: 'San Quentin xWays', prov: 'Nolimit City', caller: 'SlotQueen', bet: 0.4, win: 120.0, status: 'OPENED' as const },
      { name: 'Sugar Rush 1000', prov: 'Pragmatic', caller: 'SpinMaster', bet: 1, win: 32.5, status: 'OPENED' as const },
      { name: 'Rip City', prov: 'Hacksaw', caller: 'Strike777', bet: 2, win: 0, status: 'OPENING' as const },
      { name: 'Big Bass Splash', prov: 'Pragmatic', caller: 'BigBassBob', bet: 1, win: 0, status: 'PENDING' as const },
      { name: 'Chaos Crew 2', prov: 'Hacksaw', caller: 'NeonWolf', bet: 2, win: 0, status: 'PENDING' as const },
      { name: 'Zeus vs Hades', prov: 'Pragmatic', caller: 'RoyalFlush', bet: 1, win: 0, status: 'PENDING' as const },
    ];

    this.state = {
      id: 'demo_hunt_' + Date.now(),
      title: 'Community Bonus Hunt #12',
      startCost,
      status: 'OPENING',
      bonuses: demoItems.map((d, i) => ({
        id: `demo_${i + 1}`,
        slotName: d.name,
        slotProvider: d.prov,
        slotImage: '',
        callerUsername: d.caller,
        callerKickId: 100 + i,
        betSize: d.bet,
        payout: d.win,
        multiplier: d.bet > 0 ? Number((d.win / d.bet).toFixed(2)) : 0,
        status: d.status,
      })),
      guesses: [
        { username: 'LuckyStriker', kickId: 101, amount: 620, timestamp: Date.now() - 60000 },
        { username: 'VegasKing', kickId: 102, amount: 480, timestamp: Date.now() - 50000 },
        { username: 'SlotMaster', kickId: 103, amount: 750, timestamp: Date.now() - 40000 },
      ],
      metrics: this.computeMetrics([], [], startCost),
      createdAt: Date.now(),
    };

    this.state.metrics = this.computeMetrics(this.state.bonuses, this.state.guesses, this.state.startCost);
    this.emitChange();
    return this.getState();
  }

  private computeMetrics(bonuses: BonusItem[], guesses: BonusGuess[], startCost: number): BonusHuntMetrics {
    const totalBonuses = bonuses.length;
    const openedList = bonuses.filter((b) => b.status === 'OPENED');
    const openedBonuses = openedList.length;
    const remainingBonuses = totalBonuses - openedBonuses;

    // Total winnings
    const winnings = openedList.reduce((acc, b) => acc + (b.payout || 0), 0);
    const endingBalance = Number(winnings.toFixed(2));
    const profit = Number((winnings - startCost).toFixed(2));

    // Run average X: total winnings / total bet size of opened bonuses
    const totalOpenedStake = openedList.reduce((acc, b) => acc + (b.betSize || 0), 0);
    const runAverageX = totalOpenedStake > 0 ? Number((winnings / totalOpenedStake).toFixed(2)) : 0;

    // Req Average X: (startCost - winnings) / remaining stake
    const unopenedList = bonuses.filter((b) => b.status !== 'OPENED');
    const totalUnopenedStake = unopenedList.reduce((acc, b) => acc + (b.betSize || 0), 0);
    const needed = Math.max(0, startCost - winnings);
    const reqAverageX = totalUnopenedStake > 0 ? Number((needed / totalUnopenedStake).toFixed(2)) : 0;

    // Req Avg in Dollars per remaining bonus
    const reqAvgDollars = remainingBonuses > 0 ? Number((needed / remainingBonuses).toFixed(2)) : 0;

    // Best win (highest dollar payout)
    let bestWin: BonusItem | null = null;
    let luckyWin: BonusItem | null = null;

    for (const b of openedList) {
      if (!bestWin || b.payout > bestWin.payout) bestWin = b;
      if (!luckyWin || b.multiplier > luckyWin.multiplier) luckyWin = b;
    }

    // Closest guess to ending balance
    let closestGuess: { username: string; guess: number; diff: number } | null = null;
    if (guesses.length > 0) {
      let minDiff = Infinity;
      for (const g of guesses) {
        const diff = Math.abs(g.amount - endingBalance);
        if (diff < minDiff) {
          minDiff = diff;
          closestGuess = { username: g.username, guess: g.amount, diff: Number(diff.toFixed(2)) };
        }
      }
    }

    return {
      startCost,
      totalBonuses,
      openedBonuses,
      remainingBonuses,
      winnings: Number(winnings.toFixed(2)),
      endingBalance,
      profit,
      runAverageX,
      reqAverageX,
      reqAvgDollars,
      bestWin,
      luckyWin,
      closestGuess,
    };
  }

  private emitChange(): void {
    if (this.onStateChange) {
      this.onStateChange(this.getState());
    }
  }
}
