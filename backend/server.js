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

let h = [
    {id: 0, chat: [{q:'bangunnnnnnn',a:'hello'},{q:'fsfwr',a:'hello'}]},
    {id: 1, chat: [{q:'haiiii',a:'helledefo'},{q:'sdfsdfsd',a:'helfsdcsdlo'}]},
];

app.get('/history', async (req, res) => {
    console.log(h);
    await res.json({ histories: h});
});

app.post('/URL', async (req, res) => {
    question = req.body.isiChat
    algo = req.body.algorithm
    res.json({ answer: await getAnswer(algo, question) });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});

async function getAnswer(algo, question) {
    arrQuest = await db.getAllQuestions();
    alg = reg.get_algo(question);
    if (alg == "Calculator") {
        return cal.calculate(question);
    } else if (alg == "Date") {
        return dat.getDay(question);
    } else if (alg == "Search") {
        if (algo == "KMP") {
            //arrQuest = await db.getAllQuestions();
            //arrQuest = ["Apa kabar", "Aku mau makan dulu", "Belom beli makan"];
            [found, result] = search.searchQuestionKMP(arrQuest, question);
            if (found) return result;
            else return result; // Top 3 question termirip
        } else if (algo == "BM") {
            //arrQuest = await db.getAllQuestions();
            arrQuest = ["Apa kabar", "Aku mau makan dulu", "Belom beli makan"];
            [found, result] = search.searchQuestionBM(arrQuest, question);
            if (found) return result;//db.getAnswer(result);
            else return result; // Top 3 question termirip
        }
    } else {
        return "Ge kedetect";
    }
}

/**
 *         if (algo == "KMP") {
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
 */