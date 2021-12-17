import * as userService from "../../services/userService.js";
import { bcrypt } from "../../deps.js";

const showLoginForm = ({ render }) => {
  render("partials/login.eta");
};

const processLogin = async ({ request, response, render, state }) => {
  const body = request.body({ type: "form" });
  const params = await body.value;
  const data = {
    email: params.get("email"),
    password: params.get("password"),
  };
  const userFromDatabase = await userService.findUserByEmail(
    data.email,
  );
  if (userFromDatabase.length != 1) {
    //ERROR
    data.error = "Email does not exist.";
    render("partials/login.eta", data);
    return;
  }

  const user = userFromDatabase[0];
  const passwordMatches = await bcrypt.compare(
    data.password,
    user.password,
  );

  if (!passwordMatches) {
    data.error = "Password is incorrect.";
    render("partials/login.eta", data);
    return;
  }

  await state.session.set("user", user);
  response.redirect("/questions");
};

export { processLogin, showLoginForm };
