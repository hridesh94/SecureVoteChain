
import { Block } from './types';
import { loadChainFromStorage, saveChainToStorage } from './storage';

export class BlockchainState {
  private chain: Block[] = [];
  private isVotingEnded: boolean = false;

  constructor() {
    this.loadChain();
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
  }

  public isVotingComplete(): boolean {
    return this.isVotingEnded;
  }

  public resetChain(): void {
    this.chain = this.chain.slice(0, 1); // Keep only genesis block
    this.saveChain();
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

