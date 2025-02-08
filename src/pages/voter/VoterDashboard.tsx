import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, User, FileText, HelpCircle, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { VotingBlockchain } from "@/utils/blockchain";
import { mockCandidates, mockPollingStations } from "./mockData";
import VoteSuccess from "./components/VoteSuccess";
import ProgressTracker from "./components/ProgressTracker";
import ConstituencySelector from "./components/ConstituencySelector";
import CandidateList from "./components/CandidateList";
import VotingInstructions from "./components/VotingInstructions";

const blockchain = VotingBlockchain.getInstance();

type VoteLevel = "local" | "provincial" | "federal";
type VoteState = Record<VoteLevel, string | null>;

const initialVoteState: VoteState = {
  local: null,
  provincial: null,
  federal: null,
};

const VoterDashboard = () => {
  const [selectedPollingStation, setSelectedPollingStation] = useState<string | null>(null);
  const [votes, setVotes] = useState<VoteState>(initialVoteState);
  const [hasVoted, setHasVoted] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState<VoteLevel>("local");
  const [showInstructions, setShowInstructions] = useState(true);
  const [voterId, setVoterId] = useState<string>(`V${Date.now()}`);
  const { toast } = useToast();

  const handlePollingStationSelect = (stationId: string) => {
    setSelectedPollingStation(stationId);
    setVotes(initialVoteState);
    setCurrentLevel("local");
  };

  const handleVote = async () => {
    const areAllVotesSubmitted = Object.values(votes).every(vote => vote !== null);
    
    if (!areAllVotesSubmitted) {
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
      // Use Promise.all to handle multiple blockchain transactions
      await Promise.all(
        Object.entries(votes).map(([level, candidateId]) => {
          if (candidateId) {
            return blockchain.addBlock(candidateId, voterId);
          }
        })
      );
      
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
        description: "You have already voted. धन्यवाद! (Thank you!) ",
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

    // Use a lookup table for level transitions
    const nextLevel: Record<VoteLevel, VoteLevel | null> = {
      local: "provincial",
      provincial: "federal",
      federal: null
    };

    const next = nextLevel[currentLevel];
    if (next) {
      setCurrentLevel(next);
    }
  };

  const handleResetDemo = () => {
    blockchain.setDemoMode(true);
    setHasVoted(false);
    setVotes(initialVoteState);
    setSelectedPollingStation(null);
    setCurrentLevel("local");
    setVoterId(`V${Date.now()}`); // Generate a new voter ID when resetting
    toast({
      title: "Demo Reset",
      description: "Voting state has been reset for demo purposes.",
      className: "bg-white border-2 border-blue-500 text-blue-900 font-medium shadow-xl",
    });
  };

  const selectedStation = selectedPollingStation 
    ? mockPollingStations.find(ps => ps.id === selectedPollingStation)
    : null;

  const filteredCandidates = selectedStation
    ? mockCandidates.filter(candidate => 
        candidate.level === currentLevel && 
        candidate.id.startsWith(selectedStation.constituencies[currentLevel].id)
      )
    : [];

  if (hasVoted) {
    return (
      <div className="relative">
        <VoteSuccess />
        <Button
          onClick={handleResetDemo}
          className="absolute top-4 right-4 flex items-center gap-2 bg-blue-500 hover:bg-blue-600"
        >
          <RefreshCw className="w-4 h-4" />
          Reset Demo
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-secondary via-secondary/50 to-white/80 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <Link
            to="/"
            className="inline-flex items-center text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <Button
            onClick={handleResetDemo}
            variant="outline"
            className="flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Reset Demo
          </Button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white backdrop-blur-md rounded-xl p-6 sm:p-8 border border-primary/10 shadow-xl"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/5">
                <User className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-semibold ml-4">मतदान डास्बोर्ड (Voter Dashboard)</h1>
            </div>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => setShowInstructions(!showInstructions)}
            >
              <HelpCircle className="w-4 h-4" />
              {showInstructions ? "Hide" : "Show"} Instructions
            </Button>
          </div>

          <AnimatePresence>
            {showInstructions && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="mb-8"
              >
                <VotingInstructions currentLevel={currentLevel} />
              </motion.div>
            )}
          </AnimatePresence>

          {selectedPollingStation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              <ProgressTracker 
                currentLevel={currentLevel}
                votes={votes}
                setCurrentLevel={setCurrentLevel}
              />
            </motion.div>
          )}

          <div className="mb-8">
            <ConstituencySelector
              selectedPollingStation={selectedPollingStation}
              onPollingStationSelect={handlePollingStationSelect}
            />
          </div>

          {selectedPollingStation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-8">
                <CandidateList
                  candidates={filteredCandidates}
                  currentLevel={currentLevel}
                  votes={votes}
                  showDetails={showDetails}
                  onSelectCandidate={handleSelectCandidate}
                  onToggleDetails={(id) => setShowDetails(showDetails === id ? null : id)}
                />
              </div>

              <Button
                onClick={handleVote}
                className="w-full bg-primary hover:bg-primary/90 text-white py-6 text-lg font-medium rounded-lg shadow-lg transition-all duration-200 disabled:opacity-50"
                disabled={!votes.local || !votes.provincial || !votes.federal}
              >
                Submit All Votes (सबै मतहरू पेश गर्नुहोस्)
              </Button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VoterDashboard;
