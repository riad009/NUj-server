"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const globalErrorHandler_1 = require("./app/middlewares/globalErrorHandler");
const notFound_1 = require("./app/middlewares/notFound");
const user_route_1 = require("./app/modules/users/user.route");
const service_route_1 = require("./app/modules/services/service.route");
const plan_route_1 = require("./app/modules/plans/plan.route");
const app = (0, express_1.default)();
// middlewares for globally
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// route points
app.use("/api/v1/users", user_route_1.UserRouter);
app.use("/api/v1/services", service_route_1.ServiceRouter);
app.use("/api/v1/plans", plan_route_1.PlanRouter);
// Global error handler
app.use(globalErrorHandler_1.globalErrorHandler);
// error handle for no route found
app.use(notFound_1.notFound);
exports.default = app;
