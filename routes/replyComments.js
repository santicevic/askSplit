const Router = require("express").Router;
const ReplyComment = require("../models").ReplyComment;
const authorizationHelper = require("../helpers/authorizationHelper");

const router = Router();

router.post("/", authorizationHelper.verifyUser, (req, res) => {
  ReplyComment.create({
    body: req.body.replyComment,
    replyId: req.body.replyId,
    userId: req.data.id
  })
    .then(replyComment => {
      res.status(201).send(replyComment);
    })
    .catch(error => {
      res.status(400).send();
    });
});

module.exports = router;
