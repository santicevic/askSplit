"use strict";
module.exports = (sequelize, DataTypes) => {
  const PostVote = sequelize.define(
    "PostVote",
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      isUp: DataTypes.BOOLEAN
    },
    {}
  );
  PostVote.associate = function(models) {
    // associations can be defined here
    PostVote.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    PostVote.belongsTo(models.Post, {
      foreignKey: "postId",
      onDelete: "CASCADE"
    });
  };
  return PostVote;
};
