import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { fullName, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: email,
      to: "juliansoto.dev@gmail.com",
      subject: `Nuevo mensaje de contacto de ${fullName}: ${subject}`,
      text: `Has recibido un nuevo mensaje de ${fullName} (${email}, ${phone}):\n\n${message}`,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true });
  } else {
    return res.status(405).end();
  }
}
