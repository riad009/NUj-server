import express from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import { UserRouter } from "./app/modules/users/user.route";

const app = express();
// middlewares for globally
app.use(cors());
app.use(express.json());

// route points
app.use("/users", UserRouter);

// Global error handler
app.use(globalErrorHandler);
// error handle for no route found
app.use(notFound);
export default app;
