
interface VotingResultsProps {
  results: { [key: string]: number };
}

const VotingResults = ({ results }: VotingResultsProps) => {
  return (
    <div className="p-6 rounded-lg border border-white/20">
      <h3 className="font-semibold mb-4">Voting Results</h3>
      <div className="space-y-4">
        {Object.entries(results).map(([candidateId, votes]) => (
          <div key={candidateId} className="flex justify-between items-center">
            <span>Candidate {candidateId}</span>
            <span className="font-semibold">{votes} votes</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VotingResults;
