
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { VotingBlockchain } from "@/utils/blockchain";
import StatCard from "@/components/admin/StatCard";
import VotingChart from "@/components/admin/VotingChart";
import SecurityOverview from "@/components/admin/SecurityOverview";
import VoterList from "@/components/admin/VoterList";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminActions from "@/components/admin/AdminActions";
import VotingProgress from "@/components/admin/VotingProgress";
import VotingResults from "@/components/admin/VotingResults";
import { Users, BarChart, UserCheck, Clock } from "lucide-react";

const blockchain = VotingBlockchain.getInstance();

const votingData = [
  { time: "9 AM", votes: 150, active: 25 },
  { time: "10 AM", votes: 280, active: 35 },
  { time: "11 AM", votes: 420, active: 42 },
  { time: "12 PM", votes: 550, active: 38 },
  { time: "1 PM", votes: 676, active: 45 },
  { time: "2 PM", votes: 876, active: 42 },
];

const AdminDashboard = () => {
  const [isVotingActive, setIsVotingActive] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [votingResults, setVotingResults] = useState<{ [key: string]: number }>({});
  const [stats, setStats] = useState({
    totalVoters: 1500,
    votesCast: 0,
    remainingVoters: 1500,
    votingProgress: 0,
    activeVoters: 42,
    averageVoteTime: "2.5 min",
    invalidAttempts: 23,
  });
  const { toast } = useToast();

  useEffect(() => {
    const chain = blockchain.getChain();
    const votesCast = chain.length - 1;
    const votingProgress = (votesCast / stats.totalVoters) * 100;
    const remainingVoters = stats.totalVoters - votesCast;

    setStats(prev => ({
      ...prev,
      votesCast,
      remainingVoters,
      votingProgress,
    }));

    if (!isVotingActive) {
      const results = blockchain.getVotingResults();
      setVotingResults(results);
    }
  }, [isVotingActive]);

  const handleVotingToggle = () => {
    const newVotingState = !isVotingActive;
    setIsVotingActive(newVotingState);
    blockchain.setVotingEnded(!newVotingState);
    
    if (!newVotingState) {
      const results = blockchain.getVotingResults();
      setVotingResults(results);
    }

    toast({
      title: newVotingState ? "Voting Started" : "Voting Ended",
      description: newVotingState
        ? "The voting process has been started."
        : "The voting process has ended. Results are now available.",
    });
  };

  const handleToggleResults = () => {
    if (!isVotingActive) {
      setShowResults(!showResults);
    } else {
      toast({
        title: "Cannot Show Results",
        description: "Voting must end before results can be displayed.",
        variant: "destructive",
      });
    }
  };

  const handleRefreshData = () => {
    const chain = blockchain.getChain();
    const votesCast = chain.length - 1;
    const votingProgress = (votesCast / stats.totalVoters) * 100;
    const remainingVoters = stats.totalVoters - votesCast;

    setStats(prev => ({
      ...prev,
      votesCast,
      remainingVoters,
      votingProgress,
    }));

    if (!isVotingActive) {
      const results = blockchain.getVotingResults();
      setVotingResults(results);
    }

    toast({
      title: "Data Refreshed",
      description: "Latest voting statistics have been loaded.",
    });
  };

  const handleExportData = () => {
    const data = isVotingActive 
      ? blockchain.getChain().map(block => ({
          timestamp: block.timestamp,
          hash: block.hash,
          previousHash: block.previousHash
        }))
      : blockchain.getChain();

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "voting-blockchain.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Blockchain data has been exported successfully.",
    });
  };

  const handleBlockVoter = () => {
    toast({
      title: "Action Required",
      description: "Please select a voter to block from the voters list.",
      variant: "destructive",
    });
  };

  return (
    <div className="min-h-screen w-full bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card backdrop-blur-md rounded-lg p-6 border border-white/20"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
            <AdminHeader isVotingActive={isVotingActive} />
            <AdminActions
              isVotingActive={isVotingActive}
              showResults={showResults}
              onRefresh={handleRefreshData}
              onExport={handleExportData}
              onBlock={handleBlockVoter}
              onToggleResults={handleToggleResults}
              onVotingToggle={handleVotingToggle}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Voters"
              value={stats.totalVoters}
              icon={Users}
              delay={0.1}
            />
            <StatCard
              title="Votes Cast"
              value={stats.votesCast}
              icon={BarChart}
              delay={0.2}
            />
            <StatCard
              title="Active Voters"
              value={stats.activeVoters}
              icon={UserCheck}
              delay={0.3}
            />
            <StatCard
              title="Avg. Vote Time"
              value={stats.averageVoteTime}
              icon={Clock}
              delay={0.4}
            />
          </div>

          <div className="space-y-6">
            <VotingProgress
              votingProgress={stats.votingProgress}
              remainingVoters={stats.remainingVoters}
            />

            {!isVotingActive && showResults && (
              <VotingResults results={votingResults} />
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VotingChart data={votingData} />
              <SecurityOverview stats={stats} />
            </div>

            <div className="bg-white rounded-lg border shadow-sm">
              <div className="p-6">
                <h3 className="font-semibold mb-4">Voter Management</h3>
                <VoterList showVotes={!isVotingActive && showResults} />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
