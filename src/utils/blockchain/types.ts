
import { VerifiedVote, VoteSignature } from '../voteVerification';

export interface Block {
  index: number;
  timestamp: number;
  vote: VerifiedVote;
  previousHash: string;
  hash: string;
  nonce: number;
}
