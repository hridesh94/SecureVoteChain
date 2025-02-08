
import { VerifiedVote, VoteVerifier } from '../voteVerification';

export class VoteManager {
  private votedVoters: Map<string, { timestamp: number, votes: Set<string> }> = new Map();
  private _voteVerifier: VoteVerifier;
  private lastResetTimestamp: number;

  constructor() {
    this._voteVerifier = VoteVerifier.getInstance();
    this.lastResetTimestamp = Date.now();
  }

  get voteVerifier(): VoteVerifier {
    return this._voteVerifier;
  }

  public hasVoted(voterId: string): boolean {
    const voterData = this.votedVoters.get(voterId);
    return voterData !== undefined && voterData.timestamp >= this.lastResetTimestamp;
  }

  public addVoter(voterId: string, candidateId: string): void {
    const existingVoter = this.votedVoters.get(voterId);
    if (existingVoter && existingVoter.timestamp >= this.lastResetTimestamp) {
      throw new Error("Voter has already cast their vote");
    }

    this.votedVoters.set(voterId, {
      timestamp: Date.now(),
      votes: new Set([candidateId])
    });
  }

  public resetVotingSession(): void {
    this.lastResetTimestamp = Date.now();
    this.votedVoters.clear();
    console.log("VoteManager: New voting session started at:", this.lastResetTimestamp);
  }

  public verifyVoteSignature(verifiedVote: VerifiedVote): boolean {
    return this.voteVerifier.verifyVote(verifiedVote);
  }

  public verifyVoteTimestamp(timestamp: number): boolean {
    return this.voteVerifier.verifyVoteTimestamp(timestamp);
  }

  public signVote(candidateId: string, voterId: string) {
    return this.voteVerifier.signVote(candidateId, voterId);
  }
}
