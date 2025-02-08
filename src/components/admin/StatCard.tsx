
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

const StatCard = ({ title, value, icon: Icon, iconColor = "text-primary", delay = 0 }: StatCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay }}
      className="p-6 rounded-lg border border-white/20"
    >
      <div className="flex items-center mb-4">
        <Icon className={`w-5 h-5 ${iconColor} mr-2`} />
        <h3 className="font-semibold">{title}</h3>
      </div>
      <p className="text-3xl font-semibold">{value}</p>
    </motion.div>
  );
};

export default StatCard;
