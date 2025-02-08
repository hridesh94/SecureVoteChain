
import { mockCandidates } from "@/pages/voter/mockData";

interface VotingResultsProps {
  results: { [key: string]: number };
}

const VotingResults = ({ results }: VotingResultsProps) => {
  const getLevelResults = (level: "local" | "provincial" | "federal") => {
    const levelCandidates = mockCandidates.filter(candidate => candidate.level === level);
    return levelCandidates.map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      party: candidate.party,
      votes: results[candidate.id] || 0,
    }));
  };

  const renderLevelResults = (level: "local" | "provincial" | "federal", title: string) => (
    <div className="space-y-3">
      <h4 className="font-semibold text-lg">{title}</h4>
      <div className="space-y-2">
        {getLevelResults(level).map(candidate => (
          <div 
            key={candidate.id} 
            className="flex justify-between items-center p-3 bg-primary/5 rounded-lg"
          >
            <div>
              <p className="font-medium">{candidate.name}</p>
              <p className="text-sm text-primary/70">{candidate.party}</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-semibold">{candidate.votes}</span>
              <span className="text-sm text-primary/70">votes</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="p-6 rounded-lg border border-white/20">
      <h3 className="font-semibold mb-6 text-xl">Voting Results</h3>
      <div className="grid gap-6">
        {renderLevelResults("local", "Local Level Elections")}
        {renderLevelResults("provincial", "Provincial Level Elections")}
        {renderLevelResults("federal", "Federal Level Elections")}
      </div>
    </div>
  );
};

export default VotingResults;
