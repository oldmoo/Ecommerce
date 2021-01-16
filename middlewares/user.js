const User = require("../models/user");

const userMiddleware = (req, res, next) => {
  User.findById("5f4e591f6032a80efa633063")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
};

module.exports = userMiddleware;
