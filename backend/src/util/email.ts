import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();


const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {
    user: process.env.EMAIL_USER || "userYourEmail", 
    pass: process.env.EMAIL_PASS || "setUp 2factor and app password in gmail", 
  },
});

// Function to send an email
export const sendEmail = async (to: string, link: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Activate your account",
    html: `<p>Click <a href="${link}">here</a> to activate your account.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
   
  } catch (error) {
    console.error("Error sending email: ", error);
  }
};


module.exports = { sendEmail };