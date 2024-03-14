import z from "zod";

const createEcoSpaceValidation = z.object({
  body: z.object({
    owner: z.string({ required_error: "Creator must be valid" }),
    company: z.string({ required_error: "Must provide a valid company name" }),
    address: z.string({ required_error: "Must provide a valid address" }),
    phone: z.string({ required_error: "Must provide a valid phone" }),
    email: z.string({ required_error: "Must provide valid email" }),
    website: z.string({ required_error: "Must provide a website url" }),
    serviceId: z.array(z.string({ required_error: "Choose a service" })),
    // serviceDescription: z.string({
    //   required_error: "Must provide a description for service",
    // }),
    description: z.string().optional(),
    staffs: z.array(z.string()).optional(),
    projects: z.array(z.string()).optional(),
    // project: z.string({
    //   required_error: "Add the project name your company is working on.",
    // }),
    plan: z.string().optional(),
    planPrice: z.number().min(0).optional(),
    planPurchasedAt: z.string().optional(),
    ecoSpaceNotify: z.boolean().default(true).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

const updateEcoSpaceValidation = z.object({
  body: z.object({
    owner: z.string({ required_error: "Creator must be valid" }).optional(),
    company: z
      .string({ required_error: "Must provide a valid company name" })
      .optional(),
    address: z
      .string({ required_error: "Must provide a valid address" })
      .optional(),
    phone: z
      .string({ required_error: "Must provide a valid phone" })
      .optional(),
    email: z.string({ required_error: "Must provide valid email" }).optional(),
    website: z
      .string({ required_error: "Must provide a website url" })
      .optional(),
    serviceId: z
      .array(z.string({ required_error: "Choose a service" }))
      .optional(),
    // serviceDescription: z
    //   .string({
    //     required_error: "Must provide a description for service",
    //   })
    //   .optional(),
    description: z.string().optional(),
    staffs: z.array(z.string()).optional(),
    // project: z
    //   .string({
    //     required_error: "Add the project name your company is working on.",
    //   })
    //   .optional(),
    projects: z.array(z.string()).optional(),
    plan: z.string().optional(),
    planPrice: z.number().min(0).optional(),
    planPurchasedAt: z.string().optional(),
    ecoSpaceNotify: z.boolean().default(true).optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});

export const EcoSpaceValidations = {
  createEcoSpaceValidation,
  updateEcoSpaceValidation,
};
