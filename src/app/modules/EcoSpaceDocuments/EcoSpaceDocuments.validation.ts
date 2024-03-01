import { z } from "zod";

const createEcoSpaceDocumentValidationSchema = z.object({
  body: z.object({
    ecoSpaceId: z.string({ required_error: "Must provide a EcoSpace" }),
    generalDocument: z.string({}).url().optional(),
    voice: z.string().url().optional(),
    video: z.string().url().optional(),
  }),
});

export const EcoSpaceDocumentValidations = {
  createEcoSpaceDocumentValidationSchema,
};
