
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { VotingBlockchain } from "@/utils/blockchain";
import VoterSearchBar from "./voter-management/VoterSearchBar";
import VoterStatusFilter from "./voter-management/VoterStatusFilter";
import VoterTable from "./voter-management/VoterTable";
import ExportButton from "./voter-management/ExportButton";

const blockchain = VotingBlockchain.getInstance();

interface Vote {
  local?: string;
  provincial?: string;
  federal?: string;
}

interface Voter {
  id: string;
  name: string;
  status: "registered" | "voted" | "blocked";
  registrationDate: string;
  lastActivity: string;
  location?: string;
  loginAttempts?: number;
  ipAddress?: string;
  votes?: Vote;
}

const mockVoters: Voter[] = [
  {
    id: "V001",
    name: "Aarav Sharma",
    status: "voted",
    registrationDate: "2024-02-15",
    lastActivity: "2024-02-20",
    location: "Kathmandu",
    loginAttempts: 2,
    ipAddress: "192.168.1.1",
    votes: {
      local: "L001-Nepali Congress",
      provincial: "P002-Nepal Communist Party (UML)",
      federal: "F001-Nepal Communist Party (UML)"
    }
  },
  {
    id: "V002",
    name: "Priya Adhikari",
    status: "registered",
    registrationDate: "2024-02-16",
    lastActivity: "2024-02-19",
    location: "Lalitpur",
    loginAttempts: 1,
    ipAddress: "192.168.1.2"
  },
  {
    id: "V003",
    name: "Rajesh Poudel",
    status: "registered",
    registrationDate: "2024-02-14",
    lastActivity: "2024-02-18",
    location: "Bhaktapur",
    loginAttempts: 0,
    ipAddress: "192.168.1.3"
  },
  {
    id: "V004",
    name: "Sita Karki",
    status: "voted",
    registrationDate: "2024-02-13",
    lastActivity: "2024-02-20",
    location: "Pokhara",
    loginAttempts: 1,
    ipAddress: "192.168.1.4",
    votes: {
      local: "L003-Nepali Congress",
      provincial: "P001-Nepal Communist Party (Maoist)",
      federal: "F003-Nepali Congress"
    }
  },
  {
    id: "V005",
    name: "Bishnu Thapa",
    status: "blocked",
    registrationDate: "2024-02-12",
    lastActivity: "2024-02-17",
    location: "Kathmandu",
    loginAttempts: 5,
    ipAddress: "192.168.1.5"
  }
];

interface VoterListProps {
  showVotes?: boolean;
}

const VoterList = ({ showVotes = false }: VoterListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [voters, setVoters] = useState<Voter[]>(mockVoters);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const { toast } = useToast();

  useEffect(() => {
    const updateVotersFromBlockchain = () => {
      const chain = blockchain.getChain();
      const votedIds = new Set<string>();
      const voterVotes: { [key: string]: Vote } = {};
      
      chain.forEach(block => {
        if (block.vote.voterId !== "genesis") {
          votedIds.add(block.vote.voterId);
          if (!voterVotes[block.vote.voterId]) {
            voterVotes[block.vote.voterId] = {};
          }
          // Extract level from candidateId (L for local, P for provincial, F for federal)
          const level = block.vote.candidateId.charAt(0).toLowerCase() === 'l' 
            ? 'local' 
            : block.vote.candidateId.charAt(0).toLowerCase() === 'p'
              ? 'provincial'
              : 'federal';
          voterVotes[block.vote.voterId][level] = block.vote.candidateId;
        }
      });

      setVoters(prev => prev.map(voter => {
        if (votedIds.has(voter.id)) {
          const lastVoteBlock = chain
            .filter(block => block.vote.voterId === voter.id)
            .pop();
          return {
            ...voter,
            status: "voted",
            lastActivity: new Date(lastVoteBlock?.timestamp || '').toISOString().split('T')[0],
            votes: voterVotes[voter.id]
          };
        }
        return voter;
      }));
    };

    updateVotersFromBlockchain();
    const interval = setInterval(updateVotersFromBlockchain, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterVoters(value, statusFilter);
  };

  const handleStatusFilter = (status: string) => {
    setStatusFilter(status);
    filterVoters(searchTerm, status);
  };

  const filterVoters = (search: string, status: string) => {
    let filtered = mockVoters.filter(
      (voter) =>
        (voter.name.toLowerCase().includes(search.toLowerCase()) ||
          voter.id.toLowerCase().includes(search.toLowerCase()) ||
          voter.location?.toLowerCase().includes(search.toLowerCase())) &&
        (status === "all" || voter.status === status)
    );
    setVoters(filtered);
  };

  const handleExport = () => {
    const headers = [
      "ID",
      "Name",
      "Status",
      "Registration Date",
      "Last Activity",
      "Location",
      "Login Attempts",
      "IP Address",
      ...(showVotes ? ["Vote"] : []),
    ];

    const csvContent =
      headers.join(",") +
      "\n" +
      voters
        .map((voter) =>
          [
            voter.id,
            voter.name,
            voter.status,
            voter.registrationDate,
            voter.lastActivity,
            voter.location || "",
            voter.loginAttempts || "0",
            voter.ipAddress || "",
            ...(showVotes ? [voter.vote || ""] : []),
          ].join(",")
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
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
      prevVoters.map((voter) =>
        voter.id === voterId
          ? {
              ...voter,
              status: voter.status === "blocked" ? "registered" : "blocked",
              lastActivity: new Date().toISOString().split("T")[0],
            }
          : voter
      )
    );

    toast({
      title: "Status Updated",
      description: `Voter status has been updated successfully.`,
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <VoterSearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <VoterStatusFilter onStatusFilter={handleStatusFilter} />
        </div>
        <ExportButton onExport={handleExport} />
      </div>

      <VoterTable 
        voters={voters} 
        showVotes={showVotes} 
        onToggleStatus={handleToggleStatus} 
      />
    </div>
  );
};

export default VoterList;
