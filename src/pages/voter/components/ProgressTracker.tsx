
import { CheckCircle } from "lucide-react";

interface ProgressTrackerProps {
  currentLevel: "local" | "provincial" | "federal";
  votes: {
    local: string | null;
    provincial: string | null;
    federal: string | null;
  };
  setCurrentLevel: (level: "local" | "provincial" | "federal") => void;
}

const ProgressTracker = ({ currentLevel, votes, setCurrentLevel }: ProgressTrackerProps) => {
  return (
    <div className="flex items-center justify-center mb-6 p-4 bg-primary/5 rounded-lg">
      <div className="flex items-center gap-6">
        {[
          { level: "local", label: "Local" },
          { level: "provincial", label: "Provincial" },
          { level: "federal", label: "Federal" }
        ].map((item, index) => (
          <>
            <div 
              key={item.level}
              className="flex items-center cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => setCurrentLevel(item.level as "local" | "provincial" | "federal")}
            >
              <div 
                className={`p-2 rounded-full ${
                  votes[item.level as keyof typeof votes] 
                    ? 'bg-green-500' 
                    : currentLevel === item.level 
                      ? 'bg-primary'
                      : 'bg-gray-300'
                }`}
              >
                <CheckCircle className="w-4 h-4 text-white" />
              </div>
              <span className={`ml-2 ${currentLevel === item.level ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </div>
            {index < 2 && <span className="text-gray-400">→</span>}
          </>
        ))}
      </div>
    </div>
  );
};

export default ProgressTracker;
