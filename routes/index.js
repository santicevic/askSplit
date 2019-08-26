const Router = require("express").Router;
const authentication = require("./authentication");
const bodyParser = require("body-parser");
const posts = require("./posts");
const replies = require("./replies");
const tags = require("./tags");
const replyComments = require("./replyComments");
const notifications = require("./notifications");
const uploads = require("./uploads");
const users = require("./users");

const router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use("/authentication", authentication);
router.use("/posts", posts);
router.use("/replies", replies);
router.use("/tags", tags);
router.use("/replycomments", replyComments);
router.use("/notifications", notifications.router);
router.use("/uploads", uploads);
router.use("/users", users);

module.exports = router;
