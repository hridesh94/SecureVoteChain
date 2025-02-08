import { Candidate } from "./types";

export const mockCandidates: Candidate[] = [
  // Federal Level Candidates
  {
    id: "F001",
    name: "Ram Kumar Sharma",
    party: "Nepal Communist Party (UML)",
    symbol: "☀️",
    constituency: "Kathmandu-4",
    education: "Masters in Political Science from Tribhuvan University",
    experience: "Former Minister of Local Development",
    promises: [
      "National infrastructure development",
      "Foreign investment policies",
      "Federal governance strengthening"
    ],
    partyFlag: "🔴",
    age: 45,
    level: "federal",
    position: "Member of Parliament"
  },
  {
    id: "F002",
    name: "Sita Adhikari",
    party: "Nepali Congress",
    symbol: "🌳",
    constituency: "Kathmandu-4",
    education: "PhD in Economics from Kathmandu University",
    experience: "Two-term Member of Parliament",
    promises: [
      "Economic reforms",
      "Women empowerment",
      "Healthcare system improvement"
    ],
    partyFlag: "🔵",
    age: 42,
    level: "federal",
    position: "Member of Parliament"
  },
  // Provincial Level Candidates
  {
    id: "P001",
    name: "Hari Prasad Poudel",
    party: "CPN (Maoist Centre)",
    symbol: "🔨",
    constituency: "Bagmati Province-3",
    education: "Masters in Public Administration",
    experience: "Former Provincial Secretary",
    promises: [
      "Provincial road networks",
      "Local industry promotion",
      "Education reform"
    ],
    partyFlag: "⭐",
    age: 48,
    level: "provincial",
    position: "Provincial Assembly Member"
  },
  {
    id: "P002",
    name: "Maya Tamang",
    party: "Nepal Communist Party (UML)",
    symbol: "☀️",
    constituency: "Bagmati Province-3",
    education: "Masters in Sociology",
    experience: "Social Activist, Former NGO Director",
    promises: [
      "Indigenous rights",
      "Tourism development",
      "Agricultural modernization"
    ],
    partyFlag: "🔴",
    age: 39,
    level: "provincial",
    position: "Provincial Assembly Member"
  },
  // Local Level Candidates
  {
    id: "L001",
    name: "Bishnu Thapa",
    party: "Independent",
    symbol: "🏠",
    constituency: "Kathmandu Metropolitan City",
    education: "Bachelors in Civil Engineering",
    experience: "Urban Planning Expert",
    promises: [
      "Local infrastructure",
      "Waste management",
      "Public spaces"
    ],
    partyFlag: "⚪",
    age: 36,
    level: "local",
    position: "Mayor"
  },
  {
    id: "L002",
    name: "Sarita Maharjan",
    party: "Nepali Congress",
    symbol: "🌳",
    constituency: "Kathmandu Metropolitan City",
    education: "Masters in Public Policy",
    experience: "Ward Chairperson",
    promises: [
      "Community development",
      "Local business support",
      "Youth employment"
    ],
    partyFlag: "🔵",
    age: 41,
    level: "local",
    position: "Mayor"
  }
];
