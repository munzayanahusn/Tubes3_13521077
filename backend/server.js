
const express = require('express');
const cors = require('cors');

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
    if (algo == "KMP" || algo == "BM") {
        return question + "-KMP answer"
    } else if (algo == "Date") {
        return getDay(question);
    } else if (algo == "Calculator") {
        return calculate(question);
    }
}

