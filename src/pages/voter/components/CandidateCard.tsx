
import { motion } from "framer-motion";
import { CheckCircle, MapPin, Building2, User, FileText } from "lucide-react";
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
      className={`
        p-6 rounded-lg border cursor-pointer transition-colors relative
        ${
          isSelected
            ? "border-primary bg-primary/5"
            : "border-white/20 hover:border-primary/50"
        }
      `}
      onClick={() => onSelect(candidate.id)}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <img 
            src={candidate.photo} 
            alt={candidate.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">{candidate.symbol}</span>
              <span className="text-xl">{candidate.partyFlag}</span>
            </div>
          </div>
        </div>
        {isSelected && <CheckCircle className="w-5 h-5 text-primary" />}
      </div>
      <h3 className="font-semibold mb-2">{candidate.name}</h3>
      <p className="text-sm text-primary/70 mb-2">{candidate.party}</p>
      <div className="flex items-center gap-2 text-sm text-primary/60 mb-2">
        <MapPin className="w-4 h-4" />
        <span>{candidate.constituency}</span>
      </div>
      <p className="text-sm text-primary/70 mb-2">Position: {candidate.position}</p>
      <Button
        variant="ghost"
        size="sm"
        className="mt-2"
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
