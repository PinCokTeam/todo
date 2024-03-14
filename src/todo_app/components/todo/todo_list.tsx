"use client";

import { useEffect, useState } from "react";
import { useTodo } from "@/lib/providers/todo";
import ToDo from "./todo";

export default function ToDoList() {
  const { todoList, refreshTodoList } = useTodo();

  useEffect(() => {
    refreshTodoList();
  }, [refreshTodoList]);

  return (
    <div className="flex flex-col items-center">
      {todoList.length === 0 ? (
        <p className="text-gray-400">You have no todo items.</p>
      ) : (
        todoList.map((todo) => (
          <ToDo
            key={todo.id}
            id={todo.id}
            title={todo.title}
            choice={todo.choice}
          />
        ))
      )}
    </div>
  );
}
