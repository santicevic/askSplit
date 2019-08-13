"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserReplyVote = sequelize.define(
    "UserReplyVote",
    {
      userId: DataTypes.INTEGER,
      replyId: DataTypes.INTEGER,
      isUp: DataTypes.BOOLEAN
    },
    {}
  );
  UserReplyVote.associate = function(models) {
    // associations can be defined here
  };
  return UserReplyVote;
};
