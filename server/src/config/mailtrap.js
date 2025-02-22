const { MailtrapClient } = require("mailtrap");
require("dotenv").config();

const TOKEN = process.env.MAILTRAP_TOKEN; // Your Mailtrap API token

const mailtrapClient = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "hello@demomailtrap.com",
  name: "Ankit Kumar",
};

module.exports = { mailtrapClient, sender };