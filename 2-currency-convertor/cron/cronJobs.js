const cron = require("node-cron");
const nodemailer = require("nodemailer");
const exchangeService = require("../services/exchangeService");
const db = require("../db");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

//Run every minute
exports.startRateAlertChecker = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Checking rate alerts...");
    try {
      const rates = await exchangeService.getExchangeRates();

      db.all("SELECT * FROM alerts", [], (err, alerts) => {
        if (err) throw err;
        console.log("alerts: ", alerts);
        alerts.forEach((alert) => {
          // const [from, to] = alert.pair.split("_");
          const currentRate =
            rates.rates[alert.to_currency] / rates.rates[alert.from_currency];
          console.log("currentRate: ", currentRate);

          if (
            (alert.rateType === "below" && currentRate <= alert.target_rate) || //alert.rate comes from the table, ie, user generated
            (alert.rateType === "above" && currentRate >= alert.target_rate)
          ) {
            db.get(
              "SELECT email FROM users WHERE id = ?",
              [alert.user_id],
              (err, user) => {
                if (err) throw err;

                const mailOptions = {
                  from: process.env.EMAIL_USER,
                  to: user.email,
                  subject: "Rate Alert Notification",
                  text: `The exchange rate for ${
                    alert.pair
                  } is now ${currentRate.toFixed(4)}.`,
                };

                console.log("---Email Sent ----");
                transporter.sendMail(mailOptions, (err) => {
                  if (err) console.error(err.message);
                  else console.log(`Notification sent to ${user.email}`);
                });
              }
            );
          }
        });
      });
    } catch (error) {
      console.error("Error checking rate alerts:", error.message);
    }
  });
};
