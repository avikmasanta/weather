// /* eslint-disable react/prop-types */
// import { format } from "date-fns";
// import { Compass, Gauge, Sunrise, Sunset } from "lucide-react";
// import {
//     Card,
//     CardContent,
//     CardHeader,
//     CardTitle,
// } from "@/components/ui/card"
  


// const WeatherDetails = ({ weatherData }) => {


//   const { wind, main, sys } = weatherData;


//   const formatTime = (timeStamp) => {
    
//     return format(new Date(timeStamp * 1000), 'h:mm a');

//   }


//   const getWindDirection = (degree) => {

//     const direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

//     const index = Math.round((( degree % 360 ) < 0 ? degree + 360 : degree ) / 45) % 8;

//     return direction[index];

//   }


//   const details = [
//     {
//         title: "Sunrise",
//         value: formatTime(sys?.sunrise),
//         icon: Sunrise,
//         color: 'text-orange-500'
//     },
//     {
//         title: "Sunset",
//         value: formatTime(sys?.sunset),
//         icon: Sunset,
//         color: 'text-blue-500'
//     },
//     {
//         title: "Wind Direction",
//         value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
//         icon: Compass,
//         color: 'text-green-500'
//     },
//     {
//         title: "Pressure",
//         value: `${main.pressure} hPa`,
//         icon: Gauge,
//         color: 'text-purple-500'
//     },
//   ]

//   return (
//     <Card>

//         <CardHeader>
//             <CardTitle>Weather Details</CardTitle>
//         </CardHeader>

//         <CardContent>
            
//             <div className="grid gap-6 sm:grid-cols-2">

//                 {details.map((detail) => (

//                     <div 
//                         key={detail.title}
//                         className="flex items-center gap-3 rounded-lg border p-4"
//                     >

//                         <detail.icon className={`h-5 w-5 ${detail.color}`} />

//                         <div>

//                             <p className="text-sm font-medium leading-none">{detail.title}</p>

//                             <p className="text-sm text-muted-foreground">{detail.value}</p>

//                         </div>

//                     </div>

//                 ))}

//             </div>

//         </CardContent>

//     </Card>

//   )
// }

// export default WeatherDetails;

/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { 
  Compass, 
  Gauge, 
  Sunrise, 
  Sunset, 
  Wind, 
  Cloud, 
  Droplets, 
  Eye, 
  ThermometerSun, 
  CloudRain 
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

const WeatherDetails = ({ weatherData }) => {
  const { wind, main, sys, coord, visibility, clouds } = weatherData;
  const [airQuality, setAirQuality] = useState(null);

  useEffect(() => {
    if (coord) {
      fetch(
        `https://api.openweathermap.org/data/2.5/air_pollution?lat=${coord.lat}&lon=${coord.lon}&appid=${API_KEY}`
      )
        .then((res) => res.json())
        .then((data) => {
          setAirQuality(data.list[0]?.main.aqi);
        })
        .catch((error) => console.error("Error fetching air quality data:", error));
    }
  }, [coord]);

  const formatTime = (timeStamp) => {
    return format(new Date(timeStamp * 1000), "h:mm a");
  };

  const getWindDirection = (degree) => {
    const direction = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    const index = Math.round(((degree % 360) < 0 ? degree + 360 : degree) / 45) % 8;
    return direction[index];
  };

  const getAQILevel = (aqi) => {
    const levels = ["Good", "Fair", "Moderate", "Poor", "Very Poor"];
    return levels[aqi - 1] || "Unknown";
  };

  const details = [
    {
      title: "Sunrise",
      value: formatTime(sys?.sunrise),
      icon: Sunrise,
      color: "text-orange-500",
    },
    {
      title: "Sunset",
      value: formatTime(sys?.sunset),
      icon: Sunset,
      color: "text-blue-500",
    },
    {
      title: "Wind Speed",
      value: `${wind.speed} m/s`,
      icon: Wind,
      color: "text-blue-500",
    },
    {
      title: "Wind Direction",
      value: `${getWindDirection(wind.deg)} (${wind.deg}°)`,
      icon: Compass,
      color: "text-green-500",
    },
    {
      title: "Pressure",
      value: `${main.pressure} hPa`,
      icon: Gauge,
      color: "text-purple-500",
    },
    {
      title: "Air Quality",
      value: airQuality ? `${getAQILevel(airQuality)} (AQI: ${airQuality})` : "Loading...",
      icon: Cloud,
      color: "text-red-500",
    },
    {
      title: "Humidity",
      value: `${main.humidity}%`,
      icon: Droplets,
      color: "text-blue-400",
    },
    {
      title: "Feels Like",
      value: `${Math.round(main.feels_like)}°C`,
      icon: ThermometerSun,
      color: "text-yellow-500",
    },
    {
      title: "Visibility",
      value: `${visibility / 1000} km`,
      icon: Eye,
      color: "text-gray-500",
    },
    {
      title: "Cloudiness",
      value: `${clouds.all}%`,
      icon: CloudRain,
      color: "text-gray-400",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Weather Details</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {details.map((detail) => (
            <div key={detail.title} className="flex items-center gap-3 rounded-lg border p-4">
              <detail.icon className={`h-5 w-5 ${detail.color}`} />
              <div>
                <p className="text-sm font-medium leading-none">{detail.title}</p>
                <p className="text-sm text-muted-foreground">{detail.value}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherDetails;

