// import { Clock, Loader2, Search, Star, XCircle } from 'lucide-react';
// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { format } from 'date-fns';

// import { Button } from '@/components/ui/button';
// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
//   CommandSeparator,
// } from '@/components/ui/command';
// import { useGetInfoAboutAnyLocationQuery } from '@/hooks/use-weather';
// import { useSearchHistory } from '@/hooks/use-display-search-history';
// import { useFavouriteCity } from '@/hooks/use-favoruite-city';


// const CitySearch = () => {


//   const [ openSearchPopup, setSearchOpenPopup ] = useState(false);

//   const [ query, setQuery ] = useState('');

//   const navigate = useNavigate();


//   const { data: allFetchedLocations, isLoading } = useGetInfoAboutAnyLocationQuery(query);

//   const { searchHistory, addToHistory, clearHistory } = useSearchHistory();


//   const handleSelectCity = (cityData) => {

//     const [ lat, lon, name, country ] = cityData.split('|');

//     addToHistory.mutate({
//       query,
//       name,
//       lat: parseFloat(lat),
//       lon: parseFloat(lon),
//       country
//     });
    

//     setSearchOpenPopup(false);

//     navigate(`/city/${name}?lat=${lat}&lon=${lon}`);

//   }


//   const { favCities, removeAllFavCities } = useFavouriteCity();


//   return <>

//     <Button 
//         variant='outline'
//         onClick={() => setSearchOpenPopup(true)} 
//         className='relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64'
//     >

//         <Search className='mr-2 w-4 h-4' />

//         <span>Search Cities...</span>

//     </Button>

//     <CommandDialog open={openSearchPopup} onOpenChange={setSearchOpenPopup}>

//         <CommandInput 
//           placeholder="type a command or search..."
//           value={query}
//           onValueChange={setQuery}
//         />

//         <CommandList>

//             {query.length > 2 && !isLoading && <CommandEmpty>No cities found.</CommandEmpty>}


//             {favCities.length > 0 && (

//               <>

//                 <CommandSeparator />

//                 <CommandGroup>
                  
//                   <div className='flex items-center justify-between px-2 my-2'>

//                     <p className='text-xs text-muted-foreground'>Favourites</p>

//                     <Button variant='ghost' size='sm' onClick={() => removeAllFavCities.mutate()}>

//                       <XCircle className='h-4 w-4' />

//                       Clear all Favs

//                     </Button>

//                   </div>


//                   {favCities.map((favCity) => {

//                     return (
//                       <CommandItem 
//                         key={favCity.id}
//                         value={`${favCity.lat}|${favCity.lon}|${favCity.name}|${favCity.country}`}
//                         onSelect={handleSelectCity}
//                       >
                        
//                         <Star className='mr-2 w-4 h-4 text-yellow-500' />
                        
//                         <span>{ favCity.name }</span>

//                         {history.state && (
//                           <span className='text-sm text-muted-foreground'>{favCity.state}</span>
//                         )}

//                         <span className="text-sm text-muted-foreground">
//                           , {favCity.country}
//                         </span>

//                       </CommandItem>
//                     )

//                   })}

//                 </CommandGroup>

//               </>

//             )}


//             {searchHistory.length > 0 && (

//               <>

//                 <CommandSeparator />

//                 <CommandGroup>
                   
//                   <div className='flex items-center justify-between px-2 my-2'>

//                     <p className='text-xs text-muted-foreground'>Recent Searches</p>

//                     <Button variant='ghost' size='sm' onClick={() => clearHistory.mutate()}>

//                       <XCircle className='h-4 w-4' />

//                       Clear all Searches

//                     </Button>

//                   </div>


//                   {searchHistory.map((history) => {

//                     return (
//                       <CommandItem 
//                         key={`${history.lat}-${history.lon}`}
//                         value={`${history.lat}|${history.lon}|${history.name}|${history.country}`}
//                         onSelect={handleSelectCity}
//                       >
                        
//                         <Clock className='mr-2 w-4 h-4 text-muted-foreground' />
                        
//                         <span>{ history.name }</span>

//                         {history.state && (
//                           <span className='text-sm text-muted-foreground'>{history.state}</span>
//                         )}

//                         <span className="text-sm text-muted-foreground">
//                           , {history.country}
//                         </span>

//                         <span className='ml-auto text-xs text-muted-foreground'>
//                           {format(history.searchedAt, 'MMM d, h:mm a')}
//                         </span>

//                       </CommandItem>
//                     )

//                   })}

//                 </CommandGroup>

//               </>

//             )}


//             <CommandSeparator />


//             {allFetchedLocations && allFetchedLocations.length > 0 && (

//               <CommandGroup heading="Suggestions">

//                 {isLoading && (
                  
//                   <div className="flex items-center justify-center p-4">

//                     <Loader2 className='h-4 w-4 animate-spin' />

//                   </div>

//                 )}

//                 {allFetchedLocations.map((location) => (

//                   <CommandItem 
//                     key={`${location.lat}-${location.lon}`}
//                     value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
//                     onSelect={handleSelectCity}
//                   >
                    
//                     <Search className='mr-2 w-4 h-4' />
                    
//                     <span>{ location.name }</span>

//                     {location.state && (
//                       <span className='text-sm text-muted-foreground'>{location.state}</span>
//                     )}

//                     <span className="text-sm text-muted-foreground">
//                       , {location.country}
//                     </span>

//                   </CommandItem>

//                 ))}

//               </CommandGroup>

//             )}


//         </CommandList>

//     </CommandDialog>

//   </>
// };


// export default CitySearch;

