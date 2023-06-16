const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    super({ table: "user" });
  }

  insert(user) {
    const {
      firstname,
      lastname,
      birthDate,
      email,
      hashedPassword,
      wineColor,
      preferenceDescription,
    } = user;

    // Execute the SQL query to insert the user into the database
    return this.database.query(
      `INSERT INTO ${this.table} (firstname, lastname, birth_date, email, hashed_password, wine_color, preference_description) VALUES (?,?,?,?,?,?,?)`,
      [
        firstname,
        lastname,
        birthDate,
        email,
        hashedPassword,
        wineColor,
        preferenceDescription,
      ]
    );
  }

  update(user) {
    const {
      firstname,
      lastname,
      birthDate,
      email,
      hashedPassword,
      wineColor,
      preferenceDescription,
    } = user;
    return this.database.query(
      `update ${this.table} set title = ?, birth_date = ?, email = ?, hashed_password = ?, wine_color = ?, preference_description = ? where id = ?`,
      [
        firstname,
        lastname,
        birthDate,
        email,
        hashedPassword,
        wineColor,
        preferenceDescription,
      ]
    );
  }

  findByEmail(email) {
    return this.database.query(`select * from  ${this.table} where email = ?`, [
      email,
    ]);
  }
}

module.exports = UserManager;
