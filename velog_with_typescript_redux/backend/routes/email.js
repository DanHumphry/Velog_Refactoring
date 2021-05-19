const nodemailer = require("nodemailer");
const express = require("express");
const dotenv = require("dotenv");

dotenv.config();
const router = express.Router();

router.post("/", async (req, res, next) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    prot: 587,
    host: "smtp.gmlail.com",
    secure: false,
    requireTLS: true,
    auth: {
      user: process.env.EMAIL_ADDRESS,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: req.body.email,
    subject: "가입해주셔서 감사합니다. 인증번호를 확인해주세요.",
    text: `귀하의 인증번호는 ${req.body.number} 입니다. `,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
});

module.exports = router;
