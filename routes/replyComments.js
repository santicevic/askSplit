const Router = require("express").Router;
const ReplyComment = require("../models").ReplyComment;
const authorizationHelper = require("../helpers/authorizationHelper");
const notifications = require("./notifications");

const router = Router();

router.post("/", authorizationHelper.verifyUser, (req, res) => {
  ReplyComment.create({
    body: req.body.replyComment,
    replyId: req.body.replyId,
    userId: req.data.id
  })
    .then(replyComment => {
      notifications.createReplyNotification(req.data.id, req.body.replyId);
      res.status(201).send(replyComment);
    })
    .catch(error => {
      res.status(400).send();
    });
});

router.delete("/", authorizationHelper.verifyAdmin, (req, res) => {
  ReplyComment.destroy({ where: { id: req.body.commentId } })
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      res.status(400).send();
    });
});

module.exports = router;
