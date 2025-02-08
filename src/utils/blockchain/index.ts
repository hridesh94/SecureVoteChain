
import { VoteVerifier, VerifiedVote } from '../voteVerification';
import { Block } from './types';
import { calculateHash, mineBlock } from './blockUtils';
import { VoteManager } from './VoteManager';
import { BlockchainState } from './BlockchainState';
import { VotingResults } from './VotingResults';

export class VotingBlockchain {
  private difficulty: number = 4;
  private static instance: VotingBlockchain;
  private voteManager: VoteManager;
  private blockchainState: BlockchainState;
  private votingResults: VotingResults;

  constructor() {
    if (VotingBlockchain.instance) {
      return VotingBlockchain.instance;
    }
    this.voteManager = new VoteManager();
    this.blockchainState = new BlockchainState();
    this.votingResults = new VotingResults(
      () => this.blockchainState.getChain(),
      () => this.blockchainState.isVotingComplete()
    );

    if (this.blockchainState.getChain().length === 0) {
      this.createGenesisBlock();
    }
    VotingBlockchain.instance = this;
  }

  private createGenesisBlock(): void {
    const genesisVote: VerifiedVote = {
      candidateId: "genesis",
      voterId: "genesis",
      signature: {
        signature: "genesis",
        timestamp: Date.now(),
        publicKey: "genesis"
      }
    };

    const genesisBlock: Block = {
      index: 0,
      timestamp: Date.now(),
      vote: genesisVote,
      previousHash: "0",
      hash: "",
      nonce: 0
    };
    
    genesisBlock.hash = calculateHash(genesisBlock);
    this.blockchainState.addBlock(genesisBlock);
  }

  public getLatestBlock(): Block {
    return this.blockchainState.getLatestBlock();
  }

  public hasVoted(voterId: string): boolean {
    return this.voteManager.hasVoted(voterId);
  }

  public addBlock(candidateId: string, voterId: string): void {
    if (this.blockchainState.isVotingComplete()) {
      throw new Error("Voting has ended");
    }

    if (this.hasVoted(voterId)) {
      throw new Error("Voter has already cast their vote");
    }

    const signature = this.voteManager.signVote(candidateId, voterId);
    if (!this.voteManager.verifyVoteTimestamp(signature.timestamp)) {
      throw new Error("Vote timestamp verification failed");
    }

    const verifiedVote: VerifiedVote = {
      candidateId,
      voterId,
      signature
    };

    if (!this.voteManager.verifyVoteSignature(verifiedVote)) {
      throw new Error("Vote signature verification failed");
    }

    const previousBlock = this.getLatestBlock();
    const newBlock: Block = {
      index: previousBlock.index + 1,
      timestamp: Date.now(),
      vote: verifiedVote,
      previousHash: previousBlock.hash,
      hash: "",
      nonce: 0
    };

    newBlock.hash = mineBlock(newBlock, this.difficulty);
    this.blockchainState.addBlock(newBlock);
    this.voteManager.addVoter(voterId);
  }

  public isChainValid(): boolean {
    const chain = this.blockchainState.getChain();
    for (let i = 1; i < chain.length; i++) {
      const currentBlock = chain[i];
      const previousBlock = chain[i - 1];

      if (currentBlock.hash !== calculateHash(currentBlock)) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      if (i === 0) continue;

      if (!this.voteManager.verifyVoteSignature(currentBlock.vote)) {
        return false;
      }
    }
    return true;
  }

  public getChain(): Block[] {
    return this.blockchainState.getChain();
  }

  public getVotingResults(): { [candidateId: string]: number } {
    return this.votingResults.getResults();
  }

  public getAnonymizedVotes(): { timestamp: number; candidateId: string }[] {
    return this.votingResults.getAnonymizedVotes();
  }

  public setVotingEnded(ended: boolean): void {
    this.blockchainState.setVotingEnded(ended);
    if (!ended) {
      this.resetVotingState();
    }
  }

  public isVotingComplete(): boolean {
    return this.blockchainState.isVotingComplete();
  }

  public resetVotingState(): void {
    this.blockchainState.resetVotingSession();
    this.voteManager.resetVotingSession();
    console.log("Voting state reset: Chain and voted voters cleared");
  }

  public static getInstance(): VotingBlockchain {
    if (!VotingBlockchain.instance) {
      VotingBlockchain.instance = new VotingBlockchain();
    }
    return VotingBlockchain.instance;
  }
}

export type { Block } from './types';
