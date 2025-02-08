
import VotingProgress from "@/components/admin/VotingProgress";
import VotingResults from "@/components/admin/VotingResults";
import VotingChart from "@/components/admin/VotingChart";
import SecurityOverview from "@/components/admin/SecurityOverview";
import VoterList from "@/components/admin/VoterList";
import { Shield, FileSpreadsheet } from "lucide-react";

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
      
      <div className="flex gap-8">
        <div className="flex items-center gap-4">
          <button className="bg-primary/90 text-white px-4 py-3 rounded-lg hover:bg-primary transition-colors flex items-center justify-center gap-2">
            <Shield className="w-4 h-4" />
            Perform Audit
          </button>
          <button className="border border-primary/20 px-4 py-3 rounded-lg hover:bg-primary/5 transition-colors flex items-center justify-center gap-2">
            <FileSpreadsheet className="w-4 h-4" />
            Export Audit Trail
          </button>
        </div>
      </div>

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

