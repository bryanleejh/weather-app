// src/WeatherSearch.jsx

"use client";

import { Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function WeatherSearch() {
  const [searchQuery, setSearchQuery] = useState("Singa");

  const searchHistory = [
    { location: "Johor, MY", timestamp: "01-09-2022 09:41am" },
    { location: "Osaka, JP", timestamp: "01-09-2022 09:41am" },
    { location: "Seoul, KR", timestamp: "01-09-2022 09:41am" },
    { location: "Tokusan-ri, KR", timestamp: "01-09-2022 09:41am" },
    { location: "Taipei, TW", timestamp: "01-09-2022 09:41am" },
  ];

  return (
    <div className="min-h-screen bg-[#b197d1] p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white/20 backdrop-blur border-0">
        <CardHeader className="space-y-2">
          <div className="relative">
            <Input
              className="w-full bg-white/20 border-0 placeholder:text-gray-400"
              placeholder="Country"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              size="icon"
              className="absolute right-0 top-0 bg-[#7c4dbd] hover:bg-[#6a3dad]"
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="relative overflow-hidden rounded-lg bg-white/10 p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="text-sm">Today's Weather</div>
                <div className="text-7xl font-light">26°</div>
                <div className="text-sm">H: 29° L: 26°</div>
                <div className="flex gap-4 text-sm mt-4">
                  <div>Johor, MY</div>
                  <div>01-09-2022 09:41am</div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div>Humidity: 58%</div>
                  <div>Clouds</div>
                </div>
              </div>
              <div className="absolute right-4 top-4">
                <div className="relative w-32 h-32">
                  <div className="absolute right-0 top-0 w-16 h-16 bg-yellow-400 rounded-full" />
                  <div className="absolute left-0 bottom-0 w-24 h-24 bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Search History</h3>
            <div className="space-y-2">
              {searchHistory.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-white/10 rounded-lg p-4"
                >
                  <span>{item.location}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.timestamp}</span>
                    <Button size="icon" variant="ghost">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
