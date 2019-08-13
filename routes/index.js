const Router = require("express").Router;
const users = require("./users");
const posts = require("./posts");
const replies = require("./replies");

const router = Router();

router.use("/users", users);
router.use("/posts", posts);
router.use("/replies", replies);

module.exports = router;
