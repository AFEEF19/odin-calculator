function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) return "😈 Nice try";
  return a / b;
}

function operate(operator, a, b) {
  a = Number(a);
  b = Number(b);

  switch (operator) {
    case "+": return add(a, b);
    case "-": return subtract(a, b);
    case "×": return multiply(a, b);
    case "÷": return divide(a, b);
  }
}

let firstNumber = null;
let currentOperator = null;
let shouldResetDisplay = false;

const display = document.getElementById("display");

function appendNumber(number) {
  if (display.textContent === "0" || shouldResetDisplay) {
    display.textContent = number;
    shouldResetDisplay = false;
  } else {
    display.textContent += number;
  }
}

function setOperator(operator) {
  if (currentOperator !== null) evaluate();
  firstNumber = display.textContent;
  currentOperator = operator;
  shouldResetDisplay = true;
}

function evaluate() {
  if (currentOperator === null || shouldResetDisplay) return;

  let secondNumber = display.textContent;
  let result = operate(currentOperator, firstNumber, secondNumber);

  if (typeof result === "number") {
    result = Math.round(result * 1000) / 1000;
  }

  display.textContent = result;
  firstNumber = result;
  currentOperator = null;
}

function clearCalculator() {
  display.textContent = "0";
  firstNumber = null;
  currentOperator = null;
  shouldResetDisplay = false;
}

function appendDecimal() {
  if (!display.textContent.includes(".")) {
    display.textContent += ".";
  }
}

function backspace() {
  if (display.textContent.length === 1) {
    display.textContent = "0";
  } else {
    display.textContent = display.textContent.slice(0, -1);
  }
}

document.querySelectorAll(".number").forEach(btn =>
  btn.addEventListener("click", () => appendNumber(btn.textContent))
);

document.querySelectorAll(".operator").forEach(btn =>
  btn.addEventListener("click", () => setOperator(btn.textContent))
);

document.getElementById("equals").addEventListener("click", evaluate);
document.querySelector(".clear").addEventListener("click", clearCalculator);
document.getElementById("decimal").addEventListener("click", appendDecimal);
document.getElementById("backspace").addEventListener("click", backspace);
