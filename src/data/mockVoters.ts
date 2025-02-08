
import { Voter } from "@/types/voter";

export const mockVoters: Voter[] = [
  {
    id: "V001",
    name: "Aarav Sharma",
    status: "voted",
    registrationDate: "2024-02-15",
    lastActivity: "2024-02-20",
    location: "Kathmandu",
    loginAttempts: 2,
    ipAddress: "192.168.1.1",
    votes: {
      local: "L001-Nepali Congress",
      provincial: "P002-Nepal Communist Party (UML)",
      federal: "F001-Nepal Communist Party (UML)"
    }
  },
  {
    id: "V002",
    name: "Priya Adhikari",
    status: "registered",
    registrationDate: "2024-02-16",
    lastActivity: "2024-02-19",
    location: "Lalitpur",
    loginAttempts: 1,
    ipAddress: "192.168.1.2"
  },
  {
    id: "V003",
    name: "Rajesh Poudel",
    status: "registered",
    registrationDate: "2024-02-14",
    lastActivity: "2024-02-18",
    location: "Bhaktapur",
    loginAttempts: 0,
    ipAddress: "192.168.1.3"
  },
  {
    id: "V004",
    name: "Sita Karki",
    status: "voted",
    registrationDate: "2024-02-13",
    lastActivity: "2024-02-20",
    location: "Pokhara",
    loginAttempts: 1,
    ipAddress: "192.168.1.4",
    votes: {
      local: "L003-Nepali Congress",
      provincial: "P001-Nepal Communist Party (Maoist)",
      federal: "F003-Nepali Congress"
    }
  },
  {
    id: "V005",
    name: "Bishnu Thapa",
    status: "blocked",
    registrationDate: "2024-02-12",
    lastActivity: "2024-02-17",
    location: "Kathmandu",
    loginAttempts: 5,
    ipAddress: "192.168.1.5"
  }
];
