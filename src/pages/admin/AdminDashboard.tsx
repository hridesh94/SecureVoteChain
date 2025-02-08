
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart, Lock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const mockStats = {
  totalVoters: 1500,
  votesCast: 876,
  remainingVoters: 624,
  votingProgress: 58.4,
};

const AdminDashboard = () => {
  const [isVotingActive, setIsVotingActive] = useState(true);
  const { toast } = useToast();

  const handleVotingToggle = () => {
    setIsVotingActive(!isVotingActive);
    toast({
      title: isVotingActive ? "Voting Stopped" : "Voting Started",
      description: isVotingActive
        ? "The voting process has been stopped."
        : "The voting process has been started.",
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary/5">
                <Lock className="w-6 h-6 text-primary" />
              </div>
              <h1 className="text-2xl font-semibold ml-4">Admin Dashboard</h1>
            </div>
            <Button
              onClick={handleVotingToggle}
              variant={isVotingActive ? "destructive" : "default"}
            >
              {isVotingActive ? "Stop Voting" : "Start Voting"}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 rounded-lg border border-white/20"
            >
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-semibold">Total Voters</h3>
              </div>
              <p className="text-3xl font-semibold">{mockStats.totalVoters}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 rounded-lg border border-white/20"
            >
              <div className="flex items-center mb-4">
                <BarChart className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-semibold">Votes Cast</h3>
              </div>
              <p className="text-3xl font-semibold">{mockStats.votesCast}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 rounded-lg border border-white/20 lg:col-span-1"
            >
              <div className="flex items-center mb-4">
                <Users className="w-5 h-5 text-primary mr-2" />
                <h3 className="font-semibold">Remaining Voters</h3>
              </div>
              <p className="text-3xl font-semibold">{mockStats.remainingVoters}</p>
            </motion.div>
          </div>

          <div className="p-6 rounded-lg border border-white/20">
            <h3 className="font-semibold mb-4">Voting Progress</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-primary h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${mockStats.votingProgress}%` }}
              ></div>
            </div>
            <p className="text-sm text-primary/70 mt-2">
              {mockStats.votingProgress}% of total votes cast
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;

