
import { Candidate } from "../types";
import CandidateCard from "./CandidateCard";

interface CandidateListProps {
  candidates: Candidate[];
  currentLevel: "local" | "provincial" | "federal";
  votes: {
    local: string | null;
    provincial: string | null;
    federal: string | null;
  };
  showDetails: string | null;
  onSelectCandidate: (candidateId: string) => void;
  onToggleDetails: (id: string) => void;
}

const CandidateList = ({
  candidates,
  currentLevel,
  votes,
  showDetails,
  onSelectCandidate,
  onToggleDetails,
}: CandidateListProps) => {
  if (candidates.length === 0) {
    return (
      <div className="text-center py-8 text-primary/70">
        Please select your constituency to view available candidates
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          isSelected={votes[currentLevel] === candidate.id}
          showDetails={showDetails}
          onSelect={onSelectCandidate}
          onToggleDetails={onToggleDetails}
        />
      ))}
    </div>
  );
};

export default CandidateList;
