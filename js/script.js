// Seleciona os elementos da calculadora
const buttons = document.querySelectorAll('.buttons button');
const result = document.querySelector('.result');

let currentInput = '0';
let operator = '';
let previousInput = '';
let shouldResetInput = false;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('bg-gray')) {
            handleSpecialButtons(value);
        } else if (button.classList.contains('bg-orange')) {
            handleOperator(value);
        } else if (button.classList.contains('ver')) {
            calculateResult();
        } else {
            handleNumberInput(value);
        }
    });
});

function handleSpecialButtons(value) {
    if (value === 'AC') {
        resetCalculator();
    } else if (value === '+/-') {
        toggleSign();
    } else if (value === '%') {
        applyPercentage();
    }
}

function handleOperator(op) {
    if (operator && !shouldResetInput) {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    shouldResetInput = true;
}

function handleNumberInput(value) {
    if (currentInput === '0' || shouldResetInput) {
        currentInput = value;
        shouldResetInput = false;
    } else {
        currentInput += value;
    }
    updateDisplay();
}

function calculateResult() {
    if (!operator || shouldResetInput) return;

    let prev = parseFloat(previousInput);
    let curr = parseFloat(currentInput);

    switch (operator) {
        case '+':
            currentInput = (prev + curr).toString();
            break;
        case '-':
            currentInput = (prev - curr).toString();
            break;
        case 'x':
            currentInput = (prev * curr).toString();
            break;
        case '÷':
            currentInput = (prev / curr).toString();
            break;
        default:
            return;
    }

    operator = '';
    previousInput = '';
    shouldResetInput = true;
    updateDisplay();
}

function updateDisplay() {
    result.textContent = currentInput;
}

function resetCalculator() {
    currentInput = '0';
    operator = '';
    previousInput = '';
    shouldResetInput = false;
    updateDisplay();
}

function toggleSign() {
    currentInput = (parseFloat(currentInput) * -1).toString();
    updateDisplay();
}

function applyPercentage() {
    currentInput = (parseFloat(currentInput) / 100).toString();
    updateDisplay();
}
