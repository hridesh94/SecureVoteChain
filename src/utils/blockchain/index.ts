import { VoteVerifier, VerifiedVote } from '../voteVerification';
import { Block } from './types';
import { calculateHash, mineBlock } from './blockUtils';
import { loadChainFromStorage, saveChainToStorage, clearBlockchainStorage } from './storage';

export class VotingBlockchain {
  private chain: Block[] = [];
  private difficulty: number = 4;
  private isVotingEnded: boolean = false;
  private static instance: VotingBlockchain;
  private _voteVerifier: VoteVerifier;
  private votedVoters: Set<string> = new Set();
  private demoReset: boolean = false;

  constructor() {
    if (VotingBlockchain.instance) {
      return VotingBlockchain.instance;
    }
    this._voteVerifier = VoteVerifier.getInstance();
    this.loadChain();
    if (this.chain.length === 0) {
      this.createGenesisBlock();
    }
    this.initializeVotedVoters();
    VotingBlockchain.instance = this;
  }

  private initializeVotedVoters(): void {
    this.votedVoters.clear();
    this.chain.forEach(block => {
      if (block.vote.voterId !== "genesis") {
        this.votedVoters.add(block.vote.voterId);
      }
    });
  }

  get voteVerifier(): VoteVerifier {
    return this._voteVerifier;
  }

  private loadChain(): void {
    const loadedChain = loadChainFromStorage();
    if (loadedChain) {
      this.chain = loadedChain;
      if (!this.isChainValid()) {
        console.error('Loaded chain is invalid');
        this.chain = [];
      }
    }
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
    this.chain.push(genesisBlock);
    saveChainToStorage(this.chain);
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public hasVoted(voterId: string): boolean {
    return !this.demoReset && this.votedVoters.has(voterId);
  }

  public addBlock(candidateId: string, voterId: string): void {
    if (this.isVotingEnded) {
      throw new Error("Voting has ended");
    }

    if (this.hasVoted(voterId)) {
      throw new Error("Voter has already cast their vote");
    }

    const signature = this.voteVerifier.signVote(candidateId, voterId);
    if (!this.voteVerifier.verifyVoteTimestamp(signature.timestamp)) {
      throw new Error("Vote timestamp verification failed");
    }

    const verifiedVote: VerifiedVote = {
      candidateId,
      voterId,
      signature
    };

    if (!this.voteVerifier.verifyVote(verifiedVote)) {
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
    this.chain.push(newBlock);
    
    if (!this.demoReset) {
      this.votedVoters.add(voterId);
    }
    
    saveChainToStorage(this.chain);
  }

  public isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== calculateHash(currentBlock)) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      if (i === 0) continue;

      if (!this.voteVerifier.verifyVote(currentBlock.vote)) {
        return false;
      }
    }
    return true;
  }

  public getChain(): Block[] {
    return this.chain;
  }

  public getVotingResults(): { [candidateId: string]: number } {
    if (!this.isVotingEnded) {
      return {};
    }

    const results: { [candidateId: string]: number } = {};
    this.chain.forEach((block) => {
      if (block.vote.candidateId !== "genesis") {
        results[block.vote.candidateId] = (results[block.vote.candidateId] || 0) + 1;
      }
    });
    return results;
  }

  public getAnonymizedVotes(): { timestamp: number; candidateId: string }[] {
    if (!this.isVotingEnded) {
      return [];
    }

    return this.chain
      .filter(block => block.vote.candidateId !== "genesis")
      .map(block => ({
        timestamp: block.timestamp,
        candidateId: block.vote.candidateId
      }));
  }

  public setVotingEnded(ended: boolean): void {
    this.isVotingEnded = ended;
  }

  public isVotingComplete(): boolean {
    return this.isVotingEnded;
  }

  public resetVotingState(): void {
    this.chain = this.chain.slice(0, 1);
    this.votedVoters.clear();
    this.isVotingEnded = false;
    this.demoReset = true;
    clearBlockchainStorage();
    saveChainToStorage(this.chain);
  }

  public setDemoReset(reset: boolean): void {
    this.demoReset = reset;
  }

  public static getInstance(): VotingBlockchain {
    if (!VotingBlockchain.instance) {
      VotingBlockchain.instance = new VotingBlockchain();
    }
    return VotingBlockchain.instance;
  }
}

export type { Block } from './types';
