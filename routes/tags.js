const Router = require("express").Router;
const Tag = require("../models").Tag;
const Post = require("../models").Post;
const authorizationHelper = require("../helpers/authorizationHelper");

const router = Router();

router.get("/", (req, res) => {
  Tag.findAll({ include: [Post] }).then(posts => {
    res.send(posts);
  });
});

router.post("/", authorizationHelper.verifyAdmin, (req, res) => {
  Tag.create({ name: req.body.name }).then(tag => {
    res.status(201).send(tag);
  });
});

module.exports = router;
