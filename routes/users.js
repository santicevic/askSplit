const Router = require("express").Router;
const User = require("../models").User;
const Post = require("../models").Post;

const router = Router();

router.get("/", (req, res) => {
  User.findAll({ include: [Post] }).then(users => {
    res.send(users);
  });
});

router.post("/", (req, res) => {
  User.create({
    ...req.body
  }).then(user => {
    res.send(user);
    res.end();
  });
});

module.exports = router;
