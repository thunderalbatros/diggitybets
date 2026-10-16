import crypto from 'node:crypto';

export type BattleGameMode = 'BONUS_BUY' | 'SPINS';

export interface BattlePlayer {
  userId: string;
  kickId: number;
  username: string;
  displayName: string;
  avatar: string;
  slotName: string;
  slotProvider: string;
  slotImage: string;
  winAmount: number;
  multiplier: number;
  result?: 'WINNER' | 'LOSER' | 'TIE' | null;
}

export type BattleStatus = 'IDLE' | 'LOBBY' | 'READY' | 'PLAYING_A' | 'PLAYING_B' | 'RESOLVED' | 'CANCELLED';

export interface BattleState {
  id: string;
  status: BattleStatus;
  gameMode: BattleGameMode;
  betAmount: number;
  prizeText: string;
  playerA: BattlePlayer | null;
  playerB: BattlePlayer | null;
  winner: 'A' | 'B' | 'TIE' | null;
  createdAt: number;
  resolvedAt: number | null;

  // King of the Hill (KotH)
  kothActive: boolean;
  reigningKing: BattlePlayer | null;
  currentStreak: number;
  maxStreak: number;
  kothPrizeAmount: number;
  awaitingKingDecision: boolean;
  lastWinnerPrizeAwarded?: boolean;
}

export class BattleManager {
  private state: BattleState;
  private onStateChange: ((state: BattleState) => void) | null = null;

  constructor(listener?: (state: BattleState) => void) {
    this.onStateChange = listener || null;
    this.state = this.createEmptyState();
  }

  private createEmptyState(): BattleState {
    return {
      id: crypto.randomUUID(),
      status: 'IDLE',
      gameMode: 'BONUS_BUY',
      betAmount: 10,
      prizeText: '$50 Prize / Points Pool',
      playerA: null,
      playerB: null,
      winner: null,
      createdAt: Date.now(),
      resolvedAt: null,
      kothActive: true,
      reigningKing: null,
      currentStreak: 0,
      maxStreak: 4,
      kothPrizeAmount: 20,
      awaitingKingDecision: false,
      lastWinnerPrizeAwarded: false,
    };
  }

  public getState(): BattleState {
    return {
      ...this.state,
      playerA: this.state.playerA ? { ...this.state.playerA } : null,
      playerB: this.state.playerB ? { ...this.state.playerB } : null,
      reigningKing: this.state.reigningKing ? { ...this.state.reigningKing } : null,
    };
  }

  public setGameMode(mode: BattleGameMode): BattleState {
    this.state.gameMode = mode;
    this.emitChange();
    return this.getState();
  }

  public setKothActive(active: boolean): BattleState {
    this.state.kothActive = active;
    this.emitChange();
    return this.getState();
  }

  public openLobby(
    betAmount: number = 10,
    prizeText: string = '$50 Prize Pool',
    gameMode?: BattleGameMode
  ): BattleState {
    const keepKing = this.state.kothActive && this.state.reigningKing;

    this.state = {
      ...this.state,
      id: crypto.randomUUID(),
      status: 'LOBBY',
      gameMode: gameMode || this.state.gameMode,
      betAmount,
      prizeText,
      playerA: keepKing
        ? {
            ...this.state.reigningKing!,
            winAmount: 0,
            multiplier: 0,
            result: null,
          }
        : null,
      playerB: null,
      winner: null,
      createdAt: Date.now(),
      resolvedAt: null,
      currentStreak: keepKing ? this.state.currentStreak : 0,
      reigningKing: keepKing ? this.state.reigningKing : null,
      awaitingKingDecision: false,
      lastWinnerPrizeAwarded: false,
    };

    this.emitChange();
    return this.getState();
  }

