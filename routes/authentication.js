const Router = require("express").Router;
const bcrypt = require("bcrypt");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const User = require("../models").User;
const Role = require("../constants/roles");

const router = Router();
const saltRounds = 9;

router.post("/register", (req, res) => {
  if (req.body.password.length < 7) {
    res.status(400).send("Password has to be longer than 6 chars");
    return;
  }

  bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: hash,
      role: Role.Admin
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
              role: user.role,
              id: user.id,
              username: user.username,
              userImage: user.userImage
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

router.get("/usernameexists/:username", (req, res) => {
  User.findOne({ where: { username: req.params.username } }).then(user => {
    if (user) {
      res.status(200).send({ result: true });
    } else {
      res.status(200).send({ result: false });
    }
  });
});

router.get("/emailexists/:email", (req, res) => {
  // also validates email format
  if (!validator.isEmail(req.params.email)) {
    res.status(200).send({ result: true });
  }
  User.findOne({ where: { email: req.params.email } }).then(user => {
    if (user) {
      res.status(200).send({ result: true });
    } else {
      res.status(200).send({ result: false });
    }
  });
});

module.exports = router;
