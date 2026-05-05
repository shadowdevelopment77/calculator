let currentNumber = "";
let previousNumber = "";
let operator = "";
let shouldResetDisplay = false;



const display = document.getElementById("display");
const miniDisplay = document.getElementById("mini-display")

function appendToDisplay(input){
    if ([`+`, `-`, `*`, `/`].includes(input)) {
        operator = input;
        miniDisplay.value =input;
        shouldResetDisplay = true;
    } else{
        if (shouldResetDisplay) {
            display.value = input;
            shouldResetDisplay = false
        } else {
            display.value += input;
        }
        currentNumber = display.value;
    } 
}

function clearDisplay() {
    display.value = "";
    miniDisplay.value ="";
    currentNumber = "";
    previousNumber = "";
    operator = "";
    shouldResetDisplay = false;
}

function calculate() {
    try {
        display.value = eval(display.value)
    } catch (error) {
        display.value = "Error"
    }
}