let runningTotal = 0;
let buffer = "0";
let priouseOprator = null;
const screen = document.querySelector(".screen");

document
  .querySelector(".calculator-buttons")
  .addEventListener("click", function (event) {
    buttonClick(event.target.innerText);
  });

function buttonClick(value) {
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  rerander();
}
function handleNumber(value) {
  if (buffer === "0") {
    buffer = value;
  } else {
    buffer += value;
  }
}
function handleSymbol(value) {
  switch (value) {
    case "C":
      buffer = "0";
      runningTotal = 0;
      priouseOprator = null;
      break;

    case "=":
      if (priouseOprator === null) {
        return;
      }
      flushOperation(parseInt(buffer));
      priouseOprator = null;
      buffer = " " + runningTotal;
      runningTotal = 0;
      break;

    case "←":
      if (buffer.length === 1) {
        buffer = "0";
      } else {
        buffer = buffer.substring(0, buffer.length - 1);
      }
      break;
    default:
      handleMath(value);
      break;
  }
}

function handleMath(value) {
  const intBuffer = parseInt(buffer);
  if (runningTotal === 0) {
    runningTotal = intBuffer;
  } else {
    flushOperation(intBuffer);
  }

  priouseOprator = value;
  buffer = "0";
}

function flushOperation(intBuffer) {
  if (priouseOprator === "+") {
    runningTotal += intBuffer;
  } else if (priouseOprator === "-") {
    runningTotal -= intBuffer;
  } else if (priouseOprator === "/") {
    runningTotal /= intBuffer;
  } else if (priouseOprator === "*") {
    runningTotal *= intBuffer;
  }
}

function rerander() {
  screen.innerText = buffer;
}
