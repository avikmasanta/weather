import { Moon, Sun, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/theme-provider";
import CitySearch from "./CitySearch";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const isCurrentThemeDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur py-2">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <MapPin className="h-8 w-8 text-primary" />
          <span className="text-lg font-semibold">Klimate</span>
        </Link>

        <div className="flex items-center gap-4">
          <CitySearch />
          <div
            className="cursor-pointer transition-transform duration-500"
            onClick={() => setTheme(isCurrentThemeDark ? "light" : "dark")}
          >
            {isCurrentThemeDark ? (
              <Sun className="h-6 w-6 text-yellow-500" />
            ) : (
              <Moon className="h-6 w-6 text-blue-500" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
