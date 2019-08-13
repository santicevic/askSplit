const Router = require("express").Router;
const authentication = require("./authentication");
const posts = require("./posts");
const replies = require("./replies");

const router = Router();

router.use("/authentication", authentication);
router.use("/posts", posts);
router.use("/replies", replies);

module.exports = router;
