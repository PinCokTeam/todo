"use client";

import { useTodo } from "@/lib/providers/todo";
import { CircleIcon } from "../ui/icons";
import { Input } from "../ui/input";
import { useState } from "react";

export default function ToDoInput() {
  const { refreshTodoList } = useTodo();

  const [inputValue, setInputValue] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setInputValue("");
      fetch("api/todo", {
        method: "POST",
        body: JSON.stringify({ title: e.currentTarget.value }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          refreshTodoList();
        })
        .catch((error) => {});
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="flex items-center rounded-md border-2 border-gray-200 p-2">
      <CircleIcon className="h-5 w-5 text-gray-400" />
      <Input
        className="text-black ml-2 flex-1 border-none focus:ring-0 focus:outline-none dark:text-white dark:bg-gray-800 dark:placeholder-gray-400"
        placeholder="Create a new todo..."
        type="text"
        onKeyDown={handleKeyDown}
        onChange={handleChange}
        value={inputValue}
      />
    </div>
  );
}
