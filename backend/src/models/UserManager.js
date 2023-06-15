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
    return this.database.query(
      `insert into ${this.table} (firstname, lastname, birth_date, email, hashed_password, wine_color, preference_description) values (?,?,?,?,?,?)`,
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
}

module.exports = UserManager;
