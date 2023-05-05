module.exports = { calculate }

function calculate(expression) {
    // Delete space
    expression = expression.replace(/\s/g, '');
    if (expression[expression.length - 1] === '?') {
        expression = expression.slice(0, -1);
    }
    // Validate expression
    if (!validateCalculation(expression)) return "Masukkan ekspresi tidak valid";
    const operands = [];
    const operators = [];

    // Split number and math symbol (+ - * /)
    const tokens = expression.match(/\d+|\+|\-|\*|\/|\(|\)/g);

    tokens.forEach(token => {
        if (!isNaN(token)) {
            // Add number/operand to array  operands
            operands.push(Number(token));
        } else {
            switch (token) {
                case '(':
                    // ( found, add to array operators
                    operators.push(token);
                    break;
                case ')':
                    // ) found, calculate expression until ( found
                    while (operators[operators.length - 1] !== '(') {
                        const operator = operators.pop();
                        const operand2 = operands.pop();
                        const operand1 = operands.pop();
                        const result = evaluate(operand1, operand2, operator);
                        if (result === "Pembagian dengan nol tidak valid") return "Pembagian dengan nol tidak valid";
                        else operands.push(result);
                    }
                    operators.pop();
                    break;
                case '*':
                case '/':
                case '+':
                case '-':
                    // Check if any previous operators have precedence >= current operator. 
                    // If true, calculate the previous operator first and push result to operands.
                    while (operators.length > 0 && getPrecedence(operators[operators.length - 1]) >= getPrecedence(token)) {
                        const operator = operators.pop();
                        const operand2 = operands.pop();
                        const operand1 = operands.pop();
                        const result = evaluate(operand1, operand2, operator);
                        if (result === "Pembagian dengan nol tidak valid") return "Pembagian dengan nol tidak valid";
                        else operands.push(result);
                    }
                    operators.push(token);
                    break;
                default:
                    throw new Error('Invalid operator');
            }
        }
    });

    // Finish reading expression, calculate all remaining operations
    // Push back calculation results on operands
    while (operators.length > 0) {
        const operator = operators.pop();
        const operand2 = operands.pop();
        const operand1 = operands.pop();
        const result = evaluate(operand1, operand2, operator);
        if (result === "Pembagian dengan nol tidak valid") return "Pembagian dengan nol tidak valid";
        else operands.push(result);
    }

    // Calculation result is the last number in the operands
    return operands.pop();
}

function getPrecedence(operator) {
    // Determine the priority of calculation on each operator
    if (operator == '+' || operator == '-') {
        return 1;
    } else if (operator == '*' || operator == '/') {
        return 2;
    } else {
        return 0;
    }
}

function evaluate(operand1, operand2, operator) {
    // Determine the calculation results
    switch (operator) {
        case '+':
            return operand1 + operand2;
        case '-':
            return operand1 - operand2;
        case '*':
            return operand1 * operand2;
        case '/':
            if (operand2 === 0) return "Pembagian dengan nol tidak valid";
            else return operand1 / operand2;
        default:
            throw new Error('Invalid operator');
    }
}

function validateCalculation(expression) {
    const operators = ['+', '-', '*', '/'];
    const digits = '0123456789';
    const parentheses = ['(', ')'];
    const stack = [];

    for (let i = 0; i < expression.length; i++) {
        const char = expression[i];

        if (digits.includes(char)) {
            // Digit
            continue;
        } else if (operators.includes(char)) {
            // Operator : check if the previous and next characters are digits
            const prevChar = expression[i - 1];
            const nextChar = expression[i + 1];
            if (operators.includes(prevChar) || operators.includes(nextChar) || prevChar === '(' || nextChar === ')') {
                return false;
            }
        } else if (parentheses.includes(char)) {
            if (char === '(') {
                // if it's an opening parenthesis, add it to the stack,
                // to ensure that there will be a parenthetical partner later
                stack.push(char);
            } else {
                // if it's a closing parenthesis, check if there is a pair of opening brackets on the stack
                const lastOpenParenthesis = stack.pop();
                if (lastOpenParenthesis !== '(') {
                    return false;
                }
            }
        } else {
            // Not a digit, operator, or parenthesis
            return false;
        }
    }

    // Stack not empty, there is/are parenthesis has no partner
    if (stack.length > 0) {
        return false;
    }

    return true;
}