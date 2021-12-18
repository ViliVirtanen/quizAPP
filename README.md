Quiz app! This app can be used to create and answer multiple option questions.
You need register and login before using the features in this app. You can add
your own questions and the answer options to it. You can see statistics from the
statistic page, which shows top 5 most answers by all the users and statistics
about your answers and questions.

RUN LOCALLY WITH THIS deno run --allow-all --unstable run-locally.js

Then you can open the app by typing http://localhost:7777 to your browser
Remember if you run the app locally you need to add your database credentials to
the database.js file. You can find the working application online here:
https://wsdquizapp.herokuapp.com/

For the tests you can test them in the file tests/test_app.js from the test
buttons over the tests Some of the tests needs your own database credentials to
work correctly. you can add them in database/database.js file to the
connectionPool.

DATABASE COMMANDS TO CREATE THE SQL TABLES USED IN THIS PROJECT BELOW :

CREATE TABLE users ( id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE, password
CHAR(60) );

CREATE TABLE questions ( id SERIAL PRIMARY KEY, user_id INTEGER REFERENCES
users(id), title VARCHAR(256) NOT NULL, question_text TEXT NOT NULL );

CREATE TABLE question_answer_options ( id SERIAL PRIMARY KEY, question_id
INTEGER REFERENCES questions(id), option_text TEXT NOT NULL, is_correct BOOLEAN
DEFAULT false );

CREATE TABLE question_answers ( id SERIAL PRIMARY KEY, user_id INTEGER
REFERENCES users(id), question_id INTEGER REFERENCES questions(id),
question_answer_option_id INTEGER REFERENCES question_answer_options(id),
correct BOOLEAN DEFAULT false );

CREATE UNIQUE INDEX ON users((lower(email)));
