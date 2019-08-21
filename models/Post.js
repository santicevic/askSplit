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
      score: {
        type: DataTypes.INTEGER,
        default: 0
      },
      update: DataTypes.STRING
    },
    {}
  );
  Post.associate = function(models) {
    // associations can be defined here
    Post.belongsTo(models.User, { foreignKey: "userId" });
    Post.hasMany(models.PostVote, { foreignKey: "postId" });
    Post.hasMany(models.Reply, { foreignKey: "postId", onDelete: "cascade" });
    Post.belongsToMany(models.Tag, {
      through: models.PostTag,
      foreignKey: "postId",
      otherKey: "tagId"
    });
  };
  return Post;
};
