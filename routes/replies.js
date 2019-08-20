const Router = require("express").Router;
const Reply = require("../models").Reply;
const User = require("../models").User;
const ReplyVote = require("../models").ReplyVote;
const ReplyComment = require("../models").ReplyComment;
const authorizationHelper = require("../helpers/authorizationHelper");

const router = Router();

router.post("/", authorizationHelper.verifyUser, (req, res) => {
  Reply.create({
    body: req.body.reply,
    postId: req.body.postId,
    userId: req.data.id,
    score: 0
  })
    .then(reply => {
      res.status(201).send(reply);
      res.end();
    })
    .catch(error => {
      res.status(400).send();
    });
});

router.post("/votes", authorizationHelper.verifyUser, (req, res) => {
  ReplyVote.findOne({
    where: {
      replyId: req.body.replyId,
      userId: req.data.id
    }
  }).then(userReply => {
    if (userReply) {
      if (userReply.isUp === req.body.isUp) {
        userReply
          .destroy()
          .then(() => {
            if (req.body.isUp) {
              return Reply.decrement("score", {
                where: { id: req.body.replyId }
              });
            } else {
              return Reply.increment("score", {
                where: { id: req.body.replyId }
              });
            }
          })
          .then(() => {
            res.status(204).send();
          });
      } else {
        userReply.isUp = !userReply.isUp;
        userReply
          .save()
          .then(editedUserReply => {
            if (editedUserReply.isUp) {
              return Reply.increment("score", {
                by: 2,
                where: { id: req.body.replyId }
              });
            } else {
              return Reply.decrement("score", {
                by: 2,
                where: { id: req.body.replyId }
              });
            }
          })
          .then(() => {
            res.status(202).send();
          });
      }
    } else {
      ReplyVote.create({
        ...req.body,
        userId: req.data.id
      })
        .then(replyVote => {
          if (req.body.isUp) {
            return Reply.increment("score", {
              where: { id: req.body.replyId }
            });
          } else {
            return Reply.decrement("score", {
              where: { id: req.body.replyId }
            });
          }
        })
        .then(() => {
          res.status(201).send();
        });
    }
  });
});

router.get("/:replyId", (req, res) => {
  Reply.findByPk(req.params.replyId, {
    include: [User, ReplyVote, { model: ReplyComment, include: [User] }]
  })
    .then(reply => {
      res.status(200).send(reply);
    })
    .catch(error => res.status(400).send());
});

module.exports = router;
