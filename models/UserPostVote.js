"use strict";
module.exports = (sequelize, DataTypes) => {
  const UserPostVote = sequelize.define(
    "UserPostVote",
    {
      userId: DataTypes.INTEGER,
      postId: DataTypes.INTEGER,
      isUp: DataTypes.BOOLEAN
    },
    {}
  );
  UserPostVote.associate = function(models) {
    // associations can be defined here
  };
  return UserPostVote;
};
