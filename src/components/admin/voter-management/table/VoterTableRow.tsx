
import { TableCell, TableRow } from "@/components/ui/table";
import { Voter } from "@/types/voter";
import VoterActions from "../VoterActions";

interface VoterTableRowProps {
  voter: Voter;
  showVotes?: boolean;
  onToggleStatus: (voterId: string) => void;
  onRemoveVoter?: (voterId: string) => void;
  onResetAttempts?: (voterId: string) => void;
}

const VoterTableRow = ({ 
  voter, 
  showVotes = false, 
  onToggleStatus,
  onRemoveVoter = () => {},
  onResetAttempts = () => {}
}: VoterTableRowProps) => {
  return (
    <TableRow className="border-t hover:bg-muted/50">
      <TableCell className="p-2 align-middle">{voter.id}</TableCell>
      <TableCell className="p-2 align-middle">{voter.name}</TableCell>
      <TableCell className="p-2 align-middle">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            voter.status === "voted"
              ? "bg-green-100 text-green-800"
              : voter.status === "blocked"
              ? "bg-red-100 text-red-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {voter.status}
        </span>
      </TableCell>
      <TableCell className="p-2 align-middle">{voter.location}</TableCell>
      <TableCell className="p-2 align-middle">{voter.registrationDate}</TableCell>
      <TableCell className="p-2 align-middle">{voter.lastActivity}</TableCell>
      <TableCell className="p-2 align-middle">{voter.loginAttempts || 0}</TableCell>
      <TableCell className="p-2 align-middle">{voter.ipAddress}</TableCell>
      {showVotes && (
        <TableCell className="p-2 align-middle">
          {voter.votes ? "Completed" : "Not Voted"}
        </TableCell>
      )}
      <TableCell className="p-2 align-middle">
        <VoterActions
          voterId={voter.id}
          isBlocked={voter.status === "blocked"}
          onBlock={onToggleStatus}
          onRemove={onRemoveVoter}
          onReset={onResetAttempts}
        />
      </TableCell>
    </TableRow>
  );
};

export default VoterTableRow;

