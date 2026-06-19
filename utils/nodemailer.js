import nodemailer from "nodemailer";
import { MailtrapTransport } from "mailtrap";

const TOKEN = process.env.MAIL_TRAP_TOKEN;

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendEmail = async (emailData) => {
  try {
    await transporter.sendMail({
      text: emailData.message,
      subject: emailData.subject || "Notification from E-commerce App",
      to: emailData.to,
      from: emailData.from || process.env.SMTP_USER,
    });
    console.log(`Email successfully sent to ${emailData.to}`);
  } catch (error) {
    console.error(`Failed to send email to ${emailData.to}:`, error.message);
  }
};

export default sendEmail;
