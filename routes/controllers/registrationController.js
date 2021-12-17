import { bcrypt } from "../../deps.js";
import * as userService from "../../services/userService.js";
import { validasaur } from "../../deps.js";

const questionValidation = {
  email: [validasaur.required, validasaur.isEmail],
  password: [validasaur.required, validasaur.minLength(4)],
};

const registerUser = async ({ request, render, response }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const data = {
    email: params.get("email"),
    password: params.get("password"),
  };
  const [passes, errors] = await validasaur.validate(data, questionValidation);

  if (!passes) {
    data.validErrors = errors;
    render("partials/registration.eta", data);
  } else {
    await userService.addUser(
      data.email,
      await bcrypt.hash(data.password),
    );
    response.redirect("/auth/login");
  }
};

const showForm = ({ render }) => {
  render("partials/registration.eta");
};

export { registerUser, showForm };
