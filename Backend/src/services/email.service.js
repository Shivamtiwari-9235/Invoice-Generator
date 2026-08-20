const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail.config");


const transporter = nodemailer.createTransport({

    service: mailConfig.service,

    auth: {

        user: mailConfig.user,
        pass: mailConfig.pass,

    },

});


const sendEmail = async (
    to,
    subject,
    text
) => {

    if(!to){

        throw new Error("Recipient email is required");

    }

    if(!mailConfig.user || !mailConfig.pass){

        console.warn(
            `[email.service] SMTP credentials are missing. Skipping delivery and logging email for ${to}.`
        );

        console.log({
            to,
            subject,
            text,
        });

        return {
            accepted: [to],
            response: "Email skipped because SMTP credentials are not configured",
        };

    }

    try {

        return await transporter.sendMail({

        from: mailConfig.user,
        to,
        subject,
        text,

        });

    } catch (error) {

        if (process.env.NODE_ENV !== "production") {

            console.warn(
                `[email.service] SMTP delivery failed, using development fallback for ${to}: ${error.message}`
            );

            console.log({
                to,
                subject,
                text,
            });

            return {
                accepted: [to],
                response: "Email skipped because SMTP delivery failed in development",
            };

        }

        throw error;

    }

};


module.exports = sendEmail;