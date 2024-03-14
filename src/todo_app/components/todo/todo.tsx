"use client";

import { useEffect, useState } from "react";
import { CheckCircleIcon, CircleIcon, XIcon } from "../ui/icons";
import { useTodo } from "@/lib/providers/todo";

export default function ToDo(todo: IToDo) {
  const { refreshTodoList } = useTodo();
  const [isCheck, setIsCheck] = useState(false);

  useEffect(() => {
    setIsCheck(todo.choice);
  }, [todo.choice]);

  function onCheckClick() {
    fetch(`/api/todo/${todo.id}`, {
      method: "PATCH",
      body: JSON.stringify({ choice: !isCheck }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setIsCheck(data.choice);
      });
  }

  function oneDeleteClick() {
    fetch(`/api/todo/${todo.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        refreshTodoList();
      });
  }

  return (
    <div className="flex items-center w-full p-2 gap-4" key={todo.id}>
      {isCheck ? (
        <CheckCircleIcon
          className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer"
          onClick={onCheckClick}
        />
      ) : (
        <CircleIcon
          className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer"
          onClick={onCheckClick}
        />
      )}
      {isCheck ? (
        <p className="text-gray-400 dark:text-gray-400 line-through">
          {todo.title}
        </p>
      ) : (
        <p className="text-gray-800 dark:text-white ">{todo.title}</p>
      )}
      <XIcon
        className="ml-auto h-5 w-5 text-gray-400 hover:text-red-500 cursor-pointer"
        onClick={oneDeleteClick}
      />
    </div>
  );
}
