"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserPostVote = sequelize.define(
    "UserPostVote",
    {
      userId: DataTypes.NUMBER,
      postId: DataTypes.NUMBER,
      isUp: DataTypes.BOOLEAN
    },
    {}
  );
  UserPostVote.associate = function(models) {
    // associations can be defined here
  };
  return UserPostVote;
};
