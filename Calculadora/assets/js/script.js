
const previousOperationText = document.querySelector("#previous-operation");

const currentOperationText = document.querySelector("#current-operation");

const buttons = document.querySelectorAll("#buttons-container button");



class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }



    //adiciona os digitos na tela da calculadora
    addDigit(digit) {

        //checar se operação atual já tem um ponto(dot)
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation = digit;
        this.updateScreen();
    }



    //processar todas as operações
    processOperation(operation) {

        //checar se o current value está vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {

            //mudar a operação

            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        //Pegar o valor atual e o previo 

        let operationValue;
        let previous = +this.previousOperationText.innerText.split(" ")[0];
        let current = +this.currentOperationText.innerText;

        switch (operation) {

            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous)
                break;

            case "DEL":
                this.processDelOperator();
                break;

            case "CE":
                this.processClearOperation();
                break;

            case "C":
                this.processClearAll();
                break;

            case "=":
                this.processEqualOperator();
                break;
            default:
                return;

        }
    }



    //muda os valores na tela da calculadora
    updateScreen(operationValue = null, operation = null, current = null, previous = null) {

        console.log(operationValue, operation, current, previous);

        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        }
        else {

            //checar se value é zero, se for só adicione ao current value

            if (previous === 0) {
                operationValue = current;
            }

            // adicione current value para previous
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";

        }

    }

    // Mudar a operação matemática

    changeOperation(operation) {

        const mathOperation = ["*", "/", "+", "-"];

        if (!mathOperation.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    processDelOperator() {
        this.currentOperationText.innerText = this.currentOperationText.innerText.slice(0, -1);
    }

    processClearOperation() {
        this.currentOperationText.innerText = "";
    }

    processClearAll() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }

    processEqualOperator() {

        const operation = previousOperationText.innerText.split(" ")[1];

        this.processOperation(operation);

    }


}



const calc = new Calculator(previousOperationText, currentOperationText);



buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        }
        else {
            calc.processOperation(value);
        }
    });
});