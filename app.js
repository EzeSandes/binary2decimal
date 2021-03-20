'use stricts'

/// Elements
const btnConvert = document.getElementById('btn-convert');
const btnReset = document.getElementById('btn-reset');
const btnSwap = document.getElementById('btn-swap');
const binaryField = document.getElementById('binary-value');
const decimalField = document.getElementById('decimal-value');

/// Functions

const toDecimal = function () {
   const binaryValues = [...binaryField.value];
   const binaryLength = binaryValues.length - 1;
   let decimalNumber = 0;

   //REDUCE METHOD??. El problema es que se debera cortar la aplicacion sin el return
   for (const [i, value] of binaryValues.entries()) {
      if (!(value === '1' || value === '0')) {
         decimalField.value = 'Not a valid binary number';
         return;
      }

      decimalNumber += (2 ** (binaryLength - i)) * Number(value);
   }

   if (binaryValues.length != 0)
      decimalField.value = decimalNumber;
};

// Without use "toString()" method
const toBinary = function () {
   let integerValue = Number(binaryField.value);
   let decimalValue = Number(binaryField.value) % 1;// The decimal part of the number.
   let binaryValues = [];

   //Integer Part
   // Only positives and valid numbers
   if (integerValue < 0 || Number.isNaN(integerValue)) {
      decimalField.value = 'Only positive and valid numbers'; // DecimalField is the Binary Field
      return;
   }

   for (integerValue; integerValue >= 2; integerValue /= 2)
      binaryValues.unshift(Math.trunc(integerValue % 2));

   binaryValues.unshift(Math.trunc(integerValue));

   //Decimal part

   if (decimalValue) {
      binaryValues.push('.');
      let decimal = '';
      do {
         decimalValue = (decimalValue % 1) * 2;
         decimal = (decimalValue + '').slice(2);//Extract since the first decimal number after the point

         binaryValues.push(Math.trunc(decimalValue));
         if (decimal[0] === '0') break;

      } while (decimalValue % 1 != 0);
   }

   //Binary Value
   decimalField.value = binaryValues.join('');
}

const clearFields = function () {
   binaryField.value = '';
   decimalField.value = '';
}

///// EVENTS

// TRUE = To Decimal
// FALSE = To Binary
let swapState = true;

btnConvert.addEventListener('click', toDecimal);

binaryField.addEventListener('keydown', function (event) {
   if (event.key === 'Enter')
      swapState ? toDecimal() : toBinary();
});

btnReset.addEventListener('click', clearFields);

btnSwap.addEventListener('click', function () {
   clearFields();

   binaryField.setAttribute('placeholder', swapState ? 'Decimal Value' : 'Binary Value');
   decimalField.setAttribute('placeholder', swapState ? 'Binary Value' : 'Decimal Value');

   btnConvert.removeEventListener('click', swapState ? toDecimal : toBinary);
   btnConvert.addEventListener('click', swapState ? toBinary : toDecimal);

   swapState = !swapState;
});




