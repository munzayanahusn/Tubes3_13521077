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
    { id: 0, chat: [{ q: 'bangunnnnnnn', a: 'hello' }, { q: 'fsfwr', a: 'hello' }] },
    { id: 1, chat: [{ q: 'haiiii', a: 'helledefo' }, { q: 'sdfsdfsd', a: 'helfsdcsdlo' }] },
];

app.get('/history', async (req, res) => {
    // console.log("dfdf");
    await res.json({ histories: await db.getRecentHistory() });
});

app.get('./selectHistory', async (req, res) => {
    await res.json({ dummy: await db.addHistory() });
})

app.post('/URL', async (req, res) => {
    question = req.body.isiChat
    algo = req.body.algorithm
    historyID = req.body.historyID
    res.json({ answer: await getAnswer(algo, question,historyID) });
});

app.listen(8000, () => {
    console.log(`Server is running on port 8000.`);
});

async function getAnswer(algo, question, historyID) {
    arrQuest = await db.getAllQuestions();
    alg = reg.get_algo(question);
    if (alg == "Calculator") {
        return cal.calculate(question);
    } else if (alg == "Date") {
        return dat.getDay(question);
    } else if (alg == "Add Question") {
        const match = str.match(/Tambah pertanyaan (.*) dengan jawaban (.*)/i);
        const x = match[1];
        const y = match[2];
        return await db.addQuestion(x, y);
    } else if (alg == "Delete Question") {
        const x = str.match(/Hapus pertanyaan (.*)/i)[1];
        return await db.deleteQuestion(x);
    } else if (alg == "Search") {
        if (algo == "KMP") {
            arrQuest = await db.getAllQuestions();
            //arrQuest = ["Apa kabar", "Aku mau makan dulu", "Belom beli makan"];
            [found, result] = search.searchQuestionKMP(arrQuest, question);
            console.log(arrQuest);
            if (found) return db.getAnswer(result);
            else return getTop3(result); // Top 3 question termirip
        } else if (algo == "BM") {
            arrQuest = await db.getAllQuestions();
            //arrQuest = ["Apa kabar", "Aku mau makan dulu", "Belom beli makan"];
            [found, result] = search.searchQuestionBM(arrQuest, question);
            if (found) return db.getAnswer(result);//db.getAnswer(result);
            else return getTop3(result); // Top 3 question termirip
        }
    } else {
        return "Ge kedetect";
    }
}

function getTop3(arrTop) {
    if (arrTop[0] == '') return "Maaf saya tidak bisa menjawab pertanyaan apapun (database kosong)";
    else {
        str = "Hmm, saya kurang mengerti.\n Mungkin yang kamu maksud:";
        for (let i = 0; i < arrTop.length; i++) {
            if (arrTop[i] != '') {
                newStr = (i + 1) + ". " + arrTop[i] + "\n";
                str += newStr
            }
        }
        str += "(ketikkan kembali pertanyaan yang Anda maksud)";
        return str;
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