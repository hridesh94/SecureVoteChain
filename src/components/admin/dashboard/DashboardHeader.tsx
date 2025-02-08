
import { motion } from "framer-motion";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminActions from "@/components/admin/AdminActions";

interface DashboardHeaderProps {
  isVotingActive: boolean;
  showResults: boolean;
  onRefresh: () => void;
  onExport: () => void;
  onToggleResults: () => void;
  onVotingToggle: () => void;
}

const DashboardHeader = ({
  isVotingActive,
  showResults,
  onRefresh,
  onExport,
  onToggleResults,
  onVotingToggle,
}: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8">
      <AdminHeader isVotingActive={isVotingActive} />
      <AdminActions
        isVotingActive={isVotingActive}
        showResults={showResults}
        onRefresh={onRefresh}
        onExport={onExport}
        onToggleResults={onToggleResults}
        onVotingToggle={onVotingToggle}
      />
    </div>
  );
};

export default DashboardHeader;
