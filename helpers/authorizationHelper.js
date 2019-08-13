const jwt = require("jsonwebtoken");
const Role = require("../constants/roles");

const verifyAdmin = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verify(token, "secreatkey", (err, authData) => {
      if (err) {
        res.status(403).send();
      } else {
        if (authData.user.role === Role.Admin) {
          req.data = authData.user;
          next();
        }
        res.status(403).send();
      }
    });
  } else {
    res.status(403).send();
  }
};

const verifyUser = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verify(token, "secreatkey", (err, authData) => {
      if (err) {
        res.status(403).send();
      } else {
        if (
          authData.user.role === Role.User ||
          authData.user.role === Role.Admin
        ) {
          req.data = authData.user;
          next();
        }
        res.status(403).send();
      }
    });
  } else {
    res.status(403).send();
  }
};

module.exports = {
  verifyAdmin,
  verifyUser
};
