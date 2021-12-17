import { executeQuery } from "../database/database.js";

const userAnswers = async (userId) => {
  const all = await executeQuery(
    "SELECT COUNT(user_id) as count FROM question_answers WHERE user_id=$1",
    userId,
  );
  const correct = await executeQuery(
    "SELECT COUNT(user_id) as count FROM question_answers WHERE user_id=$1 AND correct=$2",
    userId,
    true,
  );
  return { all: all.rows, correct: correct.rows };
};

const listMostPoints = async () => {
  const res = await executeQuery(
    `SELECT users.email as email, count(*) as count FROM users
        JOIN question_answers ON users.id = question_answers.user_id
        GROUP BY users.email
        ORDER BY count DESC
        LIMIT 5`,
  );
  return res.rows;
};

const userQuestionsAnswers = async (userId) => {
  const res = await executeQuery(
    `SELECT COUNT(*) as count FROM questions
     JOIN question_answers ON questions.id=question_answers.question_id
     WHERE questions.user_id=$1 
    `,
    userId,
  );
  return res.rows[0];
};

export { listMostPoints, userAnswers, userQuestionsAnswers };
