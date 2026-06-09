const inputElement = document.getElementById("inputElment");

const clearElement = document.getElementById("clear");
const deleteElement = document.getElementById("delete");
const equalsElement = document.getElementById("equals");

const buttonNumbers = document.querySelectorAll(".number");
const buttonOperators = document.querySelectorAll(".operator");

let firstNumber = "";
let operator = "";
let waitingForSecondNumber = false;

/* =========================
   NUMBERS
========================= */

buttonNumbers.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});

function appendNumber(value) {
  if (waitingForSecondNumber) {
    inputElement.value = "";
    waitingForSecondNumber = false;
  }

  inputElement.value += value;
}

/* =========================
   OPERATORS
========================= */

buttonOperators.forEach((button) => {
  button.addEventListener("click", () => {
    if (inputElement.value === "") return;

    firstNumber = inputElement.value;
    operator = button.dataset.op;

    waitingForSecondNumber = true;
  });
});

/* =========================
   EQUALS
========================= */

equalsElement.addEventListener("click", calculate);

function calculate() {
  if (firstNumber === "" || operator === "" || inputElement.value === "") {
    return;
  }

  const secondNumber = inputElement.value;

  let result;

  switch (operator) {
    case "+":
      result = parseFloat(firstNumber) + parseFloat(secondNumber);
      break;

    case "-":
      result = parseFloat(firstNumber) - parseFloat(secondNumber);
      break;

    case "*":
      result = parseFloat(firstNumber) * parseFloat(secondNumber);
      break;

    case "/":
      if (parseFloat(secondNumber) === 0) {
        inputElement.value = "Erreur";
        resetCalculator();
        return;
      }

      result = parseFloat(firstNumber) / parseFloat(secondNumber);
      break;

    default:
      return;
  }

  result = Number(result.toFixed(8));

  inputElement.value = result;

  firstNumber = result;
  waitingForSecondNumber = true;
}

/* =========================
   CLEAR
========================= */

clearElement.addEventListener("click", () => {
  inputElement.value = "";
  resetCalculator();
});

function resetCalculator() {
  firstNumber = "";
  operator = "";
  waitingForSecondNumber = false;
}

/* =========================
   DELETE
========================= */

deleteElement.addEventListener("click", () => {
  inputElement.value = inputElement.value.slice(0, -1);
});

/* =========================
   KEYBOARD SUPPORT
========================= */

document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (!isNaN(key) || key === ".") {
    appendNumber(key);
  }

  if (["+", "-", "*", "/"].includes(key)) {
    if (inputElement.value === "") return;

    firstNumber = inputElement.value;
    operator = key;
    waitingForSecondNumber = true;
  }

  if (key === "Enter" || key === "=") {
    calculate();
  }

  if (key === "Backspace") {
    inputElement.value = inputElement.value.slice(0, -1);
  }

  if (key === "Escape") {
    inputElement.value = "";
    resetCalculator();
  }
});
