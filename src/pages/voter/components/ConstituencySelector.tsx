
import { Map } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockPollingStations } from "../mockData";

interface ConstituencySelectorProps {
  currentLevel: "local" | "provincial" | "federal";
  selectedConstituency: string | null;
  onConstituencySelect: (value: string) => void;
}

const ConstituencySelector = ({
  currentLevel,
  selectedConstituency,
  onConstituencySelect,
}: ConstituencySelectorProps) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Map className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Select Your Polling Station</h2>
      </div>
      <Select
        value={selectedConstituency || ''}
        onValueChange={(value) => {
          const pollingStation = mockPollingStations.find(ps => ps.id === value);
          if (pollingStation) {
            onConstituencySelect(pollingStation.constituencies[currentLevel].id);
          }
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select your polling station" />
        </SelectTrigger>
        <SelectContent>
          {mockPollingStations.map((station) => (
            <SelectItem 
              key={station.id} 
              value={station.id}
              className="px-2 py-1.5 cursor-pointer hover:bg-primary/5"
            >
              {station.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {selectedConstituency && (
        <div className="mt-4 text-sm text-primary/70">
          Your {currentLevel} constituency: {
            mockPollingStations.find(ps => 
              ps.constituencies[currentLevel].id === selectedConstituency
            )?.constituencies[currentLevel].name
          }
        </div>
      )}
    </div>
  );
};

export default ConstituencySelector;
