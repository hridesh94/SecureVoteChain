
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
    <div className="border rounded-lg">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Registration Date</TableHead>
            <TableHead>Last Activity</TableHead>
            <TableHead>Login Attempts</TableHead>
            <TableHead>IP Address</TableHead>
            {showVotes && (
              <>
                <TableHead>Local Vote</TableHead>
                <TableHead>Provincial Vote</TableHead>
                <TableHead>Federal Vote</TableHead>
              </>
            )}
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {voters.map((voter) => (
            <TableRow key={voter.id}>
              <TableCell>{voter.id}</TableCell>
              <TableCell>{voter.name}</TableCell>
              <TableCell>
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
              <TableCell>{voter.location}</TableCell>
              <TableCell>{voter.registrationDate}</TableCell>
              <TableCell>{voter.lastActivity}</TableCell>
              <TableCell>{voter.loginAttempts || 0}</TableCell>
              <TableCell>{voter.ipAddress}</TableCell>
              {showVotes && (
                <>
                  <TableCell>
                    {voter.votes?.local ? voter.votes.local.split('-')[1] : "Not voted"}
                  </TableCell>
                  <TableCell>
                    {voter.votes?.provincial ? voter.votes.provincial.split('-')[1] : "Not voted"}
                  </TableCell>
                  <TableCell>
                    {voter.votes?.federal ? voter.votes.federal.split('-')[1] : "Not voted"}
                  </TableCell>
                </>
              )}
              <TableCell>
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
