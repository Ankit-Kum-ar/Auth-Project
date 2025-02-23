const { mailtrapClient, sender } = require("../config/mailTrap");
const { VERIFICATION_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE } = require("./emailTemplates");

const sendVerificationEmail = async (email, verificationToken) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Email Verification",
            html: VERIFICATION_EMAIL_TEMPLATE.replace(
                "{verificationCode}",
                verificationToken
            ),
            category: "email-verification",
        }) 
        // console.log(`Verify Email sent successfully: ${response}`);
    } catch (error) {
        // console.error(`Error: ${error}`);
        throw new Error("An error occurred while sending the email: " + error);
    }
}

const sendWelcomeEmail = async (email, name) => {
    const recipient = [{ email }];

    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            template_uuid: "1be9f7ae-9a4f-4a49-b2bc-b5b72d222c7c",
            template_variables: {
                "name": name
            },
        });
        // console.log(`Welcome Email sent successfully: ${response}`);
    } catch (error) {
        // console.error(`Error: ${error}`);
        throw new Error("An error occurred while sending the email" + error);
    }
}

const sendPasswordResetEmail = async (email, resetURL) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset",
            html: PASSWORD_RESET_REQUEST_TEMPLATE.replace(
                "{resetURL}",
                resetURL
            ),
            category: "password-reset",
        });
        // console.log(`Password Reset Email sent successfully: ${response}`);
    } catch (error) {
        // console.error(`Error: ${error}`);
        throw new Error("An error occurred while sending the email: " + error);
    }
}

const sendResetSuccessEmail = async (email) => {
    const recipient = [{ email }];
    try {
        const response = await mailtrapClient.send({
            from: sender,
            to: recipient,
            subject: "Password Reset Successful",
            html: PASSWORD_RESET_SUCCESS_TEMPLATE,
            category: "password-reset",
        });
        // console.log(`Password Reset Success Email sent successfully: ${response}`);
    } catch (error) {
        // console.error(`Error: ${error}`);
        throw new Error("An error occurred while sending the email: " + error); 
    }
}

module.exports = { sendVerificationEmail, sendWelcomeEmail, sendPasswordResetEmail, sendResetSuccessEmail };