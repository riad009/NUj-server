import nodemailer from "nodemailer";

export const sendAppointmentEmail = async (
  email: string,
  name: string,
  text: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Reachoutpro.ai@gmail.com",
      pass: "fhtkcqbdluziedjm",
    },
  });

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
