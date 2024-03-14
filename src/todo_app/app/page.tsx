import { CircleIcon, MoonIcon } from "@/components/ui/icons";
import ToDoHeader from "@/components/ui/todo/todo_header";
import ToDoInput from "@/components/ui/todo/todo_input";
import ToDoList from "@/components/ui/todo/todo_list";
import { TodoProvider } from "@/lib/providers/todo";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-800 dark:via-pink-700 dark:to-red-700">
      <TodoProvider>
        <div className="mb-4 w-96 rounded-md bg-white dark:bg-gray-800 p-4 shadow-lg">
          <ToDoHeader />
          <ToDoInput />
        </div>
        <div className="w-96 rounded-md bg-white dark:bg-gray-800 p-4 shadow-lg">
          <ToDoList />
        </div>
      </TodoProvider>
    </main>
  );
}
