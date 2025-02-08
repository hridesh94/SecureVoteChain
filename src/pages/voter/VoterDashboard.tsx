
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { VotingBlockchain } from "@/utils/blockchain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { mockCandidates } from "./mockData";
import CandidateCard from "./components/CandidateCard";
import VoteSuccess from "./components/VoteSuccess";
import { Candidate } from "./types";

const blockchain = VotingBlockchain.getInstance();

const VoterDashboard = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [currentLevel, setCurrentLevel] = useState<"local" | "provincial" | "federal">("local");
  const { toast } = useToast();

  const handleVote = () => {
    if (!selectedCandidate) {
      toast({
        title: "Error",
        description: "Please select a candidate first.",
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
      blockchain.addBlock(selectedCandidate, voterId);
      setHasVoted(true);
      
      toast({
        title: "Vote Confirmation",
        description: "Your vote has been securely recorded. धन्यवाद! (Thank you!)",
      });

      setSelectedCandidate(null);
      
      console.log("Vote recorded:", {
        candidateId: selectedCandidate,
        chain: blockchain.getChain()
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an error recording your vote. Please try again.",
        variant: "destructive",
      });
      console.error("Voting error:", error);
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

          <Tabs value={currentLevel} className="mb-8">
            <TabsList className="w-full justify-start mb-6">
              <TabsTrigger 
                value="local" 
                onClick={() => setCurrentLevel("local")}
                className="flex-1"
              >
                स्थानीय तह (Local Level)
              </TabsTrigger>
              <TabsTrigger 
                value="provincial" 
                onClick={() => setCurrentLevel("provincial")}
                className="flex-1"
              >
                प्रदेश तह (Provincial Level)
              </TabsTrigger>
              <TabsTrigger 
                value="federal" 
                onClick={() => setCurrentLevel("federal")}
                className="flex-1"
              >
                संघीय तह (Federal Level)
              </TabsTrigger>
            </TabsList>

            <TabsContent value={currentLevel}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredCandidates.map((candidate) => (
                  <CandidateCard
                    key={candidate.id}
                    candidate={candidate}
                    isSelected={selectedCandidate === candidate.id}
                    showDetails={showDetails}
                    onSelect={setSelectedCandidate}
                    onToggleDetails={(id) => setShowDetails(showDetails === id ? null : id)}
                  />
                ))}
              </div>

              <Button
                onClick={handleVote}
                className="w-full bg-primary hover:bg-primary/90"
                disabled={!selectedCandidate}
              >
                Cast Vote ({currentLevel === "local" ? "स्थानीय" : currentLevel === "provincial" ? "प्रदेश" : "संघीय"} तहमा मतदान गर्नुहोस्)
              </Button>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default VoterDashboard;
