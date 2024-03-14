"use client";

import { useEffect, useState } from "react";
import { CircleIcon } from "../icons";
import { useTodo } from "@/lib/providers/todo";

export default function ToDoList() {
  const { todoList, refreshTodoList } = useTodo();

  useEffect(() => {
    refreshTodoList(); // Call this function to refresh the list instead of fetching here
  }, [refreshTodoList]);

  return (
    <div className="flex flex-col items-center">
      {todoList.length === 0 ? (
        <p className="text-gray-400">You have no todo items.</p>
      ) : (
        todoList.map((todo) => (
          <div className="flex items-center w-full p-2 gap-4" key={todo.id}>
            <CircleIcon className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer" />
            <p className="text-gray-800">{todo.title}</p>
          </div>
        ))
      )}
    </div>
  );
}
