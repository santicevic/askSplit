const Router = require("express").Router;
const Reply = require("../models").Reply;
const UserReplyVote = require("../models").UserReplyVote;

const router = Router();

router.get("/", (req, res) => {
  Reply.findAll().then(replies => {
    res.status(200).send(replies);
    res.end();
  });
});

router.post("/", (req, res) => {
  Reply.create({
    ...req.body
  }).then(reply => {
    res.status(201).send(reply);
    res.end();
  });
});

router.post("/reaction", (req, res) => {
  UserReplyVote.findOne({
    where: {
      replyId: req.body.replyId,
      userId: req.body.userId
    }
  }).then(userReply => {
    if (userReply) {
      if (userReply.isUp === req.body.isUp) {
        userReply.destroy().then(() => {
          res.status(204);
          res.end();
        });
      } else {
        userReply.isUp = !userReply.isUp;
        userReply.save().then(editedUserReply => {
          res.status(202).send(editedUserReply);
          res.end();
        });
      }
    } else {
      UserReplyVote.create({
        ...req.body
      }).then(userReplyVote => {
        res.status(201).send(userReplyVote);
        res.end();
      });
    }
  });
});

router.get("/score/:id", async (req, res) => {
  const [upVotes, downVotes] = await Promise.all([
    UserReplyVote.count({
      where: {
        replyId: req.params.id,
        isUp: true
      }
    }),
    UserReplyVote.count({
      where: {
        replyId: req.params.id,
        isUp: false
      }
    })
  ]);

  res.send({ upVotes, downVotes });
  res.end();
});

module.exports = router;
