
import { VerifiedVote, VoteVerifier } from '../voteVerification';

export class VoteManager {
  private votedVoters: Set<string> = new Set();
  private _voteVerifier: VoteVerifier;

  constructor() {
    this._voteVerifier = VoteVerifier.getInstance();
  }

  get voteVerifier(): VoteVerifier {
    return this._voteVerifier;
  }

  public hasVoted(voterId: string): boolean {
    return this.votedVoters.has(voterId);
  }

  public addVoter(voterId: string): void {
    this.votedVoters.add(voterId);
  }

  public clearVotedVoters(): void {
    this.votedVoters.clear();
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

