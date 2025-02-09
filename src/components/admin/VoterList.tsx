
import { useVoters } from "@/hooks/useVoters";
import VoterSearchBar from "./voter-management/VoterSearchBar";
import VoterStatusFilter from "./voter-management/VoterStatusFilter";
import VoterTable from "./voter-management/VoterTable";
import ExportButton from "./voter-management/ExportButton";

interface VoterListProps {
  showVotes?: boolean;
}

const VoterList = ({ showVotes = false }: VoterListProps) => {
  const {
    voters,
    searchTerm,
    handleSearch,
    handleStatusFilter,
    handleExport,
    handleToggleStatus,
  } = useVoters(showVotes);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center gap-4">
        <div className="flex items-center gap-4">
          <VoterSearchBar searchTerm={searchTerm} onSearch={handleSearch} />
          <VoterStatusFilter onStatusFilter={handleStatusFilter} />
        </div>
        <ExportButton onExport={handleExport} />
      </div>

      <VoterTable 
        voters={voters} 
        showVotes={showVotes} 
        onToggleStatus={handleToggleStatus} 
      />
    </div>
  );
};

export default VoterList;
