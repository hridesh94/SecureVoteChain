
import { Block } from './types';

export const loadChainFromStorage = (): Block[] | null => {
  try {
    const savedChain = localStorage.getItem('blockchain');
    return savedChain ? JSON.parse(savedChain) : null;
  } catch (error) {
    console.error('Error loading blockchain:', error);
    return null;
  }
};

export const saveChainToStorage = (chain: Block[]): void => {
  try {
    localStorage.setItem('blockchain', JSON.stringify(chain));
  } catch (error) {
    console.error('Error saving blockchain:', error);
  }
};
