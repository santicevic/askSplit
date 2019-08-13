"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      header: DataTypes.STRING,
      body: DataTypes.STRING
    },
    {}
  );
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.belongsToMany(models.User, {
      through: "UserPostVotes",
      as: "posts",
      foreignKey: "postId",
      otherKey: "userId"
    });
  };
  return Post;
};
