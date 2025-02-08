
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, User, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string;
}

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "John Smith",
    party: "Progressive Party",
    symbol: "🌟",
  },
  {
    id: "2",
    name: "Sarah Johnson",
    party: "Liberty Party",
    symbol: "🌿",
  },
  {
    id: "3",
    name: "Michael Lee",
    party: "Unity Party",
    symbol: "🌈",
  },
];

const VoterDashboard = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(null);
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

    toast({
      title: "Vote Confirmation",
      description: "Your vote has been recorded successfully.",
    });
  };

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
            <h1 className="text-2xl font-semibold ml-4">Voter Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {mockCandidates.map((candidate) => (
              <motion.div
                key={candidate.id}
                whileHover={{ scale: 1.02 }}
                className={`
                  p-6 rounded-lg border cursor-pointer transition-colors
                  ${
                    selectedCandidate === candidate.id
                      ? "border-primary bg-primary/5"
                      : "border-white/20 hover:border-primary/50"
                  }
                `}
                onClick={() => setSelectedCandidate(candidate.id)}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{candidate.symbol}</span>
                  {selectedCandidate === candidate.id && (
                    <CheckCircle className="w-5 h-5 text-primary" />
                  )}
                </div>
                <h3 className="font-semibold mb-2">{candidate.name}</h3>
                <p className="text-sm text-primary/70">{candidate.party}</p>
              </motion.div>
            ))}
          </div>

          <Button
            onClick={handleVote}
            className="w-full bg-primary hover:bg-primary/90"
            disabled={!selectedCandidate}
          >
            Cast Vote
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default VoterDashboard;
