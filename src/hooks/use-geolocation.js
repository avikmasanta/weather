import { useEffect, useState } from "react";


export const useGeoLocation = () => {


    const [ locationData, setLocationData ] = useState({
        coordinates: null,
        error: null,
        isLoading: true
    });


    const getLocation = () => {


        setLocationData((prevData) => ({
            ...prevData,
            isLoading: true, 
            error: null
        }));


        if(!navigator.geolocation) {

            setLocationData({
                coordinates: null,
                error: 'geolocation is not supported by your browser',
                isLoading: false 
            });

            return;

        }


        navigator.geolocation.getCurrentPosition((position) => {

            setLocationData({
                coordinates: {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                },
                error: null,
                isLoading: false
            });

        }, (error) => {

            let errorMessage;

            switch (error.code) {

                case error.PERMISSION_DENIED:
                    
                    errorMessage = "Location permission denied. Please enable location access in your browser settings.";

                    break;

                case error.POSITION_UNAVAILABLE:

                    errorMessage = "Location information is unavailable";

                    break;

                case error.TIMEOUT:

                    errorMessage = "Location request timed out";

                    break;

                default:

                    errorMessage = "An unknown error occuered";

            }


            setLocationData({
                coordinates: null,
                error: errorMessage,
                isLoading: false
            });


        }, {
            enableHighAccuracy: true, 
            timeout: 5000, 
            maximumAge: 0
        });

    };


    useEffect(() => {

        getLocation();

    }, []);


    return {
        ...locationData,
        getLocation 
    }

}