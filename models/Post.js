"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      header: {
        type: DataTypes.STRING,
        allowNull: false
      },
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      update: DataTypes.STRING
    },
    {}
  );
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.hasMany(models.Reply, { foreignKey: "postId" });
    Post.belongsToMany(models.User, {
      through: models.UserPostVote,
      foreignKey: "postId",
      otherKey: "userId"
    });
    Post.belongsToMany(models.Tag, {
      through: models.PostTag,
      foreignKey: "postId",
      otherKey: "tagId"
    });
  };
  return Post;
};
