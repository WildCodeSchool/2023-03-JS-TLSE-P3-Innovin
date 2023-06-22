const { models } = require("../models");

// get all users
const browse = (req, res) => {
  models.user
    .findAll()
    .then(([rows]) => {
      if (rows.length) {
        res.status(200).send(rows);
      } else {
        res.status(400).send("Bad Request");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// get one user
const read = (req, res) => {
  models.user
    .find(req.params.id)
    .then(([rows]) => {
      if (rows[0] == null) {
        res.status(404).send("User not found");
      } else {
        res.status(200).send(rows[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// edit one user
const edit = (req, res) => {
  const user = req.body;
  const id = parseInt(req.params.id, 10);

  models.user
    .update(user, id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(400).send("Bad request");
      } else {
        res.status(204).send("User updated");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// add one user
const add = (req, res) => {
  const user = req.body;

  models.user
    .insert(user)
    .then(([result]) => {
      res.location(`/user/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// delete one user
const destroy = (req, res) => {
  models.user
    .delete(req.params.id)
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.status(404).send("User not found");
      } else {
        res.status(204).send("User deleted");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// middleware to identify user by it's email
const getUserByEmailWithPasswordAndPassToNext = (req, res, next) => {
  const { email } = req.body;

  models.user
    .findByEmail(email)
    .then(([users]) => {
      if (users[0] != null) {
        [req.user] = users;
        next();
      } else {
        res.status(401).send("Unauthorized");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

// middleware to verify if user is admin

const verifyAdminCredentials = (req, res, next) => {
  const { email } = req.body;

  models.user
    .getCredentials(email)
    .then(([users]) => {
      const adminCredentials = users[0].admin_credentials;

      if (adminCredentials) {
        next();
      } else {
        res.status(403).send("Access denied");
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

const getUserRegisteredToAWorkshop = (req, res) => {
  const idWorkshop = parseInt(req.params.id, 10);

  models.user
    .findUsersInWorkshop(idWorkshop)
    .then(([rows]) => {
      if (rows.length === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).send(rows);
      }
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving data from database");
    });
};

module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
  getUserByEmailWithPasswordAndPassToNext,
  verifyAdminCredentials,
  getUserRegisteredToAWorkshop,
};
