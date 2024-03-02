import z from "zod";

const createEcoSpaceValidation = z.object({
  body: z.object({
    owner: z.string({ required_error: "Creator must be valid" }),
    company: z.string({ required_error: "Must provide a valid company name" }),
    address: z.string({ required_error: "Must provide a valid address" }),
    phone: z.string({ required_error: "Must provide a valid phone" }),
    email: z.string({ required_error: "Must provide valid email" }),
    website: z.string({ required_error: "Must provide a website url" }),
    serviceId: z.string({ required_error: "Choose a service" }),
    serviceDescription: z.string({
      required_error: "Must provide a description for service",
    }),
    staffs: z.array(z.string()).optional(),
    project: z.string({
      required_error: "Add the project name your company is working on.",
    }),
    plan: z.string().optional(),
    planPurchasedAt: z.string().optional(),
    ecoSpaceNotify: z.boolean().default(true).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const EcoSpaceValidations = {
  createEcoSpaceValidation,
};
