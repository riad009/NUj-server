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
        email: zod_1.default.string({ required_error: "Must provide valid email" }),
        website: zod_1.default.string({ required_error: "Must provide a website url" }),
        serviceId: zod_1.default.string({ required_error: "Choose a service" }),
        serviceDescription: zod_1.default.string({
            required_error: "Must provide a description for service",
        }),
        staffs: zod_1.default.array(zod_1.default.string()).optional(),
        project: zod_1.default.string({
            required_error: "Add the project name your company is working on.",
        }),
        plan: zod_1.default.string().optional(),
        planPrice: zod_1.default.number().min(0).optional(),
        planPurchasedAt: zod_1.default.string().optional(),
        ecoSpaceNotify: zod_1.default.boolean().default(true).optional(),
        isDeleted: zod_1.default.boolean().default(false).optional(),
    }),
});
const updateEcoSpaceValidation = zod_1.default.object({
    body: zod_1.default.object({
        owner: zod_1.default.string({ required_error: "Creator must be valid" }).optional(),
        company: zod_1.default
            .string({ required_error: "Must provide a valid company name" })
            .optional(),
        address: zod_1.default
            .string({ required_error: "Must provide a valid address" })
            .optional(),
        phone: zod_1.default
            .string({ required_error: "Must provide a valid phone" })
            .optional(),
        email: zod_1.default.string({ required_error: "Must provide valid email" }).optional(),
        website: zod_1.default
            .string({ required_error: "Must provide a website url" })
            .optional(),
        serviceId: zod_1.default.string({ required_error: "Choose a service" }).optional(),
        serviceDescription: zod_1.default
            .string({
            required_error: "Must provide a description for service",
        })
            .optional(),
        staffs: zod_1.default.array(zod_1.default.string()).optional(),
        project: zod_1.default
            .string({
            required_error: "Add the project name your company is working on.",
        })
            .optional(),
        plan: zod_1.default.string().optional(),
        planPrice: zod_1.default.number().min(0).optional(),
        planPurchasedAt: zod_1.default.string().optional(),
        ecoSpaceNotify: zod_1.default.boolean().default(true).optional(),
        isDeleted: zod_1.default.boolean().default(false).optional(),
    }),
});
exports.EcoSpaceValidations = {
    createEcoSpaceValidation,
    updateEcoSpaceValidation,
};
