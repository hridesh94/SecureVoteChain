
import { UserCheck, UserX } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Vote {
  local?: string;
  provincial?: string;
  federal?: string;
}

interface Voter {
  id: string;
  name: string;
  status: "registered" | "voted" | "blocked";
  registrationDate: string;
  lastActivity: string;
  location?: string;
  loginAttempts?: number;
  ipAddress?: string;
  votes?: Vote;
}

interface VoterTableProps {
  voters: Voter[];
  showVotes?: boolean;
  onToggleStatus: (voterId: string) => void;
}

const VoterTable = ({ voters, showVotes = false, onToggleStatus }: VoterTableProps) => {
  return (
    <div className="w-full overflow-x-auto border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="whitespace-nowrap">ID</TableHead>
            <TableHead className="whitespace-nowrap">Name</TableHead>
            <TableHead className="whitespace-nowrap">Status</TableHead>
            <TableHead className="whitespace-nowrap">Location</TableHead>
            <TableHead className="whitespace-nowrap">Registration Date</TableHead>
            <TableHead className="whitespace-nowrap">Last Activity</TableHead>
            <TableHead className="whitespace-nowrap">Login Attempts</TableHead>
            <TableHead className="whitespace-nowrap">IP Address</TableHead>
            {showVotes && (
              <TableHead className="whitespace-nowrap">Voting Status</TableHead>
            )}
            <TableHead className="whitespace-nowrap">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {voters.map((voter) => (
            <TableRow key={voter.id}>
              <TableCell className="whitespace-nowrap">{voter.id}</TableCell>
              <TableCell className="whitespace-nowrap">{voter.name}</TableCell>
              <TableCell className="whitespace-nowrap">
                <span
                  className={`px-2 py-1 rounded-full text-xs ${
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
              <TableCell className="whitespace-nowrap">{voter.location}</TableCell>
              <TableCell className="whitespace-nowrap">{voter.registrationDate}</TableCell>
              <TableCell className="whitespace-nowrap">{voter.lastActivity}</TableCell>
              <TableCell className="whitespace-nowrap">{voter.loginAttempts || 0}</TableCell>
              <TableCell className="whitespace-nowrap">{voter.ipAddress}</TableCell>
              {showVotes && (
                <TableCell className="whitespace-nowrap">
                  {voter.votes ? "Completed" : "Not Voted"}
                </TableCell>
              )}
              <TableCell className="whitespace-nowrap">
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
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default VoterTable;
