
import React, { useState } from "react";
import { LockKeyhole, Users, Shield, ChevronRight, Check, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRoleSelect = (role: string) => {
    navigate(`/auth/${role}`);
  };

  const features = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Blockchain Security",
      description: "Built on secure blockchain technology"
    },
    {
      icon: <Check className="w-5 h-5" />,
      title: "Easy Verification",
      description: "Simple and intuitive voting process"
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Real-time Tracking",
      description: "Monitor voting progress instantly"
    },
    {
      icon: <LockKeyhole className="w-5 h-5" />,
      title: "Advanced Protection",
      description: "Multiple security layers for your vote"
    }
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            Secure Vote Chain
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Experience the future of voting with our blockchain-powered platform.
            Secure, transparent, and accessible voting for everyone.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 bg-white rounded-2xl border border-gray-100 hover:border-gray-200 transition-all duration-300"
            >
              <div className="bg-gray-50 p-3 rounded-xl w-fit mb-4 group-hover:bg-gray-100 transition-colors">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Portal Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-20">
          {/* Voter Portal */}
          <div
            onMouseEnter={() => setHoveredRole("voter")}
            onMouseLeave={() => setHoveredRole(null)}
            onClick={() => handleRoleSelect("voter")}
            className="group cursor-pointer"
          >
            <div className={`
              bg-white rounded-2xl p-8 
              border border-gray-100
              transition-all duration-300
              ${hoveredRole === "voter" ? "shadow-lg border-gray-200" : "shadow-sm"}
            `}>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-gray-50 mb-6 group-hover:bg-gray-100 transition-colors">
                  <Users className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Voter Portal</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Cast your vote securely using your National ID and Voter ID. 
                  Your vote is encrypted and protected by blockchain technology.
                </p>
                <div className="flex items-center text-gray-900 font-medium">
                  <span>Access Portal</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>

          {/* Admin Portal */}
          <div
            onMouseEnter={() => setHoveredRole("admin")}
            onMouseLeave={() => setHoveredRole(null)}
            onClick={() => handleRoleSelect("admin")}
            className="group cursor-pointer"
          >
            <div className={`
              bg-white rounded-2xl p-8 
              border border-gray-100
              transition-all duration-300
              ${hoveredRole === "admin" ? "shadow-lg border-gray-200" : "shadow-sm"}
            `}>
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-gray-50 mb-6 group-hover:bg-gray-100 transition-colors">
                  <LockKeyhole className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-semibold mb-4 text-gray-900">Admin Portal</h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Monitor and manage the voting process with advanced controls. 
                  Access real-time analytics and ensure voting integrity.
                </p>
                <div className="flex items-center text-gray-900 font-medium">
                  <span>Access Portal</span>
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">100%</div>
            <div className="text-gray-600">Vote Privacy</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">24/7</div>
            <div className="text-gray-600">System Availability</div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-6 text-center">
            <div className="text-3xl font-bold text-gray-900 mb-1">Instant</div>
            <div className="text-gray-600">Vote Verification</div>
          </div>
        </div>

        {/* Security Badge */}
        <div className="text-center">
          <div className="inline-flex items-center space-x-2 bg-gray-50 px-6 py-3 rounded-full">
            <Shield className="w-5 h-5" />
            <span className="text-sm text-gray-600 font-medium">
              Protected by Advanced Blockchain Technology
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
