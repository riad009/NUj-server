"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EcoSpaceValidations = void 0;
const zod_1 = __importDefault(require("zod"));
const createEcoSpaceValidation = zod_1.default.object({
    body: zod_1.default.object({
        owner: zod_1.default.string({ required_error: "Creator must be valid" }),
        company: zod_1.default.string({ required_error: "Must provide a valid company name" }),
        address: zod_1.default.string({ required_error: "Must provide a valid address" }),
        phone: zod_1.default.string({ required_error: "Must provide a valid phone" }),
        email: zod_1.default
            .string({ required_error: "Must provide valid email" })
            .email({ message: "Your email is not valid" }),
        website: zod_1.default
            .string({ required_error: "Must provide a website url" })
            .url({ message: "Your URL is ont valid" }),
        serviceId: zod_1.default.string({ required_error: "Choose a service" }),
        serviceDescription: zod_1.default.string({
            required_error: "Must provide a description for service",
        }),
        staffs: zod_1.default.array(zod_1.default.string()).optional(),
        project: zod_1.default.string({
            required_error: "Add the project name your company is working on.",
        }),
        plan: zod_1.default.string().optional(),
        planPurchasedAt: zod_1.default.string().optional(),
        ecoSpaceNotify: zod_1.default.boolean().default(true).optional(),
        isDeleted: zod_1.default.boolean().default(false).optional(),
    }),
});
exports.EcoSpaceValidations = {
    createEcoSpaceValidation,
};
