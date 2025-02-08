import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { VotingBlockchain } from "@/utils/blockchain";
import DashboardHeader from "@/components/admin/dashboard/DashboardHeader";
import DashboardStats from "@/components/admin/dashboard/DashboardStats";
import DashboardContent from "@/components/admin/dashboard/DashboardContent";
import VoterStats from "@/components/admin/VoterStats";
import VoteAudit from "@/components/admin/VoteAudit";

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
    votingProgress: 0,
    activeVoters: 42,
    averageVoteTime: "2.5 min",
    invalidAttempts: 23,
    blockedVoters: 5,
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

    // Update stats every 30 seconds
    const interval = setInterval(() => {
      handleRefreshData();
    }, 30000);

    return () => clearInterval(interval);
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
    const data = {
      blockchain: blockchain.getChain(),
      votingResults: !isVotingActive ? votingResults : null,
      stats: {
        totalVoters: stats.totalVoters,
        votesCast: stats.votesCast,
        remainingVoters: stats.remainingVoters,
        votingProgress: stats.votingProgress,
        activeVoters: stats.activeVoters,
        averageVoteTime: stats.averageVoteTime,
        invalidAttempts: stats.invalidAttempts,
        blockedVoters: stats.blockedVoters,
      },
      exportTimestamp: new Date().toISOString(),
    };

    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `voting-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Voting data has been exported successfully.",
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
          <DashboardHeader
            isVotingActive={isVotingActive}
            showResults={showResults}
            onRefresh={handleRefreshData}
            onExport={handleExportData}
            onBlock={handleBlockVoter}
            onToggleResults={handleToggleResults}
            onVotingToggle={handleVotingToggle}
          />

          <VoterStats
            totalRegistered={stats.totalVoters}
            activeVoters={stats.activeVoters}
            blockedVoters={stats.blockedVoters}
            averageVoteTime={stats.averageVoteTime}
          />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <VotingProgress
              votingProgress={stats.votingProgress}
              remainingVoters={stats.totalVoters - stats.votesCast}
            />
            <VoteAudit />
          </div>

          <DashboardContent
            isVotingActive={isVotingActive}
            showResults={showResults}
            votingResults={votingResults}
            stats={stats}
            votingData={votingData}
          />
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
