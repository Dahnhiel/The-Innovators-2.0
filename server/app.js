const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Contact form route
app.post("/send", async (req, res) => {
    const { name, email, subject, message } = req.body;

    // Nodemailer setup
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "dannyfrosh71@gmail.com",
            pass: "pzjs jgtw potj nozs", // Use an app password for Gmail
        },
    });

    const mailOptions = {
        from: email,
        to: "dannyfrosh71@gmail.com", // Your email
        subject: `${subject} - From ${name}`,
        text: `You have a new message from ${name} (${email}):\n\n${message}`,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
        console.error("Error sending email:", error.message);
        res.status(500).json({ message: "Failed to send email." });
    }
});

// app.post("/newletter", async(req, res) => {
//     const trasporter = nodemailer.createTransport({
        
//     })
// })

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
