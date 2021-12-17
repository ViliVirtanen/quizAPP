import { executeQuery } from "../database/database.js";

const addQuestions = async (id, title, text) => {
  await executeQuery(
    "INSERT INTO questions (user_id, title, question_text) VALUES ($1, $2, $3)",
    id,
    title,
    text,
  );
};

const listQuestions = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE user_id=$1",
    id,
  );
  return res.rows;
};

const getQuestion = async (id, uId) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE id=$1 AND user_id=$2",
    id,
    uId,
  );
  return res.rows[0];
};

const deleteQuestion = async (id, uId) => {
  await executeQuery(
    "DELETE FROM questions WHERE id=$1 AND user_id=$2",
    id,
    uId,
  );
};
const randomQuestion = async () => {
  const res = await executeQuery(
    "SELECT * FROM questions ORDER BY random() LIMIT 1",
  );
  return res.rows;
};
const getForQuiz = async (id) => {
  const res = await executeQuery(
    "SELECT * FROM questions WHERE id=$1",
    id,
  );
  return res.rows[0];
};

export {
  addQuestions,
  deleteQuestion,
  getForQuiz,
  getQuestion,
  listQuestions,
  randomQuestion,
};
