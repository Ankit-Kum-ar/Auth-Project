const { mailtrapClient, sender } = require("../config/mailTrap");
const { VERIFICATION_EMAIL_TEMPLATE } = require("./emailTemplates");

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
        console.log(`Verify Email sent successfully: ${response}`);
    } catch (error) {
        console.error(`Error: ${error}`);
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
        console.log(`Welcome Email sent successfully: ${response}`);
    } catch (error) {
        console.error(`Error: ${error}`);
        throw new Error("An error occurred while sending the email" + error);
    }
}

module.exports = { sendVerificationEmail, sendWelcomeEmail };