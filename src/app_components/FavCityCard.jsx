/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import { Loader2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useWeatherQuery } from "@/hooks/use-weather";
import { toast } from "sonner";


const FavCityCard = ({ id, name, lat, lon, onRemoveFav }) => {

  const navigate = useNavigate();

  const { data: weatherData, isLoading: isLoadingWeatherData } = useWeatherQuery({ lat, lon });

  return (
    <div 
        onClick={() => navigate(`/city/${name}?lat=${lat}&lon=${lon}`)}
        role="button"
        tabIndex={0}
        className="relative flex min-w-[250px] cursor-pointer items-center gap-3 rounded-lg border bg-card p-4 pr-8 shadow-sm transition-all hover:shadow-md"
    >

        <Button 
            variant='ghost'
            className="absolute right-2 top-2 h-6 w-6 rounded-full p-0 hover:text-destructive-foreground group-hover:opacity-100"
            onClick={(e) => {

                e.stopPropagation(); 

                onRemoveFav(id);

                toast.error(`removed from the favourites`);

            }}
        >

            <X className="w-4 h-4" />

        </Button>

        { isLoadingWeatherData ? (

            <div className="flex h-8 items-center justify-center">

                <Loader2 className="h-4 w-4 animate-spin" />

            </div>

        ) : weatherData ? <>

            <div className="flex items-center gap-2 mt-3">

                <img 
                    src={`https://openweathermap.org/img/wn/${weatherData?.weather[0]?.icon}@4x.png`} 
                    alt={weatherData?.weather[0]?.description}
                    className="h-8 w-8"
                />

                <div>

                    <p className="font-medium">{name}</p>

                    <p className="text-xs text-muted-foreground">{weatherData?.sys?.country}</p>
                    
                </div>

            </div>
            
            <div className="ml-auto text-right">

                <p className="text-xl font-bold">
                    {Math.round(weatherData?.main?.temp)}°
                </p>

                <p className="text-xs capitalize text-muted-foreground">
                    {weatherData?.weather[0]?.description}
                </p>

            </div>

        </> : null }

    </div>
  )
}

export default FavCityCard;