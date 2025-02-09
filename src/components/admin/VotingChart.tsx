
import { AlertCircle } from "lucide-react";
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

interface VotingDataPoint {
  time: string;
  votes: number;
  active: number;
}

interface VotingChartProps {
  data: VotingDataPoint[];
}

const VotingChart = ({ data }: VotingChartProps) => {
  return (
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
          <AreaChart data={data}>
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
  );
};

export default VotingChart;
