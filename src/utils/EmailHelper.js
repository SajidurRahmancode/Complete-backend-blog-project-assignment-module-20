import nodemailer from "nodemailer";
export const Emailsend =async (emailTo,emailText,emailSubject) => {
    const transporter =nodemailer.createTransport({
        host:process.env.SMTP_HOST,
        port:process.env.SMTP_PORT,
        secure:false,
        auth:{
            user:process.env.BREVO_SMTP_USER,
            pass:process.env.BREVO_SMTP_KEY
        }

    });

    const mailOptions={
        from:process.env.EMAIL_FROM,
        to:emailTo,
        subject:emailSubject,
        text:emailText
    };
    return await transporter.sendMail(mailOptions)
};