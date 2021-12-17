import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidation = {
  title: [validasaur.required, validasaur.minLength(1)],
  text: [validasaur.required, validasaur.minLength(1)],
};

// turn into data renderer
const questionPage = ({ render }) => {
  render("partials/questions.eta");
};

const addQuestion = async ({ request, response, render, user }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const data = {
    user: user,
    title: params.get("title"),
    text: params.get("question_text"),
  };
  // validation part
  const [passes, errors] = await validasaur.validate(data, questionValidation);

  if (!passes) {
    data.validErrors = errors;
    render("partials/questions.eta", data);
  } else {
    await questionService.addQuestions(user.id, data.title, data.text);
    response.redirect("/questions");
  }
};

const listQuestions = async ({ render, user }) => {
  render("partials/questions.eta", {
    user: user,
    questions: await questionService.listQuestions(user.id),
  });
};

const deleteQuestion = async ({ params, response, user }) => {
  await questionService.deleteQuestion(params.id, user.id);
  response.redirect("/questions");
};
export { addQuestion, deleteQuestion, listQuestions, questionPage };
