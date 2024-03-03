import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFound } from "./app/middlewares/notFound";
import { UserRouter } from "./app/modules/users/user.route";
import { ServiceRouter } from "./app/modules/services/service.route";
import { PlanRouter } from "./app/modules/plans/plan.route";
import { EcoSpaceRouter } from "./app/modules/ecoSpaces/ecoSpaces.route";
import { GeneralRouter } from "./app/modules/general/general.route";
import { AppointmentRouter } from "./app/modules/appointments/appointments.route";
import { EcoSpaceDocumentRoutes } from "./app/modules/EcoSpaceDocuments/EcoSpaceDocuments.route";

const app = express();
// middlewares for globally
app.use(
  cors({
    origin: ["*", "https://nu-j-9c35c.web.app/", "http://localhost:5173/"],
  })
);
app.use(express.json());

// route points
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/services", ServiceRouter);
app.use("/api/v1/plans", PlanRouter);
app.use("/api/v1/eco-spaces", EcoSpaceRouter);
app.use("/api/v1/general", GeneralRouter);
app.use("/api/v1/appointments", AppointmentRouter);
app.use("/api/v1/eco-space-documents", EcoSpaceDocumentRoutes);

// Global error handler
app.use(globalErrorHandler);
// error handle for no route found
app.use(notFound);
export default app;
