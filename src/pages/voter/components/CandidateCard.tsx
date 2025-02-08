
import { motion } from "framer-motion";
import { CircleCheck, MapPin, Building2, User, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Candidate } from "../types";

interface CandidateCardProps {
  candidate: Candidate;
  isSelected: boolean;
  showDetails: string | null;
  onSelect: (id: string) => void;
  onToggleDetails: (id: string) => void;
}

const CandidateCard = ({
  candidate,
  isSelected,
  showDetails,
  onSelect,
  onToggleDetails,
}: CandidateCardProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        p-6 rounded-lg border cursor-pointer transition-all duration-200 relative bg-card backdrop-blur-sm
        ${
          isSelected
            ? "border-primary bg-primary/5 shadow-lg"
            : "border-white/20 hover:border-primary/50"
        }
      `}
      onClick={() => onSelect(candidate.id)}
    >
      {isSelected && (
        <motion.div 
          initial={{ scale: 0, opacity: 0 }} 
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20 
          }}
          className="absolute top-4 right-4 bg-primary rounded-full p-1"
        >
          <CircleCheck className="w-6 h-6 text-white" />
        </motion.div>
      )}
      <div className="flex items-center gap-4 mb-4">
        <motion.img 
          src={candidate.photo} 
          alt={candidate.name}
          className="w-16 h-16 rounded-full object-cover border-2"
          animate={isSelected ? { 
            scale: [1, 1.1, 1],
            borderColor: ["#ffffff", "#1D1D1F", "#1D1D1F"]
          } : {}}
          transition={{ duration: 0.3 }}
        />
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{candidate.symbol}</span>
            <span className="text-xl">{candidate.partyFlag}</span>
          </div>
        </div>
      </div>
      <motion.div
        animate={isSelected ? { 
          x: [0, 5, 0],
          transition: { duration: 0.3 }
        } : {}}
      >
        <h3 className="font-semibold text-lg mb-2">{candidate.name}</h3>
        <p className="text-sm text-primary/70 mb-2 font-medium">{candidate.party}</p>
        <div className="flex items-center gap-2 text-sm text-primary/60 mb-2">
          <MapPin className="w-4 h-4" />
          <span>{candidate.constituency}</span>
        </div>
        <p className="text-sm text-primary/70 mb-2">Position: {candidate.position}</p>
      </motion.div>

      <Button
        variant="ghost"
        size="sm"
        className="mt-2 w-full hover:bg-primary/5"
        onClick={(e) => {
          e.stopPropagation();
          onToggleDetails(candidate.id);
        }}
      >
        {showDetails === candidate.id ? "Hide Details" : "Show Details"}
      </Button>

      {showDetails === candidate.id && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="mt-4 pt-4 border-t border-white/10"
        >
          <div className="space-y-3">
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 mt-1 text-primary/60" />
              <div>
                <p className="text-sm font-medium">Education</p>
                <p className="text-sm text-primary/70">{candidate.education}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 mt-1 text-primary/60" />
              <div>
                <p className="text-sm font-medium">Experience</p>
                <p className="text-sm text-primary/70">{candidate.experience}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <FileText className="w-4 h-4 mt-1 text-primary/60" />
              <div>
                <p className="text-sm font-medium">Key Promises</p>
                <ul className="text-sm text-primary/70 list-disc ml-4">
                  {candidate.promises.map((promise, index) => (
                    <li key={index}>{promise}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CandidateCard;
