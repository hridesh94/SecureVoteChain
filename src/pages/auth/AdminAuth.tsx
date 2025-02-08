
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const AdminAuth = () => {
  const [employeeId, setEmployeeId] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (employeeId.length !== 10) {
      toast({
        title: "Invalid Input",
        description: "Employee ID must be 10 digits long.",
        variant: "destructive",
      });
      return;
    }
    // TODO: Implement actual authentication logic
    navigate("/dashboard/admin");
  };

  return (
    <div className="min-h-screen w-full bg-secondary flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link
          to="/"
          className="inline-flex items-center text-primary hover:text-primary/80 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-card backdrop-blur-md rounded-lg p-8 border border-white/20"
        >
          <h1 className="text-2xl font-semibold mb-6 text-center">
            Admin Authentication
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="employeeId">
                Employee ID
              </label>
              <Input
                id="employeeId"
                type="text"
                placeholder="Enter your 10-digit Employee ID"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                maxLength={10}
                pattern="\d{10}"
                required
                className="bg-white/50"
              />
            </div>

            <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
              Authenticate
            </Button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminAuth;
