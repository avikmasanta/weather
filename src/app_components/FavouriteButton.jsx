/* eslint-disable react/prop-types */
import { Star } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
  
import { useFavouriteCity } from "@/hooks/use-favoruite-city";


const FavouriteButton = ({ weatherData }) => {


  const { addToFavCity, isCurrentCityInFavouriteList, removeParticularFav } = useFavouriteCity();

  const isCurrentCityFav = isCurrentCityInFavouriteList(weatherData.coord.lat, weatherData.coord.lon);


  const handleToggleFavCity = () => {

    if(isCurrentCityFav) {

        removeParticularFav.mutate(`${weatherData.coord.lat}-${weatherData.coord.lon}`);

        toast.error(`removed from the favourites`);

    } else {

        addToFavCity.mutate({
            name: weatherData.name,
            lat: weatherData.coord.lat,
            lon: weatherData.coord.lon,
            country: weatherData.sys.country
        });

        toast.success(`added to the favourites`);

    }

  }


  return (

    <TooltipProvider>

        <Tooltip>

            <TooltipTrigger>

                <Button 
                    variant={isCurrentCityFav ? 'default' : 'outline'}
                    size={'icon'}
                    className={isCurrentCityFav ? 'bg-yellow-500 hover:bg-yellow-600' : ''}
                    onClick={handleToggleFavCity}
                >

                    <Star className={`h-4 w-4 ${isCurrentCityFav ? 'fill-current' : ''}`} />

                </Button>

            </TooltipTrigger>

            <TooltipContent>
                <p>{isCurrentCityFav ? 'Remove from Favourites' : 'Add to Favourites'}</p>
            </TooltipContent>

        </Tooltip>

    </TooltipProvider>
  )
}

export default FavouriteButton;