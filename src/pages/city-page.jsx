import { useParams, useSearchParams } from "react-router-dom";
import { AlertTriangle } from "lucide-react";

import { useForecastQuery, useWeatherQuery } from "@/hooks/use-weather";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import LoadingSkeleton from "@/app_components/LoadingSkeleton";
import CurrentWeather from "@/app_components/CurrentWeather";
import HourlyTemperature from "@/app_components/HourlyTemperature";
import WeatherDetails from "@/app_components/WeatherDetails";
import WeatherForecast from "@/app_components/WeatherForecast";
import FavouriteButton from "@/app_components/FavouriteButton";


const CityPage = () => {


  const [ searchParams ] = useSearchParams();

  const params = useParams();


  const latitude = parseFloat(searchParams.get('lat') || '0');

  const longitude = parseFloat(searchParams.get('lon') || '0');


  const coordinates = {
    lat: latitude,
    lon: longitude
  }


  const weatherQuery = useWeatherQuery(coordinates);

  const forecastQuery = useForecastQuery(coordinates);


  if(weatherQuery.error || forecastQuery.error) {

    return <Alert variant='destructive'>
        
        <AlertTriangle className="w-4 h-4" />

        <AlertTitle>Error</AlertTitle>

        <AlertDescription className='flex flex-col gap-4'>
          
          <p>Failed to fetch weather data. Please try again.</p>

        </AlertDescription>
        
      </Alert>

  }


  if (!weatherQuery.data || !forecastQuery.data || !params.cityName) {

    return <LoadingSkeleton />

  }


  return (
    <div className="space-y-4">
      
      <div>

        {/* favourite button */}
        <FavouriteButton weatherData={{...weatherQuery.data, cityName: params.cityName }} />
        
      </div>

      <div className="grid gap-6">

        <div className="flex flex-col gap-4">

          <CurrentWeather 
            weatherData={weatherQuery.data} 
            locationName={`${params.cityName}, ${weatherQuery.data.sys.country}`}
          />

          <HourlyTemperature 
            forecastData={forecastQuery.data}
          />

        </div>

        <div className="grid gap-6 md:grid-cols-2 items-start">

          <WeatherDetails
            weatherData={weatherQuery.data}
          />

          <WeatherForecast 
            forecastData={forecastQuery.data}
          />

        </div>

      </div>

    </div>
  )
}

export default CityPage;