import { z } from "zod";

const createUserValidation = z.object({
  body: z.object({
    name: z.string(),
    role: z.enum(["user", "admin"]).default("user").optional(),
    email: z.string().email(),
    phone: z.string().optional(),
    photo: z.string().optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    address: z.string().optional(),
    password: z.string(),
    dateOfBirth: z.string().optional(),
    isNotify: z.boolean().default(true).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const updateUserValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    role: z.enum(["user", "admin"]).default("user").optional(),
    email: z.string().email().optional(),
    phone: z.string().optional(),
    photo: z.string().optional(),
    gender: z.enum(["male", "female", "other"]).optional(),
    address: z.string().optional(),
    dateOfBirth: z.string().optional(),
    isNotify: z.boolean().default(true).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const UserValidations = {
  createUserValidation,
  updateUserValidation,
};
