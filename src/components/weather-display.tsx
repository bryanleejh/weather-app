import React from "react";

interface WeatherDisplayProps {
  weatherData: {
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
  } | null;
  kelvinToCelsius: (kelvin: number) => number;
}

const WeatherDisplay: React.FC<WeatherDisplayProps> = ({
  weatherData,
  kelvinToCelsius,
}) => {
  return (
    <div className="relative overflow-hidden rounded-lg py-4">
      {weatherData ? (
        <div className="flex justify-between items-start">
          <div className="space-y-2 w-full">
            <div className="text-sm">Today's Weather</div>
            <div className="text-8xl font-bold text-purple-700">
              {kelvinToCelsius(weatherData.main.temp)}°
            </div>
            <div className="text-sm">
              H: {kelvinToCelsius(weatherData.main.temp_max)}° L:{" "}
              {kelvinToCelsius(weatherData.main.temp_min)}°
            </div>
            <div className="flex justify-between text-sm w-full text-gray-500">
              <div className="text-gray-600">{`${weatherData.name}, ${weatherData.sys.country}`}</div>
              <div>{new Date(weatherData.dt * 1000).toLocaleString()}</div>
              <div>Humidity: {weatherData.main.humidity}%</div>
              <div className="capitalize">
                {weatherData.weather[0].description}
              </div>
            </div>
          </div>
          <div className="absolute right-4 top-4">
            <div className="relative w-32 h-32">
              <div className="absolute right-0 top-0 w-16 h-16 bg-yellow-400 rounded-full" />
              <div className="absolute left-0 bottom-0 w-24 h-24 bg-white rounded-full" />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No weather data available. Please search for a location.
        </div>
      )}
    </div>
  );
};

export default WeatherDisplay;
