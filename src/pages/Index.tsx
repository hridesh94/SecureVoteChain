
import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { LockKeyhole, Users, Shield, ChevronRight, Check } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleRoleSelect = (role: "voter" | "admin") => {
    navigate(`/auth/${role}`);
  };

  const features = [
    "Secure blockchain-based voting system",
    "Easy-to-use interface for voters",
    "Real-time vote tracking and verification",
    "Advanced security measures",
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-secondary to-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-primary mb-6">
            Secure Vote Chain
          </h1>
          <p className="text-xl text-primary/80 max-w-2xl mx-auto">
            Experience the future of voting with our blockchain-powered platform.
            Secure, transparent, and accessible voting for everyone.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center space-x-3 bg-white/50 backdrop-blur-sm p-4 rounded-lg border border-primary/10"
            >
              <Check className="w-5 h-5 text-success flex-shrink-0" />
              <span className="text-primary/80">{feature}</span>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
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
                bg-white/80 backdrop-blur-md rounded-xl p-8 border border-primary/10
                shadow-lg hover:shadow-xl transform transition-all duration-300
                ${hoveredRole === "voter" ? "scale-[1.02]" : ""}
              `}
            >
              <div className="flex flex-col items-center">
                <div className="p-4 rounded-full bg-secondary mb-6 group-hover:bg-primary/5 transition-colors">
                  <Users className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Voter Portal</h2>
                <p className="text-primary/70 text-center mb-6">
                  Cast your vote securely using your National ID and Voter ID. Your vote
                  is encrypted and protected by blockchain technology.
                </p>
                <div className="flex items-center text-primary/60 group-hover:text-primary transition-colors">
                  <span>Access Portal</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
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
                bg-white/80 backdrop-blur-md rounded-xl p-8 border border-primary/10
                shadow-lg hover:shadow-xl transform transition-all duration-300
                ${hoveredRole === "admin" ? "scale-[1.02]" : ""}
              `}
            >
              <div className="flex flex-col items-center">
                <div className="p-4 rounded-full bg-secondary mb-6 group-hover:bg-primary/5 transition-colors">
                  <LockKeyhole className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-primary">Admin Portal</h2>
                <p className="text-primary/70 text-center mb-6">
                  Monitor and manage the voting process with advanced controls. Access
                  real-time analytics and ensure voting integrity.
                </p>
                <div className="flex items-center text-primary/60 group-hover:text-primary transition-colors">
                  <span>Access Portal</span>
                  <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center space-x-2 bg-primary/5 px-4 py-2 rounded-full">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-sm text-primary/80">
              Powered by blockchain technology for maximum security
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Index;
