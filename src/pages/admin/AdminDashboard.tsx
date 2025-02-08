
import DashboardWrapper from "@/components/admin/dashboard/DashboardWrapper";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import DashboardContent from "@/components/admin/dashboard/DashboardContent";
import VotingMetrics from "@/components/admin/dashboard/VotingMetrics";
import DashboardLayout from "@/components/admin/dashboard/DashboardLayout";
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
      <DashboardLayout>
        <DashboardHeader
          isVotingActive={isVotingActive}
          showResults={showResults}
          onRefresh={handleRefreshData}
          onExport={handleExportData}
          onBlock={handleBlockVoter}
          onToggleResults={handleToggleResults}
          onVotingToggle={handleVotingToggle}
        />

        <DashboardStats stats={stats} />

        <VotingMetrics
          hourlyVoteRate={stats.hourlyVoteRate}
          lastVoteTimestamp={stats.lastVoteTimestamp}
          invalidAttempts={stats.invalidAttempts}
          activeVoters={stats.activeVoters}
        />

        <DashboardContent
          isVotingActive={isVotingActive}
          showResults={showResults}
          votingResults={votingResults}
          stats={stats}
          votingData={votingData}
        />
      </DashboardLayout>
    </DashboardWrapper>
  );
};

export default AdminDashboard;
