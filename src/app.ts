import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import { UserRouter } from "./app/modules/users/user.route";
import { ServiceRouter } from "./app/modules/services/service.route";
import { PlanRouter } from "./app/modules/plans/plan.route";

const app = express();
// middlewares for globally
app.use(cors());
app.use(express.json());

// route points
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/services", ServiceRouter);
app.use("/api/v1/plans", PlanRouter);

// Global error handler
app.use(globalErrorHandler);
// error handle for no route found
app.use(notFound);
export default app;
