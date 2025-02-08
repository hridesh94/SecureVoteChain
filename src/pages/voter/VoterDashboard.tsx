import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { VotingBlockchain } from "@/utils/blockchain";
import { mockCandidates } from "./mockData";
import CandidateCard from "./components/CandidateCard";
import VoteSuccess from "./components/VoteSuccess";
import { Candidate } from "./types";

const blockchain = VotingBlockchain.getInstance();

const VoterDashboard = () => {
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
      // Record votes for all levels
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

    // Automatically move to next level if available
    if (currentLevel === "local") {
      setCurrentLevel("provincial");
    } else if (currentLevel === "provincial") {
      setCurrentLevel("federal");
    }
  };

  const filteredCandidates = mockCandidates.filter(
    candidate => candidate.level === currentLevel
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

          {/* Interactive Progress Tracker */}
          <div className="flex items-center justify-center mb-6 p-4 bg-primary/5 rounded-lg">
            <div className="flex items-center gap-6">
              {[
                { level: "local", label: "Local" },
                { level: "provincial", label: "Provincial" },
                { level: "federal", label: "Federal" }
              ].map((item, index) => (
                <>
                  <div 
                    key={item.level}
                    className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
                    onClick={() => setCurrentLevel(item.level as "local" | "provincial" | "federal")}
                  >
                    <div 
                      className={`p-2 rounded-full ${
                        votes[item.level as keyof typeof votes] 
                          ? 'bg-green-500' 
                          : currentLevel === item.level 
                            ? 'bg-primary'
                            : 'bg-gray-300'
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <span className={`ml-2 ${currentLevel === item.level ? 'font-semibold' : ''}`}>
                      {item.label}
                    </span>
                  </div>
                  {index < 2 && <span className="text-gray-400">→</span>}
                </>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCandidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                isSelected={votes[currentLevel] === candidate.id}
                showDetails={showDetails}
                onSelect={handleSelectCandidate}
                onToggleDetails={(id) => setShowDetails(showDetails === id ? null : id)}
              />
            ))}
          </div>

          <Button
            onClick={handleVote}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!votes.local || !votes.provincial || !votes.federal}
          >
            Submit All Votes (सबै मतहरू पेश गर्नुहोस्)
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default VoterDashboard;
