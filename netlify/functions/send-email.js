const nodemailer = require('nodemailer');

exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    let data;
    try {
        data = JSON.parse(event.body);
    } catch (err) {
        return { statusCode: 400, body: 'Invalid request body' };
    }

    const { name, email, message } = data;
    if (!name || !email || !message) {
        return { statusCode: 400, body: 'Missing fields' };
    }

    // Read SMTP settings from environment variables
    const SMTP_HOST = process.env.SMTP_HOST;
    const SMTP_PORT = process.env.SMTP_PORT || 587;
    const SMTP_USER = process.env.SMTP_USER;
    const SMTP_PASS = process.env.SMTP_PASS;
    const TO_EMAIL = process.env.TO_EMAIL || 'mcjackconstructions@gmail.com';

    if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
        return { statusCode: 500, body: 'SMTP not configured on server' };
    }

    const transporter = nodemailer.createTransport({
        host: SMTP_HOST,
        port: parseInt(SMTP_PORT, 10),
        secure: SMTP_PORT == 465, // true for 465, false for other ports
        auth: {
            user: SMTP_USER,
            pass: SMTP_PASS,
        },
    });

    const mailOptions = {
        from: `Website Contact <${SMTP_USER}>`,
        to: TO_EMAIL,
        subject: `Website contact from ${name} <${email}>`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message.replace(/\n/g, '<br>')}</p>`,
    };

    try {
        await transporter.sendMail(mailOptions);
        return { statusCode: 200, body: JSON.stringify({ ok: true }) };
    } catch (err) {
        console.error('sendMail error:', err);
        return { statusCode: 500, body: 'Failed to send email' };
    }
};
