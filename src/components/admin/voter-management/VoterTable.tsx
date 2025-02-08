
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
    <div className="relative w-full overflow-auto">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="h-10 px-2 text-xs font-medium text-muted-foreground">ID</TableHead>
              <TableHead className="h-10 px-2 text-xs font-medium text-muted-foreground">Name</TableHead>
              <TableHead className="h-10 px-2 text-xs font-medium text-muted-foreground">Status</TableHead>
              <TableHead className="h-10 px-2 text-xs font-medium text-muted-foreground">Location</TableHead>
              <TableHead className="h-10 px-2 text-xs font-medium text-muted-foreground">Registration Date</TableHead>
              <TableHead className="h-10 px-2 text-xs font-medium text-muted-foreground">Last Activity</TableHead>
              <TableHead className="h-10 px-2 text-xs font-medium text-muted-foreground">Login Attempts</TableHead>
              <TableHead className="h-10 px-2 text-xs font-medium text-muted-foreground">IP Address</TableHead>
              {showVotes && (
                <TableHead className="h-10 px-2 text-xs font-medium text-muted-foreground">Voting Status</TableHead>
              )}
              <TableHead className="h-10 px-2 text-xs font-medium text-muted-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {voters.map((voter) => (
              <TableRow key={voter.id} className="border-t hover:bg-muted/50">
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default VoterTable;
