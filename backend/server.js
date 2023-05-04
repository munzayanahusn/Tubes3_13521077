const express = require('express');
const cors = require('cors');
const db = require('./database');
const search = require('./questionMatching');
const cal = require('./calculator');
const dat = require('./date');
const reg = require('./regex');

const app = express();

app.use(cors());
app.use(express.json());

var question = ""

// app.get('/history', (req, res) => {
//     res.json({ history: "Hello from server!" });
// });

app.post('/URL', (req, res) => {
    question = req.body.isiChat
    algo = req.body.algorithm
    res.json({ answer: getAnswer(algo, question) });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});

function getAnswer(algo, question) {
    if (algo == "KMP") {
        return question + "-KMP answer"
    } else {
        return question + "-BM answer"
    }
}

/*
async function getAnswer(algo, question) {
    alg = reg.get_algo(question);
    if (alg == "Calculator") {
        return cal.calculate(question);
    } else if (alg = "Date") {
        return dat.getDay(question);
    } else if (alg = "Search") {
        if (algo == "KMP") {
            arrQuest = await db.getAllQuestions();
            found, result = search.searchQuestionKMP(arrQuest, question);
            if (found) return db.getAnswer(result);
            else return result; // Top 3 question termirip
        } else if (algo == "BM") {
            arrQuest = await db.getAllQuestions();
            found, result = search.searchQuestionBMsearchQuestionBM(arrQuest, question);
            if (found) return db.getAnswer(result);
            else return result; // Top 3 question termirip
        }
    }
}
*/