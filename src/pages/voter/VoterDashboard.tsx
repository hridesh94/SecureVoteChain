
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, CheckCircle, Building2, MapPin, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { VotingBlockchain } from "@/utils/blockchain";

const blockchain = VotingBlockchain.getInstance();

interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string;
  constituency: string;
  education: string;
  experience: string;
  promises: string[];
  partyFlag: string;
  age: number;
}

// Updated with Nepal-specific political context
const mockCandidates: Candidate[] = [
  {
    id: "C001",
    name: "Ram Kumar Sharma",
    party: "Nepal Communist Party (UML)",
    symbol: "☀️",
    constituency: "Kathmandu-4",
    education: "Masters in Political Science from Tribhuvan University",
    experience: "Former Minister of Local Development",
    promises: [
      "Improve local infrastructure",
      "Create more employment opportunities",
      "Strengthen public education system"
    ],
    partyFlag: "🔴",
    age: 45
  },
  {
    id: "C002",
    name: "Sita Adhikari",
    party: "Nepali Congress",
    symbol: "🌳",
    constituency: "Kathmandu-4",
    education: "PhD in Economics from Kathmandu University",
    experience: "Two-term Member of Parliament",
    promises: [
      "Economic reforms and development",
      "Women empowerment initiatives",
      "Healthcare system improvement"
    ],
    partyFlag: "🔵",
    age: 42
  },
  {
    id: "C003",
    name: "Hari Prasad Poudel",
    party: "CPN (Maoist Centre)",
    symbol: "🔨",
    constituency: "Kathmandu-4",
    education: "Masters in Law from Nepal Law Campus",
    experience: "Senior Advocate, Social Activist",
    promises: [
      "Social justice reforms",
      "Rural development programs",
      "Agricultural modernization"
    ],
    partyFlag: "⭐",
    age: 48
  },
];

const VoterDashboard = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [showDetails, setShowDetails] = useState<string | null>(null);
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

  if (hasVoted) {
    return (
      <div className="min-h-screen w-full bg-secondary p-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-card backdrop-blur-md rounded-lg p-8 border border-white/20 text-center"
          >
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">धन्यवाद! (Thank You for Voting!)</h2>
            <p className="text-primary/70 mb-6">Your vote has been securely recorded.</p>
            <Link to="/">
              <Button variant="outline">Return to Home</Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mockCandidates.map((candidate) => (
              <motion.div
                key={candidate.id}
                whileHover={{ scale: 1.02 }}
                className={`
                  p-6 rounded-lg border cursor-pointer transition-colors relative
                  ${
                    selectedCandidate === candidate.id
                      ? "border-primary bg-primary/5"
                      : "border-white/20 hover:border-primary/50"
                  }
                `}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-3xl">{candidate.symbol}</span>
                    <span className="text-2xl">{candidate.partyFlag}</span>
                  </div>
                  {selectedCandidate === candidate.id && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
                <h3 className="font-semibold mb-2">{candidate.name}</h3>
                <p className="text-sm text-primary/70 mb-2">{candidate.party}</p>
                <div className="flex items-center gap-2 text-sm text-primary/60 mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{candidate.constituency}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="mt-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowDetails(showDetails === candidate.id ? null : candidate.id);
                  }}
                >
                  {showDetails === candidate.id ? "Hide Details" : "Show Details"}
                </Button>
                
                {showDetails === candidate.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start gap-2">
                        <Building2 className="w-4 h-4 mt-1 text-primary/60" />
                        <div>
                          <p className="text-sm font-medium">Education</p>
                          <p className="text-sm text-primary/70">{candidate.education}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 mt-1 text-primary/60" />
                        <div>
                          <p className="text-sm font-medium">Experience</p>
                          <p className="text-sm text-primary/70">{candidate.experience}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <FileText className="w-4 h-4 mt-1 text-primary/60" />
                        <div>
                          <p className="text-sm font-medium">Key Promises</p>
                          <ul className="text-sm text-primary/70 list-disc ml-4">
                            {candidate.promises.map((promise, index) => (
                              <li key={index}>{promise}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>

          <Button
            onClick={handleVote}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!selectedCandidate}
          >
            Cast Vote (मतदान गर्नुहोस्)
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default VoterDashboard;