  public joinLobby(
    user: { id: string; kickId: number; username: string; displayName?: string; avatar?: string },
    slot: { name: string; provider?: string; image?: string }
  ): { success: boolean; playerSlot: 'A' | 'B' | null; error?: string } {
    if (this.state.status !== 'LOBBY' && this.state.status !== 'IDLE') {
      return { success: false, playerSlot: null, error: 'Battle is not accepting participants right now.' };
    }

    if (this.state.status === 'IDLE') {
      this.openLobby(this.state.betAmount, this.state.prizeText);
    }

    // Check if user already in battle
    if (
      this.state.playerA?.kickId === user.kickId ||
      this.state.playerB?.kickId === user.kickId
    ) {
      return { success: false, playerSlot: null, error: 'User is already in this battle.' };
    }

    const playerObj: BattlePlayer = {
      userId: user.id,
      kickId: user.kickId,
      username: user.username,
      displayName: user.displayName || user.username,
      avatar: user.avatar || '',
      slotName: slot.name,
      slotProvider: slot.provider || 'Casino',
      slotImage: slot.image || '',
      winAmount: 0,
      multiplier: 0,
      result: null,
    };

    // If King of the Hill has reigning king, they hold Player A
    if (this.state.kothActive && this.state.reigningKing) {
      if (this.state.reigningKing.kickId === user.kickId) {
        return { success: false, playerSlot: null, error: 'User is already the reigning King defending the throne.' };
      }
      if (!this.state.playerA) {
        this.state.playerA = { ...this.state.reigningKing, winAmount: 0, multiplier: 0, result: null };
      }
      if (!this.state.playerB) {
        this.state.playerB = playerObj;
        this.state.status = 'READY';
        this.emitChange();
        return { success: true, playerSlot: 'B' };
      }
      return { success: false, playerSlot: null, error: 'Challenger seat is already filled.' };
    }

    // Standard lobby joining
    if (!this.state.playerA) {
      this.state.playerA = playerObj;
      this.emitChange();
      return { success: true, playerSlot: 'A' };
    }

    if (!this.state.playerB) {
      this.state.playerB = playerObj;
      this.state.status = 'READY';
      this.emitChange();
      return { success: true, playerSlot: 'B' };
    }

    return { success: false, playerSlot: null, error: 'Battle lobby is full (2/2 players).' };
  }

  public setPlayerPayout(playerSlot: 'A' | 'B', winAmount: number): BattleState {
    const player = playerSlot === 'A' ? this.state.playerA : this.state.playerB;
    if (!player) throw new Error(`Player ${playerSlot} is not assigned in this battle.`);

    player.winAmount = Math.max(0, winAmount);
    player.multiplier = this.state.betAmount > 0 ? Number((player.winAmount / this.state.betAmount).toFixed(2)) : 0;

    if (playerSlot === 'A') {
      this.state.status = 'PLAYING_A';
    } else {
      this.state.status = 'PLAYING_B';
    }

    this.emitChange();
    return this.getState();
  }

  public setPlayerMultiplier(playerSlot: 'A' | 'B', multiplier: number): BattleState {
    const player = playerSlot === 'A' ? this.state.playerA : this.state.playerB;
    if (!player) throw new Error(`Player ${playerSlot} is not assigned in this battle.`);

    player.multiplier = Number(Math.max(0, multiplier).toFixed(2));
    player.winAmount = Number((player.multiplier * this.state.betAmount).toFixed(2));

    if (playerSlot === 'A') {
      this.state.status = 'PLAYING_A';
    } else {
      this.state.status = 'PLAYING_B';
    }

    this.emitChange();
    return this.getState();
  }

  public resolveBattle(): BattleState {
    if (!this.state.playerA || !this.state.playerB) {
      throw new Error('Cannot resolve battle without both players.');
    }

    const multA = this.state.playerA.multiplier;
    const multB = this.state.playerB.multiplier;

    if (multA > multB) {
      this.state.winner = 'A';
      this.state.playerA.result = 'WINNER';
      this.state.playerB.result = 'LOSER';
      this.applyKothProgression('A');
    } else if (multB > multA) {
      this.state.winner = 'B';
      this.state.playerB.result = 'WINNER';
      this.state.playerA.result = 'LOSER';
      this.applyKothProgression('B');
    } else {
      this.state.winner = 'TIE';
      this.state.playerA.result = 'TIE';
      this.state.playerB.result = 'TIE';
      this.state.status = 'RESOLVED';
    }

    this.state.resolvedAt = Date.now();
    this.emitChange();
    return this.getState();
  }

