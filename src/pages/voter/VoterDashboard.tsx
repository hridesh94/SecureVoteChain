
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, CheckCircle, Building2, MapPin, FileText } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { VotingBlockchain } from "@/utils/blockchain";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  level: "local" | "provincial" | "federal";
  position: string;
}

const mockCandidates: Candidate[] = [
  // Federal Level Candidates
  {
    id: "F001",
    name: "Ram Kumar Sharma",
    party: "Nepal Communist Party (UML)",
    symbol: "☀️",
    constituency: "Kathmandu-4",
    education: "Masters in Political Science from Tribhuvan University",
    experience: "Former Minister of Local Development",
    promises: [
      "National infrastructure development",
      "Foreign investment policies",
      "Federal governance strengthening"
    ],
    partyFlag: "🔴",
    age: 45,
    level: "federal",
    position: "Member of Parliament"
  },
  {
    id: "F002",
    name: "Sita Adhikari",
    party: "Nepali Congress",
    symbol: "🌳",
    constituency: "Kathmandu-4",
    education: "PhD in Economics from Kathmandu University",
    experience: "Two-term Member of Parliament",
    promises: [
      "Economic reforms",
      "Women empowerment",
      "Healthcare system improvement"
    ],
    partyFlag: "🔵",
    age: 42,
    level: "federal",
    position: "Member of Parliament"
  },
  // Provincial Level Candidates
  {
    id: "P001",
    name: "Hari Prasad Poudel",
    party: "CPN (Maoist Centre)",
    symbol: "🔨",
    constituency: "Bagmati Province-3",
    education: "Masters in Public Administration",
    experience: "Former Provincial Secretary",
    promises: [
      "Provincial road networks",
      "Local industry promotion",
      "Education reform"
    ],
    partyFlag: "⭐",
    age: 48,
    level: "provincial",
    position: "Provincial Assembly Member"
  },
  {
    id: "P002",
    name: "Maya Tamang",
    party: "Nepal Communist Party (UML)",
    symbol: "☀️",
    constituency: "Bagmati Province-3",
    education: "Masters in Sociology",
    experience: "Social Activist, Former NGO Director",
    promises: [
      "Indigenous rights",
      "Tourism development",
      "Agricultural modernization"
    ],
    partyFlag: "🔴",
    age: 39,
    level: "provincial",
    position: "Provincial Assembly Member"
  },
  // Local Level Candidates
  {
    id: "L001",
    name: "Bishnu Thapa",
    party: "Independent",
    symbol: "🏠",
    constituency: "Kathmandu Metropolitan City",
    education: "Bachelors in Civil Engineering",
    experience: "Urban Planning Expert",
    promises: [
      "Local infrastructure",
      "Waste management",
      "Public spaces"
    ],
    partyFlag: "⚪",
    age: 36,
    level: "local",
    position: "Mayor"
  },
  {
    id: "L002",
    name: "Sarita Maharjan",
    party: "Nepali Congress",
    symbol: "🌳",
    constituency: "Kathmandu Metropolitan City",
    education: "Masters in Public Policy",
    experience: "Ward Chairperson",
    promises: [
      "Community development",
      "Local business support",
      "Youth employment"
    ],
    partyFlag: "🔵",
    age: 41,
    level: "local",
    position: "Mayor"
  }
];

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
                    <p className="text-sm text-primary/70 mb-2">
                      Position: {candidate.position}
                    </p>
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
