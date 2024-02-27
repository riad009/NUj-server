import z from "zod";

const createPlanValidation = z.object({
  body: z.object({
    title: z.string(),
    price: z.number().min(0).default(0).optional(),
    description: z.string().optional(),
  }),
});

export const PlanValidations = {
  createPlanValidation,
};
