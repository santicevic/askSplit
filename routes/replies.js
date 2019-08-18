const Router = require("express").Router;
const Reply = require("../models").Reply;
const ReplyVote = require("../models").ReplyVote;
const authorizationHelper = require("../helpers/authorizationHelper");

const router = Router();

router.post("/", authorizationHelper.verifyUser, (req, res) => {
  Reply.create({
    body: req.body.reply,
    postId: req.body.postId,
    userId: req.data.id
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
        userReply.destroy().then(() => {
          res.status(204).send();
        });
      } else {
        userReply.isUp = !userReply.isUp;
        userReply.save().then(editedUserReply => {
          res.status(202).send(editedUserReply);
        });
      }
    } else {
      ReplyVote.create({
        ...req.body,
        userId: req.data.id
      }).then(userReplyVote => {
        res.status(201).send(userReplyVote);
      });
    }
  });
});

router.get("/scores/:replyId", async (req, res) => {
  Promise.all([
    ReplyVote.count({
      where: {
        replyId: req.params.replyId,
        isUp: true
      }
    }),
    ReplyVote.count({
      where: {
        replyId: req.params.replyId,
        isUp: false
      }
    })
  ])
    .then(votes => {
      res.status(200).send({ upVote: votes[0], downVote: votes[1] });
    })
    .catch(error => {
      res.status(400).send();
    });
});

module.exports = router;
