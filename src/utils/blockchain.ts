
import CryptoJS from 'crypto-js';

export interface Block {
  index: number;
  timestamp: number;
  vote: {
    candidateId: string;
    voterId: string;
  };
  previousHash: string;
  hash: string;
  nonce: number;
}

export class VotingBlockchain {
  private chain: Block[] = [];
  private difficulty: number = 4;
  private isVotingEnded: boolean = false;

  constructor() {
    this.createGenesisBlock();
  }

  private createGenesisBlock(): void {
    const genesisBlock: Block = {
      index: 0,
      timestamp: Date.now(),
      vote: {
        candidateId: "genesis",
        voterId: "genesis"
      },
      previousHash: "0",
      hash: "0",
      nonce: 0
    };
    
    genesisBlock.hash = this.calculateHash(genesisBlock);
    this.chain.push(genesisBlock);
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
    const previousBlock = this.getLatestBlock();
    const newBlock: Block = {
      index: previousBlock.index + 1,
      timestamp: Date.now(),
      vote: {
        candidateId,
        voterId
      },
      previousHash: previousBlock.hash,
      hash: "",
      nonce: 0
    };

    newBlock.hash = this.mineBlock(newBlock);
    this.chain.push(newBlock);
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

      if (currentBlock.hash !== this.calculateHash(currentBlock)) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
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
}
