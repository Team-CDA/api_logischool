const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'logischool.france@gmail.com',
    pass: 'ahhfbudgryqxqzsc'
  }
});
// console.log(transporter);

async function sendMail(userEmail, subject, text) {
  let mailOptions = {
    from: 'logischool.france@gmail.com',
    to: userEmail,
    subject: subject,
    text: text
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("There was an error while sending the email:", error);
  }
}

module.exports = sendMail;
