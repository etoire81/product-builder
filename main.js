// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const recommendBtn = document.getElementById('recommend-btn');
const menuDisplay = document.getElementById('menu-display');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

// Lotto Colors
const colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
    '#ff5722', '#795548', '#9e9e9e', '#607d8b'
];

// Dinner Menus
const menus = [
    'Pizza 🍕', 'Sushi 🍣', 'Burger 🍔', 'Pasta 🍝', 
    'Steak 🥩', 'Tacos 🌮', 'Ramen 🍜', 'Fried Chicken 🍗', 
    'Salad 🥗', 'Curry 🍛', 'Fish and Chips 🐟', 'Sandwich 🥪', 
    'Dim Sum 🥟', 'BBQ Ribs 🍖', 'Pad Thai 🍜', 'Pho 🍲',
    'Burrito 🌯', 'Kebab 🥙', 'Lasagna 🥘', 'Bibimbap 🥗'
];

// Tab Logic
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        
        // Update Buttons
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update Content
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabName}-section`) {
                content.classList.add('active');
            }
        });
    });
});

// Lotto Logic
function generateLottoNumbers() {
    lottoNumbersContainer.innerHTML = '';
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }

    const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);

    sortedNumbers.forEach((number, index) => {
        setTimeout(() => {
            const ball = document.createElement('div');
            ball.classList.add('number-ball');
            ball.textContent = number;
            
            const colorIndex = (number - 1) % colors.length;
            ball.style.backgroundColor = colors[colorIndex];

            lottoNumbersContainer.appendChild(ball);
        }, index * 200); 
    });
}

// Menu Logic
function recommendMenu() {
    menuDisplay.style.opacity = '0';
    setTimeout(() => {
        const randomIndex = Math.floor(Math.random() * menus.length);
        menuDisplay.textContent = menus[randomIndex];
        menuDisplay.style.opacity = '1';
    }, 200);
}

// Event Listeners
generateBtn.addEventListener('click', generateLottoNumbers);
recommendBtn.addEventListener('click', recommendMenu);

// Initial Execution
generateLottoNumbers();
