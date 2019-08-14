"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { isEmail: true }
      },
      password: DataTypes.STRING,
      role: DataTypes.STRING
    },
    {}
  );
  User.associate = function(models) {
    // associations can be defined here
    User.hasMany(models.Post, { foreignKey: "userId" });
    User.hasMany(models.Reply, { foreignKey: "userId" });
    User.belongsToMany(models.Post, {
      through: "UserPostVotes",
      as: "posts",
      foreignKey: "userId",
      otherKey: "postId"
    });
    User.belongsToMany(models.Reply, {
      through: "UserReplyVotes",
      as: "replies",
      foreignKey: "userId",
      otherKey: "replyId"
    });
  };
  return User;
};
