const Router = require("express").Router;
const Post = require("../models").Post;
const User = require("../models").User;
const Tag = require("../models").Tag;
const Reply = require("../models").Reply;
const PostTag = require("../models").PostTag;
const UserPostVote = require("../models").UserPostVote;
const authorizationHelper = require("../helpers/authorizationHelper");

const router = Router();

router.get("/", (req, res) => {
  Post.findAll({ include: [User, Tag] })
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(error => res.status(400).send());
});

router.get("/score/:postId", (req, res) => {
  getScore(req.params.postId).then(score => {
    res.status(200).send({ upVote: score[0], downVote: score[1] });
  });
});

router.get("/:postId/:userId", (req, res) => {
  Post.findByPk(req.params.postId, {
    include: [Tag, User, { model: Reply, include: User }]
  })
    .then(post => {
      getScore(post.id).then(scores => {
        getVote(req.params.userId, req.params.postId).then(vote => {
          res.status(200).send({
            post,
            score: { upVote: scores[0], downVote: scores[1] },
            vote
          });
        });
      });
    })
    .catch(error => res.status(400).send());
});

router.post("/", authorizationHelper.verifyUser, (req, res) => {
  if (!Array.isArray(req.body.tags) || req.body.tags.length < 1) {
    res.status(400).end();
    return;
  }
  User.findByPk(req.data.id).then(user => {
    if (!user) {
      res.status(401).end();
    }
    user
      .createPost({
        header: req.body.header,
        body: req.body.body
      })
      .then(post => {
        req.body.tags.forEach(tag => {
          PostTag.create({
            postId: post.id,
            tagId: tag.id
          });
        });
        res.send(post);
        res.end();
      })
      .catch(error => {
        res.status(400).send();
      });
  });
});

router.post("/reaction", authorizationHelper.verifyUser, (req, res) => {
  UserPostVote.findOne({
    where: {
      postId: req.body.postId,
      userId: req.data.id
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
        });
      }
    } else {
      UserPostVote.create({
        ...req.body,
        userId: req.data.id
      }).then(userPostVote => {
        res.status(201).send(userPostVote);
      });
    }
  });
});

function getVote(userId, postId) {
  return UserPostVote.findOne({ where: { userId, postId } });
}

function getScore(postId) {
  return Promise.all([
    UserPostVote.count({
      where: {
        postId,
        isUp: true
      }
    }),
    UserPostVote.count({
      where: {
        postId,
        isUp: false
      }
    })
  ]);
}

module.exports = router;
