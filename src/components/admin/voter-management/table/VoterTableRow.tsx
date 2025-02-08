
import { UserCheck, UserX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableCell, TableRow } from "@/components/ui/table";
import { Voter } from "@/types/voter";

interface VoterTableRowProps {
  voter: Voter;
  showVotes?: boolean;
  onToggleStatus: (voterId: string) => void;
}

const VoterTableRow = ({ voter, showVotes = false, onToggleStatus }: VoterTableRowProps) => {
  return (
    <TableRow className="border-t hover:bg-muted/50">
      <TableCell className="p-2 align-middle [&:has([role=checkbox])]:pr-0">{voter.id}</TableCell>
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
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onToggleStatus(voter.id)}
        >
          {voter.status === "blocked" ? (
            <UserCheck className="w-4 h-4 text-green-500" />
          ) : (
            <UserX className="w-4 h-4 text-red-500" />
          )}
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default VoterTableRow;
