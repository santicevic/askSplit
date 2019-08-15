"use strict";
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define(
    "Tag",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      }
    },
    {}
  );
  Tag.associate = function(models) {
    // associations can be defined here
    Tag.belongsToMany(models.Post, {
      through: models.PostTag,
      foreignKey: "tagId",
      otherKey: "postId"
    });
  };
  return Tag;
};
