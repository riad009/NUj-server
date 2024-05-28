import nodemailer from "nodemailer";

export const sendAppointmentEmail = async (
  email: string,
  name: string,
  status: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Reachoutpro.ai@gmail.com",
      pass: "ifigscdpsahxuahn",
    },
  });

  const text =
    status === "approved"
      ? `Congratulations ${name}! Your appointment has been approved`
      : status === "rejected"
      ? "Your appointment was not approved. Please contact your provider"
      : "";

  const mailOptions = {
    from: "Reachoutpro.ai@gmail.com",
    to: email,
    subject: `Notifications from the ${name}`,
    text,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log({ result });

    return result;
  } catch (error) {
    console.log("Something went wrong while sending mail", error);
  }
};
