
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  BarChart, 
  Lock, 
  Users, 
  UserCheck,
  Clock,
  RefreshCw,
  Download,
  Ban
} from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { VotingBlockchain } from "@/utils/blockchain";
import StatCard from "@/components/admin/StatCard";
import VotingChart from "@/components/admin/VotingChart";
import SecurityOverview from "@/components/admin/SecurityOverview";
import VoterList from "@/components/admin/VoterList";

const blockchain = new VotingBlockchain();

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
  }, []);

  const handleVotingToggle = () => {
    setIsVotingActive(!isVotingActive);
    toast({
      title: isVotingActive ? "Voting Stopped" : "Voting Started",
      description: isVotingActive
        ? "The voting process has been stopped."
        : "The voting process has been started.",
    });
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

    toast({
      title: "Data Refreshed",
      description: "Latest voting statistics have been loaded.",
    });
  };

  const handleExportData = () => {
    const chain = blockchain.getChain();
    const jsonStr = JSON.stringify(chain, null, 2);
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

  const votingStatus = isVotingActive ? (
    <div className="flex items-center text-green-500">
      <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
      Active
    </div>
  ) : (
    <div className="flex items-center text-red-500">
      <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
      Stopped
    </div>
  );

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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/5">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
                {votingStatus}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefreshData}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportData}
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBlockVoter}
              >
                <Ban className="w-4 h-4 mr-2" />
                Block Voter
              </Button>
              <Button
                onClick={handleVotingToggle}
                variant={isVotingActive ? "destructive" : "default"}
              >
                {isVotingActive ? "Stop Voting" : "Start Voting"}
              </Button>
            </div>
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

          <div className="grid gap-6 mb-8">
            <div className="p-6 rounded-lg border border-white/20">
              <h3 className="font-semibold mb-4">Voting Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${stats.votingProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-primary/70">
                <p>{stats.votingProgress.toFixed(1)}% of total votes cast</p>
                <p>{stats.remainingVoters} votes remaining</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <VotingChart data={votingData} />
              <SecurityOverview stats={stats} />
            </div>

            <div className="p-6 rounded-lg border border-white/20">
              <h3 className="font-semibold mb-4">Voter Management</h3>
              <VoterList />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
