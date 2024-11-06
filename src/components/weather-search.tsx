"use client";

import { Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SearchInput from "./search-input";
import WeatherDisplay from "./weather-display";

export default function WeatherSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState<{
    name: string;
    main: {
      temp: number;
      humidity: number;
      temp_max: number;
      temp_min: number;
    };
    sys: {
      country: string;
    };
    dt: number;
    weather: {
      description: string;
    }[];
  } | null>(null);
  const [searchHistory, setSearchHistory] = useState<
    {
      location: string;
      timestamp: string;
    }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const kelvinToCelsius = (kelvin: number) => {
    return Math.floor(kelvin - 273.15);
  };

  const fetchWeatherData = async (location: string) => {
    const [city, country] = location.split(",").map((item) => item.trim());

    if (!city || !country) {
      setErrorMessage("Please enter a valid city and country.");
      return;
    }

    try {
      const geocodingAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${API_KEY}`;
      const geoResponse = await fetch(geocodingAPI);

      if (!geoResponse.ok) {
        throw new Error("Geocoding API call failed");
      }

      const geoData = await geoResponse.json();
      if (geoData.length === 0) {
        throw new Error("Location not found");
      }

      const { lat, lon } = geoData[0];

      const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
      const weatherResponse = await fetch(weatherAPI);

      if (!weatherResponse.ok) {
        throw new Error("Weather API call failed");
      }

      const weatherData = await weatherResponse.json();
      setWeatherData(weatherData);
      setErrorMessage("");

      // Update search history
      const newEntry = {
        location: `${city}, ${country}`,
        timestamp: new Date().toLocaleString(),
      };
      setSearchHistory((prevHistory) => [...prevHistory, newEntry]);
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("An unexpected error occurred.");
      }
      setWeatherData(null);
    }
  };

  const deleteHistoryEntry = (location: string, timestamp: string) => {
    setSearchHistory((prevHistory) =>
      prevHistory.filter(
        (entry) => entry.location !== location || entry.timestamp !== timestamp
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#b197d1] p-4 flex items-center justify-center">
      <Card className="w-full max-w-2xl bg-white/20 backdrop-blur border-0">
        <CardHeader className="space-y-2">
          <SearchInput
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={() => fetchWeatherData(searchQuery)}
            errorMessage={errorMessage}
          />
        </CardHeader>
        <CardContent className="space-y-6">
          <WeatherDisplay
            weatherData={weatherData}
            kelvinToCelsius={kelvinToCelsius}
          />

          <div className="space-y-2">
            <h3 className="text-lg font-medium">Search History</h3>
            <div className="space-y-2">
              {searchHistory.map((item) => (
                <div
                  key={`${item.location}${item.timestamp}`}
                  className="flex items-center justify-between bg-white/10 rounded-lg p-4"
                >
                  <span>{item.location}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{item.timestamp}</span>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => fetchWeatherData(item.location)}
                    >
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        deleteHistoryEntry(item.location, item.timestamp)
                      }
                    >
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
