interface IToDo {
  id: string;
  title: string;
  choice: boolean;
}

interface IToDoContext {
  todoList: IToDo[];
  refreshTodoList: () => void;
}
