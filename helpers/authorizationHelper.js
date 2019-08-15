const jwt = require("jsonwebtoken");
const Role = require("../constants/roles");

const verifyAdmin = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verify(token, "key", (err, authData) => {
      if (err) {
        res.status(401).end();
      } else {
        if (authData.user.role === Role.Admin) {
          req.data = authData.user;
          next();
        } else {
          res.status(401).end();
        }
      }
    });
  } else {
    res.status(401).end();
  }
};

const verifyUser = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    jwt.verify(token, "key", (err, authData) => {
      if (err) {
        res.status(401).end();
      } else {
        if (
          authData.user.role === Role.User ||
          authData.user.role === Role.Admin
        ) {
          req.data = authData.user;
          next();
        } else {
          res.status(401).end();
        }
      }
    });
  } else {
    res.status(401).end();
  }
};

module.exports = {
  verifyAdmin,
  verifyUser
};
