
import { Candidate } from "./types";

export const mockConstituencies = {
  federal: Array.from({ length: 165 }, (_, i) => ({
    id: `F${(i + 1).toString().padStart(3, '0')}`,
    name: `Federal Constituency ${i + 1}`,
    pollingStation: `Polling Station ${Math.floor(i / 10) + 1}`
  })),
  provincial: Array.from({ length: 330 }, (_, i) => ({
    id: `P${(i + 1).toString().padStart(3, '0')}`,
    name: `Provincial Constituency ${i + 1}`,
    pollingStation: `Polling Station ${Math.floor(i / 15) + 1}`
  })),
  local: [
    { id: "L001", name: "Kathmandu Metropolitan City", pollingStation: "Kathmandu Central" },
    { id: "L002", name: "Lalitpur Metropolitan City", pollingStation: "Lalitpur Central" },
    { id: "L003", name: "Pokhara Metropolitan City", pollingStation: "Pokhara Central" },
    // Add more as needed
  ]
};

// Helper function to generate candidates for each constituency
const generateCandidatesForConstituency = (
  constituencyId: string, 
  level: "federal" | "provincial" | "local",
  constituencyName: string
): Candidate[] => {
  const parties = [
    { name: "Nepal Communist Party (UML)", symbol: "☀️", flag: "🔴" },
    { name: "Nepali Congress", symbol: "🌳", flag: "🔵" },
    { name: "CPN (Maoist Centre)", symbol: "🔨", flag: "⭐" },
  ];

  return parties.map((party, index) => ({
    id: `${constituencyId}-C${index + 1}`,
    name: `Candidate ${index + 1}`,
    party: party.name,
    symbol: party.symbol,
    constituency: constituencyName,
    education: "Masters in Political Science",
    experience: "Former Local Representative",
    promises: [
      "Infrastructure development",
      "Education reform",
      "Healthcare improvement"
    ],
    partyFlag: party.flag,
    age: 35 + index,
    level,
    position: level === "local" ? "Mayor" : 
             level === "provincial" ? "Provincial Assembly Member" : 
             "Member of Parliament"
  }));
};

// Generate candidates for all constituencies
export const mockCandidates: Candidate[] = [
  // Federal candidates
  ...mockConstituencies.federal.flatMap(constituency => 
    generateCandidatesForConstituency(constituency.id, "federal", constituency.name)
  ),
  // Provincial candidates
  ...mockConstituencies.provincial.flatMap(constituency => 
    generateCandidatesForConstituency(constituency.id, "provincial", constituency.name)
  ),
  // Local candidates
  ...mockConstituencies.local.flatMap(constituency => 
    generateCandidatesForConstituency(constituency.id, "local", constituency.name)
  ),
];
