import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';

import Layout from './app_components/Layout';
import { ThemeProvider } from './context/theme-provider';
import WeatherDashboard from './pages/weather-dashboard';
import CityPage from './pages/city-page';
import { Toaster } from './components/ui/sonner';
import { Button } from './components/ui/button';
import { MapPin } from 'lucide-react'; // Import MapPin Icon

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'dark');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.documentElement.classList.add(theme);
    localStorage.setItem('theme', theme);

    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [theme]);

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  // Get User Location and Fetch Weather
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          setLocation(userLocation);
          setError(null);
        },
        () => {
          setError('Unable to retrieve location. Please allow location access.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  useEffect(() => {
    handleGetLocation(); // Auto-fetch location when app starts
  }, []);

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-gray-900 text-white">
        <div className="flex flex-col items-center space-y-4">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-gray-300 border-t-transparent"></div>
          <p className="text-lg font-semibold">Loading Weather App...</p>
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme={theme}>
          <Layout>
            {/* Location Button in Top-Right Corner */}
            <div className="absolute top-4 right-4">
              <Button onClick={handleGetLocation} variant="outline" className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Get My Location
              </Button>
            </div>

            <Routes>
              <Route path="/" element={<WeatherDashboard location={location} />} />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>

            {/* Location Error Message */}
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}

            {/* Display Coordinates Below Weather Info */}
            {location && (
              <p className="text-center text-sm text-gray-600 mt-2">
                📍 Your Location: {location.lat.toFixed(2)}, {location.lon.toFixed(2)}
              </p>
            )}
          </Layout>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
