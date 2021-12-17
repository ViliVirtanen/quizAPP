import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const randomQuiz = async ({ user, render, response }) => {
  const quest = await questionService.randomQuestion();
  const data = {
    user: user,
  };
  if (quest.length > 0) {
    response.redirect(`/quiz/${quest[0].id}`);
  } else {
    data.error = "There is no questions yet";
    render("partials/quiz.eta", data);
  }
};

const quiz = async ({ params, user, render }) => {
  const questData = await questionService.getForQuiz(params.id);
  const options = await answerService.listOptions(params.id);
  const data = {
    user: user,
    id: params.id,
    title: questData.title,
    text: questData.question_text,
    opt: options,
  };
  render("partials/quiz.eta", data);
};

const answer = async ({ params, user, response }) => {
  const correct = await answerService.findCorrect(params.id);
  if (correct && correct.length > 0) {
    if (Number(correct[0].id) === Number(params.optionId)) {
      await answerService.addQuizAns(params.id, params.optionId, user.id, true);
      response.redirect(`/quiz/${params.id}/correct`);
    } else {
      await answerService.addQuizAns(
        params.id,
        params.optionId,
        user.id,
        false,
      );
      response.redirect(`/quiz/${params.id}/incorrect`);
    }
  }
};
const renderCorrect = ({ render, user }) => {
  render("partials/answer.eta", { user: user });
};
const renderinCorrect = async ({ params, render, user }) => {
  const correct = await answerService.findCorrect(params.id);
  if (correct && correct.length > 0) {
    const data = {
      opt: correct[0].option_text,
      user: user,
    };
    render("partials/answer.eta", data);
  }
};
export { answer, quiz, randomQuiz, renderCorrect, renderinCorrect };
