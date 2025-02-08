
import { Users2, UserCheck2, UserX2, Timer } from "lucide-react";

interface VoterStatsProps {
  totalRegistered: number;
  activeVoters: number;
  blockedVoters: number;
  averageVoteTime: string;
}

const VoterStats = ({ totalRegistered, activeVoters, blockedVoters, averageVoteTime }: VoterStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
      <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="flex items-center gap-3">
          <Users2 className="w-5 h-5 text-blue-500" />
          <div>
            <p className="text-sm text-muted-foreground">Total Registered</p>
            <p className="text-2xl font-semibold">{totalRegistered}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="flex items-center gap-3">
          <UserCheck2 className="w-5 h-5 text-green-500" />
          <div>
            <p className="text-sm text-muted-foreground">Active Voters</p>
            <p className="text-2xl font-semibold">{activeVoters}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="flex items-center gap-3">
          <UserX2 className="w-5 h-5 text-red-500" />
          <div>
            <p className="text-sm text-muted-foreground">Blocked Voters</p>
            <p className="text-2xl font-semibold">{blockedVoters}</p>
          </div>
        </div>
      </div>
      
      <div className="p-4 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20">
        <div className="flex items-center gap-3">
          <Timer className="w-5 h-5 text-purple-500" />
          <div>
            <p className="text-sm text-muted-foreground">Average Vote Time</p>
            <p className="text-2xl font-semibold">{averageVoteTime}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoterStats;
