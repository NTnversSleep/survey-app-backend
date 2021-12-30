module.exports = (sequelize, Sequelize) => {
  const Question = sequelize.define("questions", {
    question: {
      type: Sequelize.STRING,
    },
    answers: {
      type: Sequelize.JSON,
    },
    multi: {
      type: Sequelize.BOOLEAN,
    },
    correctAnswer: {
      type: Sequelize.STRING,
    },
  });
  return Question;
};
