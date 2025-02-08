
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { VotingBlockchain } from "@/utils/blockchain";
import { mockCandidates, mockPollingStations } from "./mockData";
import VoteSuccess from "./components/VoteSuccess";
import ProgressTracker from "./components/ProgressTracker";
import ConstituencySelector from "./components/ConstituencySelector";
import CandidateList from "./components/CandidateList";

const blockchain = VotingBlockchain.getInstance();

const VoterDashboard = () => {
  const [selectedPollingStation, setSelectedPollingStation] = useState<string | null>(null);
  const [votes, setVotes] = useState<{
    local: string | null;
    provincial: string | null;
    federal: string | null;
  }>({
    local: null,
    provincial: null,
    federal: null,
  });
  
  const [hasVoted, setHasVoted] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState<"local" | "provincial" | "federal">("local");
  const { toast } = useToast();

  const handlePollingStationSelect = (stationId: string) => {
    setSelectedPollingStation(stationId);
    // Reset votes when polling station changes
    setVotes({
      local: null,
      provincial: null,
      federal: null,
    });
  };

  const handleVote = () => {
    if (!votes.local || !votes.provincial || !votes.federal) {
      toast({
        title: "Incomplete Votes",
        description: "Please select a candidate for each level (Local, Provincial, and Federal) before submitting.",
        variant: "destructive",
      });
      return;
    }

    if (blockchain.isVotingComplete()) {
      toast({
        title: "Voting Ended",
        description: "The voting period has ended.",
        variant: "destructive",
      });
      return;
    }

    try {
      const voterId = `V${Date.now()}`;
      Object.entries(votes).forEach(([level, candidateId]) => {
        if (candidateId) {
          blockchain.addBlock(candidateId, voterId);
        }
      });
      
      setHasVoted(true);
      toast({
        title: "Vote Confirmation",
        description: "Your votes have been securely recorded for all levels. धन्यवाद! (Thank you!)",
      });
      
      console.log("Votes recorded:", {
        votes,
        pollingStation: selectedPollingStation,
        chain: blockchain.getChain()
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error recording your votes. Please try again.",
        variant: "destructive",
      });
      console.error("Voting error:", error);
    }
  };

  const handleSelectCandidate = (candidateId: string) => {
    setVotes(prev => ({
      ...prev,
      [currentLevel]: candidateId
    }));

    toast({
      title: "Selection Confirmed",
      description: `Candidate selected for ${currentLevel} level. You can now proceed to the next level.`,
    });

    if (currentLevel === "local") {
      setCurrentLevel("provincial");
    } else if (currentLevel === "provincial") {
      setCurrentLevel("federal");
    }
  };

  const selectedStation = selectedPollingStation 
    ? mockPollingStations.find(ps => ps.id === selectedPollingStation)
    : null;

  const filteredCandidates = mockCandidates.filter(
    candidate => {
      if (!selectedStation) return false;
      return candidate.level === currentLevel && 
             candidate.id.startsWith(selectedStation.constituencies[currentLevel].id);
    }
  );

  if (hasVoted) {
    return <VoteSuccess />;
  }

  return (
    <div className="min-h-screen w-full bg-secondary p-4">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card backdrop-blur-md rounded-lg p-8 border border-white/20"
        >
          <div className="flex items-center mb-8">
            <div className="p-3 rounded-full bg-primary/5">
              <User className="w-6 h-6 text-primary" />
            </div>
            <h1 className="text-2xl font-semibold ml-4">मतदान डास्बोर्ड (Voter Dashboard)</h1>
          </div>

          {selectedPollingStation && (
            <ProgressTracker 
              currentLevel={currentLevel}
              votes={votes}
              setCurrentLevel={setCurrentLevel}
            />
          )}

          <ConstituencySelector
            selectedPollingStation={selectedPollingStation}
            onPollingStationSelect={handlePollingStationSelect}
          />

          {selectedPollingStation && (
            <>
              <CandidateList
                candidates={filteredCandidates}
                currentLevel={currentLevel}
                votes={votes}
                showDetails={showDetails}
                onSelectCandidate={handleSelectCandidate}
                onToggleDetails={(id) => setShowDetails(showDetails === id ? null : id)}
              />

              <Button
                onClick={handleVote}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!votes.local || !votes.provincial || !votes.federal}
              >
                Submit All Votes (सबै मतहरू पेश गर्नुहोस्)
              </Button>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VoterDashboard;
