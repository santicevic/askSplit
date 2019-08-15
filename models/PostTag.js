"use strict";
module.exports = (sequelize, DataTypes) => {
  const PostTag = sequelize.define(
    "PostTag",
    {
      postId: { type: DataTypes.INTEGER, allowNull: false },
      tagId: { type: DataTypes.INTEGER, allowNull: false }
    },
    {}
  );
  PostTag.associate = function(models) {
    // associations can be defined here
  };
  return PostTag;
};
