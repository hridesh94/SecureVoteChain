
import { BarChart3, Clock, AlertTriangle, Users } from "lucide-react";

interface VotingMetricsProps {
  hourlyVoteRate: number;
  lastVoteTimestamp: number | null;
  invalidAttempts: number;
  activeVoters: number;
}

const VotingMetrics = ({ hourlyVoteRate, lastVoteTimestamp, invalidAttempts, activeVoters }: VotingMetricsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="p-4 bg-card rounded-lg border">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Hourly Vote Rate</p>
            <p className="text-2xl font-semibold">{hourlyVoteRate}</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-card rounded-lg border">
        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Last Vote</p>
            <p className="text-2xl font-semibold">
              {lastVoteTimestamp 
                ? new Date(lastVoteTimestamp).toLocaleTimeString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-card rounded-lg border">
        <div className="flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-destructive" />
          <div>
            <p className="text-sm text-muted-foreground">Invalid Attempts</p>
            <p className="text-2xl font-semibold">{invalidAttempts}</p>
          </div>
        </div>
      </div>

      <div className="p-4 bg-card rounded-lg border">
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-primary" />
          <div>
            <p className="text-sm text-muted-foreground">Active Voters</p>
            <p className="text-2xl font-semibold">{activeVoters}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VotingMetrics;
