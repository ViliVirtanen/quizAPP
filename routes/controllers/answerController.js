// deno-lint-ignore-file
import * as answerService from "../../services/answerService.js";
import { validasaur } from "../../deps.js";
import { getQuestion } from "../../services/questionService.js";

const questionValidation = {
  option_text: [validasaur.required, validasaur.minLength(1)],
};

const addOption = async ({ params, request, response, user, render }) => {
  const body = request.body({ type: "form" });
  const param = await body.value;
  const quest = await getQuestion(params.id, user.id);
  const data = {
    user: user,
    title: quest.title,
    question_text: quest.question_text,
    id: params.id,
    option_text: param.get("option_text"),
    isCorrect: false,
    options: await answerService.listOptions(params.id),
  };
  if (param.get("is_correct")) data.isCorrect = true;
  const [passes, errors] = await validasaur.validate(data, questionValidation);
  if (!passes) {
    data.validErrors = errors;
    render("partials/question.eta", data);
  } else if (await answerService.hasCorrect(params.id) && data.isCorrect) {
    data.hasCorr =
      "This question already has a correct answer. You can still submit false anwers.";
    render("partials/question.eta", data);
  } else {
    await answerService.addAnswer(data.id, data.option_text, data.isCorrect);
    response.redirect(`/questions/${params.id}`);
  }
};

const listOptions = async ({ params, user, render }) => {
  const quest = await getQuestion(params.id, user.id);
  const data = {
    user: user,
    id: params.id,
    title: quest.title,
    question_text: quest.question_text,
    options: await answerService.listOptions(params.id),
  };
  render("partials/question.eta", data);
};

const removeOption = async ({ params, response }) => {
  const opt_id = params.optionId;
  const qID = params.questionId;
  await answerService.removeOption(opt_id);
  response.redirect(`/questions/${qID}`);
};

export { addOption, listOptions, removeOption };
