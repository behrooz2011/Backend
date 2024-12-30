//############################### order #######################
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

// Run every minute
exports.startRateAlertChecker = () => {
  cron.schedule("* * * * *", async () => {
    console.log("Checking rate alerts...");
    try {
      const rates = await exchangeService.getExchangeRates();
      db.all("SELECT * FROM alerts", [], (err, alerts) => {
        if (err) throw err;
        console.log("alerts: ", alerts.length);
        alerts.forEach((alert) => {
          const currentRate =
            rates.rates[alert.to_currency] / rates.rates[alert.from_currency];
          console.log("currentRate: ", currentRate);

          if (
            (alert.rateType === "below" && currentRate <= alert.target_rate) ||
            (alert.rateType === "above" && currentRate >= alert.target_rate)
          ) {
            db.get(
              "SELECT email FROM users WHERE id = ?",
              [alert.user_id],
              (err, user) => {
                if (err) throw err;
                console.log(`Alert for ${alert.user_id}: `);

                const mailOptions = {
                  from: process.env.EMAIL_USER,
                  to: user.email,
                  subject: "Rate Alert Notification",
                  text: `The exchange rate for ${
                    alert.pair
                  } is now ${currentRate.toFixed(4)}.`,
                };

                transporter.sendMail(mailOptions, (err) => {
                  if (err) {
                    console.log("email error--");
                    console.error(err.message);
                  } else {
                    console.log(`Notification sent to ${user.email}`);
                    // Remove the alert from the database after successful email
                    db.run(
                      "DELETE FROM alerts WHERE id = ?",
                      [alert.id],
                      (err) => {
                        if (err) {
                          console.error("Error deleting alert:", err.message);
                        } else {
                          console.log(
                            `Alert with ID ${alert.id} removed from the database.`
                          );
                        }
                      }
                    );
                  }
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

// ********************* Async/ Await version******************************
// const cron = require("node-cron");
// const nodemailer = require("nodemailer");
// const exchangeService = require("../services/exchangeService");
// const db = require("../db");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Helper function to wrap db calls in a promise
// const dbAll = (query, params) => {
//   return new Promise((resolve, reject) => {
//     db.all(query, params, (err, rows) => {
//       if (err) reject(err);
//       else resolve(rows);
//     });
//   });
// };

// const dbGet = (query, params) => {
//   return new Promise((resolve, reject) => {
//     db.get(query, params, (err, row) => {
//       if (err) reject(err);
//       else resolve(row);
//     });
//   });
// };

// const dbRun = (query, params) => {
//   return new Promise((resolve, reject) => {
//     db.run(query, params, function (err) {
//       if (err) reject(err);
//       else resolve(this);
//     });
//   });
// };

// // Run every minute
// exports.startRateAlertChecker = () => {
//   cron.schedule("* * * * *", async () => {
//     console.log("Checking rate alerts...");
//     try {
//       const rates = await exchangeService.getExchangeRates();
//       const alerts = await dbAll("SELECT * FROM alerts", []);

//       console.log("alerts: ", alerts);
//       for (const alert of alerts) {
//         const currentRate =
//           rates.rates[alert.to_currency] / rates.rates[alert.from_currency];
//         console.log("currentRate: ", currentRate);

//         if (
//           (alert.rateType === "below" && currentRate <= alert.target_rate) ||
//           (alert.rateType === "above" && currentRate >= alert.target_rate)
//         ) {
//           const user = await dbGet("SELECT email FROM users WHERE id = ?", [alert.user_id]);
//           console.log(`Alert for ${alert.user_id}: `, alert);

//           const mailOptions = {
//             from: process.env.EMAIL_USER,
//             to: user.email,
//             subject: "Rate Alert Notification",
//             text: `The exchange rate for ${alert.pair} is now ${currentRate.toFixed(4)}.`,
//           };

//           try {
//             await transporter.sendMail(mailOptions);
//             console.log(`Notification sent to ${user.email}`);
//             // Remove the alert from the database after successful email
//             await dbRun("DELETE FROM alerts WHERE id = ?", [alert.id]);
//             console.log(`Alert with ID ${alert.id} removed from the database.`);
//           } catch (err) {
//             console.error("Error sending email or deleting alert:", err.message);
//           }
//         }
//       }
//     } catch (error) {
//       console.error("Error checking rate alerts:", error.message);
//     }
//   });
// };
