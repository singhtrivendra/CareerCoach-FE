
import { useState, useEffect } from "react";
import { Sun, Moon, Monitor, Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type Theme = "light" | "dark" | "system" | "green" | "blue";

export default function ThemeSelector() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;
    if (savedTheme) {
      setTheme(savedTheme);
      applyTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      applyTheme("dark");
    }
  }, []);

  const applyTheme = (newTheme: Theme) => {
    // Remove all theme classes
    document.documentElement.classList.remove(
      "dark", "theme-green", "theme-blue"
    );
    
    // Apply the appropriate theme
    switch(newTheme) {
      case "dark":
        document.documentElement.classList.add("dark");
        break;
      case "green":
        document.documentElement.classList.add("theme-green");
        break;
      case "blue":
        document.documentElement.classList.add("theme-blue");
        break;
      case "system":
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          document.documentElement.classList.add("dark");
        }
        break;
      // Light theme uses default styles
    }
  };

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    applyTheme(newTheme);
  };

  return (
    <div className="flex items-center">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            {theme === "light" && <Sun className="h-5 w-5" />}
            {theme === "dark" && <Moon className="h-5 w-5" />}
            {theme === "system" && <Monitor className="h-5 w-5" />}
            {(theme === "green" || theme === "blue") && <Palette className="h-5 w-5" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <div className="p-2">
            <p className="text-sm font-medium mb-2">Select Theme</p>
            <ToggleGroup type="single" value={theme} onValueChange={(value) => value && handleThemeChange(value as Theme)}>
              <ToggleGroupItem value="light" aria-label="Light mode">
                <Sun className="h-4 w-4 mr-2" />
                Light
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" aria-label="Dark mode">
                <Moon className="h-4 w-4 mr-2" />
                Dark
              </ToggleGroupItem>
              <ToggleGroupItem value="system" aria-label="System theme">
                <Monitor className="h-4 w-4 mr-2" />
                System
              </ToggleGroupItem>
              <ToggleGroupItem value="green" aria-label="Green theme">
                <Palette className="h-4 w-4 mr-2" />
                Green
              </ToggleGroupItem>
              <ToggleGroupItem value="blue" aria-label="Blue theme">
                <Palette className="h-4 w-4 mr-2" />
                Blue
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
