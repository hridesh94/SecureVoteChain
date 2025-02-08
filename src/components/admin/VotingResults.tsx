
import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { mockPollingStations, mockCandidates } from "@/pages/voter/mockData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface VotingResultsProps {
  results: { [key: string]: number };
}

const VotingResults = ({ results }: VotingResultsProps) => {
  const [selectedPollingStation, setSelectedPollingStation] = useState(mockPollingStations[0].id);

  const getLevelResults = (level: "local" | "provincial" | "federal") => {
    const pollingStation = mockPollingStations.find(ps => ps.id === selectedPollingStation);
    const constituencyId = pollingStation?.constituencies[level].id;
    
    const levelCandidates = mockCandidates.filter(
      candidate => candidate.level === level && 
      candidate.id.startsWith(constituencyId || '')
    );
    
    const candidatesWithVotes = levelCandidates.map(candidate => ({
      id: candidate.id,
      name: candidate.name,
      party: candidate.party,
      constituency: candidate.constituency,
      votes: results[candidate.id] || 0,
    }));

    // Find the highest number of votes
    const maxVotes = Math.max(...candidatesWithVotes.map(c => c.votes));

    // Mark winners (in case of tie, multiple candidates can be winners)
    return candidatesWithVotes.map(candidate => ({
      ...candidate,
      isWinner: candidate.votes === maxVotes && maxVotes > 0,
    }));
  };

  const renderPollingStationSelector = () => (
    <div className="mb-6">
      <Select
        value={selectedPollingStation}
        onValueChange={setSelectedPollingStation}
      >
        <SelectTrigger className="w-full relative bg-background">
          <SelectValue placeholder="Select polling station" />
        </SelectTrigger>
        <SelectContent
          position="popper"
          className="w-[var(--radix-select-trigger-width)] bg-background shadow-lg"
          align="start"
          sideOffset={4}
        >
          {mockPollingStations.map((station) => (
            <SelectItem 
              key={station.id} 
              value={station.id}
              className="cursor-pointer hover:bg-primary/5"
            >
              {station.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );

  const renderLevelResults = (level: "local" | "provincial" | "federal", title: string) => {
    const pollingStation = mockPollingStations.find(ps => ps.id === selectedPollingStation);
    return (
      <div className="space-y-3">
        <h4 className="font-semibold text-lg">{title}</h4>
        <div className="text-sm text-primary/70 mb-4">
          Constituency: {pollingStation?.constituencies[level].name}
        </div>
        <div className="space-y-2">
          {getLevelResults(level).map(candidate => (
            <motion.div 
              key={candidate.id} 
              className={`flex justify-between items-center p-3 rounded-lg ${
                candidate.isWinner 
                  ? "bg-primary/10 border-2 border-primary" 
                  : "bg-primary/5"
              }`}
              animate={candidate.isWinner ? {
                scale: [1, 1.02, 1],
                transition: { duration: 0.3 }
              } : {}}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{candidate.name}</p>
                  {candidate.isWinner && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    >
                      <Trophy className="w-5 h-5 text-primary" />
                    </motion.div>
                  )}
                </div>
                <p className="text-sm text-primary/70">{candidate.party}</p>
                <p className="text-xs text-primary/50">{candidate.constituency}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-semibold ${candidate.isWinner ? "text-primary" : ""}`}>
                  {candidate.votes}
                </span>
                <span className="text-sm text-primary/70">votes</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="p-6 rounded-lg border border-white/20">
      <h3 className="font-semibold mb-6 text-xl">Voting Results</h3>
      {renderPollingStationSelector()}
      <div className="grid gap-6">
        {renderLevelResults("local", "Local Level Elections")}
        {renderLevelResults("provincial", "Provincial Level Elections")}
        {renderLevelResults("federal", "Federal Level Elections")}
      </div>
    </div>
  );
};

export default VotingResults;

