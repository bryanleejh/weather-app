import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import SearchInput from "./search-input";
import WeatherDisplay from "./weather-display";
import SearchHistory from "./search-history";

interface SearchHistoryItem {
  location: string;
  timestamp: string;
}

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
  const [searchHistory, setSearchHistory] = useState<SearchHistoryItem[]>([]);
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
      const geocodingAPI = `https://api.openweathermap.org/geo/1.0/direct?q=${city},${country}&limit=1&appid=${API_KEY}`;
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

      console.log("weatherData", weatherData);
      setWeatherData(weatherData);
      setErrorMessage("");

      // Update search history
      const newEntry = {
        location: `${city}, ${country}`,
        timestamp: new Date().toLocaleString(),
      };
      setSearchHistory((prevHistory: SearchHistoryItem[]) => [
        ...prevHistory,
        newEntry,
      ]);
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
    setSearchHistory((prevHistory: SearchHistoryItem[]) =>
      prevHistory.filter(
        (entry) => entry.location !== location || entry.timestamp !== timestamp
      )
    );
  };

  return (
    <div className="min-h-screen bg-[#b197d1] p-4 flex flex-col items-center justify-center">
      <SearchInput
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={() => fetchWeatherData(searchQuery)}
        errorMessage={errorMessage}
      />
      <Card className="w-full max-w-2xl bg-white/20 backdrop-blur border-0 mt-6">
        <CardContent>
          <WeatherDisplay
            weatherData={weatherData}
            kelvinToCelsius={kelvinToCelsius}
          />
          <SearchHistory
            searchHistory={searchHistory}
            fetchWeatherData={fetchWeatherData}
            deleteHistoryEntry={deleteHistoryEntry}
          />
        </CardContent>
      </Card>
    </div>
  );
}
