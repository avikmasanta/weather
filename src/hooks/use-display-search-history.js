import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useLocalStorage } from "./use-search-history-store-in-local-storage";


export const useSearchHistory = () => {


    const [ storedValue, setStoredValue ] = useLocalStorage("search-history", []); 


    const queryClient = useQueryClient();
    

    const historyQuery = useQuery({
        queryKey: ['search-history'],
        queryFn: () => storedValue,
        initialData: storedValue
    });


    const addToHistoryMutation = useMutation({

        mutationFn: async (searchedLocation) => {

            const newSearch = {
                ...searchedLocation,
                id: `${searchedLocation.lat}-${searchedLocation.lon}-${Date.now()}`,
                searchedAt: Date.now()
            }


            const filteredHistory = storedValue.filter((item) => {

                return !(item.lat === newSearch.lat && item.lon === newSearch.lon);

            });



            const firstTenSearchedLocationHistory = [newSearch, ...filteredHistory].slice(0, 10);


            setStoredValue(firstTenSearchedLocationHistory);


            return firstTenSearchedLocationHistory;

        },
        onSuccess: (newTopTenHistory) => {

            queryClient.setQueryData(['search-history'], newTopTenHistory);

        }
    });


    const clearSearchHistoryMutation = useMutation({

        mutationFn: async () => {

            setStoredValue([]);

            return [];

        },
        onSuccess: () => {

            queryClient.setQueryData(['search-history'], []);

        }

    });


    return {
        searchHistory: historyQuery.data ?? [],
        addToHistory: addToHistoryMutation,
        clearHistory: clearSearchHistoryMutation
    }

}