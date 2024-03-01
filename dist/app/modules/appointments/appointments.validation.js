"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createAppointmentValidationSchema = zod_1.default.object({
    body: zod_1.default.object({
        participantId: zod_1.default.string({
            required_error: "Participant is required to take appointment",
        }),
        ecoSpaceId: zod_1.default.string({
            required_error: "Specify the EcoSpace",
        }),
        time: zod_1.default.string({
            required_error: "Specify the time",
        }),
        date: zod_1.default.string({
            required_error: "Specify the date",
        }),
        location: zod_1.default.string({ required_error: "Specify the location" }),
        locationImage: zod_1.default.string({
            required_error: "Please, provide a picture of your location",
        }),
        reason: zod_1.default.string({ required_error: "Specify a reason in short" }),
        isDeleted: zod_1.default.boolean().default(false).optional(),
        isApproved: zod_1.default.boolean().default(false).optional(),
        status: zod_1.default.enum(["pending", "in-progress", "completed"]).optional(),
    }),
});
exports.AppointmentValidations = {
    createAppointmentValidationSchema,
};
