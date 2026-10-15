import crypto from 'node:crypto';

export interface TourneyParticipant {
  id: string;
  kickId: number;
  username: string;
  displayName: string;
  avatar: string;
  slotName: string;
  seed: number;
}

export interface TourneyMatch {
  id: string;
  round: number; // 1: Cuartos, 2: Semis, 3: Final
  matchNumber: number; // 1..7
  player1: TourneyParticipant | null;
  player2: TourneyParticipant | null;
  score1: number;
  score2: number;
  winner: TourneyParticipant | null;
  status: 'PENDING' | 'RUNNING' | 'FINISHED';
}

export type TournamentStatus = 'IDLE' | 'LOBBY' | 'SEEDING' | 'IN_PROGRESS' | 'FINISHED';

export interface TournamentState {
  id: string;
  title: string;
  status: TournamentStatus;
  betPerRound: number;
  prizeText: string;
  participants: TourneyParticipant[];
  matches: TourneyMatch[];
  champion: TourneyParticipant | null;
  createdAt: number;
}

export class TournamentManager {
  private state: TournamentState;
  private onStateChange: ((state: TournamentState) => void) | null = null;

  constructor(listener?: (state: TournamentState) => void) {
    this.onStateChange = listener || null;
    this.state = this.createEmptyState();
  }

  private createEmptyState(): TournamentState {
    return {
      id: crypto.randomUUID(),
      title: '8-Bracket Slot Championship',
      status: 'IDLE',
      betPerRound: 10,
      prizeText: '1st: $150 · 2nd: $50',
      participants: [],
      matches: this.createEmptyMatches(),
      champion: null,
      createdAt: Date.now(),
    };
  }

