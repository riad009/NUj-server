import z from "zod";

const createAppointmentValidationSchema = z.object({
  body: z.object({
    participantId: z.string({
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
    location: z.string({ required_error: "Specify the location" }),
    locationImage: z.string({
      required_error: "Please, provide a picture of your location",
    }),
    reason: z.string({ required_error: "Specify a reason in short" }),
    isDeleted: z.boolean().default(false).optional(),
    isApproved: z.boolean().default(false).optional(),
    status: z.enum(["pending", "in-progress", "completed"]).optional(),
  }),
});

export const AppointmentValidations = {
  createAppointmentValidationSchema,
};
