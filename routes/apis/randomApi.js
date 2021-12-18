import * as questionService from "../../services/questionService.js";
import * as answerService from "../../services/answerService.js";

const getRandApi = async ({ response }) => {
  const quest = await questionService.randomQuestion();
  if (quest[0]) {
    const options = await answerService.listOptions(quest[0].id);
    for (let i = 0; i < options.length; i++) {
      delete options[i].question_id;
      options[i].optionId = options[i].id;
      delete options[i].id;
      options[i].optionText = options[i].option_text;
      delete options[i].option_text;
      delete options[i].is_correct;
    }
    const data = {
      questionId: quest[0].id,
      questionTitle: quest[0].title,
      questionText: quest[0].question_text,
      answerOptions: options,
    };
    response.body = data;
  } else {
    response.body = {};
  }
};

const apiAnswer = async ({ request, response }) => {
  const body = request.body({ type: "json" });
  const document = await body.value;

  const corr = await answerService.findCorrect(document.questionId);
  if (Number(corr[0].id) === Number(document.optionId)) {
    response.body = { correct: true };
  } else {
    response.body = { correct: false };
  }
};
export { apiAnswer, getRandApi };
