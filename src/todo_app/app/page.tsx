import { CircleIcon, MoonIcon } from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="mb-4 w-96 rounded-md bg-white p-4 shadow-lg">
        <div className="flex items-center justify-between pb-2">
          <h1 className="text-lg font-bold">TODO</h1>
          <MoonIcon className="h-6 w-6 text-gray-400 hover:scale-110 transition-transform duration-300 ease-in-out" />
        </div>
        <div className="flex items-center rounded-md border-2 border-gray-200 p-2">
          <CircleIcon className="h-5 w-5 text-gray-400" />
          <Input
            className="ml-2 flex-1 border-none focus:ring-0 focus:outline-none"
            placeholder="Create a new todo..."
            type="text"
          />
        </div>
      </div>
      <div className="w-96 rounded-md bg-white p-4 shadow-lg">
        <div className="flex flex-col items-center">
          <div className="flex items-center w-full p-2 gap-4">
            <CircleIcon className="h-5 w-5 text-gray-400 hover:text-green-500 cursor-pointer" />
            <p className="text-gray-800">Example Todo Item</p>
          </div>
        </div>
      </div>
    </main>
  );
}
