import { AppRouter } from "@/server";
import { inferRouterOutputs } from "@trpc/server";

export type Todo = inferRouterOutputs<AppRouter>["getTodos"][0];
