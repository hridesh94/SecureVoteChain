
import CryptoJS from 'crypto-js';

export interface VoteSignature {
  signature: string;
  timestamp: number;
  publicKey: string;
}

export interface VerifiedVote {
  candidateId: string;
  voterId: string;
  signature: VoteSignature;
}

export class VoteVerifier {
  private static instance: VoteVerifier;
  private secretKey: string;

  private constructor() {
    // In production, this should be fetched from a secure environment variable
    this.secretKey = 'your-secret-key';
  }

  public static getInstance(): VoteVerifier {
    if (!VoteVerifier.instance) {
      VoteVerifier.instance = new VoteVerifier();
    }
    return VoteVerifier.instance;
  }

  public signVote(candidateId: string, voterId: string): VoteSignature {
    const timestamp = Date.now();
    const message = `${candidateId}-${voterId}-${timestamp}`;
    const signature = CryptoJS.HmacSHA256(message, this.secretKey).toString();
    const publicKey = CryptoJS.SHA256(this.secretKey).toString().substr(0, 16);

    return {
      signature,
      timestamp,
      publicKey
    };
  }

  public verifyVote(vote: VerifiedVote): boolean {
    const message = `${vote.candidateId}-${vote.voterId}-${vote.signature.timestamp}`;
    const expectedSignature = CryptoJS.HmacSHA256(message, this.secretKey).toString();
    return expectedSignature === vote.signature.signature;
  }

  public verifyVoteTimestamp(timestamp: number): boolean {
    const currentTime = Date.now();
    const timeDifference = currentTime - timestamp;
    // Vote must be less than 5 minutes old
    return timeDifference < 5 * 60 * 1000;
  }
}
