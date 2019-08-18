"use strict";
module.exports = (sequelize, DataTypes) => {
  const ReplyVote = sequelize.define(
    "ReplyVote",
    {
      userId: DataTypes.INTEGER,
      replyId: DataTypes.INTEGER,
      isUp: DataTypes.BOOLEAN
    },
    {}
  );
  ReplyVote.associate = function(models) {
    // associations can be defined here
    ReplyVote.belongsTo(models.User, { foreignKey: "userId" });
    ReplyVote.belongsTo(models.Reply, { foreignKey: "replyId" });
  };
  return ReplyVote;
};
