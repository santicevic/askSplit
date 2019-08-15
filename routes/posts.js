const Router = require("express").Router;
const Post = require("../models").Post;
const User = require("../models").User;
const Reply = require("../models").Reply;
const UserPostVote = require("../models").UserPostVote;
const authorizationHelper = require("../helpers/authorizationHelper");

const router = Router();

router.get("/", (req, res) => {
  Post.findAll({ include: [User] }).then(posts => {
    res.send(posts);
  });
});

router.post("/", authorizationHelper.verifyUser, (req, res) => {
  User.findByPk(req.data.id).then(user => {
    if (!user) {
      res.status(401).send();
    }
    user
      .createPost({
        header: req.body.header,
        body: req.body.body,
        tag: req.body.tag
      })
      .then(post => {
        res.send(post);
        res.end();
      });
  });
});

router.post("/reaction", (req, res) => {
  UserPostVote.findOne({
    where: {
      postId: req.body.postId,
      userId: req.body.userId
    }
  }).then(userPost => {
    if (userPost) {
      if (userPost.isUp === req.body.isUp) {
        userPost.destroy().then(() => {
          res.status(204);
          res.end();
        });
      } else {
        userPost.isUp = !userPost.isUp;
        userPost.save().then(editedUserPost => {
          res.status(202).send(editedUserPost);
          res.end();
        });
      }
    } else {
      UserPostVote.create({
        ...req.body
      }).then(userPostVote => {
        res.status(201).send(userPostVote);
        res.end();
      });
    }
  });
});

router.get("/score/:id", async (req, res) => {
  const [upVotes, downVotes] = await Promise.all([
    UserPostVote.count({
      where: {
        postId: req.params.id,
        isUp: true
      }
    }),
    UserPostVote.count({
      where: {
        postId: req.params.id,
        isUp: false
      }
    })
  ]);

  res.send({ upVotes, downVotes });
  res.end();
});

module.exports = router;
