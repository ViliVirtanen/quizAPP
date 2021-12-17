import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as questionController from "./controllers/questionController.js";
import * as answerController from "./controllers/answerController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as loginController from "./controllers/loginController.js";
import * as quizController from "./controllers/quizController.js";
import * as statController from "./controllers/statController.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/questions", questionController.listQuestions);
router.post("/questions", questionController.addQuestion);
router.get("/questions/:id", answerController.listOptions);
router.post("/questions/:id/options", answerController.addOption);
router.post(
  "/questions/:questionId/options/:optionId/delete",
  answerController.removeOption,
);
router.post("/questions/:id/delete", questionController.deleteQuestion);

router.get("/auth/register", registrationController.showForm);
router.post("/auth/register", registrationController.registerUser);
router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.get("/quiz", quizController.randomQuiz);
router.get("/quiz/:id", quizController.quiz);
router.post("/quiz/:id/options/:optionId", quizController.answer);
router.get("/quiz/:id/correct", quizController.renderCorrect);
router.get("/quiz/:id/incorrect", quizController.renderinCorrect);

router.get("/statistics", statController.showStats);

export { router };
