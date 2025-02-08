
import { VerifiedVote, VoteVerifier } from '../voteVerification';

export class VoteManager {
  private votedVoters: Set<string> = new Set();
  private _voteVerifier: VoteVerifier;
  private votingSessionId: string = '';

  constructor() {
    this._voteVerifier = VoteVerifier.getInstance();
    this.resetVotingSession(Date.now().toString());
  }

  get voteVerifier(): VoteVerifier {
    return this._voteVerifier;
  }

  public hasVoted(voterId: string): boolean {
    return this.votedVoters.has(`${this.votingSessionId}-${voterId}`);
  }

  public addVoter(voterId: string): void {
    this.votedVoters.add(`${this.votingSessionId}-${voterId}`);
  }

  public resetVotingSession(sessionId: string): void {
    this.votedVoters.clear();
    this.votingSessionId = sessionId;
    console.log("VoteManager: New voting session started with ID:", this.votingSessionId);
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
