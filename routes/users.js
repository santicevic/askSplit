const Router = require("express").Router;
const User = require("../models").User;
const Post = require("../models").Post;

const router = Router();

router.get("/:username", (req, res) => {
  User.findOne({ where: { username: req.params.username }, include: [Post] })
    .then(user => {
      user.password = "";
      res.status(200).send(user);
    })
    .catch(error => {
      res.status(400).send();
    });
});

module.exports = router;
