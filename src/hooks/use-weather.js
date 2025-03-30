import { useQuery } from "@tanstack/react-query"

import { getCurrentWeather, getForecast, getReverseGeocoding, searchAboutAnyLocation } from "@/apis/weather-apis";


export const WEATHER_KEYS = {
    weather: (coords) => ["weather", coords],
    forecast: (coords) => ["forecast", coords],
    location: (coords) => ["location", coords],
    search: (query) => ["location-search", query],
}


export const useWeatherQuery = (coordinates) => {

    return useQuery({
        queryKey: WEATHER_KEYS.weather(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => {
            
            return coordinates ? getCurrentWeather(coordinates) : null;

        },
        enabled: !!coordinates 
    });

}


export const useForecastQuery = (coordinates) => {

    return useQuery({
        queryKey: WEATHER_KEYS.forecast(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => {

            return coordinates ? getForecast(coordinates) : null;

        },
        enabled: !!coordinates 
    });

}


export const useReverseGeocodeQuery = (coordinates) => {

    return useQuery({
        queryKey: WEATHER_KEYS.location(coordinates ?? { lat: 0, lon: 0 }),
        queryFn: () => {

            return coordinates ? getReverseGeocoding(coordinates) : null;

        },
        enabled: !!coordinates 
    });

}


export const useGetInfoAboutAnyLocationQuery = (query) => {

    return useQuery({
        queryKey: WEATHER_KEYS.search(query),
        queryFn: () => {

            return searchAboutAnyLocation(query);

        },
        enabled: query.length >= 3 
    });

}


