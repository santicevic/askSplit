const Router = require("express").Router;
const Post = require("../models").Post;
const User = require("../models").User;
const Tag = require("../models").Tag;
const Reply = require("../models").Reply;
const PostTag = require("../models").PostTag;
const PostVote = require("../models").PostVote;
const ReplyVote = require("../models").ReplyVote;
const ReplyComment = require("../models").ReplyComment;
const authorizationHelper = require("../helpers/authorizationHelper");
const voteHelper = require("../helpers/voteHelper");

const router = Router();

router.get("/:offset/:limit", (req, res) => {
  const tagFilter =
    req.query.tagName === "None"
      ? null
      : { where: { name: req.query.tagName } };

  Post.findAll({
    include: [{ model: Tag, ...tagFilter }, PostVote, User],
    offset: req.params.offset,
    limit: req.params.limit,
    ...tagFilter
  })
    .then(posts => {
      res.status(200).send(posts);
    })
    .catch(error => res.status(400).send());
});

router.get("/:postId", (req, res) => {
  Post.findByPk(req.params.postId, {
    include: [
      Tag,
      User,
      {
        model: Reply,
        include: [User, ReplyVote, { model: ReplyComment, include: [User] }]
      },
      { model: PostVote, include: [User] }
    ]
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
        body: req.body.body,
        score: 0
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

router.delete("/", authorizationHelper.verifyAdmin, (req, res) => {
  Post.destroy({ where: { id: req.body.postId } })
    .then(() => {
      res.status(204).send();
    })
    .catch(error => {
      res.status(400).send();
    });
});

router.post("/votes", authorizationHelper.verifyUser, (req, res) => {
  PostVote.findOne({
    where: {
      postId: req.body.postId,
      userId: req.data.id
    }
  }).then(userPost => {
    if (userPost) {
      if (userPost.isUp === req.body.isUp) {
        userPost
          .destroy()
          .then(() => {
            const operation = req.body.isUp ? "decrement" : "increment";
            return voteHelper.updateScore(req.body.postId, Post, operation);
          })
          .then(() => {
            res.status(204);
            res.end();
          });
      } else {
        userPost.isUp = !userPost.isUp;
        userPost
          .save()
          .then(editedUserPost => {
            const operation = req.body.isUp ? "increment" : "decrement";
            return voteHelper.updateScore(req.body.postId, Post, operation, 2);
          })
          .then(() => {
            res.status(202).send();
          });
      }
    } else {
      PostVote.create({
        ...req.body,
        userId: req.data.id
      })
        .then(postVote => {
          const operation = req.body.isUp ? "increment" : "decrement";
          return voteHelper.updateScore(req.body.postId, Post, operation);
        })
        .then(() => {
          res.status(201).send();
        });
    }
  });
});

module.exports = router;
