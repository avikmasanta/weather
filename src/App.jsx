// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// import Layout from './app_components/Layout';
// import { ThemeProvider } from './context/theme-provider';
// import WeatherDashboard from './pages/weather-dashboard';
// import CityPage from './pages/city-page';
// import { Toaster } from './components/ui/sonner';


// const App = () => {


//   const queryClient = new QueryClient({
//     defaultOptions: {
//       queries: {
//         staleTime: 5 * 60 * 1000, 
//         gcTime: 10 * 60 * 1000, 
//         retry: false,
//         refetchOnWindowFocus: false
//       }
//     }
//   });


//   return (
//     <QueryClientProvider client={queryClient}>


//       <BrowserRouter>

//         <ThemeProvider defaultTheme="dark">

//           <Layout>

//             <Routes>

//               <Route path="/" element={<WeatherDashboard />} />

//               <Route path="/city/:cityName" element={<CityPage />} />

//             </Routes>
            
//           </Layout>

//           <Toaster richColors />

//         </ThemeProvider>

//       </BrowserRouter>

//       <ReactQueryDevtools initialIsOpen={false} />
      
//     </QueryClientProvider>
//   );

// };

// export default App;
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useEffect, useState } from 'react';

import Layout from './app_components/Layout';
import { ThemeProvider } from './context/theme-provider';
import WeatherDashboard from './pages/weather-dashboard';
import CityPage from './pages/city-page';
import { Toaster } from './components/ui/sonner';
import { Skeleton } from './components/ui/skeleton';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'dark'; // Default to dark mode
  });

  useEffect(() => {
    document.documentElement.classList.add(theme); // Apply dark mode instantly
    localStorage.setItem('theme', theme);

    const timer = setTimeout(() => setIsLoading(false), 1500); // Simulated load time
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
            <Routes>
              <Route path="/" element={<WeatherDashboard />} />
              <Route path="/city/:cityName" element={<CityPage />} />
            </Routes>
          </Layout>
          <Toaster richColors />
        </ThemeProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default App;
