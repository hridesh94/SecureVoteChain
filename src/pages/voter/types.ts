
export interface Candidate {
  id: string;
  name: string;
  party: string;
  symbol: string;
  constituency: string;
  education: string;
  experience: string;
  promises: string[];
  partyFlag: string;
  age: number;
  level: "local" | "provincial" | "federal";
  position: string;
}