import { Clock, Loader2, Search, Star, XCircle } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';

import { useGetInfoAboutAnyLocationQuery } from '@/hooks/use-weather';
import { useSearchHistory } from '@/hooks/use-display-search-history';
import { useFavouriteCity } from '@/hooks/use-favoruite-city';

const CitySearch = () => {
  const [openSearchPopup, setSearchOpenPopup] = useState(false);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const navigate = useNavigate();

  // Debounce Effect: Updates debouncedQuery only after the user stops typing for 500ms
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // 500ms delay

    return () => clearTimeout(handler); // Cleanup previous timer
  }, [query]);

  // Fetch data using debounced query
  const { data: allFetchedLocations, isLoading } = useGetInfoAboutAnyLocationQuery(debouncedQuery);
  const { searchHistory, addToHistory, clearHistory } = useSearchHistory();
  const { favCities, removeAllFavCities } = useFavouriteCity();

  const handleSelectCity = (cityData) => {
    const [lat, lon, name, country] = cityData.split('|');

    addToHistory.mutate({
      query,
      name,
      lat: parseFloat(lat),
      lon: parseFloat(lon),
      country,
    });

    setSearchOpenPopup(false);
    navigate(`/city/${name}?lat=${lat}&lon=${lon}`);
  };

  return (
    <>
      <Button
        variant="outline"
        onClick={() => setSearchOpenPopup(true)}
        className="relative w-full justify-start text-sm text-muted-foreground sm:pr-12 md:w-40 lg:w-64"
      >
        <Search className="mr-2 w-4 h-4" />
        <span>Search Cities...</span>
      </Button>

      <CommandDialog open={openSearchPopup} onOpenChange={setSearchOpenPopup}>
        <CommandInput
          placeholder="Type a city name..."
          value={query}
          onValueChange={setQuery}
        />

        <CommandList>
          {query.length > 0 && debouncedQuery.length === 0 && (
            <p className="text-sm text-gray-500 text-center p-4 animate-pulse">
              Waiting for input...
            </p>
          )}

          {debouncedQuery.length > 2 && !isLoading && <CommandEmpty>No cities found.</CommandEmpty>}

          {isLoading && (
            <div className="flex flex-col items-center justify-center p-6">
              {/* Spinning Circle Loader */}
              <div className="relative">
                <div className="w-12 h-12 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

                {/* Three Pulsing Dots */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="h-2 w-2 bg-blue-500 rounded-full animate-ping mx-1"></span>
                  <span className="h-2 w-2 bg-blue-500 rounded-full animate-ping mx-1 delay-200"></span>
                  <span className="h-2 w-2 bg-blue-500 rounded-full animate-ping mx-1 delay-400"></span>
                </div>
              </div>

              <p className="mt-3 text-sm text-gray-500 animate-pulse">Fetching cities...</p>
            </div>
          )}

          {favCities.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground">Favourites</p>
                  <Button variant="ghost" size="sm" onClick={() => removeAllFavCities.mutate()}>
                    <XCircle className="h-4 w-4" />
                    Clear all Favs
                  </Button>
                </div>

                {favCities.map((favCity) => (
                  <CommandItem
                    key={favCity.id}
                    value={`${favCity.lat}|${favCity.lon}|${favCity.name}|${favCity.country}`}
                    onSelect={handleSelectCity}
                  >
                    <Star className="mr-2 w-4 h-4 text-yellow-500" />
                    <span>{favCity.name}</span>
                    {favCity.state && (
                      <span className="text-sm text-muted-foreground">{favCity.state}</span>
                    )}
                    <span className="text-sm text-muted-foreground">, {favCity.country}</span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          {searchHistory.length > 0 && (
            <>
              <CommandSeparator />
              <CommandGroup>
                <div className="flex items-center justify-between px-2 my-2">
                  <p className="text-xs text-muted-foreground">Recent Searches</p>
                  <Button variant="ghost" size="sm" onClick={() => clearHistory.mutate()}>
                    <XCircle className="h-4 w-4" />
                    Clear all Searches
                  </Button>
                </div>

                {searchHistory.map((history) => (
                  <CommandItem
                    key={`${history.lat}-${history.lon}`}
                    value={`${history.lat}|${history.lon}|${history.name}|${history.country}`}
                    onSelect={handleSelectCity}
                  >
                    <Clock className="mr-2 w-4 h-4 text-muted-foreground" />
                    <span>{history.name}</span>
                    {history.state && (
                      <span className="text-sm text-muted-foreground">{history.state}</span>
                    )}
                    <span className="text-sm text-muted-foreground">, {history.country}</span>
                    <span className="ml-auto text-xs text-muted-foreground">
                      {format(history.searchedAt, 'MMM d, h:mm a')}
                    </span>
                  </CommandItem>
                ))}
              </CommandGroup>
            </>
          )}

          <CommandSeparator />

          {allFetchedLocations && allFetchedLocations.length > 0 && (
            <CommandGroup heading="Suggestions">
              {allFetchedLocations.map((location) => (
                <CommandItem
                  key={`${location.lat}-${location.lon}`}
                  value={`${location.lat}|${location.lon}|${location.name}|${location.country}`}
                  onSelect={handleSelectCity}
                >
                  <Search className="mr-2 w-4 h-4" />
                  <span>{location.name}</span>
                  {location.state && (
                    <span className="text-sm text-muted-foreground">{location.state}</span>
                  )}
                  <span className="text-sm text-muted-foreground">, {location.country}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          )}
        </CommandList>
      </CommandDialog>
    </>
  );
};

export default CitySearch;
