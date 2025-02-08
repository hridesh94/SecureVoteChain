
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const VoterAuth = () => {
  const [nationalId, setNationalId] = useState("");
  const [voterId, setVoterId] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();

  const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const handleInitialSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nationalId.length !== 10 || voterId.length !== 10) {
      toast({
        title: "Invalid Input",
        description: "Both National ID and Voter ID must be 10 digits long.",
        variant: "destructive",
      });
      return;
    }
    
    // In a real application, this would verify credentials against a backend
    const generatedOTP = generateOTP();
    console.log("Generated OTP:", generatedOTP); // For demo purposes
    localStorage.setItem("currentOTP", generatedOTP);
    
    toast({
      title: "OTP Generated",
      description: "Check console for OTP (in real app, this would be sent via SMS/email)",
    });
    
    setShowOTP(true);
  };

  const handleOTPSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const storedOTP = localStorage.getItem("currentOTP");
    
    if (otp === storedOTP) {
      localStorage.removeItem("currentOTP");
      toast({
        title: "Success",
        description: "2FA verification successful",
      });
      navigate("/dashboard/voter");
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please check the OTP and try again",
        variant: "destructive",
      });
    }
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
            Voter Authentication
          </h1>

          {!showOTP ? (
            <form onSubmit={handleInitialSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="nationalId">
                  National ID
                </label>
                <Input
                  id="nationalId"
                  type="text"
                  placeholder="Enter your 10-digit National ID"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  maxLength={10}
                  pattern="\d{10}"
                  required
                  className="bg-white/50"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="voterId">
                  Voter ID
                </label>
                <Input
                  id="voterId"
                  type="text"
                  placeholder="Enter your 10-digit Voter ID"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  maxLength={10}
                  pattern="\d{10}"
                  required
                  className="bg-white/50"
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Verify & Get OTP
              </Button>
            </form>
          ) : (
            <motion.form
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onSubmit={handleOTPSubmit}
              className="space-y-6"
            >
              <div className="space-y-4">
                <label className="text-sm font-medium block text-center">
                  Enter the 6-digit OTP sent to your registered device
                </label>
                <div className="flex justify-center">
                  <InputOTP
                    value={otp}
                    onChange={setOtp}
                    maxLength={6}
                    render={({ slots }) => (
                      <InputOTPGroup className="gap-2">
                        {slots.map((slot, index) => (
                          <InputOTPSlot key={index} {...slot} index={index} />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Verify OTP
              </Button>
              
              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={() => setShowOTP(false)}
              >
                Back to Login
              </Button>
            </motion.form>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default VoterAuth;
