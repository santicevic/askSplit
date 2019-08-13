const Router = require("express").Router;
const shops = require("./shops");
const coffees = require("./coffees");
const users = require("./users");
const posts = require("./posts");

const router = Router();

router.use("/shops", shops);
router.use("/coffees", coffees);
router.use("/users", users);
router.use("/posts", posts);

module.exports = router;
