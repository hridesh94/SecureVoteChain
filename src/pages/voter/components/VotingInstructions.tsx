
import { motion } from "framer-motion";
import { FileText, Check } from "lucide-react";

interface VotingInstructionsProps {
  currentLevel: "local" | "provincial" | "federal";
}

const VotingInstructions = ({ currentLevel }: VotingInstructionsProps) => {
  const instructions = {
    local: [
      "Select your local ward representative",
      "Review candidate information carefully",
      "Click on a candidate card to view more details",
      "Confirm your selection before proceeding",
    ],
    provincial: [
      "Choose your provincial assembly member",
      "Consider candidates' proposed policies",
      "Review past experience and qualifications",
      "Make an informed decision for your province",
    ],
    federal: [
      "Vote for your federal parliament representative",
      "Examine national policy positions",
      "Review candidate backgrounds thoroughly",
      "Select based on national interests",
    ],
  };

  const generalInstructions = [
    "You must vote for all three levels: Local, Provincial, and Federal",
    "Your vote is secure and anonymous",
    "Take your time to make informed decisions",
    "You cannot change your vote after submission",
  ];

  return (
    <div className="bg-primary/5 rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Voting Instructions</h2>
      </div>
      
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-3 text-primary/80">
            Current Level: {currentLevel.charAt(0).toUpperCase() + currentLevel.slice(1)} Elections
          </h3>
          <ul className="space-y-2">
            {instructions[currentLevel].map((instruction, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <Check className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                <span className="text-sm text-primary/70">{instruction}</span>
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-3 text-primary/80">General Guidelines</h3>
          <ul className="space-y-2">
            {generalInstructions.map((instruction, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: (index + 4) * 0.1 }}
                className="flex items-start gap-2"
              >
                <Check className="w-4 h-4 text-success mt-1 flex-shrink-0" />
                <span className="text-sm text-primary/70">{instruction}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default VotingInstructions;

