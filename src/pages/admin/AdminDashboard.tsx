
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, BarChart, Lock, Users, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import {
  ChartContainer,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const mockStats = {
  totalVoters: 1500,
  votesCast: 876,
  remainingVoters: 624,
  votingProgress: 58.4,
};

const votingData = [
  { time: "9 AM", votes: 150 },
  { time: "10 AM", votes: 280 },
  { time: "11 AM", votes: 420 },
  { time: "12 PM", votes: 550 },
  { time: "1 PM", votes: 676 },
  { time: "2 PM", votes: 876 },
];

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

          <div className="grid gap-6 mb-8">
            <div className="p-6 rounded-lg border border-white/20">
              <h3 className="font-semibold mb-4">Voting Progress</h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                <div
                  className="bg-primary h-2.5 rounded-full transition-all duration-500"
                  style={{ width: `${mockStats.votingProgress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-sm text-primary/70">
                <p>{mockStats.votingProgress}% of total votes cast</p>
                <p>{mockStats.remainingVoters} votes remaining</p>
              </div>
            </div>

            <div className="p-6 rounded-lg border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-semibold">Voting Trends</h3>
                <div className="flex items-center text-sm text-primary/70">
                  <AlertCircle className="w-4 h-4 mr-2" />
                  Updated every hour
                </div>
              </div>
              <div className="h-[300px]">
                <ChartContainer
                  className="w-full h-full"
                  config={{
                    votes: {
                      theme: {
                        light: "hsl(var(--primary))",
                        dark: "hsl(var(--primary))",
                      },
                    },
                  }}
                >
                  <AreaChart data={votingData}>
                    <defs>
                      <linearGradient id="colorVotes" x1="0" y1="0" x2="0" y2="1">
                        <stop
                          offset="5%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="hsl(var(--primary))"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                    <XAxis dataKey="time" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Area
                      type="monotone"
                      dataKey="votes"
                      stroke="hsl(var(--primary))"
                      fillOpacity={1}
                      fill="url(#colorVotes)"
                    />
                  </AreaChart>
                </ChartContainer>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
