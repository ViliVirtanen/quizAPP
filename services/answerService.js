// deno-lint-ignore-file
import { executeQuery } from "../database/database.js";

const addAnswer = async (q_id, text, isCorrect) => {
  await executeQuery(
    "INSERT INTO question_answer_options (question_id, option_text, is_correct) VALUES ($1,$2,$3)",
    q_id,
    text,
    isCorrect,
  );
};

const hasCorrect = async (q_id) => {
  const res = await executeQuery(
    "SELECT id FROM question_answer_options WHERE question_id=$1 AND is_correct=$2",
    q_id,
    true,
  );
  if (res.rows.length > 0) {
    return true;
  } else {
    return false;
  }
};

const listOptions = async (qid) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id=$1",
    qid,
  );
  return res.rows;
};

const removeOption = async (opt_id) => {
  await executeQuery(
    "DELETE FROM question_answers WHERE question_answer_option_id=$1",
    opt_id,
  );
  await executeQuery("DELETE FROM question_answer_options WHERE id=$1", opt_id);
};

const findCorrect = async (qId) => {
  const res = await executeQuery(
    "SELECT * FROM question_answer_options WHERE question_id=$1 AND is_correct=$2",
    qId,
    true,
  );
  return res.rows;
};
const addQuizAns = async (qId, optId, userId, isCorrect) => {
  await executeQuery(
    "INSERT INTO question_answers (user_id, question_id, question_answer_option_id, correct) VALUES ($1,$2,$3,$4)",
    userId,
    qId,
    optId,
    isCorrect,
  );
};

export {
  addAnswer,
  addQuizAns,
  findCorrect,
  hasCorrect,
  listOptions,
  removeOption,
};
