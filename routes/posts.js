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

router.get("/votes/:postId", authorizationHelper.verifyUser, (req, res) => {
  UserPostVote.findOne({
    where: { userId: req.data.id, postId: req.params.postId }
  })
    .then(vote => {
      res.status(200).send(vote);
    })
    .catch(error => res.status(400).send());
});

router.get("/scores/:postId", (req, res) => {
  Promise.all([
    UserPostVote.count({
      where: {
        postId: req.params.postId,
        isUp: true
      }
    }),
    UserPostVote.count({
      where: {
        postId: req.params.postId,
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

router.get("/:postId", (req, res) => {
  Post.findByPk(req.params.postId, {
    include: [Tag, User, { model: Reply, include: User }]
  })
    .then(post => {
      res.status(200).send(post);
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

router.patch("/", authorizationHelper.verifyUser, (req, res) => {
  if (req.body.User.id !== req.data.id) {
    res.status(401).send();
    return;
  }

  Post.update(
    { update: req.body.update },
    { where: { id: req.body.id }, returning: true }
  )
    .then(response => {
      res.status(202).send(response[1][0]);
    })
    .catch(error => {
      res.status(400).send();
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

module.exports = router;
