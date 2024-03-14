"use client";

import { useEffect, useState } from "react";
import { MoonIcon } from "../icons";

export default function ToDoHeader() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    console.log(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className="flex items-center justify-between pb-2">
      <h1 className="text-lg font-bold dark:text-gray-100">TODO</h1>
      <MoonIcon
        className="h-6 w-6 text-gray-400 hover:scale-125 hover:cursor-pointer transition-transform duration-300 ease-in-out"
        onClick={() => setIsDarkMode(!isDarkMode)}
      />
    </div>
  );
}
