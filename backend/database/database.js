const mysql = require('mysql');

// Membuat koneksi ke database
const connection = mysql.createConnection({
  host: 'LAPTOP-V14RGQ8S',
  user: 'root',
  password: '',
  database: 'gptkw'
});

async function addQuestion(question, answer) {
    const existingQuestion = await connection.query("SELECT * FROM questions WHERE question like ?", [question]);
  
    if (existingQuestion.length > 0) {
      // Jika pertanyaan sudah ada, maka hanya jawaban yang akan diperbarui
      await connection.query("UPDATE questions SET answer = ? WHERE question = ?", [answer, question]);
      return "Jawaban untuk pertanyaan ini telah diperbarui.";
    } else {
      // Jika pertanyaan belum ada, maka ditambahkan ke database
      await connection.query("INSERT INTO questions (question, answer) VALUES (?, ?)", [question, answer]);
      return "Pertanyaan baru berhasil ditambahkan.";
    }
  }
  

function deleteQuestion(question) {
    const query = `DELETE FROM questions WHERE question LIKE '%${question}%'`;
  
    connection.query(query, (err, result) => {
      if (err) throw err;
      console.log(`${result.affectedRows} question(s) deleted from database!`);
    });
}

function getAnswer(question) {
    // Koneksi ke database di sini
    // Query untuk mencari jawaban berdasarkan pertanyaan
    const sql = "SELECT answer FROM questions WHERE question = ?";
    
    // Jalankan query dengan parameter pertanyaan
    connection.query(sql, [question], function (error, results) {
      if (error) throw error;
      
      // Jika jawaban ditemukan, kembalikan jawaban
      if (results.length > 0) {
        const answer = results[0].answer;
        return answer;
      } else {
        // Jika tidak ada jawaban yang ditemukan, kembalikan pesan error
        return "Maaf, saya tidak tahu jawabannya.";
      }
    });
  }
  

// example of use

// function main() {
//   const question = "When is the independence day of Indonesia?";
//   const answer = "17 August 1945";
  
//   // Panggil fungsi addQuestion untuk menambahkan pertanyaan ke database
//   addQuestion(question, answer)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.error(err);
//     })
//     .finally(() => {
//       // Menutup koneksi ke database setelah selesai
//       connection.end();
//     });

//     getAnswer(question);

//     deleteQuestion("What is the capital of France?");
// }

// // Panggil fungsi main untuk memulai program
// main();
