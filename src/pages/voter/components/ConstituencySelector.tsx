
import { Map } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockConstituencies } from "../mockData";

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
  const getConstituenciesByPollingStation = () => {
    const constituencies = mockConstituencies[currentLevel];
    const grouped: { [key: string]: typeof constituencies } = {};
    
    constituencies.forEach(constituency => {
      const pollingStation = constituency.pollingStation || "Other";
      if (!grouped[pollingStation]) {
        grouped[pollingStation] = [];
      }
      grouped[pollingStation].push(constituency);
    });
    
    return grouped;
  };

  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Map className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold">Select Your Constituency</h2>
      </div>
      <Select
        value={selectedConstituency || ''}
        onValueChange={onConstituencySelect}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={`Select your ${currentLevel} constituency`} />
        </SelectTrigger>
        <SelectContent className="max-h-[300px]">
          {Object.entries(getConstituenciesByPollingStation()).map(([station, constituencies]) => (
            <SelectGroup key={station}>
              <SelectLabel className="px-2 py-1.5 text-sm font-semibold text-primary">
                {station}
              </SelectLabel>
              {constituencies.map((constituency) => (
                <SelectItem 
                  key={constituency.id} 
                  value={constituency.id}
                  className="px-2 py-1.5 cursor-pointer hover:bg-primary/5"
                >
                  {constituency.name}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default ConstituencySelector;
