import crypto from 'node:crypto';

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
}

export type BattleStatus = 'IDLE' | 'LOBBY' | 'READY' | 'PLAYING_A' | 'PLAYING_B' | 'RESOLVED' | 'CANCELLED';

export interface BattleState {
  id: string;
  status: BattleStatus;
  betAmount: number;
  prizeText: string;
  playerA: BattlePlayer | null;
  playerB: BattlePlayer | null;
  winner: 'A' | 'B' | 'TIE' | null;
  createdAt: number;
  resolvedAt: number | null;
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
      betAmount: 10,
      prizeText: '$50 Prize / Points Pool',
      playerA: null,
      playerB: null,
      winner: null,
      createdAt: Date.now(),
      resolvedAt: null,
    };
  }

  public getState(): BattleState {
    return { ...this.state };
  }

  public openLobby(betAmount: number = 10, prizeText: string = '$50 Prize Pool'): BattleState {
    this.state = {
      id: crypto.randomUUID(),
      status: 'LOBBY',
      betAmount,
      prizeText,
      playerA: null,
      playerB: null,
      winner: null,
      createdAt: Date.now(),
      resolvedAt: null,
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

    // Check if user already joined
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
    };

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

  public resolveBattle(): BattleState {
    if (!this.state.playerA || !this.state.playerB) {
      throw new Error('Cannot resolve battle without both players.');
    }

    const multA = this.state.playerA.multiplier;
    const multB = this.state.playerB.multiplier;

    if (multA > multB) {
      this.state.winner = 'A';
    } else if (multB > multA) {
      this.state.winner = 'B';
    } else {
      this.state.winner = 'TIE';
    }

    this.state.status = 'RESOLVED';
    this.state.resolvedAt = Date.now();
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
