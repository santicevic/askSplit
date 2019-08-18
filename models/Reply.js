"use strict";
module.exports = (sequelize, DataTypes) => {
  const Reply = sequelize.define(
    "Reply",
    {
      body: DataTypes.STRING
    },
    {}
  );
  Reply.associate = function(models) {
    // associations can be defined here
    Reply.belongsTo(models.User, { foreignKey: "userId" });
    Reply.belongsTo(models.Post, { foreignKey: "postId" });
    Reply.hasMany(models.ReplyVote, { foreignKey: "replyId" });
  };
  return Reply;
};
