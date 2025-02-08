
import { Progress } from "@/components/ui/progress";

interface VotingProgressProps {
  votingProgress: number;
  remainingVoters: number;
}

const VotingProgress = ({ votingProgress, remainingVoters }: VotingProgressProps) => {
  return (
    <div className="p-6 rounded-lg border border-white/20 backdrop-blur-sm">
      <h3 className="font-semibold mb-4 text-lg">
        Voting Progress
      </h3>
      <Progress 
        value={votingProgress} 
        className="h-6 mb-4 w-full bg-secondary"
      />
      <div className="flex justify-between items-center text-sm">
        <p className="text-primary/70">
          <span className="font-semibold text-primary">{votingProgress.toFixed(1)}%</span> of total votes cast
        </p>
        <p className="text-primary/70">
          <span className="font-semibold text-primary">{remainingVoters}</span> votes remaining
        </p>
      </div>
    </div>
  );
};

export default VotingProgress;

