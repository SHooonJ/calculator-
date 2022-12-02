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
let operator = "";

function display(element){
    let elementText = element.target.textContent;
    if(elementText === 'delete'){
        topBuffer = "";
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
    }
    else if(elementText === '='){
        calculate();
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
}

// function calculate(){
//     if(secondNumberSignal === false){return;}
//     else{
//         getNumbersfromString();
//         switch (operator){
//             case '*':

//         }
//     }


// }

// function getNumbersfromString(){
//     let buffe
// }

function resetSignals(){
    firstNumberSignal = true;
    operatorSignal = false;
    secondNumberSignal = false;
}