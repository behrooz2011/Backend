const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./data/currency_converter.db");

db.serialize(() => {
  //Users table
  db.run(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY, email TEXT, password TEXT)`
  );
  //rate_alerts table
  db.run(
    `CREATE TABLE IF NOT EXISTS rate_alerts (id INTEGER PRIMARY KEY, user_id INTEGER, pair TEXT, rate REAL, rateType TEXT)`
  );
  // Alert table
  db.run(`
    CREATE TABLE IF NOT EXISTS alerts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      from_currency TEXT NOT NULL,
      to_currency TEXT NOT NULL,
      target_rate REAL NOT NULL
    )
  `);
});

module.exports = db;
