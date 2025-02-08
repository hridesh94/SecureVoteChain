
import { VerifiedVote, VoteVerifier } from '../voteVerification';

export class VoteManager {
  private votedVoters: Map<string, number> = new Map();
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
    const voterTimestamp = this.votedVoters.get(voterId);
    return voterTimestamp !== undefined && voterTimestamp >= this.lastResetTimestamp;
  }

  public addVoter(voterId: string): void {
    this.votedVoters.set(voterId, Date.now());
  }

  public resetVotingSession(): void {
    this.lastResetTimestamp = Date.now();
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
