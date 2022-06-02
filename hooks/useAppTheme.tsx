import { useEffect } from "react";
import { useState } from "react";
import { AppTheme } from "../data-contracts";

export default function useAppTheme() {
  const selectedTheme = localStorage.getItem("theme");
  console.log(selectedTheme);

  useEffect(() => {}, []);

  const [theme, setUserTheme] = useState<AppTheme>(
    (selectedTheme as AppTheme) ?? AppTheme.LIGHT
  );

  const setTheme = (theme: AppTheme) => {
    localStorage.setItem("theme", theme);
    setUserTheme(theme);
  };

  return [theme, setTheme];
}
