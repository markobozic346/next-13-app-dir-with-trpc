"use client";
import { useState } from "react";

import { Todo } from "@/lib/types";
import { trpc } from "../_trpc/client";

type Props = {
  initialTodos: Todo[];
};

export default function TodoList({ initialTodos }: Props) {
  const [content, setContent] = useState<string>("");

  const { mutate: addTodo } = trpc.addTodo.useMutation({
    onSettled: () => {
      refetch();
    },
  });

  const { mutate: setDone } = trpc.setDone.useMutation({
    onSettled: () => {
      refetch();
    },
  });

  const { data, refetch } = trpc.getTodos.useQuery(undefined, {
    initialData: initialTodos,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });

  return (
    <div>
      <div>
        {data?.map((todo) => (
          <div style={{ display: "flex" }} key={todo.id}>
            <div>{todo.id}</div>
            <div>{todo.content}</div>
            <input
              onChange={async () => {
                setDone({
                  id: todo.id,
                  done: todo.done ? 0 : 1,
                });
              }}
              type="checkbox"
              checked={Boolean(todo.done)}
            />
          </div>
        ))}
      </div>

      <input value={content} onChange={(e) => setContent(e.target.value)} />

      <button
        onClick={async () => {
          if (!content) return;
          addTodo(content);
          setContent("");
        }}
      >
        Add todo
      </button>
    </div>
  );
}
