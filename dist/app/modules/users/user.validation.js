"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidations = void 0;
const zod_1 = require("zod");
const createUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string(),
        role: zod_1.z.enum(["user", "admin"]).default("user").optional(),
        email: zod_1.z.string().email(),
        phone: zod_1.z.string().optional(),
        photo: zod_1.z.string().optional(),
        gender: zod_1.z.enum(["male", "female", "other"]).optional(),
        address: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        isNotify: zod_1.z.boolean().default(true).optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
const updateUserValidation = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z.string().optional(),
        role: zod_1.z.enum(["user", "admin"]).default("user").optional(),
        email: zod_1.z.string().email().optional(),
        phone: zod_1.z.string().optional(),
        photo: zod_1.z.string().optional(),
        gender: zod_1.z.enum(["male", "female", "other"]).optional(),
        address: zod_1.z.string().optional(),
        dateOfBirth: zod_1.z.string().optional(),
        isNotify: zod_1.z.boolean().default(true).optional(),
        isDeleted: zod_1.z.boolean().default(false).optional(),
    }),
});
exports.UserValidations = {
    createUserValidation,
    updateUserValidation,
};
