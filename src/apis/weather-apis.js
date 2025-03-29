import { API_CONFIG } from "./api-config";


const createUrl = (endpoint, params) => {


    const searchParams = new URLSearchParams({
        appid: API_CONFIG.API_KEY,
        ...params 
    });

    return `${endpoint}?${searchParams.toString()}`;

}


const fetchData = async (url) => {

    try {

        const response = await fetch(url);

        if(!response?.ok) {

            throw new Error(`Weather API Error: ${response?.statusText}`)
        }

        return response.json();
        
    } catch (error) {
        
        console.log(error);

        return error;

    }

}


export const getCurrentWeather = async ({ lat, lon }) => {

    try {

        const url = createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        });

        console.log(url);


        return fetchData(url);
        
        
    } catch (error) {
        
        console.log(error);

        return error;
        
    }

}


export const getForecast = async ({ lat, lon }) => {

    try {

        const url = createUrl(`${API_CONFIG.BASE_URL}/forecast`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: API_CONFIG.DEFAULT_PARAMS.units
        });


        return fetchData(url);
        
        
    } catch (error) {
        
        console.log(error);

        return error;
        
    }

} 


export const getReverseGeocoding = async ({ lat, lon }) => {

    try {

        const url = createUrl(`${API_CONFIG.BASE_URL}/weather`, {
            lat: lat.toString(),
            lon: lon.toString(),
            units: "metric",
        });


        return fetchData(url);
        
        
    } catch (error) {
        
        console.log(error);

        return error;
        
    }

}


export const searchAboutAnyLocation = async (query) => {

    try {

        const url = createUrl(`${API_CONFIG.GEOCODING_URL}/direct`, {
            q: query,
            limit: "5",
        });


        return fetchData(url);
        
        
    } catch (error) {
        
        console.log(error);

        return error;
        
    }

} 