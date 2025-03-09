const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });
  app.post("/send-otp", async (req, res) => {
    const { email } = req.body;
    if (!email.endsWith("@vit.ac.in")) {
      return res.status(400).json({ message: "Use VIT email only!" });
    }
    const otp = Math.floor(100000 + Math.random() * 900000);
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "VIT Dating App - OTP Verification",
      text: `Your OTP is ${otp}`,
    };
    transporter.sendMail(mailOptions, (err) => {
      if (err) return res.status(500).json({ message: "Error sending OTP" });
      res.json({ otp });
    });
  });