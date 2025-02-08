
import { Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface AdminHeaderProps {
  isVotingActive: boolean;
}

const AdminHeader = ({ isVotingActive }: AdminHeaderProps) => {
  const votingStatus = isVotingActive ? (
    <div className="flex items-center text-green-500">
      <div className="w-2 h-2 rounded-full bg-green-500 mr-2 animate-pulse" />
      Active
    </div>
  ) : (
    <div className="flex items-center text-red-500">
      <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
      Ended
    </div>
  );

  return (
    <>
      <Link
        to="/"
        className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </Link>
      <div className="flex items-center">
        <div className="p-3 rounded-full bg-primary/5">
          <Lock className="w-6 h-6 text-primary" />
        </div>
        <div className="ml-4">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          {votingStatus}
        </div>
      </div>
    </>
  );
};

export default AdminHeader;
