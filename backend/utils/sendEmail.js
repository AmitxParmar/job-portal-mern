import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  // Create a transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SECURE === "true",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // Define email options
  const mailOptions = {
    from: process.env.SMTP_FROM,
    to: options.email,
    subject: options.subject,
    html: options.message,
  };

  // Send email
  await transporter.sendMail(mailOptions);
};
