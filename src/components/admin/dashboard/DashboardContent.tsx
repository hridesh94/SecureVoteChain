
import VotingProgress from "@/components/admin/VotingProgress";
import VotingResults from "@/components/admin/VotingResults";
import VotingChart from "@/components/admin/VotingChart";
import SecurityOverview from "@/components/admin/SecurityOverview";
import VoterList from "@/components/admin/VoterList";
import VoteAudit from "@/components/admin/VoteAudit";

interface DashboardContentProps {
  isVotingActive: boolean;
  showResults: boolean;
  votingResults: { [key: string]: number };
  stats: {
    votingProgress: number;
    remainingVoters: number;
    activeVoters: number;
    averageVoteTime: string;
    invalidAttempts: number;
  };
  votingData: Array<{ time: string; votes: number; active: number }>;
}

const DashboardContent = ({
  isVotingActive,
  showResults,
  votingResults,
  stats,
  votingData,
}: DashboardContentProps) => {
  return (
    <div className="space-y-8">
      <VotingProgress
        votingProgress={stats.votingProgress}
        remainingVoters={stats.remainingVoters}
      />
      
      <VoteAudit />

      <div className="grid grid-cols-2 gap-8">
        <VotingChart data={votingData} />
        <SecurityOverview stats={stats} />
      </div>

      {!isVotingActive && showResults && (
        <VotingResults results={votingResults} />
      )}

      <div className="bg-card rounded-lg border shadow-sm backdrop-blur-sm">
        <div className="p-6">
          <h3 className="font-semibold mb-4 text-lg">Voter Management</h3>
          <VoterList showVotes={!isVotingActive && showResults} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;

