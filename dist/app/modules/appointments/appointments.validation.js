"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppointmentValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const locationSchema = zod_1.default.object({
    lat: zod_1.default.number({ required_error: "Invalid location" }),
    lng: zod_1.default.number({ required_error: "Invalid location" }),
});
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
        location: locationSchema.optional(),
        locationImage: zod_1.default.string({
            required_error: "Please, provide a picture of your location",
        }),
        reason: zod_1.default.string({ required_error: "Specify a reason in short" }),
        isDeleted: zod_1.default.boolean().default(false).optional(),
        isApproved: zod_1.default.boolean().default(false).optional(),
        status: zod_1.default.enum(["pending", "in-progress", "completed"]).optional(),
        neighbourhood: zod_1.default.string().optional(),
    }),
});
exports.AppointmentValidations = {
    createAppointmentValidationSchema,
};
