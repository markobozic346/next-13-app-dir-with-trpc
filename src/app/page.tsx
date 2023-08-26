import TodoList from "./_components/TodoList";
import { serverClient } from "./_trpc/serverClient";

export default async function Home() {
  const todos = await serverClient.getTodos();
  return (
    <main>
      <TodoList initialTodos={todos} />
    </main>
  );
}
