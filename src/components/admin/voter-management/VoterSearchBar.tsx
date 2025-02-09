
import SearchInput from "./controls/SearchInput";

interface VoterSearchBarProps {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const VoterSearchBar = ({ searchTerm, onSearch }: VoterSearchBarProps) => {
  return <SearchInput value={searchTerm} onChange={onSearch} />;
};

export default VoterSearchBar;
