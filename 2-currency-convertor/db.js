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
      target_rate REAL NOT NULL,
      rateType TEXT NOT NULL
    )
  `);
  //Favorite table
  db.run(
    `CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        from_currency TEXT,
        to_currency TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id)
    )`
  );
});

module.exports = db;

/**
 * Used inside the serialized section to remove a table:
 * let tableName = "alerts";
 *   const sql = `DROP TABLE IF EXISTS ${tableName};`;

  db.run(sql, (err) => {
    if (err) {
      console.error("Error dropping table: " + err.message);
    } else {
      console.log(`Table ${tableName} dropped successfully.`);
    }
  });
 * 
 */
