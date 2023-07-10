/* eslint-disable camelcase */

const argon2 = require("argon2");

// middleware to hash the user's password

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  hashLength: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  argon2
    .hash(req.body.password, hashingOptions)
    .then((hashed_password) => {
      req.body.hashed_password = hashed_password;
      delete req.body.password;

      next();
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// middleware to verify the user's password

const jwt = require("jsonwebtoken");

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashed_password, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "3h",
        });

        delete req.user.hashed_password;

        res.send({ token, user: req.user });
      } else {
        res.status(401).send("Unauthorized");
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

// middleware to verify the user's token

const verifyToken = (req, res, next) => {
  try {
    const authorizationHeader = req.get("Authorization");

    if (authorizationHeader == null) {
      throw new Error("Authorization header is missing");
    }

    const [type, token] = authorizationHeader.split(" ");

    if (type !== "Bearer") {
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    req.payload = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

module.exports = { hashPassword, verifyPassword, verifyToken };
