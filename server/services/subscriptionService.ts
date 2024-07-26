import crypto from 'crypto';
import nodemailer from "nodemailer"
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_EMAIL
    }
});

export const generateConfirmationCode = (): string => {
    return crypto.randomBytes(20).toString('hex');
};

export const sendConfirmationEmail = (email: string, confirmationCode: string): void => {
    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Please confirm your email',
        text: `Click this link to confirm your email: ${process.env.URL_CORS}?code=${confirmationCode}&email=${email}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending confirmation email:', error);
        } else {
            console.log('Confirmation email sent:', info.response);
        }
    });
};
