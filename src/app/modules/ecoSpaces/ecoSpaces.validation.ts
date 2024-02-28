import z from "zod";

const createEcoSpaceValidation = z.object({
  body: z.object({}),
});

export const EcoSpaceValidations = {
  createEcoSpaceValidation,
};
