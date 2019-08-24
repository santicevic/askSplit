const Router = require("express").Router;
const User = require("../models").User;
const authorizationHelper = require("../helpers/authorizationHelper");
const multer = require("multer");

const router = Router();

const storage = multer.diskStorage({
  destination: (res, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 5
  },
  fileFilter
});

router.patch(
  "/users",
  authorizationHelper.verifyUser,
  upload.single("userImage"),
  (req, res, next) => {
    User.update({ userImage: req.file.path }, { where: { id: req.data.id } })
      .then(() => {
        res.status(202).send();
      })
      .catch(error => {
        res.status(400).send();
      });
  }
);

module.exports = router;
