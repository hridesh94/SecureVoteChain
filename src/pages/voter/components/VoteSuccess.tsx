
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const VoteSuccess = () => {
  return (
    <div className="min-h-screen w-full bg-secondary p-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card backdrop-blur-md rounded-lg p-8 border border-white/20 text-center"
        >
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold mb-4">धन्यवाद! (Thank You for Voting!)</h2>
          <p className="text-primary/70 mb-6">Your vote has been securely recorded.</p>
          <Link to="/">
            <Button variant="outline">Return to Home</Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default VoteSuccess;
