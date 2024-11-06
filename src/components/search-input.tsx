import React from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchInputProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: () => void;
  errorMessage: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  errorMessage,
}) => {
  return (
    <div className="flex items-center w-full max-w-2xl">
      <Input
        className="rounded-xl w-full bg-white/20 border-0 placeholder:text-gray-400"
        placeholder="City, Country (e.g. Singapore, SG)"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <Button
        size="icon"
        className="rounded-xl ml-2 bg-[#7c4dbd] hover:bg-[#6a3dad]"
        onClick={onSearch}
      >
        <Search className="h-4 w-4" />
      </Button>
      {errorMessage && <div className="text-red-500">{errorMessage}</div>}
    </div>
  );
};

export default SearchInput;
