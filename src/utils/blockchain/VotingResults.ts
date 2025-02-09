
import { Block } from './types';

export class VotingResults {
  constructor(private getChain: () => Block[], private isVotingComplete: () => boolean) {}

  public getResults(): { [candidateId: string]: number } {
    if (!this.isVotingComplete()) {
      return {};
    }

    const results: { [candidateId: string]: number } = {};
    this.getChain().forEach((block) => {
      if (block.vote.candidateId !== "genesis") {
        results[block.vote.candidateId] = (results[block.vote.candidateId] || 0) + 1;
      }
    });
    return results;
  }

  public getAnonymizedVotes(): { timestamp: number; candidateId: string }[] {
    if (!this.isVotingComplete()) {
      return [];
    }

    return this.getChain()
      .filter(block => block.vote.candidateId !== "genesis")
      .map(block => ({
        timestamp: block.timestamp,
        candidateId: block.vote.candidateId
      }));
  }
}

