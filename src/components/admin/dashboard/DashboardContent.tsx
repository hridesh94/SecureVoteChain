
import VotingProgress from "@/components/admin/VotingProgress";
import VotingResults from "@/components/admin/VotingResults";
import VotingChart from "@/components/admin/VotingChart";
import SecurityOverview from "@/components/admin/SecurityOverview";
import VoterList from "@/components/admin/VoterList";

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
    <div className="space-y-6">
      <VotingProgress
        votingProgress={stats.votingProgress}
        remainingVoters={stats.remainingVoters}
      />

      {!isVotingActive && showResults && (
        <VotingResults results={votingResults} />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VotingChart data={votingData} />
        <SecurityOverview stats={stats} />
      </div>

      <div className="bg-white rounded-lg border shadow-sm">
        <div className="p-6">
          <h3 className="font-semibold mb-4">Voter Management</h3>
          <VoterList showVotes={!isVotingActive && showResults} />
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
