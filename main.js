const resultElem = document.getElementById('result');
const lengthElem = document.getElementById('length');
const uppercaseElem = document.getElementById('uppercase');
const lowercaseElem = document.getElementById('lowercase');
const symbolsElem = document.getElementById('symbols');
const numbersElem = document.getElementById('numbers');
const generateElem = document.getElementById('generate');
const clipboardElem = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
}

generateElem.addEventListener('click', () => {
    const length = +lengthElem.value;
    const hasLower = lowercaseElem.checked;
    const hasUpper = uppercaseElem.checked;
    const hasNumbers = numbersElem.checked;
    const hasSymbols = symbolsElem.checked;

    resultElem.innerText = generatePassword(hasLower, hasUpper, hasNumbers, hasSymbols, length);
});

clipboardElem.addEventListener('click', () => {
    const textArea = document.createElement('textarea');
    const password = resultElem.innerText;

    if(!password){
        return;
    }

    textArea.value = password;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    textArea.remove();
    alert('Password copied to clipboard!');
})

function generatePassword(lower, upper, number, symbol, length){
    // 1. init password var
    // 2. Filter out unchecked types
    // 3. Loop over length call generator for each type
    // 4. Add final pw to the new pw var and return

    let generatedPassword = '';

    const typesCount = lower + upper + number + symbol;

    // console.log('typesCount: ', typesCount);

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(
        item => Object.values(item) [0]
        );

    // console.log('typesArr: ', typesArr)

    if(typesCount === 0){
        return '';
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            // console.log('funcName: ', funcName)

            generatedPassword += randomFunc[funcName]();
        })
    }

    const finalPassword = generatedPassword.slice(0, length);
    return finalPassword;
}

