const Router = require("express").Router;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models").User;
const Role = require("../constants/roles");

const saltRounds = 9;

const router = Router();

router.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hash,
      role: Role.User
    })
      .then(user => {
        res.status(201).send();
      })
      .catch(err => {
        res.status(400).send();
      });
  });
});

router.post("/login", (req, res) => {
  User.findOne({
    where: { email: req.body.email }
  }).then(user => {
    if (user) {
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (result == true) {
          jwt.sign({ user }, "key", { expiresIn: "30 days" }, (err, token) => {
            res.status(200).send({
              token,
              role: user.role
            });
          });
        } else {
          res.status(401).send();
        }
      });
    } else {
      res.status(404).send();
    }
  });
});

module.exports = router;
