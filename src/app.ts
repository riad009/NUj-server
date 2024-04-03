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
import { MessageRoutes } from "./app/modules/message/message.route";
import { ChannelRoutes } from "./app/modules/channel/channel.route";
import { ProjectRouter } from "./app/modules/project/project.route";

const app = express();
// middlewares for globally
app.use(cors());
app.use(express.json());

// route points
app.use("/api/v1/users", UserRouter);
app.use("/api/v1/services", ServiceRouter);
app.use("/api/v1/plans", PlanRouter);
app.use("/api/v1/eco-spaces", EcoSpaceRouter);
app.use("/api/v1/general", GeneralRouter);
app.use("/api/v1/appointments", AppointmentRouter);
app.use("/api/v1/eco-space-documents", EcoSpaceDocumentRoutes);
app.use("/api/v1/message", MessageRoutes);
app.use("/api/v1/channel", ChannelRoutes);
app.use("/api/v1/project", ProjectRouter);

// Global error handler
app.use(globalErrorHandler);
// error handle for no route found
app.use(notFound);
export default app;
