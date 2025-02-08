
import { useState } from "react";
import { Shield, FileSpreadsheet, AlertTriangle } from "lucide-react";
import { VotingBlockchain } from "@/utils/blockchain";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

interface AuditResult {
  isValid: boolean;
  totalVotes: number;
  irregularities: string[];
  timestamp: string;
}

const VoteAudit = () => {
  const [lastAudit, setLastAudit] = useState<AuditResult | null>(null);
  const blockchain = VotingBlockchain.getInstance();

  const performAudit = () => {
    const chain = blockchain.getChain();
    const irregularities: string[] = [];
    let isValid = true;

    // Verify chain integrity
    if (!blockchain.isChainValid()) {
      irregularities.push("Blockchain integrity check failed - possible tampering detected");
      isValid = false;
    }

    // Count votes and verify timestamps
    const votes = chain.slice(1); // Exclude genesis block
    let previousTimestamp = votes[0]?.timestamp || 0;
    
    votes.forEach((block, index) => {
      if (block.timestamp < previousTimestamp) {
        irregularities.push(`Invalid timestamp sequence detected at block ${index + 1}`);
        isValid = false;
      }
      previousTimestamp = block.timestamp;
    });

    // Verify vote signatures
    votes.forEach((block, index) => {
      if (!blockchain.verifyVoteSignature(block.vote)) {
        irregularities.push(`Invalid vote signature detected at block ${index + 1}`);
        isValid = false;
      }
    });

    const auditResult: AuditResult = {
      isValid,
      totalVotes: votes.length,
      irregularities,
      timestamp: new Date().toISOString(),
    };

    setLastAudit(auditResult);
    
    toast({
      title: isValid ? "Audit Completed Successfully" : "Audit Found Issues",
      description: isValid 
        ? `Verified ${votes.length} votes. No irregularities found.`
        : `Found ${irregularities.length} issues. Check audit report for details.`,
      variant: isValid ? "default" : "destructive",
    });
  };

  const exportAuditTrail = () => {
    const chain = blockchain.getChain();
    const auditTrail = chain.slice(1).map((block, index) => ({
      blockIndex: index + 1,
      timestamp: new Date(block.timestamp).toISOString(),
      voterHash: block.vote.voterId,
      candidateHash: block.vote.candidateId,
      blockHash: block.hash,
      previousBlockHash: block.previousHash,
    }));

    const jsonStr = JSON.stringify(auditTrail, null, 2);
    const blob = new Blob([jsonStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `vote-audit-trail-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast({
      title: "Audit Trail Exported",
      description: "Full voting audit trail has been downloaded.",
    });
  };

  return (
    <div className="p-6 rounded-lg border border-white/20">
      <h3 className="font-semibold mb-6 flex items-center gap-2">
        <Shield className="w-5 h-5" />
        Vote Audit System
      </h3>
      
      <div className="flex gap-4 mb-6">
        <Button onClick={performAudit} className="flex items-center gap-2">
          <Shield className="w-4 h-4" />
          Perform Audit
        </Button>
        <Button onClick={exportAuditTrail} variant="outline" className="flex items-center gap-2">
          <FileSpreadsheet className="w-4 h-4" />
          Export Audit Trail
        </Button>
      </div>

      {lastAudit && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${lastAudit.isValid ? 'bg-green-500' : 'bg-red-500'}`} />
            <span className="font-medium">
              {lastAudit.isValid ? 'Blockchain Integrity Verified' : 'Issues Detected'}
            </span>
          </div>
          
          <div className="text-sm text-muted-foreground">
            Last audit: {new Date(lastAudit.timestamp).toLocaleString()}
          </div>
          
          <div className="text-sm">
            Total votes verified: {lastAudit.totalVotes}
          </div>

          {lastAudit.irregularities.length > 0 && (
            <div className="mt-4 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="flex items-center gap-2 mb-2 text-red-500">
                <AlertTriangle className="w-4 h-4" />
                <span className="font-medium">Irregularities Found</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {lastAudit.irregularities.map((issue, index) => (
                  <li key={index} className="text-red-500">{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default VoteAudit;