  public resolveWinnerDirectly(winnerSlot: 'A' | 'B'): BattleState {
    if (!this.state.playerA || !this.state.playerB) {
      throw new Error('Cannot resolve battle without both players.');
    }

    this.state.winner = winnerSlot;
    if (winnerSlot === 'A') {
      this.state.playerA.result = 'WINNER';
      this.state.playerB.result = 'LOSER';
      this.applyKothProgression('A');
    } else {
      this.state.playerB.result = 'WINNER';
      this.state.playerA.result = 'LOSER';
      this.applyKothProgression('B');
    }

    this.state.resolvedAt = Date.now();
    this.emitChange();
    return this.getState();
  }

  private applyKothProgression(winnerSlot: 'A' | 'B'): void {
    if (!this.state.kothActive) {
      this.state.status = 'RESOLVED';
      return;
    }

    const winner = winnerSlot === 'A' ? this.state.playerA! : this.state.playerB!;
    const isCurrentKing = this.state.reigningKing && this.state.reigningKing.kickId === winner.kickId;

    if (isCurrentKing) {
      this.state.currentStreak += 1;
      this.state.reigningKing = { ...winner };
    } else {
      this.state.reigningKing = { ...winner };
      this.state.currentStreak = 1;
    }

    this.state.status = 'RESOLVED';

    if (this.state.currentStreak >= this.state.maxStreak) {
      // 4-Streak Champion ($20 prize won!)
      this.state.awaitingKingDecision = false;
      this.state.lastWinnerPrizeAwarded = true;
    } else {
      // Streaks 1, 2, or 3: King must decide whether to continue or retire
      this.state.awaitingKingDecision = true;
      this.state.lastWinnerPrizeAwarded = false;
    }
  }

  public kingDecideContinue(): BattleState {
    if (!this.state.kothActive || !this.state.reigningKing) {
      return this.getState();
    }

    this.state.awaitingKingDecision = false;
    this.state.playerA = {
      ...this.state.reigningKing,
      winAmount: 0,
      multiplier: 0,
      result: null,
    };
    this.state.playerB = null; // Challenger seat freed
    this.state.winner = null;
    this.state.status = 'LOBBY';
    this.state.resolvedAt = null;

    this.emitChange();
    return this.getState();
  }

  public kingDecideRetire(): { state: BattleState; retiredKing: BattlePlayer | null; streak: number } {
    const retiredKing = this.state.reigningKing;
    const streak = this.state.currentStreak;

    this.state.reigningKing = null;
    this.state.currentStreak = 0;
    this.state.awaitingKingDecision = false;
    this.state.playerA = null;
    this.state.playerB = null;
    this.state.winner = null;
    this.state.status = 'LOBBY';
    this.state.resolvedAt = null;
    this.state.lastWinnerPrizeAwarded = false;

    this.emitChange();
    return { state: this.getState(), retiredKing, streak };
  }

  public resetKothThrone(): BattleState {
    this.state.reigningKing = null;
    this.state.currentStreak = 0;
    this.state.awaitingKingDecision = false;
    this.state.playerA = null;
    this.state.playerB = null;
    this.state.winner = null;
    this.state.status = 'LOBBY';
    this.state.resolvedAt = null;
    this.state.lastWinnerPrizeAwarded = false;

    this.emitChange();
    return this.getState();
  }

  public reset(): BattleState {
    this.state = this.createEmptyState();
    this.emitChange();
    return this.getState();
  }

  private emitChange(): void {
    if (this.onStateChange) {
      this.onStateChange(this.getState());
    }
  }
}
