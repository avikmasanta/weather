import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useLocalStorage } from "./use-search-history-store-in-local-storage";


export const useFavouriteCity = () => {


    const [ storedValue, setStoredValue ] = useLocalStorage("favourite-cities", []); 


    const queryClient = useQueryClient();
    

    const favouriteCityQuery = useQuery({
        queryKey: ['favourite-cities'],
        queryFn: () => storedValue,
        initialData: storedValue,
        staleTime: Infinity 
    });


    const addToFavouriteMutation = useMutation({

        mutationFn: async (favouriteCity) => {

            const newAddedFavouriteCity = {
                ...favouriteCity,
                id: `${favouriteCity.lat}-${favouriteCity.lon}`,
                addedAt: Date.now()
            }


            const cityAlreadyExists = storedValue.some((fav) => fav.id === newAddedFavouriteCity.id);

            if(cityAlreadyExists) {

                return storedValue

            }


            const latestTenFavCities = [newAddedFavouriteCity, ...storedValue].slice(0, 5);


            setStoredValue(latestTenFavCities);


            return latestTenFavCities;

        },
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['favourite-cities']
            });

        }
    });


    const removeSingleFavouriteCity = useMutation({

        mutationFn: async (cityId) => {

            const favCityListAfterRemovingTargetCity = storedValue.filter((city) => city.id !== cityId);

            setStoredValue(favCityListAfterRemovingTargetCity);

            return favCityListAfterRemovingTargetCity;

        },
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['favourite-cities']
            });

        }

    });


    const clearAllFavourites = useMutation({

        mutationFn: async () => {

            setStoredValue([]);

            return [];

        },
        onSuccess: () => {

            queryClient.invalidateQueries({
                queryKey: ['favourite-cities']
            });

        }

    });


    return {
        favCities: favouriteCityQuery.data ?? [],
        addToFavCity: addToFavouriteMutation,
        removeParticularFav: removeSingleFavouriteCity,
        removeAllFavCities: clearAllFavourites,
        isCurrentCityInFavouriteList: (lat, lon) => {
            
            return storedValue.some((city) => city.lat === lat && city.lon === lon);

        }
    }

}