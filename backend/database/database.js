const mysql = require('mysql');

// Membuat koneksi ke database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'mydatabase'
});

async function addQuestion(question, answer) {
    const existingQuestion = await pool.query("SELECT * FROM questions WHERE question = $1", [question]);
  
    if (existingQuestion.rows.length > 0) {
      // Jika pertanyaan sudah ada, maka hanya jawaban yang akan diperbarui
      await pool.query("UPDATE questions SET answer = $1 WHERE question = $2", [answer, question]);
      return "Jawaban untuk pertanyaan ini telah diperbarui.";
    } else {
      // Jika pertanyaan belum ada, maka ditambahkan ke database
      await pool.query("INSERT INTO questions (question, answer) VALUES ($1, $2)", [question, answer]);
      return "Pertanyaan baru berhasil ditambahkan.";
    }
  }
  

function deleteQuestion(question) {
    const query = `DELETE FROM questions WHERE question_text LIKE '%${question}%'`;
  
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
  

// Menutup koneksi ke database
connection.end();
