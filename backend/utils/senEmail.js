const nodemailer = require('nodemailer');

async function sendEmail(to, subject, body) {
    // create a nodemailer transporter object
    let transporter = nodemailer.createTransport({
      host:process.env.SMPT_HOST,
      port:process.env.SMPT_PORT,

    service:process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.SMPT_MAIL  , // replace with your email address
      pass: process.env.SMPT_PASSWORD // replace with your email password or an app-specific password if you have 2FA enabled
    }
  });

  // create a message object
  let message = {
    from: process.env.SMPT_MAIL, // replace with your email address
    to: to,
    subject: subject,
    html: body
  };

  // send the message
  let info = await transporter.sendMail(message);

  console.log(`Message sent: ${info.messageId}`);
}

// example usage


module.exports = sendEmail;

