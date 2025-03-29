import { AlertTriangle, RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGeoLocation } from "@/hooks/use-geolocation";
import LoadingSkeleton from "@/app_components/LoadingSkeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useForecastQuery, useReverseGeocodeQuery, useWeatherQuery } from "@/hooks/use-weather";
import CurrentWeather from "@/app_components/CurrentWeather";
import HourlyTemperature from "@/app_components/HourlyTemperature";
import WeatherDetails from "@/app_components/WeatherDetails";
import WeatherForecast from "@/app_components/WeatherForecast";
import FavCity from "@/app_components/FavCity";



const WeatherDashboard = () => {


  const { 
    coordinates, 
    error: locationError, 
    getLocation, 
    isLoading: isLocationLoading
  } = useGeoLocation();


  const weatherQuery = useWeatherQuery(coordinates);

  const forecastQuery = useForecastQuery(coordinates);

  const locationQuery = useReverseGeocodeQuery(coordinates);


  const handleRefreshLocation = () => {


    getLocation();


    if (coordinates) {

      weatherQuery.refetch(); 

      forecastQuery.refetch();

      locationQuery.refetch();

    }

  };


  if (isLocationLoading) {

    return <LoadingSkeleton />

  }


  if (locationError) {

    return <Alert variant='destructive'>
        
        <AlertTriangle className="w-4 h-4" />

        <AlertTitle>location Error</AlertTitle>

        <AlertDescription className='flex flex-col gap-4'>
          
          <p>{locationError}</p>

        </AlertDescription>
        
      </Alert>

  }


  const locationName = locationQuery.data;


  if(weatherQuery.error || forecastQuery.error) {

    return <Alert variant='destructive'>
        
        <AlertTriangle className="w-4 h-4" />

        <AlertTitle>Error</AlertTitle>

        <AlertDescription className='flex flex-col gap-4'>
          
          <p>Failed to fetch weather data. Please try again.</p>

        </AlertDescription>
        
      </Alert>

  }


  if (!weatherQuery.data || !forecastQuery.data) {

    return <LoadingSkeleton />

  }

  
  return (
    <div className="space-y-4">

      <FavCity />

      <div className="flex items-center justify-between">

        <h1 className="text-xl font-bold tracking-light">My Location</h1>

        <Button 
          variant='outline' 
          size='icon' 
          onClick={handleRefreshLocation}
          disabled={weatherQuery.isFetching || forecastQuery.isFetching}
        >

          <RefreshCw className={`w-4 h-4 ${weatherQuery.isFetching ? 'animate-spin' : ''}`} />

        </Button>

      </div>

      
      <div className="grid gap-6">

        <div className="flex flex-col lg:flex-row gap-4">

          <CurrentWeather 
            weatherData={weatherQuery.data} 
            locationName={locationName}
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

export default WeatherDashboard;