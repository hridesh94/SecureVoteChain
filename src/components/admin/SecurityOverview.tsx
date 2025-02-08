
import { UserCheck, Ban, Clock } from "lucide-react";

interface SecurityStats {
  activeVoters: number;
  invalidAttempts: number;
  averageVoteTime: string;
}

const SecurityOverview = ({ stats }: { stats: SecurityStats }) => {
  return (
    <div className="p-6 rounded-lg border border-white/20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-semibold">Security Overview</h3>
        <div className="flex items-center text-sm text-primary/70">
          <Clock className="w-4 h-4 mr-2" />
          Real-time monitoring
        </div>
      </div>
      <div className="space-y-4">
        <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center">
            <UserCheck className="w-5 h-5 text-green-500 mr-2" />
            <span>Active Sessions</span>
          </div>
          <span className="font-semibold">{stats.activeVoters}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center">
            <Ban className="w-5 h-5 text-red-500 mr-2" />
            <span>Invalid Attempts</span>
          </div>
          <span className="font-semibold">{stats.invalidAttempts}</span>
        </div>
        <div className="flex justify-between items-center p-4 bg-secondary/50 rounded-lg">
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            <span>Average Vote Time</span>
          </div>
          <span className="font-semibold">{stats.averageVoteTime}</span>
        </div>
      </div>
    </div>
  );
};

export default SecurityOverview;
