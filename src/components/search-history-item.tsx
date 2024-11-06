import React from "react";
import { Button } from "@/components/ui/button";
import { Search, Trash2 } from "lucide-react";

interface SearchHistoryItemProps {
  item: {
    location: string;
    timestamp: string;
  };
  fetchWeatherData: (location: string) => void;
  deleteHistoryEntry: (location: string, timestamp: string) => void;
}

const SearchHistoryItem: React.FC<SearchHistoryItemProps> = ({
  item,
  fetchWeatherData,
  deleteHistoryEntry,
}) => {
  return (
    <div className="rounded-lg flex items-center justify-between bg-white/20 p-4">
      <span>{item.location}</span>
      <div className="flex items-center gap-2">
        <span className="text-sm">{item.timestamp}</span>
        <Button
          size="icon"
          className="bg-white rounded-full"
          variant="ghost"
          onClick={() => fetchWeatherData(item.location)}
        >
          <Search className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          className="bg-white rounded-full"
          variant="ghost"
          onClick={() => deleteHistoryEntry(item.location, item.timestamp)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default SearchHistoryItem;
