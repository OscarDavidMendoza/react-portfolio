const passport = require("passport");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../Server/models/User");

module.exports = (req, res, next) => {
  passport.authenticate("local", (err, user) => {
    if (err) {
      console.error(err);
      return res
        .status(500)
        .json({ error: "Internal Server Error" });
    }
    if (!user) {
      return res
        .status(401)
        .json({ error: "Unauthorized" });
    }
    req.logIn(user, (err) => {
      if (err) {
        console.error(err);
        return res
          .status(500)
          .json({ error: "Internal Server Error" });
      }
      const token = jwt.sign(
        { userId: user._id },
        "yourSecretKey"
      );
      return res
        .status(200)
        .json({ message: "Login successful", token });
    });
  })(req, res, next);
};
