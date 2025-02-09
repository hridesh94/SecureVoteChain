
import CryptoJS from 'crypto-js';
import { Block } from './types';

export const calculateHash = (block: Omit<Block, 'hash'>): string => {
  return CryptoJS.SHA256(
    block.index +
    block.previousHash +
    block.timestamp +
    JSON.stringify(block.vote) +
    block.nonce
  ).toString();
};

export const mineBlock = (block: Block, difficulty: number): string => {
  const target = Array(difficulty + 1).join("0");
  
  while (true) {
    const hash = calculateHash(block);
    if (hash.substring(0, difficulty) === target) {
      return hash;
    }
    block.nonce++;
  }
};
