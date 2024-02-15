// api/contact.js

import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { mail, content } = req.body;

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: mail,
        to: "juliansoto.dev@gmail.com",
        subject: `Nuevo mensaje a traves del portfolio de ${mail}`,
        Informacion: content,
      };

      await transporter.sendMail(mailOptions);

      return res.status(200).json({ success: true });
    } catch (error) {
      console.error("Error sending email:", error);
      return res.status(500).json({ error: "Something went wrong." });
    }
  } else {
    return res.status(405).end();
  }
}
