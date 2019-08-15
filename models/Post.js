"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      header: DataTypes.STRING,
      body: DataTypes.TEXT,
      tag: DataTypes.STRING,
      update: DataTypes.STRING
    },
    {}
  );
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.hasMany(models.Reply, { foreignKey: "postId" });
    Post.belongsToMany(models.User, {
      through: "UserPostVotes",
      as: "users",
      foreignKey: "postId",
      otherKey: "userId"
    });
  };
  return Post;
};
