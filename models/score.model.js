module.exports = (sequelize, Sequelize) => {
  const Score = sequelize.define("scores", {
    score: {
      type: Sequelize.INTEGER
    },
  });

  return Score;
};