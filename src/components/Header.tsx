
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navigationItems = [
    { name: "Home", path: "/" },
    { name: "Interview Simulator", path: "/interview" },
    { name: "Skills Analysis", path: "/skills" },
    { name: "Market Trends", path: "/market-trends" },
    { name: "Course Recommendations", path: "/courses" },
    { name: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300 ease-in-out px-4 md:px-8 py-4",
        isScrolled 
          ? "glass dark:glass-dark shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          to="/" 
          className="flex items-center space-x-2 text-xl font-medium animate-hover"
        >
          <span className="text-gradient font-bold">CareerCoach</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 mx-auto">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "text-sm font-medium transition-all relative py-2 animate-hover",
                isActive(item.path)
                  ? "text-green-600 dark:text-green-400"
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {item.name}
              {isActive(item.path) && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600 dark:bg-green-400 rounded-full animate-fade-in" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center mr-64">
          <ThemeToggle />
          
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-foreground p-1"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 animate-fade-in" />
            ) : (
              <Menu className="h-6 w-6 animate-fade-in" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass dark:glass-dark mt-2 rounded-xl p-4 animate-scale-in">
          <nav className="flex flex-col space-y-3">
            {navigationItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "text-sm font-medium p-2 rounded-lg transition-all",
                  isActive(item.path)
                    ? "bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400"
                    : "text-foreground/80 hover:bg-secondary hover:text-foreground"
                )}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/skills" onClick={() => setIsMobileMenuOpen(false)}>
              <button className="w-full mt-1 text-white bg-green-600 hover:bg-green-700 rounded-md py-2 px-4">Get Started</button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
