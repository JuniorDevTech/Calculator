const inputElment = document.getElementById("inputElment");
const clearElement = document.getElementById("clear");
const buttonOperator = document.querySelectorAll(".operator");
const buttonNumber = document.querySelectorAll(".number");
const equalsElement = document.getElementById("equals");
const deleteElement = document.getElementById("delete");

let num1 = "";
let operator = null;
let waitingForNum2 = false;

//pour les boutons

buttonNumber.forEach((button) => {
  button.addEventListener("click", () => {
    if (waitingForNum2) {
      inputElment.value = "";
      waitingForNum2 = false;
    }
    inputElment.value += button.textContent;
  });
});

//operator

buttonOperator.forEach((button) => {
  button.addEventListener("click", () => {
    if (inputElment.value == "") return;
    num1 = inputElment.value;
    operator = button.dataset.op;
    waitingForNum2 = true;
  });
});

equalsElement.addEventListener("click", () => {
  if (num1 == "" || operator == null || inputElment.value == "") return;

  let num2 = inputElment.value;
  let resultat;

  switch (operator) {
    case "+":
      resultat = parseFloat(num1) + parseFloat(num2);
      break;
    case "-":
      resultat = parseFloat(num1) - parseFloat(num2);
      break;
    case "*":
      resultat = parseFloat(num1) * parseFloat(num2);
      break;
    case "/":
      resultat =
        parseFloat(num2) === 0 ? "erreur" : parseFloat(num1) / parseFloat(num2);
      break;

    default:
      return;
  }
  inputElment.value = resultat;
  num1 = "";
  operator = null;
  waitingForNum2 = false;
});

clearElement.addEventListener("click", () => {
  num1 = "";
  operator = null;
  waitingForNum2 = false;
  inputElment.value = "";
});
deleteElement.addEventListener("click", () => {
  inputElment.value = inputElment.value.slice(0, -1);
});
