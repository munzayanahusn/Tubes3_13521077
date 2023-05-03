// Fungsi perhitungan
function calculate(expression) {
    const operands = [];
    const operators = [];

    // Split number and math symbol (+ - * /)
    const tokens = expression.match(/\d+|\+|\-|\*|\//g);

    tokens.forEach(token => {
        if (!isNaN(token)) {
            operands.push(Number(token));
        } else {
            switch (token) {
                case '(':
                    operators.push(token);
                    break;
                case ')':
                    while (operators[operators.length - 1] !== '(') {
                        const operator = operators.pop();
                        const operand2 = operands.pop();
                        const operand1 = operands.pop();
                        const result = evaluate(operand1, operand2, operator);
                        operands.push(result);
                    }
                    operators.pop();
                    break;
                case '+':
                case '-':
                case '*':
                case '/':
                    while (operators.length > 0 && getPrecedence(operators[operators.length - 1]) >= getPrecedence(token)) {
                        const operator = operators.pop();
                        const operand2 = operands.pop();
                        const operand1 = operands.pop();
                        const result = evaluate(operand1, operand2, operator);
                        operands.push(result);
                    }
                    operators.push(token);
                    break;
                default:
                    throw new Error('Invalid operator');
            }
        }
    });

    while (operators.length > 0) {
        const operator = operators.pop();
        const operand2 = operands.pop();
        const operand1 = operands.pop();
        const result = evaluate(operand1, operand2, operator);
        operands.push(result);
    }

    return operands.pop();
}

function getPrecedence(operator) {
    switch (operator) {
        case '+':
        case '-':
            return 1;
        case '*':
        case '/':
            return 2;
        default:
            return 0;
    }
}

function evaluate(operand1, operand2, operator) {
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            return operand1 / operand2;
        default:
            throw new Error('Invalid operator');
    }
}

/*
// Input output 
const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function calculator() {
    rl.question('Soal : ', (calcString) => {
        try {
            const result = calculate(calcString);
            console.log(`Hasil perhitungan: ${result}`);
        } catch (error) {
            console.log('Terjadi kesalahan: ' + error);
        }
    });
}

calculator();
*/

/**
 * Pembanding :
 * eval()
 */