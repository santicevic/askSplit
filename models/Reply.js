"use strict";
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    "Reply",
    {
      body: DataTypes.TEXT,
      score: {
        type: DataTypes.INTEGER,
        default: 0
      },
      userId: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  Reply.associate = function(models) {
    // associations can be defined here
    Reply.belongsTo(models.User, { foreignKey: "userId" });
    Reply.belongsTo(models.Post, { foreignKey: "postId" });
    Reply.hasMany(models.ReplyVote, {
      foreignKey: "replyId",
      onDelete: "cascade"
    });
    Reply.hasMany(models.Notification, {
      foreignKey: "replyId",
      onDelete: "cascade"
    });
    Reply.hasMany(models.ReplyComment, {
      foreignKey: "replyId",
      onDelete: "cascade"
    });
  };
  return Reply;
};
