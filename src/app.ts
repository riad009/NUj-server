import express from "express";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";

const app = express();

app.use(globalErrorHandler);
app.use(notFound);
export default app;
