
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Users } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleRoleSelect = (role: "voter" | "admin") => {
    navigate(`/auth/${role}`);
  };

  return (
    <div className="min-h-screen w-full bg-secondary flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-semibold text-primary mb-4">
          Secure Vote Chain
        </h1>
        <p className="text-lg text-primary/80">
          Choose your role to proceed with secure voting
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onHoverStart={() => setHoveredRole("voter")}
          onHoverEnd={() => setHoveredRole(null)}
          onClick={() => handleRoleSelect("voter")}
          className="relative group cursor-pointer"
        >
          <div
            className={`
              bg-card backdrop-blur-md rounded-lg p-8 border border-white/20
              transform transition-all duration-300
              ${hoveredRole === "voter" ? "scale-[1.02]" : ""}
            `}
          >
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-primary/5 mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Voter Portal</h2>
              <p className="text-primary/70 text-center">
                Cast your vote securely using your National ID and Voter ID
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          onHoverStart={() => setHoveredRole("admin")}
          onHoverEnd={() => setHoveredRole(null)}
          onClick={() => handleRoleSelect("admin")}
          className="relative group cursor-pointer"
        >
          <div
            className={`
              bg-card backdrop-blur-md rounded-lg p-8 border border-white/20
              transform transition-all duration-300
              ${hoveredRole === "admin" ? "scale-[1.02]" : ""}
            `}
          >
            <div className="flex flex-col items-center">
              <div className="p-4 rounded-full bg-primary/5 mb-6">
                <LockKeyhole className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">Admin Portal</h2>
              <p className="text-primary/70 text-center">
                Monitor and manage the voting process with advanced controls
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
