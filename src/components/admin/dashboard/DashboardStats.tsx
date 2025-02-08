
import { Users, BarChart, UserCheck, Clock } from "lucide-react";
import StatCard from "@/components/admin/StatCard";

interface DashboardStatsProps {
  stats: {
    totalVoters: number;
    votesCast: number;
    votingProgress: number;
    activeVoters: number;
    averageVoteTime: string;
    remainingVoters: number;
  };
}

const DashboardStats = ({ stats }: DashboardStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
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
        title="Remaining Voters"
        value={stats.remainingVoters}
        icon={Clock}
        delay={0.4}
      />
    </div>
  );
};

export default DashboardStats;
