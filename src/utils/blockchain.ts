import CryptoJS from 'crypto-js';
import { VoteVerifier, VerifiedVote, VoteSignature } from './voteVerification';

export interface Block {
  index: number;
  timestamp: number;
  vote: VerifiedVote;
  previousHash: string;
  hash: string;
  nonce: number;
}

export class VotingBlockchain {
  private chain: Block[] = [];
  private difficulty: number = 4;
  private isVotingEnded: boolean = false;
  private static instance: VotingBlockchain;
  private voteVerifier: VoteVerifier;

  constructor() {
    if (VotingBlockchain.instance) {
      return VotingBlockchain.instance;
    }
    this.voteVerifier = VoteVerifier.getInstance();
    this.loadChain();
    if (this.chain.length === 0) {
      this.createGenesisBlock();
    }
    VotingBlockchain.instance = this;
  }

  private loadChain(): void {
    try {
      const savedChain = localStorage.getItem('blockchain');
      if (savedChain) {
        this.chain = JSON.parse(savedChain);
        if (!this.isChainValid()) {
          console.error('Loaded chain is invalid');
          this.chain = [];
        }
      }
    } catch (error) {
      console.error('Error loading blockchain:', error);
      this.chain = [];
    }
  }

  private saveChain(): void {
    try {
      localStorage.setItem('blockchain', JSON.stringify(this.chain));
    } catch (error) {
      console.error('Error saving blockchain:', error);
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
    
    genesisBlock.hash = this.calculateHash(genesisBlock);
    this.chain.push(genesisBlock);
    this.saveChain();
  }

  private calculateHash(block: Omit<Block, 'hash'>): string {
    return CryptoJS.SHA256(
      block.index +
      block.previousHash +
      block.timestamp +
      JSON.stringify(block.vote) +
      block.nonce
    ).toString();
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public addBlock(candidateId: string, voterId: string): void {
    if (this.isVotingEnded) {
      throw new Error("Voting has ended");
    }

    // Create and verify vote signature
    const signature = this.voteVerifier.signVote(candidateId, voterId);
    if (!this.voteVerifier.verifyVoteTimestamp(signature.timestamp)) {
      throw new Error("Vote timestamp verification failed");
    }

    const verifiedVote: VerifiedVote = {
      candidateId,
      voterId,
      signature
    };

    // Verify the vote before adding to blockchain
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

    newBlock.hash = this.mineBlock(newBlock);
    this.chain.push(newBlock);
    this.saveChain();
  }

  private mineBlock(block: Block): string {
    const target = Array(this.difficulty + 1).join("0");
    
    while (true) {
      const hash = this.calculateHash(block);
      if (hash.substring(0, this.difficulty) === target) {
        return hash;
      }
      block.nonce++;
    }
  }

  public isChainValid(): boolean {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      // Verify block hash
      if (currentBlock.hash !== this.calculateHash(currentBlock)) {
        return false;
      }

      // Verify chain continuity
      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }

      // Skip genesis block vote verification
      if (i === 0) continue;

      // Verify vote signature
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

  // Singleton instance getter
  public static getInstance(): VotingBlockchain {
    if (!VotingBlockchain.instance) {
      VotingBlockchain.instance = new VotingBlockchain();
    }
    return VotingBlockchain.instance;
  }
}
