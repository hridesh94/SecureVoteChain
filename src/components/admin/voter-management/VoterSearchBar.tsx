
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface VoterSearchBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const VoterSearchBar = ({ searchTerm, onSearch }: VoterSearchBarProps) => {
  return (
    <div className="relative w-64">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search voters..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="pl-8"
      />
    </div>
  );
};

export default VoterSearchBar;
