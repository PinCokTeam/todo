"use client";

import { useTodo } from "@/lib/providers/todo";
import { CircleIcon } from "../icons";
import { Input } from "../input";

export default function ToDoInput() {
  const { refreshTodoList } = useTodo();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
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

  return (
    <div className="flex items-center rounded-md border-2 border-gray-200 p-2">
      <CircleIcon className="h-5 w-5 text-gray-400" />
      <Input
        className="ml-2 flex-1 border-none focus:ring-0 focus:outline-none"
        placeholder="Create a new todo..."
        type="text"
        onKeyDown={handleKeyDown}
      />
    </div>
  );
}