  private createEmptyMatches(): TourneyMatch[] {
    const matches: TourneyMatch[] = [];
    // 4 Quarterfinals (Round 1: m1..m4)
    for (let i = 1; i <= 4; i++) {
      matches.push({
        id: `m${i}`,
        round: 1,
        matchNumber: i,
        player1: null,
        player2: null,
        score1: 0,
        score2: 0,
        winner: null,
        status: 'PENDING',
      });
    }
    // 2 Semifinals (Round 2: m5, m6)
    matches.push({ id: 'm5', round: 2, matchNumber: 5, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' });
    matches.push({ id: 'm6', round: 2, matchNumber: 6, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' });
    // 1 Grand Final (Round 3: m7)
    matches.push({ id: 'm7', round: 3, matchNumber: 7, player1: null, player2: null, score1: 0, score2: 0, winner: null, status: 'PENDING' });

    return matches;
  }

  public getState(): TournamentState {
    return { ...this.state };
  }

  public openLobby(title?: string, betPerRound: number = 10, prizeText?: string): TournamentState {
    this.state = {
      id: crypto.randomUUID(),
      title: title || '8-Bracket Slot Championship',
      status: 'LOBBY',
      betPerRound,
      prizeText: prizeText || '1st: $150 · 2nd: $50',
      participants: [],
      matches: this.createEmptyMatches(),
      champion: null,
      createdAt: Date.now(),
    };
    this.emitChange();
    return this.getState();
  }

  public joinLobby(
    user: { id: string; kickId: number; username: string; displayName?: string; avatar?: string },
    slotName: string = 'Random Slot'
  ): { success: boolean; joinedCount: number; error?: string } {
    if (this.state.status !== 'LOBBY' && this.state.status !== 'IDLE') {
      return { success: false, joinedCount: this.state.participants.length, error: 'Tournament is not in lobby status.' };
    }

    if (this.state.status === 'IDLE') {
      this.openLobby();
    }

    if (this.state.participants.some((p) => p.kickId === user.kickId)) {
      return { success: false, joinedCount: this.state.participants.length, error: 'User is already registered in this tournament.' };
    }

    if (this.state.participants.length >= 8) {
      return { success: false, joinedCount: 8, error: 'Tournament is full (8/8).' };
    }

    const participant: TourneyParticipant = {
      id: user.id,
      kickId: user.kickId,
      username: user.username,
      displayName: user.displayName || user.username,
      avatar: user.avatar || '',
      slotName,
      seed: this.state.participants.length + 1,
    };

    this.state.participants.push(participant);

    // If 8 participants joined, auto-seed and begin!
    if (this.state.participants.length === 8) {
      this.seedAndStart();
    } else {
      this.emitChange();
    }

    return { success: true, joinedCount: this.state.participants.length };
  }

  public seedAndStart(): TournamentState {
    if (this.state.participants.length < 8) {
      throw new Error(`Cannot start tournament with only ${this.state.participants.length} players. Requires 8.`);
    }

    // Cryptographic Fisher-Yates shuffle
    const shuffled = [...this.state.participants];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = crypto.randomInt(0, i + 1);
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Assign seeds 1..8
    shuffled.forEach((p, idx) => { p.seed = idx + 1; });
    this.state.participants = shuffled;

    // Assign Quarterfinals:
    // m1: 1 vs 8, m2: 4 vs 5, m3: 2 vs 7, m4: 3 vs 6
    const m = this.state.matches;
    m[0].player1 = shuffled[0]; m[0].player2 = shuffled[7]; m[0].status = 'RUNNING';
    m[1].player1 = shuffled[3]; m[1].player2 = shuffled[4]; m[1].status = 'PENDING';
    m[2].player1 = shuffled[1]; m[2].player2 = shuffled[6]; m[2].status = 'PENDING';
    m[3].player1 = shuffled[2]; m[3].player2 = shuffled[5]; m[3].status = 'PENDING';

    this.state.status = 'IN_PROGRESS';
    this.emitChange();
    return this.getState();
  }

  public setMatchResult(matchId: string, score1: number, score2: number): TournamentState {
    const match = this.state.matches.find((m) => m.id === matchId);
    if (!match) throw new Error(`Match ${matchId} not found.`);
    if (!match.player1 || !match.player2) throw new Error(`Match ${matchId} players not determined yet.`);

    match.score1 = Number(score1.toFixed(2));
    match.score2 = Number(score2.toFixed(2));

    if (match.score1 >= match.score2) {
      match.winner = match.player1;
    } else {
      match.winner = match.player2;
    }
    match.status = 'FINISHED';

    // Auto-advance winners to Semis or Final
    const m = this.state.matches;

    // Quarters -> Semis
    if (matchId === 'm1') { m[4].player1 = match.winner; }
    if (matchId === 'm2') { m[4].player2 = match.winner; }
    if (matchId === 'm3') { m[5].player1 = match.winner; }
    if (matchId === 'm4') { m[5].player2 = match.winner; }

    // If both players in semi ready, set status RUNNING
    if (m[4].player1 && m[4].player2 && m[4].status === 'PENDING') m[4].status = 'RUNNING';
    if (m[5].player1 && m[5].player2 && m[5].status === 'PENDING') m[5].status = 'RUNNING';

    // Semis -> Final
    if (matchId === 'm5') { m[6].player1 = match.winner; }
    if (matchId === 'm6') { m[6].player2 = match.winner; }

    if (m[6].player1 && m[6].player2 && m[6].status === 'PENDING') m[6].status = 'RUNNING';

    // Grand Final Winner = Champion!
    if (matchId === 'm7') {
      this.state.champion = match.winner;
      this.state.status = 'FINISHED';
    }

    this.emitChange();
    return this.getState();
  }

  public toBracketsViewerData(): Record<string, unknown> {
    // Generates json structure compatible with brackets-viewer.js
    const participantRows = this.state.participants.map((p) => ({
      id: p.kickId,
      tournament_id: 1,
      name: `@${p.displayName} (${p.slotName})`,
    }));

    const stageRow = {
      id: 1,
      tournament_id: 1,
      name: this.state.title,
      type: 'single_elimination',
      number: 1,
      settings: { size: 8 },
    };

    const matchRows = this.state.matches.map((m, idx) => ({
      id: idx + 1,
      number: m.matchNumber,
      stage_id: 1,
      group_id: 1,
      round_id: m.round,
      status: m.status === 'FINISHED' ? 4 : (m.status === 'RUNNING' ? 2 : 0),
      opponent1: m.player1 ? { id: m.player1.kickId, score: m.score1, result: m.winner?.kickId === m.player1.kickId ? 'win' : (m.status === 'FINISHED' ? 'loss' : undefined) } : null,
      opponent2: m.player2 ? { id: m.player2.kickId, score: m.score2, result: m.winner?.kickId === m.player2.kickId ? 'win' : (m.status === 'FINISHED' ? 'loss' : undefined) } : null,
    }));

    return {
      participant: participantRows,
      participants: participantRows,
      stage: [stageRow],
      stages: [stageRow],
      group: [{ id: 1, stage_id: 1, number: 1 }],
      round: [
        { id: 1, group_id: 1, number: 1 },
        { id: 2, group_id: 1, number: 2 },
        { id: 3, group_id: 1, number: 3 },
      ],
      match: matchRows,
      matches: matchRows,
      match_game: [],
      matchGames: [],
    };
  }

  public reset(): TournamentState {
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
