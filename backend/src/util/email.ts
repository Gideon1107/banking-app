import nodemailer from "nodemailer";
import dotenv from "dotenv";


dotenv.config();


const transporter = nodemailer.createTransport({
  service: "Gmail", 
  auth: {

    user: process.env.EMAIL_USER || "ppeliance@gmail.com", 
    pass: process.env.EMAIL_PASS || "libhibkewsitguxy", 



  },
});

// Function to send an email
export const sendActivationEmail = async (to: string, link: string) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Activate your account",
    html: `<p>Click <a href="${link}">here</a> to activate your account.</p>`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
   
  } catch (error) {
    return `Error sending activation link email: ${error}`;
  }
};

// Function to send a sign-in notification email
export const sendSignInEmail = async ({ to, subject, text }: { to: string; subject: string; text: string }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "use your email", 
    to,
    subject, 
    text, 
  };

  try {
    await transporter.sendMail(mailOptions);
  
  } catch (error) {
  
    return `Error sending sign-in email: ${error}`;
  }
};


// Function to send a update notification
export const sendUpdateNotification = async ({ to, subject, html }: { to: string; subject: string; html: string }) => {
  const mailOptions = {
    from: process.env.EMAIL_USER || "use your email", 
    to,
    subject, 
    html, 
  };

  try {
    await transporter.sendMail(mailOptions);
  
  } catch (error) {
  
    return `Error sending notification email: ${error}`;
  }
};

module.exports = { sendActivationEmail, sendSignInEmail, sendUpdateNotification };