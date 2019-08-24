const Notification = require("../models").Notification;
const Post = require("../models").Post;
const Reply = require("../models").Reply;
const User = require("../models").User;
const Router = require("express").Router;
const authorizationHelper = require("../helpers/authorizationHelper");

const router = Router();

router.get("/", authorizationHelper.verifyUser, (req, res) => {
  Promise.all([
    Notification.findAll({
      include: [{ model: Post, where: { userId: req.data.id } }, Reply, User]
    }),
    Notification.findAll({
      include: [
        Post,
        { model: Reply, where: { userId: req.data.id }, include: [Post] },
        User
      ]
    })
  ]).then(notifications => {
    res.status(200).send([...notifications[0], ...notifications[1]]);
  });
});

router.patch("/", authorizationHelper.verifyUser, (req, res) => {
  Notification.update({ read: true }, { where: { id: req.body.id } })
    .then(() => {
      res.status(202).send();
    })
    .catch(() => {
      res.status(400).send();
    });
});

const createPostNotification = (userId, postId) => {
  Post.findByPk(postId).then(post => {
    if (post.userId !== userId) {
      return Notification.create({
        userId,
        postId,
        type: "post"
      });
    }
  });
};

const createReplyNotification = (userId, replyId) => {
  Reply.findByPk(replyId).then(reply => {
    if (reply.userId !== userId) {
      return Notification.create({
        userId,
        replyId,
        type: "reply"
      });
    }
  });
};

module.exports = {
  router,
  createPostNotification,
  createReplyNotification
};
