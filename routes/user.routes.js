const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);

  // app.get(
  //   "/api/test/mod",
  //   [authJwt.verifyToken, authJwt.isModerator],
  //   controller.moderatorBoard
  // );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  app.get("/api/questions/total", [authJwt.verifyToken], controller.getNumberQuestions);
  app.get("/api/question/:id", [authJwt.verifyToken], controller.getQuestion);
  app.get("/api/questions", [authJwt.verifyToken], controller.getAllQuestions);
  app.post(
    "/api/question",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.addQuestion
  );
  app.put(
    "/api/question/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.editQuestion
  );
  app.delete(
    "/api/question/:id",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.deleteQuestion
  );

  app.post("/api/saveResult", controller.saveScore)
};
