const nodemailer = require("nodemailer");
const path = require('path');
const logoPath = path.join(__dirname, '../images/logo.png');

let transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'logischool.france@gmail.com',
    pass: 'ahhfbudgryqxqzsc'
  }
});

async function sendMail(userEmail, subject, text) {
  let mailOptions = {
    from: 'logischool.france@gmail.com',
    to: userEmail,
    subject: subject,
    html: text,
    attachments: [{
      filename: 'logo.png',
      path: logoPath,
      cid: 'unique@logischool'
    }]
  };

  try { 
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("There was an error while sending the email:", error);
  }
}

module.exports = sendMail;
