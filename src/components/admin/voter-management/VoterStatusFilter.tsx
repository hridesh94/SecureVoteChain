
import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface VoterStatusFilterProps {
  onStatusFilter: (status: string) => void;
}

const VoterStatusFilter = ({ onStatusFilter }: VoterStatusFilterProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Filter className="w-4 h-4 mr-2" />
          Filter Status
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => onStatusFilter("all")}>
          All
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusFilter("registered")}>
          Registered
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusFilter("voted")}>
          Voted
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onStatusFilter("blocked")}>
          Blocked
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default VoterStatusFilter;
