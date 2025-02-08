
export interface Vote {
  local?: string;
  provincial?: string;
  federal?: string;
}

export interface Voter {
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
