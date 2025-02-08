
import { Ban, UserX, Shield, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface VoterActionsProps {
  voterId: string;
  isBlocked: boolean;
  onBlock: (voterId: string) => void;
  onRemove: (voterId: string) => void;
  onReset: (voterId: string) => void;
}

const VoterActions = ({
  voterId,
  isBlocked,
  onBlock,
  onRemove,
  onReset,
}: VoterActionsProps) => {
  return (
    <div className="flex items-center gap-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onBlock(voterId)}
            className={isBlocked ? "text-green-500" : "text-red-500"}
          >
            <Ban className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          {isBlocked ? "Unblock Voter" : "Block Voter"}
        </TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onRemove(voterId)}
            className="text-red-500"
          >
            <UserX className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Remove Voter</TooltipContent>
      </Tooltip>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onReset(voterId)}
            className="text-blue-500"
          >
            <RotateCcw className="w-4 h-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Reset Login Attempts</TooltipContent>
      </Tooltip>
    </div>
  );
};

export default VoterActions;

