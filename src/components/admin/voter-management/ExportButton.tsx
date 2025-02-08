
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ExportButtonProps {
  onExport: () => void;
}

const ExportButton = ({ onExport }: ExportButtonProps) => {
  return (
    <Button variant="outline" onClick={onExport}>
      <Download className="w-4 h-4 mr-2" />
      Export List
    </Button>
  );
};

export default ExportButton;
