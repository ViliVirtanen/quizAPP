import { superoak } from "https://deno.land/x/superoak@4.4.0/mod.ts";
import { assertEquals } from "https://deno.land/std@0.113.0/testing/asserts.ts";
import { app } from "../app.js";
import { addUser, findUserByEmail } from "../services/userService.js";
import { addQuestions, listQuestions } from "../services/questionService.js";

Deno.test({
  name: "Test that simple get to root / works",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Test that simple get to /auth/register works",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/auth/register").expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// without logging in you cant access the /questions page
Deno.test({
  name:
    "Test that get request to /questions without logging in redirects the user",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/questions").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "Trying to access specific questions without logging in redirects the user back to login page",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/questions/1").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// without logging in you cant access the /quiz page
Deno.test({
  name: "Test that get request to /quiz without logging in redirects the user",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/quiz").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

// without logging in you cant access the /statistics page
Deno.test({
  name:
    "Test that get request to /statistics without logging in redirects the user",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/statistics").expect(302);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
Deno.test({
  name: "Test that get request to api returns a JSON file",
  async fn() {
    const testClient = await superoak(app);
    await testClient.get("/api/questions/random")
      .expect(200)
      .expect("Content-Type", new RegExp("application/json"));
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name: "Sending email and password in register should work",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/auth/register")
      .send("email=testCase@asd.com password=testPass")
      .expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

//This test can be run only once, because of the the database constraints.
// if you want to test again, change the email in addUser function and change the assertEquals email to the changed email.
// you also need to add your database credentials to the database.js file connectionPool in /database/database.js
Deno.test({
  name:
    "AddUser should add the user to the database and findUserByEmail should find the correct user.",
  async fn() {
    await addUser("testEmail@gmail.com", "testTest");
    const user = await findUserByEmail("testEmail@gmail.com");
    assertEquals(user[0].email, "testEmail@gmail.com");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

//This test can be run only once, because of the the database constraints.
// if you want to test again, change the email in addUser function and change the assertEquals email to the changed email.
// you also need to add your database credentials to the database.js file connectionPool in /database/database.js

Deno.test({
  name:
    "Adding question for created user should add the question to the database",
  async fn() {
    await addUser("testForquestions@gmail.com", "testTest");
    const user = await findUserByEmail("testEmail@gmail.com");
    await addQuestions(user[0].id, "TestTitle", "Does this test work?");
    const question = await listQuestions(user[0].id);
    assertEquals(question[0].question_text, "Does this test work?");
  },
  sanitizeResources: false,
  sanitizeOps: false,
});

Deno.test({
  name:
    "Sending only email in login should not redirect, only reload the login page",
  async fn() {
    const testClient = await superoak(app);
    await testClient.post("/auth/login")
      .send("email=testCase@asd.com")
      .expect(200);
  },
  sanitizeResources: false,
  sanitizeOps: false,
});
