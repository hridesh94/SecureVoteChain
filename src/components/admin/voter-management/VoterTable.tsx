
import { Table, TableBody } from "@/components/ui/table";
import { Voter } from "@/types/voter";
import VoterTableHeader from "./table/VoterTableHeader";
import VoterTableRow from "./table/VoterTableRow";

interface VoterTableProps {
  voters: Voter[];
  showVotes?: boolean;
  onToggleStatus: (voterId: string) => void;
}

const VoterTable = ({ voters, showVotes = false, onToggleStatus }: VoterTableProps) => {
  return (
    <div className="relative w-full overflow-auto">
      <div className="rounded-md border">
        <Table>
          <VoterTableHeader showVotes={showVotes} />
          <TableBody>
            {voters.map((voter) => (
              <VoterTableRow
                key={voter.id}
                voter={voter}
                showVotes={showVotes}
                onToggleStatus={onToggleStatus}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VoterTable;
