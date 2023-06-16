const { body, validationResult } = require("express-validator");

const validateUser = [
  body("email").trim().isEmail().isLength({ max: 255 }),
  body("firstname").isLength({ max: 255 }),
  body("lastname").isLength({ max: 255 }),
  body("city").isLength({ max: 255 }),
  body("language").isLength({ max: 255 }),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ validationErrors: errors.array() });
    } else {
      next();
    }
  },
];

module.exports = {
  validateUser,
};
