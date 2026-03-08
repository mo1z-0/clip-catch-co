import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Set dark on mount
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return;








};

export default ThemeToggle;