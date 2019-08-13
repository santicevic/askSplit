const Router = require("express").Router;
const Post = require("../models").Post;
const User = require("../models").User;
const UserPostVote = require("../models").UserPostVote;

const router = Router();

router.get("/", (req, res) => {
  Post.findAll({ include: [User] }).then(posts => {
    res.send(posts);
  });
});

router.post("/", (req, res) => {
  User.findByPk(req.body.userId).then(user => {
    user
      .createPost({
        header: req.body.header,
        body: req.body.body
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
