const buttons = Array.from(document.querySelectorAll('button[type="button"]'));
buttons.forEach(element => element.addEventListener('click', display));

const screenTop = document.querySelector(".screen .top");
const screenBot = document.querySelector(".screen .bottom");

let firstNumberSignal = true;
let operatorSignal = false;
let secondNumberSignal = false;

let firstNumber = 0.0;
let secondNumber = 0.0;

let topBuffer = "";
let botBuffer = "";

let operatorList = ['+','-','/','*'];
let operator = "";

function display(element){
    let elementText = element.target.textContent;
    if(elementText === 'delete'){
        topBuffer = "";
        botBuffer = "";
        resetSignals();
    }
    else if(elementText === 'clear'){
        if(operatorList.includes(topBuffer.charAt(topBuffer.length-2))){
            secondNumberSignal = false;
        }
        if(operatorList.includes(topBuffer.charAt(topBuffer.length-1))){
            operatorSignal = false;
        }
        let clearString = topBuffer.slice(0,-1);
        topBuffer = clearString;
        botBuffer = "";
    }
    else if(elementText === '='){
        botBuffer = calculate();
    }
    else if(operatorList.includes(elementText)){
        if(operatorSignal === false){
            operator = elementText;
            topBuffer += elementText;
            operatorSignal = true;
        }
    }
    else{
        if(operatorSignal === true){
            secondNumberSignal = true;
        }
        topBuffer += elementText;
    }
    screenTop.textContent = topBuffer;
    screenBot.textContent = botBuffer;

}

function calculate(){
    if(secondNumberSignal === false){return;}
    else{
        getNumbersfromString();
        let answer = 0.0;
        switch(operator){
            case '*':
                answer = firstNumber * secondNumber;
                break;
            case '+':
                answer = firstNumber + secondNumber;
                break;
            case '/':
                answer = firstNumber / secondNumber;
                break;
            case '-':
                answer = firstNumber - secondNumber;
                break;
            default:
                return 'error';
        }
        return answer;
    }


}

function getNumbersfromString(){
    let arrFromBuffer = [...topBuffer];
    const operatorIndex = arrFromBuffer.findIndex(element => operatorList.includes(element));
    let firstNumberString = topBuffer.substring(0,operatorIndex) + ".0";
    let secondNumberString = topBuffer.substring(operatorIndex+1, topBuffer.length) + ".0";
    firstNumber = parseFloat(firstNumberString);
    secondNumber = parseFloat(secondNumberString);
}

function resetSignals(){
    firstNumberSignal = true;
    operatorSignal = false;
    secondNumberSignal = false;
}