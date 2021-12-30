const db = require("../models");
const { question: Question, score: Score } = db;

exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

// exports.moderatorBoard = (req, res) => {
//   res.status(200).send("Moderator Content.");
// };

exports.getNumberQuestions = (req, res) => {
  Question.count()
    .then(async (number) => {
      if (!number) {
        return res.status(404).send({ message: "Question Not found." });
      }
      return res.status(200).json({
        total: number
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getQuestion = (req, res) => {
  Question.findByPk(req.params.id)
    .then(async (question) => {
      if (!question) {
        return res.status(404).send({ message: "Question Not found." });
      }
      return res.status(200).json({
        id: question.id,
        question: question.question,
        answers: question.answers,
        multi: question.multi,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.getAllQuestions = (req, res) => {
  Question.findAll()
    .then(async (questions) => {
      if (!questions) {
        return res.status(404).send({ message: "Question Not found." });
      }
      return res.status(200).json(questions);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.addQuestion = (req, res) => {
  Question.create({
    question: req.body.question,
    answers: req.body.answers,
    multi: req.body.multi,
    correctAnswer: req.body.correctAnswer,
  })
    .then(() => {
      res.status(200).send({ message: "Question was added successfully" });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.editQuestion = (req, res) => {
  Question.findByPk(req.params.id)
    .then(async (question) => {
      if (!question) {
        return res.status(404).send({ message: "Question Not found." });
      }
      Question.update(
        {
          question: req.body.question,
          answers: req.body.answers,
          multi: req.body.multi,
          correctAnswer: req.body.correctAnswer,
        },
        { where: { id: req.params.id } }
      ).then(async (question) => {
        return res
          .status(200)
          .send({ message: "Question was edited successfully" });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.deleteQuestion = (req, res) => {
  Question.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then(() =>
      res.status(200).send({ message: "Question was deleted successfully" })
    )
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.saveScore = (req, res) => {
  Score.create({
    score: req.body.score,
    userId: req.body.id,
  })
    .then((result) => {
      res.status(200).send({message: "Result was saved"  });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
