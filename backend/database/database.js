const mysql = require('mysql');

// Membuat koneksi ke database
const connection = mysql.createConnection({
  host: 'LAPTOP-V14RGQ8S',
  user: 'root',
  password: '',
  database: 'gptkw'
});

// Function to add a new question and answer to the database
function addQuestion(question, answer) {
  return new Promise((resolve, reject) => {
    // Check if the question already exists in the database
    connection.query(
      'SELECT * FROM questions WHERE question = ?',
      [question],
      (error, results) => {
        if (error) reject(error);

        // If the question exists, update its answer
        if (results.length > 0) {
          connection.query(
            'UPDATE questions SET answer = ? WHERE question = ?',
            [answer, question],
            (error, results) => {
              if (error) reject(error);
              console.log('Answer updated for question:', question);
              resolve();
            }
          );
        } // If the question doesn't exist, add a new question and answer
        else {
          connection.query(
            'INSERT INTO questions (question, answer) VALUES (?, ?)',
            [question, answer],
            (error, results) => {
              if (error) reject(error);
              console.log('Question added to database:', question);
              resolve();
            }
          );
        }
      }
    );
  });
}

// Function to delete a question from the database
function deleteQuestion(question) {
  return new Promise((resolve, reject) => {
    connection.query("DELETE FROM questions WHERE question LIKE ?", [question], (err, result) => {
      if (err) reject(err);
      console.log(`${result.affectedRows} question(s) deleted from database!`);
      resolve();
    });
  });
}

// Function to get the answer for a given question
function getAnswer(question) {
  return new Promise((resolve, reject) => {
    // Query to search for the answer based on the question
    const sql = "SELECT answer FROM questions WHERE question = ?";

    // Execute the query with the question parameter
    connection.query(sql, [question], function (error, results) {
      if (error) reject(error);

      // If an answer is found, return it
      if (results.length > 0) {
        const answer = results[0].answer;
        console.log(answer);
        resolve(answer);
      } else {
        // If no answer is found, return an error message
        resolve("Maaf, saya tidak tahu jawabannya.");
      }
    });
  });
}

// Function to get all questions from the database
function getAllQuestions() {
  return new Promise((resolve, reject) => {
    connection.query('SELECT question FROM questions', (error, results, fields) => {
      if (error) reject(error);
      const questions = results.map(row => row.question);
      resolve(questions);
    });
  });
}

// Example of use
// async function main() {
//   const question = "What is the capital of France?";
//   await deleteQuestion("When is the capital of France?");
//   questions = await getAllQuestions();
//   console.log(questions);
//   await addQuestion("What is the capital of France?", "Paris")
//   answer = await getAnswer(question);
//   console.log("here:" + answer);
//   questions = await getAllQuestions();
//   console.log(questions);
//   connection.end();
// }

// Panggil fungsi main untuk memulai program
main();