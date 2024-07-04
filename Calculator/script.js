document.addEventListener('DOMContentLoaded', function () {
    const display = document.getElementById('display');
    const buttons = document.querySelectorAll('.btn');
    
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    
    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const action = button.getAttribute('data-action');
            
            if (!isNaN(action) || action === '.') {
                handleNumber(action);
            } else {
                handleOperation(action);
            }
        });
    });
    
    function handleNumber(num) {
        if (currentInput.includes('.') && num === '.') return;
        currentInput = currentInput === '0' ? num : currentInput + num;
        updateDisplay();
    }
    
    function handleOperation(op) {
        if (op === 'clear') {
            currentInput = '';
            previousInput = '';
            operation = null;
            updateDisplay();
        } else if (op === 'backspace') {
            currentInput = currentInput.slice(0, -1) || '0';
            updateDisplay();
        } else if (op === 'equals') {
            if (operation && previousInput !== '') {
                currentInput = calculate(previousInput, currentInput, operation).toString();
                previousInput = '';
                operation = null;
                updateDisplay();
            }
        } else {
            if (currentInput !== '') {
                if (operation) {
                    previousInput = calculate(previousInput, currentInput, operation).toString();
                } else {
                    previousInput = currentInput;
                }
                currentInput = '';
                operation = op;
                updateDisplay();
            }
        }
    }
    
    function calculate(a, b, op) {
        const num1 = parseFloat(a);
        const num2 = parseFloat(b);
        switch (op) {
            case 'add': return num1 + num2;
            case 'subtract': return num1 - num2;
            case 'multiply': return num1 * num2;
            case 'divide': return num1 / num2;
            default: return num2;
        }
    }
    
    function updateDisplay() {
        display.textContent = currentInput || previousInput || '0';
    }
});
