
import { Users, BarChart, UserCheck, Clock, Shield, UserX } from "lucide-react";
import StatCard from "@/components/admin/StatCard";

interface DashboardStatsProps {
  stats: {
    totalVoters: number;
    votesCast: number;
    votingProgress: number;
    activeVoters: number;
    averageVoteTime: string;
    remainingVoters: number;
    invalidAttempts: number;
    blockedVoters: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
      <StatCard
        title="Total Voters"
        value={stats.totalVoters}
        icon={Users}
        delay={0.1}
      />
      <StatCard
        title="Votes Cast"
        value={stats.votesCast}
        icon={BarChart}
        delay={0.2}
      />
      <StatCard
        title="Voting Progress"
        value={`${stats.votingProgress.toFixed(1)}%`}
        icon={UserCheck}
        delay={0.3}
      />
      <StatCard
        title="Active Voters"
        value={stats.activeVoters}
        icon={Clock}
        delay={0.4}
      />
      <StatCard
        title="Invalid Attempts"
        value={stats.invalidAttempts}
        icon={Shield}
        delay={0.5}
      />
      <StatCard
        title="Blocked Voters"
        value={stats.blockedVoters}
        icon={UserX}
        delay={0.6}
      />
    </div>
  );
};

export default DashboardStats;

