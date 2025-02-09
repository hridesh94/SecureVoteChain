
import { Block } from './types';
import { loadChainFromStorage, saveChainToStorage } from './storage';

export class BlockchainState {
  private chain: Block[] = [];
  private isVotingEnded: boolean = false;
  private lastResetTimestamp: number;

  constructor() {
    this.loadChain();
    this.lastResetTimestamp = Date.now();
  }

  public getChain(): Block[] {
    return this.chain;
  }

  public addBlock(block: Block): void {
    this.chain.push(block);
    this.saveChain();
  }

  public getLatestBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  public setVotingEnded(ended: boolean): void {
    this.isVotingEnded = ended;
    if (!ended) {
      this.resetVotingSession();
    }
  }

  public isVotingComplete(): boolean {
    return this.isVotingEnded;
  }

  public resetVotingSession(): void {
    const genesisBlock = this.chain.length > 0 ? this.chain[0] : null;
    this.chain = genesisBlock ? [genesisBlock] : [];
    this.lastResetTimestamp = Date.now();
    this.isVotingEnded = false;
    this.saveChain();
    console.log("BlockchainState: Voting session reset at:", this.lastResetTimestamp);
  }

  private loadChain(): void {
    const loadedChain = loadChainFromStorage();
    if (loadedChain) {
      this.chain = loadedChain;
    }
  }

  private saveChain(): void {
    saveChainToStorage(this.chain);
  }
}
