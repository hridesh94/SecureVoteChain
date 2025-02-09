
import { Candidate } from "./types";

export const mockPollingStations = [
  {
    id: "PS001",
    name: "Kathmandu-1 Central",
    constituencies: {
      federal: { id: "F001", name: "Kathmandu-1" },
      provincial: { id: "P001", name: "Bagmati Pradesh-3" },
      local: { id: "L001", name: "Kathmandu Metropolitan City" }
    }
  },
  {
    id: "PS002",
    name: "Lalitpur-3 Central",
    constituencies: {
      federal: { id: "F002", name: "Lalitpur-3" },
      provincial: { id: "P002", name: "Bagmati Pradesh-5" },
      local: { id: "L002", name: "Lalitpur Metropolitan City" }
    }
  },
  {
    id: "PS003",
    name: "Pokhara-2 Central",
    constituencies: {
      federal: { id: "F003", name: "Kaski-2" },
      provincial: { id: "P003", name: "Gandaki Pradesh-4" },
      local: { id: "L003", name: "Pokhara Metropolitan City" }
    }
  }
];

// Helper function to generate candidates for polling station
const generateCandidatesForPollingStation = (
  pollingStation: typeof mockPollingStations[0]
): Candidate[] => {
  const parties = [
    { 
      name: "Nepal Communist Party (UML)", 
      symbol: "☀️", 
      flag: "🔴",
      candidates: {
        federal: {
          name: "Khadga Prasad Oli",
          education: "Bachelor's in Political Science",
          experience: "Former Prime Minister of Nepal",
          photo: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
          age: 69
        },
        provincial: {
          name: "Astha Laxmi Shakya",
          education: "Master's in Public Administration",
          experience: "Former Chief Minister of Bagmati Province",
          photo: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
          age: 54
        },
        local: {
          name: "Bidya Sundar Shakya",
          education: "Master's in Business Administration",
          experience: "Former Mayor of Kathmandu Metropolitan City",
          photo: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
          age: 58
        }
      }
    },
    { 
      name: "Nepali Congress", 
      symbol: "🌳", 
      flag: "🔵",
      candidates: {
        federal: {
          name: "Prakash Man Singh",
          education: "Master's in Political Science",
          experience: "Former Deputy Prime Minister",
          photo: "https://images.unsplash.com/photo-1466721591366-2d5fba72006d",
          age: 66
        },
        provincial: {
          name: "Rajendra Prasad Pandey",
          education: "Master's in Economics",
          experience: "Former Minister of Federal Affairs",
          photo: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
          age: 62
        },
        local: {
          name: "Sirjana Singh",
          education: "Bachelor's in Public Administration",
          experience: "Social Worker and Political Activist",
          photo: "https://images.unsplash.com/photo-1582562124811-c09040d0a901",
          age: 48
        }
      }
    },
    { 
      name: "CPN (Maoist Centre)", 
      symbol: "🔨", 
      flag: "⭐",
      candidates: {
        federal: {
          name: "Pushpa Kamal Dahal",
          education: "Bachelor's in Agriculture",
          experience: "Former Prime Minister of Nepal",
          photo: "https://images.unsplash.com/photo-1517022812141-23620dba5c23",
          age: 67
        },
        provincial: {
          name: "Narayankaji Shrestha",
          education: "Master's in Political Science",
          experience: "Former Deputy Prime Minister",
          photo: "https://images.unsplash.com/photo-1527576539890-dfa815648363",
          age: 59
        },
        local: {
          name: "Sarbottam Dangol",
          education: "Master's in Public Policy",
          experience: "Community Leader and Social Activist",
          photo: "https://images.unsplash.com/photo-1487958449943-2429e8be8625",
          age: 45
        }
      }
    },
  ];

  const candidates: Candidate[] = [];

  // Generate candidates for each level (federal, provincial, local)
  Object.entries(pollingStation.constituencies).forEach(([level, constituency]) => {
    parties.forEach((party) => {
      const candidateInfo = party.candidates[level as keyof typeof party.candidates];
      candidates.push({
        id: `${constituency.id}-${party.name}`,
        name: candidateInfo.name,
        party: party.name,
        symbol: party.symbol,
        constituency: constituency.name,
        education: candidateInfo.education,
        experience: candidateInfo.experience,
        promises: [
          "Infrastructure development",
          "Education reform",
          "Healthcare improvement",
          "Job creation",
          "Environmental protection"
        ],
        partyFlag: party.flag,
        age: candidateInfo.age,
        level: level as "federal" | "provincial" | "local",
        position: level === "local" ? "Mayor" : 
                 level === "provincial" ? "Provincial Assembly Member" : 
                 "Member of Parliament",
        photo: candidateInfo.photo
      });
    });
  });

  return candidates;
};

// Generate all candidates
export const mockCandidates: Candidate[] = mockPollingStations.flatMap(
  pollingStation => generateCandidatesForPollingStation(pollingStation)
);
