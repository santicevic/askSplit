"use strict";
module.exports = (sequelize, DataTypes) => {
  const ReplyComment = sequelize.define(
    "ReplyComment",
    {
      body: DataTypes.TEXT
    },
    {}
  );
  ReplyComment.associate = function(models) {
    // associations can be defined here
    ReplyComment.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });
    ReplyComment.belongsTo(models.Reply, {
      foreignKey: "replyId",
      onDelete: "CASCADE"
    });
  };
  return ReplyComment;
};
