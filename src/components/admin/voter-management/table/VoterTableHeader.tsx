
import { TableHead, TableHeader, TableRow } from "@/components/ui/table";

interface VoterTableHeaderProps {
  showVotes?: boolean;
}

const VoterTableHeader = ({ showVotes = false }: VoterTableHeaderProps) => {
  return (
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
  );
};

export default VoterTableHeader;
