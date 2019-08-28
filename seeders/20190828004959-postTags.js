"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("PostTags", [
      {
        postId: 1,
        tagId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 1,
        tagId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 1,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 2,
        tagId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 2,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 3,
        tagId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 3,
        tagId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 3,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 4,
        tagId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 5,
        tagId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 5,
        tagId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 5,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 6,
        tagId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 6,
        tagId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 7,
        tagId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 7,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 7,
        tagId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 8,
        tagId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 9,
        tagId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 9,
        tagId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 10,
        tagId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 10,
        tagId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 10,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 11,
        tagId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 11,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 12,
        tagId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 12,
        tagId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 12,
        tagId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 13,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 13,
        tagId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 14,
        tagId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 15,
        tagId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 15,
        tagId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 15,
        tagId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 16,
        tagId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 16,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 17,
        tagId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 17,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 18,
        tagId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 18,
        tagId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        postId: 18,
        tagId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("PostTags", null, {});
  }
};
