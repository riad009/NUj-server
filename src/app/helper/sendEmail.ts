import nodemailer from "nodemailer";

export const sendEmail = async (
  email: string,
  ecoSpaceId: string,
  ecoSpaceName: string
) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Reachoutpro.ai@gmail.com",
      pass: "ifigscdpsahxuahn",
    },
  });

  const mailOptions = {
    from: "Reachoutpro.ai@gmail.com",
    to: email,
    subject: `Notifications from the ${ecoSpaceName}`,
    html: `
    <p>Dear ${email}, You have been invited to join the project <strong>${ecoSpaceName}</strong>.</p>
    <p>Click the following link to accept: <a href="http://localhost:3000/accept-invitation/${ecoSpaceId}/${email}">Accept Invitation</a></p>
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
