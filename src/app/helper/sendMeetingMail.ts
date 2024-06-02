import nodemailer from "nodemailer";

export const sendMeetingMail = async (to: any, message: any) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Reachoutpro.ai@gmail.com",
      pass: "ifigscdpsahxuahn",
    },
  });

  const mailOptions = {
    from: "Reachoutpro.ai@gmail.com",
    to,
    subject: `Meeting invitation!`,
    html: message,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log({ result });

    return result;
  } catch (error) {
    console.log("Something went wrong while sending mail", error);
  }
};
