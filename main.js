const lottoContainer = document.getElementById('lotto-container');
const generateBtn = document.getElementById('generate-btn');

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}

function getColorClass(number) {
    if (number <= 10) return 'yellow';
    if (number <= 20) return 'blue';
    if (number <= 30) return 'red';
    if (number <= 40) return 'gray';
    return 'green';
}

function displayNumbers(numbers) {
    lottoContainer.innerHTML = '';
    for (const number of numbers) {
        const numberDiv = document.createElement('div');
        numberDiv.classList.add('lotto-number', getColorClass(number));
        numberDiv.textContent = number;
        lottoContainer.appendChild(numberDiv);
    }
}

generateBtn.addEventListener('click', () => {
    const numbers = generateNumbers();
    displayNumbers(numbers);
});

// Initial generation
displayNumbers(generateNumbers());
