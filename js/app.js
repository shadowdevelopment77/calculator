let currentNumber = '';
let previousNumber = '';
let operator = '';
let justCalculated = false;
let lastOperator ='';
let lastOperand = '';
let isPoweredOn =false;



const display = document.getElementById("display");
const miniDisplay = document.getElementById("mini-display");



function updateDisplay(main,mini) {
    display.value = main;
    miniDisplay.value = mini;
}


function operatorHelper(symbol) {
    const symbols =  { '+': '+', '-': '−', '*': '×', '/': '÷' }
    return symbols[symbol] || '';
    
}
function appendToDisplay(value) {
    if (!isPoweredOn) return;
  const isOperator = ['+', '-', '*', '/'].includes(value);
 
  // ── OPERATOR clicked ──────────────────────────────────────────────────────
  if (isOperator) {
 
    // Rule: user must have a number before pressing an operator
    if (currentNumber === '' && previousNumber === '') {
      alert('Please input the number first!');
      return;
    }
 
    // If there's already a pending calculation (two numbers + operator),
    // calculate it first before applying the new operator.
    if (currentNumber !== '' && previousNumber !== '' && operator !== '') {
      const result = calculate(true); // silent calculate, returns value
      previousNumber = String(result);
      currentNumber  = '';
    } else if (currentNumber !== '') {
      // First operator: move currentInput → previousInput
      previousNumber = currentNumber;
      currentNumber  = '';
    }
    // If just calculated, previousInput is already the result — just switch operator
 
    operator       = value;
    justCalculated = false;
 
    updateDisplay('', `${previousNumber} ${operatorHelper(operator)}`);
    return;
  }
 
  // ── NUMBER (or dot) clicked ───────────────────────────────────────────────
 
  // After "=" was pressed: start a brand-new calculation
  if (justCalculated) {
    previousNumber  = '';
    operator       = '';
    justCalculated = false;
  }
 
  // Prevent multiple dots in one number
  if (value === '.' && currentNumber.includes('.')) return;
 
  // Prevent leading zeros like "007"
  if (value === '0' && currentNumber === '0') return;
  if (value !== '.' && currentNumber === '0') currentNumber = '';
 
  currentNumber += value;
 
  // Update main display; keep mini-display showing the operator expression
  const mini = operator
    ? `${previousNumber} ${operatorHelper(operator)}`
    : miniDisplay.value; // leave it as-is if no operator yet
  updateDisplay(currentNumber, mini);
}




function clearDisplay() {
    updateDisplay('', '');
    currentNumber = '';
    previousNumber = '';
    operator = '';
    justCalculated = false;
    lastOperand = '';
    lastOperator = '';

}


function calculate(silent = false) {
    if (!isPoweredOn) return;
 
  // ── Repeat last operation if "=" is pressed again ─────────────────────────
  if (!silent && justCalculated && lastOperator !== '' && lastOperand !== '') {
    const prev   = parseFloat(display.value);
    const result = operate(prev, lastOperand, lastOperator);

    previousNumber = String(result);

    updateDisplay(result, `${prev} ${operatorHelper(lastOperator)} ${lastOperand}`);
    // keep justCalculated = true so further "=" keeps repeating
    return;
  } 
 
  // ── Normal calculation ─────────────────────────────────────────────────────
  if (previousNumber === '' || currentNumber === '' || operator === '') return;
 
  const result = operate(previousNumber, currentNumber, operator);
 
  // Save for "=" repeat
  lastOperator = operator;
  lastOperand  = currentNumber;
 
  updateDisplay(result,`${previousNumber} ${operatorHelper(operator)} ${currentNumber} `);
 
  // Reset state, keep result on display
  previousNumber  = String(result);
  currentNumber   = '';
  operator       = '';
  justCalculated = true;
 
  if (silent) return result; // used by internal chained calls
}

function round(num){
    return Math.round(num* 1e10) / 1e10;
}
// ─── operate ─────────────────────────────────────────────────────────────────
// Pure math: given two numbers and an operator, return the result.
function operate(a, b, op) {
  a = parseFloat(a);
  b = parseFloat(b);
  switch (op) {
    case '+': return round(a + b);
    case '-': return round(a - b);
    case '*': return round(a * b);
    case '/':
      if (b === 0) { alert("Can't divide by zero!"); return a; }
      return round(a / b);
  }
}

function deleteChar(remove) {
    if (!isPoweredOn) return;
    if(currentNumber.length <=1){
        currentNumber = '';
        display.value = '';
        return
    } else{
        currentNumber = currentNumber.slice(0, -1)
        display.value = currentNumber;
    }
}

function togglePower() {
    isPoweredOn = !isPoweredOn;
    const btn = document.getElementById('power-btn')
     if (isPoweredOn) {
    btn.classList.add('powered-on');
    btn.classList.remove('powered-off');
  } else {
    clearDisplay();
    btn.classList.add('powered-off');
    btn.classList.remove('powered-on');
  }
}