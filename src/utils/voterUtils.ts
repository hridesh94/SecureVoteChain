
import { Voter, Vote } from "@/types/voter";
import { VotingBlockchain } from "@/utils/blockchain";

const blockchain = VotingBlockchain.getInstance();

export const updateVotersFromBlockchain = (voters: Voter[]): Voter[] => {
  const chain = blockchain.getChain();
  const votedIds = new Set<string>();
  const voterVotes: { [key: string]: Vote } = {};
  
  chain.forEach(block => {
    if (block.vote.voterId !== "genesis") {
      votedIds.add(block.vote.voterId);
      if (!voterVotes[block.vote.voterId]) {
        voterVotes[block.vote.voterId] = {};
      }
      const level = block.vote.candidateId.charAt(0).toLowerCase() === 'l' 
        ? 'local' 
        : block.vote.candidateId.charAt(0).toLowerCase() === 'p'
          ? 'provincial'
          : 'federal';
      voterVotes[block.vote.voterId][level] = block.vote.candidateId;
    }
  });

  return voters.map(voter => {
    if (votedIds.has(voter.id)) {
      const lastVoteBlock = chain
        .filter(block => block.vote.voterId === voter.id)
        .pop();
      return {
        ...voter,
        status: "voted",
        lastActivity: new Date(lastVoteBlock?.timestamp || '').toISOString().split('T')[0],
        votes: voterVotes[voter.id]
      };
    }
    return voter;
  });
};

export const filterVoters = (
  voters: Voter[],
  search: string,
  status: string
): Voter[] => {
  return voters.filter(
    (voter) =>
      (voter.name.toLowerCase().includes(search.toLowerCase()) ||
        voter.id.toLowerCase().includes(search.toLowerCase()) ||
        voter.location?.toLowerCase().includes(search.toLowerCase())) &&
      (status === "all" || voter.status === status)
  );
};

export const exportVotersToCSV = (voters: Voter[], showVotes: boolean): Blob => {
  const headers = [
    "ID",
    "Name",
    "Status",
    "Registration Date",
    "Last Activity",
    "Location",
    "Login Attempts",
    "IP Address",
    ...(showVotes ? ["Voting Status"] : []),
  ];

  const csvContent =
    headers.join(",") +
    "\n" +
    voters
      .map((voter) =>
        [
          voter.id,
          voter.name,
          voter.status,
          voter.registrationDate,
          voter.lastActivity,
          voter.location || "",
          voter.loginAttempts || "0",
          voter.ipAddress || "",
          ...(showVotes ? [voter.votes ? "Completed" : "Not Voted"] : []),
        ].join(",")
      )
      .join("\n");

  return new Blob([csvContent], { type: "text/csv" });
};
