
import { Map, Lock } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockPollingStations } from "../mockData";

interface ConstituencySelectorProps {
  selectedPollingStation: string | null;
  onPollingStationSelect: (value: string) => void;
}

const ConstituencySelector = ({
  selectedPollingStation,
  onPollingStationSelect,
}: ConstituencySelectorProps) => {
  const selectedStation = selectedPollingStation 
    ? mockPollingStations.find(ps => ps.id === selectedPollingStation)
    : null;

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        {selectedPollingStation ? (
          <Lock className="w-5 h-5 text-primary" />
        ) : (
          <Map className="w-5 h-5 text-primary" />
        )}
        <h2 className="text-lg font-semibold">Select Your Polling Station</h2>
      </div>
      <Select
        value={selectedPollingStation || ''}
        onValueChange={onPollingStationSelect}
        disabled={selectedPollingStation !== null}
      >
        <SelectTrigger className="w-full bg-white">
          <SelectValue placeholder="Select your polling station" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-primary/10">
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
      {selectedStation && (
        <div className="mt-4 space-y-2 bg-white/50 p-4 rounded-lg">
          <div className="text-sm text-primary/70">
            <span className="font-medium">Local constituency:</span> {selectedStation.constituencies.local.name}
          </div>
          <div className="text-sm text-primary/70">
            <span className="font-medium">Provincial constituency:</span> {selectedStation.constituencies.provincial.name}
          </div>
          <div className="text-sm text-primary/70">
            <span className="font-medium">Federal constituency:</span> {selectedStation.constituencies.federal.name}
          </div>
        </div>
      )}
    </div>
  );
};

export default ConstituencySelector;

