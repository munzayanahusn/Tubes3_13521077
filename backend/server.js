
const express = require('express');
const cors = require('cors');
const db = require('./database/database.js')

const app = express();

app.use(cors());
app.use(express.json());

var question = ""

// app.get('/history', (req, res) => {
//     res.json({ history: "Hello from server!" });
// });

app.post('/URL', async (req, res) => {
    question = req.body.isiChat
    algo = req.body.algorithm
    res.json({ answer: await getAnswer(algo, question) });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});

async function getAnswer(algo, question) {
    if (algo == "KMP") {
        // arrQuest = await db.getAllQuestions();
        // found, result = searchQuestionKMP(arrQuest, question);
        // if (found) return db.getAnswer(result);
        // else return result; // Top 3 question termirip
        return question+"-sdasds"
    } else if (algo == "BM") {
        // arrQuest = await db.getAllQuestions();
        // found, result = searchQuestionBM(arrQuest, question);
        // if (found) return db.getAnswer(result);
        // else return result; // Top 3 question termirip
    } else if (algo == "Date") {
        // return getDay(question);
    } else if (algo == "Calculator") {
        // return calculate(question);
    } else {
        return question+"-BManswer";
    }
}