import * as statService from "../../services/statService.js";

const showStats = async ({ user, render }) => {
  const answered = await statService.userAnswers(user.id);
  const mostAns = await statService.listMostPoints();
  const userQuestions = await statService.userQuestionsAnswers(user.id);
  const data = {
    user: user,
    answered: answered.all[0],
    correct: answered.correct[0],
    questData: userQuestions,
    fiveMost: mostAns,
  };
  render("partials/stats.eta", data);
};

export { showStats };
