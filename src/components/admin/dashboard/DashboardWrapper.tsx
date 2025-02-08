
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface DashboardWrapperProps {
  children: ReactNode;
}

const DashboardWrapper = ({ children }: DashboardWrapperProps) => {
  return (
    <div className="min-h-screen w-full bg-secondary">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card backdrop-blur-md rounded-lg p-6 border border-white/20"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default DashboardWrapper;
