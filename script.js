const buttons = Array.from(document.querySelectorAll('button[type="button"]'));
buttons.forEach(element => element.addEventListener('click', display));

const screenTop = document.querySelector(".screen .top");
const screenBot = document.querySelector(".screen .bottom");

let firstNumberSignal = true;
let operatorSignal = false;
let secondNumberSignal = false;

let topBuffer = "";
let botBuffer = "";

let operatorList = ['+','-','/','*'];

function display(element){
    let elementText = element.target.textContent;
    if(elementText === 'delete'){
        let emptyString = "";
        topBuffer = emptyString;
        resetSignals();
    }
    else if(elementText === 'clear'){
        if(operatorList.includes(topBuffer.charAt(topBuffer.length-1))){
            operatorSignal = false;
        }
        let clearString = topBuffer.slice(0,-1);
        topBuffer = clearString;
    }
    else if(elementText === '='){
        calculate();
    }
    else if(operatorList.includes(elementText)){
        if(operatorSignal === false){
            topBuffer += elementText;
            operatorSignal = true;
        }
    }
    else{
        topBuffer += elementText;
    }
    screenTop.textContent = topBuffer;
}

function calculate(){

}

function resetSignals(){
    firstNumberSignal = true;
    operatorSignal = false;
    secondNumberSignal = false;
}