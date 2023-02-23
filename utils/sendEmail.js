
const nodemailer = require('nodemailer');
require('dotenv').config();

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    // host: `"${process.env.SMTP_HOST}"`,
    host:"sandbox.smtp.mailtrap.io",
    port: "25",
    auth: {
      user: "9e9b5c48a81a75",
      pass: "01576c3695af60",
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from: 'toan2112003 @gmail.com',
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // 3) Send the email
  
  try {
    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.error(err);
  }
 
};

module.exports = sendEmail;
