 // Get display element
 const display = document.getElementById('display');
 const history = document.getElementById('history');
 
 // Function to append value to display
 function appendToDisplay(value) {
     // Replace ^ with **
     if (value === '**') {
         display.value += '^';
     } else {
         display.value += value;
     }
 }
 
 // Function to clear display
 function clearDisplay() {
     display.value = '';
 }
 
 // Function to calculate result using BODMAS
 function calculate() {
     try {
         // Store the original expression for history
         const expression = display.value;
         
         // Replace ^ with ** for JavaScript power operation
         let processedExpression = expression.replace(/\^/g, '**');
         
         // Evaluate the expression respecting BODMAS
         const result = eval(processedExpression);
         
         // Add calculation to history
         addToHistory(expression, result);
         
         // Display result
         display.value = result;
     } catch (error) {
         display.value = 'Error';
         setTimeout(() => {
             display.value = '';
         }, 1500);
     }
 }
 
 // Add calculation to history
 function addToHistory(expression, result) {
     const historyItem = document.createElement('div');
     historyItem.className = 'history-item';
     historyItem.textContent = `${expression} = ${result}`;
     history.appendChild(historyItem);
     
     // Scroll to the bottom of history
     history.scrollTop = history.scrollHeight;
 }
 
 // Add keyboard support
 document.addEventListener('keydown', function(event) {
     const key = event.key;
     
     // Numbers, operators and brackets
     if (/[\d+\-*/.()^]/.test(key)) {
         if (key === '^') {
             appendToDisplay('**');
         } else {
             appendToDisplay(key);
         }
         event.preventDefault();
     }
     
     // Enter key for calculation
     if (key === 'Enter') {
         calculate();
         event.preventDefault();
     }
     
     // Backspace for clearing last character
     if (key === 'Backspace') {
         display.value = display.value.slice(0, -1);
         event.preventDefault();
     }
     
     // Escape key for clearing
     if (key === 'Escape') {
         clearDisplay();
         event.preventDefault();
     }
 });