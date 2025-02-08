
import { Candidate } from "./types";

export const mockPollingStations = [
  {
    id: "PS001",
    name: "Kathmandu Central",
    constituencies: {
      federal: { id: "F001", name: "Federal Constituency 1" },
      provincial: { id: "P001", name: "Provincial Constituency 1" },
      local: { id: "L001", name: "Kathmandu Metropolitan City" }
    }
  },
  {
    id: "PS002",
    name: "Lalitpur Central",
    constituencies: {
      federal: { id: "F002", name: "Federal Constituency 2" },
      provincial: { id: "P002", name: "Provincial Constituency 2" },
      local: { id: "L002", name: "Lalitpur Metropolitan City" }
    }
  },
  {
    id: "PS003",
    name: "Pokhara Central",
    constituencies: {
      federal: { id: "F003", name: "Federal Constituency 3" },
      provincial: { id: "P003", name: "Provincial Constituency 3" },
      local: { id: "L003", name: "Pokhara Metropolitan City" }
    }
  }
];

// Helper function to generate candidates for polling station
const generateCandidatesForPollingStation = (
  pollingStation: typeof mockPollingStations[0]
): Candidate[] => {
  const parties = [
    { name: "Nepal Communist Party (UML)", symbol: "☀️", flag: "🔴" },
    { name: "Nepali Congress", symbol: "🌳", flag: "🔵" },
    { name: "CPN (Maoist Centre)", symbol: "🔨", flag: "⭐" },
  ];

  const candidates: Candidate[] = [];

  // Generate candidates for each level (federal, provincial, local)
  Object.entries(pollingStation.constituencies).forEach(([level, constituency]) => {
    parties.forEach((party, index) => {
      candidates.push({
        id: `${constituency.id}-C${index + 1}`,
        name: `Candidate ${index + 1}`,
        party: party.name,
        symbol: party.symbol,
        constituency: constituency.name,
        education: "Masters in Political Science",
        experience: "Former Local Representative",
        promises: [
          "Infrastructure development",
          "Education reform",
          "Healthcare improvement"
        ],
        partyFlag: party.flag,
        age: 35 + index,
        level: level as "federal" | "provincial" | "local",
        position: level === "local" ? "Mayor" : 
                 level === "provincial" ? "Provincial Assembly Member" : 
                 "Member of Parliament"
      });
    });
  });

  return candidates;
};

// Generate all candidates
export const mockCandidates: Candidate[] = mockPollingStations.flatMap(
  pollingStation => generateCandidatesForPollingStation(pollingStation)
);
