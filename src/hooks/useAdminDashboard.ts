
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { VotingBlockchain } from "@/utils/blockchain";

const blockchain = VotingBlockchain.getInstance();

export const useAdminDashboard = () => {
  const [isVotingActive, setIsVotingActive] = useState(true);
  const [showResults, setShowResults] = useState(false);
  const [votingResults, setVotingResults] = useState<{ [key: string]: number }>({});
  const [stats, setStats] = useState({
    totalVoters: 1500,
    votesCast: 0,
    votingProgress: 0,
    remainingVoters: 0,
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
      stats,
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

  return {
    isVotingActive,
    showResults,
    votingResults,
    stats,
    handleVotingToggle,
    handleToggleResults,
    handleRefreshData,
    handleExportData,
    handleBlockVoter,
  };
};
