const Router = require("express").Router;
const authentication = require("./authentication");
const posts = require("./posts");
const replies = require("./replies");
const tags = require("./tags");

const router = Router();

router.use("/authentication", authentication);
router.use("/posts", posts);
router.use("/replies", replies);
router.use("/tags", tags);

module.exports = router;
