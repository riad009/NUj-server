import nodemailer from "nodemailer";

export const sendEmail = async (
  email: string,
  id: string,
  name: string,
  type: string
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
    html: `
    <p>Dear ${email}, You have been invited to join the ${type} <strong>${name}</strong>.</p>
    <p>Click the following link to accept: <a href="https://nu-j-9c35c.web.app/accept-invitation/${type}/${id}/${email}">Accept Invitation</a></p>
  `,
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log({ result });

    return result;
  } catch (error) {
    console.log("Something went wrong while sending mail", error);
  }
};
