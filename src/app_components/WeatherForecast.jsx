/* eslint-disable react/prop-types */
import { format } from 'date-fns';
import { ArrowDown, ArrowUp, Droplets, Wind } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const WeatherForecast = ({ forecastData }) => {
  const formatTemperature = (temperature) => `${Math.round(temperature)}°`;

  const dailyForecast = forecastData?.list?.reduce((acc, forecast) => {
    const date = format(new Date(forecast.dt * 1000), 'yyyy-MM-dd');

    if (!acc[date]) {
      acc[date] = {
        temp_min: forecast.main.temp_min,
        temp_max: forecast.main.temp_max,
        humidity: forecast.main.humidity,
        wind: forecast.wind.speed,
        weather: forecast.weather[0],
        date: forecast.dt,
      };
    } else {
      acc[date].temp_min = Math.min(acc[date].temp_min, forecast.main.temp_min);
      acc[date].temp_max = Math.max(acc[date].temp_max, forecast.main.temp_max);
    }

    return acc;
  }, {});

  const nextFiveDayForecast = Object.values(dailyForecast).slice(0, 5);

  const getWeatherIcon = (description) => {
    const weatherIcons = {
      "clear sky": "☀️",
      "few clouds": "🌤️",
      "scattered clouds": "⛅",
      "broken clouds": "☁️",
      "shower rain": "🌧️",
      "rain": "🌦️",
      "thunderstorm": "⛈️",
      "snow": "❄️",
      "mist": "🌫️"
    };
    return weatherIcons[description] || "🌍"; // Default icon if not found
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>5 Day Forecast</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          {nextFiveDayForecast.map((forecastDay) => (
            <div
              key={forecastDay.date}
              className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 rounded-lg border p-4"
            >
              {/* Date & Weather */}
              <div className="flex flex-col">
                <p className="font-medium">
                  {format(new Date(forecastDay.date * 1000), 'EEE, MMM d')}
                </p>
                <p className="text-sm text-muted-foreground flex items-center">
                  <span className="text-lg">{getWeatherIcon(forecastDay.weather.description)}</span>
                  <span className="ml-2 capitalize">{forecastDay.weather.description}</span>
                </p>
              </div>

              {/* Temperature */}
              <div className="flex justify-left lg:justify-center gap-4">
                <span className="flex items-center text-blue-500">
                  <ArrowDown className="mr-1 h-4 w-4" />
                  {formatTemperature(forecastDay.temp_min)}
                </span>
                <span className="flex items-center text-red-500">
                  <ArrowUp className="mr-1 h-4 w-4" />
                  {formatTemperature(forecastDay.temp_max)}
                </span>
              </div>

              {/* Humidity & Wind */}
              <div className="flex justify-left lg:justify-end gap-4">
                <span className="flex items-center gap-1">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{forecastDay.humidity}%</span>
                </span>
                <span className="flex items-center gap-1">
                  <Wind className="w-4 h-4 text-blue-500" />
                  <span className="text-sm">{forecastDay.wind}m/s</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherForecast;
