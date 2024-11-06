import React from "react";
import SearchHistoryItem from "./search-history-item"; // Import the SearchHistoryItem component

interface SearchHistoryProps {
  searchHistory: {
    location: string;
    timestamp: string;
  }[];
  fetchWeatherData: (location: string) => void;
  deleteHistoryEntry: (location: string, timestamp: string) => void;
}

const SearchHistory: React.FC<SearchHistoryProps> = ({
  searchHistory,
  fetchWeatherData,
  deleteHistoryEntry,
}) => {
  return (
    <div className="rounded-lg relative overflow-hidden bg-white/10 p-6">
      <h3 className="text-lg font-medium">Search History</h3>
      <div className="space-y-2">
        {searchHistory.map((item) => (
          <SearchHistoryItem
            key={`${item.location}${item.timestamp}`}
            item={item}
            fetchWeatherData={fetchWeatherData}
            deleteHistoryEntry={deleteHistoryEntry}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchHistory;
