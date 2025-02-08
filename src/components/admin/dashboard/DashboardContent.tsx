
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <VotingProgress
            votingProgress={stats.votingProgress}
            remainingVoters={stats.remainingVoters}
          />
          <VotingChart data={votingData} />
        </div>
        <div className="space-y-6">
          <SecurityOverview stats={stats} />
          <div className="p-6 rounded-lg border border-white/20 backdrop-blur-sm">
            <h3 className="font-semibold mb-4 text-lg">Vote Audit System</h3>
            <div className="flex flex-col gap-4">
              <button className="bg-primary/90 text-white px-4 py-2 rounded-lg hover:bg-primary transition-colors">
                Perform Audit
              </button>
              <button className="border border-primary/20 px-4 py-2 rounded-lg hover:bg-primary/5 transition-colors">
                Export Audit Trail
              </button>
            </div>
          </div>
        </div>
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
