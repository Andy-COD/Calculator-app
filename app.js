function changeCss (cssFile) {
    document.getElementsByTagName("link")[1].href= cssFile;
}

const calculator = {
    displayValue: "0",
    firstOperand: null,
    waitingForSecondOperand: false,
    secondOperand: null
}
function inputDigit(digit) {
    const {displayValue, waitingForSecondOperand} = calculator;

    if(waitingForSecondOperand === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    }else {
        calculator.displayValue = displayValue === "0" ? digit : displayValue + digit; 
    }
}

function inputDecimal(dot) {
    if(!calculator.displayValue.includes(dot)) {
        calculator.displayValue += dot;
    }
}

function handleOperator(nextOperator) {
    // Destructure the properties on the calculator object
    const {firstOperand, displayValue, operator} = calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.waitingForSecondOperand) {
        calculator.operator = nextOperator;
        return;
    }
    // verify that `firstOperand` is null and that the `inputValue`
    // is not a `NaN` value
    if (firstOperand === null && !isNaN(inputValue)) {
         // Update the firstOperand property
        calculator.firstOperand = inputValue;
    }else if(operator) {
        const result = calculate(firstOperand, inputValue, operator);
        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
}
function calculate(firstOperand, secondOperand, operator) {
    if(operator === "+") {
        return firstOperand + secondOperand;
    }
    if(operator === "-") {
        return firstOperand - secondOperand;
    }
    if(operator === "x") {
        return firstOperand * secondOperand;
    }
    if(operator === "/") {
        return firstOperand / secondOperand;
    }
    return secondOperand;
}

function resetCalculator() {
    calculator.displayValue = "0";
    calculator.firstOperand = null;
    calculator.secondOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
    console.log(calculator);
}

function clear() {
    calculator.displayValue = "0";   
}

function updateDisplay() {
    const display = document.querySelector("#input-field");
    display.value = calculator.displayValue;
}

updateDisplay();

const keys = document.querySelector(".input-keys");

keys.addEventListener("click", (event) => {
    const {target} = event;
    // check if it's a btn
    // if not exit from the function
    if(!target.matches("button")) {
        return;
    }
    if(target.classList.contains("operator")) {
        handleOperator(target.textContent);
        updateDisplay();
        return;
    }
    if(target.classList.contains("decimal")) {
        inputDecimal(target.textContent);
        updateDisplay();
        return;
    }
    if(target.classList.contains("reset")) {
        resetCalculator();
        updateDisplay();
        return;
    }
    if(target.classList.contains("del")) {
        clear();
        updateDisplay();
        return;
    }
    inputDigit(target.textContent);
    updateDisplay();
});