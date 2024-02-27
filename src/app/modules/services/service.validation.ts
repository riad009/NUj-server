import z from "zod";

const createServiceValidation = z.object({
  body: z.object({
    title: z.string(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const ServiceValidations = {
  createServiceValidation,
};
