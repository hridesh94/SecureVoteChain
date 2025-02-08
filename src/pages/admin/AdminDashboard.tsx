
import DashboardWrapper from "@/components/admin/dashboard/DashboardWrapper";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardContent from "@/components/admin/dashboard/DashboardContent";
import VoterStats from "@/components/admin/VoterStats";
import VoteAudit from "@/components/admin/VoteAudit";
import VotingProgress from "@/components/admin/VotingProgress";
import { useAdminDashboard } from "@/hooks/useAdminDashboard";

const votingData = [
  { time: "9 AM", votes: 150, active: 25 },
  { time: "10 AM", votes: 280, active: 35 },
  { time: "11 AM", votes: 420, active: 42 },
  { time: "12 PM", votes: 550, active: 38 },
  { time: "1 PM", votes: 676, active: 45 },
  { time: "2 PM", votes: 876, active: 42 },
];

const AdminDashboard = () => {
  const {
    isVotingActive,
    showResults,
    votingResults,
    stats,
    handleVotingToggle,
    handleToggleResults,
    handleRefreshData,
    handleExportData,
    handleBlockVoter,
  } = useAdminDashboard();

  return (
    <DashboardWrapper>
      <DashboardHeader
        isVotingActive={isVotingActive}
        showResults={showResults}
        onRefresh={handleRefreshData}
        onExport={handleExportData}
        onBlock={handleBlockVoter}
        onToggleResults={handleToggleResults}
        onVotingToggle={handleVotingToggle}
      />

      <VoterStats
        totalRegistered={stats.totalVoters}
        activeVoters={stats.activeVoters}
        blockedVoters={stats.blockedVoters}
        averageVoteTime={stats.averageVoteTime}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <VotingProgress
          votingProgress={stats.votingProgress}
          remainingVoters={stats.remainingVoters}
        />
        <VoteAudit />
      </div>

      <DashboardContent
        isVotingActive={isVotingActive}
        showResults={showResults}
        votingResults={votingResults}
        stats={{
          votingProgress: stats.votingProgress,
          remainingVoters: stats.remainingVoters,
          activeVoters: stats.activeVoters,
          averageVoteTime: stats.averageVoteTime,
          invalidAttempts: stats.invalidAttempts
        }}
        votingData={votingData}
      />
    </DashboardWrapper>
  );
};

export default AdminDashboard;
