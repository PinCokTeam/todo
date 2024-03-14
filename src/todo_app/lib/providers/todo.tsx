"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const TodoContext = createContext<IToDoContext | undefined>(undefined);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todoList, setTodoList] = useState<IToDo[]>([]);

  const refreshTodoList = () => {
    fetch("/api/todo")
      .then((res) => res.json())
      .then((data) => setTodoList(data))
      .catch((error) => console.error("Failed to fetch todos", error));
  };

  useEffect(() => {
    refreshTodoList();
  }, []);

  return (
    <TodoContext.Provider value={{ todoList, refreshTodoList }}>
      {children}
    </TodoContext.Provider>
  );
};
