import { useEffect, useState } from "react";


export const useLocalStorage = (key, initialValue) => {


    const [ storedValue, setStoredValue ] = useState(() => {

        try {

            const itemFromLocalStorage = window.localStorage.getItem(key);

            return itemFromLocalStorage ? JSON.parse(itemFromLocalStorage) : initialValue;
            
        } catch (error) {
            
            console.log(error);

            return initialValue;
            
        }

    });


    useEffect(() => {

        try {

            window.localStorage.setItem(key, JSON.stringify(storedValue));
            
        } catch (error) {
            
            console.log(error);

            return initialValue;

        }

    }, [key, storedValue]);


    return [ storedValue, setStoredValue ];

}