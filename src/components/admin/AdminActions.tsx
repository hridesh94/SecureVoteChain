
import { 
  RefreshCw, 
  Download, 
  Ban, 
  Eye, 
  EyeOff 
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminActionsProps {
  isVotingActive: boolean;
  showResults: boolean;
  onRefresh: () => void;
  onExport: () => void;
  onBlock: () => void;
  onToggleResults: () => void;
  onVotingToggle: () => void;
}

const AdminActions = ({
  isVotingActive,
  showResults,
  onRefresh,
  onExport,
  onBlock,
  onToggleResults,
  onVotingToggle,
}: AdminActionsProps) => {
  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={onRefresh}>
        <RefreshCw className="w-4 h-4 mr-2" />
        Refresh
      </Button>
      <Button variant="outline" size="sm" onClick={onExport}>
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>
      <Button variant="outline" size="sm" onClick={onBlock}>
        <Ban className="w-4 h-4 mr-2" />
        Block Voter
      </Button>
      {!isVotingActive && (
        <Button variant="outline" size="sm" onClick={onToggleResults}>
          {showResults ? (
            <>
              <EyeOff className="w-4 h-4 mr-2" />
              Hide Results
            </>
          ) : (
            <>
              <Eye className="w-4 h-4 mr-2" />
              Show Results
            </>
          )}
        </Button>
      )}
      <Button
        onClick={onVotingToggle}
        variant={isVotingActive ? "destructive" : "default"}
      >
        {isVotingActive ? "End Voting" : "Start Voting"}
      </Button>
    </div>
  );
};

export default AdminActions;
