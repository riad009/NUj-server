import z from "zod";

const locationSchema = z.object({
  lat: z.number({ required_error: "Invalid location" }),
  lng: z.number({ required_error: "Invalid location" }),
});

const createAppointmentValidationSchema = z.object({
  body: z.object({
    userId: z.string({
      required_error: "Participant is required to take appointment",
    }),
    ecoSpaceId: z.string({
      required_error: "Specify the EcoSpace",
    }),
    time: z.string({
      required_error: "Specify the time",
    }),
    date: z.string({
      required_error: "Specify the date",
    }),
    location: locationSchema.optional(),
    locationImage: z.string({
      required_error: "Please, provide a picture of your location",
    }),
    reason: z.string({ required_error: "Specify a reason in short" }),
    isDeleted: z.boolean().default(false).optional(),
    isApproved: z.boolean().default(false).optional(),
    status: z.enum(["pending", "in-progress", "completed"]).optional(),
    neighbourhood: z.string().optional(),
  }),
});

export const AppointmentValidations = {
  createAppointmentValidationSchema,
};
