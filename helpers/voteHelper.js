const updateScore = (itemId, model, operation, by = 1) => {
  return model[operation]("score", {
    by,
    where: { id: itemId }
  });
};

module.exports = {
  updateScore
};
