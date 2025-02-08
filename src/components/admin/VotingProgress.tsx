
interface VotingProgressProps {
  votingProgress: number;
  remainingVoters: number;
}

const VotingProgress = ({ votingProgress, remainingVoters }: VotingProgressProps) => {
  return (
    <div className="p-6 rounded-lg border border-white/20">
      <h3 className="font-semibold mb-4">Voting Progress</h3>
      <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
        <div
          className="bg-primary h-2.5 rounded-full transition-all duration-500"
          style={{ width: `${votingProgress}%` }}
        ></div>
      </div>
      <div className="flex justify-between text-sm text-primary/70">
        <p>{votingProgress.toFixed(1)}% of total votes cast</p>
        <p>{remainingVoters} votes remaining</p>
      </div>
    </div>
  );
};

export default VotingProgress;
