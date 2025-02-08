import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Voter } from "@/types/voter";
import { mockVoters } from "@/data/mockVoters";
import { 
  updateVotersFromBlockchain, 
  filterVoters,
  exportVotersToCSV 
} from "@/utils/voterUtils";
import { VotingBlockchain } from "@/utils/votingBlockchain";

export const useVoters = (showVotes = false) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [voters, setVoters] = useState<Voter[]>(mockVoters);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();
  const blockchain = VotingBlockchain.getInstance();

  useEffect(() => {
    const updateVoters = () => {
      setVoters(prev => {
        const updated = updateVotersFromBlockchain(prev);
        // Update voter status based on blockchain data
        return updated.map(voter => ({
          ...voter,
          status: blockchain.hasVoted(voter.id) ? "voted" : voter.status
        }));
      });
    };

    updateVoters();
    const interval = setInterval(updateVoters, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = filterVoters(mockVoters, value, statusFilter);
    setVoters(filtered);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    const filtered = filterVoters(mockVoters, searchTerm, status);
    setVoters(filtered);
  };

  const handleExport = () => {
    const blob = exportVotersToCSV(voters, showVotes);
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "voters_list.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Export Complete",
      description: "Voter list has been exported successfully.",
    });
  };

  const handleToggleStatus = (voterId: string) => {
    setVoters((prevVoters) =>
      prevVoters.map((voter) => {
        if (voter.id === voterId) {
          const newStatus = voter.status === "blocked" ? "registered" : "blocked";
          // Trigger update in the blockchain
          return {
            ...voter,
            status: newStatus,
            lastActivity: new Date().toISOString().split("T")[0],
          };
        }
        return voter;
      })
    );

    toast({
      title: "Status Updated",
      description: `Voter status has been updated successfully.`,
    });
  };

  return {
    voters,
    searchTerm,
    statusFilter,
    handleSearch,
    handleStatusFilter,
    handleExport,
    handleToggleStatus,
  };
};
