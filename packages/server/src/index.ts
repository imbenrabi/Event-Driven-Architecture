import { createRouter } from "./router";
import { startServer } from "./server";

export type AppRouter = ReturnType<typeof createRouter>;

startServer();
