// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const recommendBtn = document.getElementById('recommend-btn');
const menuDisplay = document.getElementById('menu-display');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const themeToggle = document.getElementById('theme-toggle');
const langButtons = document.querySelectorAll('.lang-btn');

// Translations
const translations = {
    en: {
        lottoTab: 'Lotto Numbers',
        menuTab: 'Dinner Menu',
        lottoTitle: 'Lotto Generator',
        generateBtn: 'Generate Numbers',
        menuTitle: "What's for Dinner?",
        menuDefault: 'Ready for a recommendation?',
        recommendBtn: 'Recommend Menu',
        menus: [
            'Pizza 🍕', 'Sushi 🍣', 'Burger 🍔', 'Pasta 🍝', 
            'Steak 🥩', 'Tacos 🌮', 'Ramen 🍜', 'Fried Chicken 🍗', 
            'Salad 🥗', 'Curry 🍛', 'Fish and Chips 🐟', 'Sandwich 🥪', 
            'Dim Sum 🥟', 'BBQ Ribs 🍖', 'Pad Thai 🍜', 'Pho 🍲',
            'Burrito 🌯', 'Kebab 🥙', 'Lasagna 🥘', 'Bibimbap 🥗'
        ]
    },
    ko: {
        lottoTab: '로또 번호',
        menuTab: '저녁 메뉴',
        lottoTitle: '로또 번호 생성기',
        generateBtn: '번호 생성',
        menuTitle: '오늘 뭐 먹지?',
        menuDefault: '메뉴를 추천해드릴까요?',
        recommendBtn: '메뉴 추천',
        menus: [
            '김치찌개 🍲', '된장찌개 🥘', '제육볶음 🐷', '돈가스 🍛', 
            '초밥 🍣', '삼겹살 🥓', '치킨 🍗', '피자 🍕', 
            '마라탕 🌶️', '쌀국수 🍜', '파스타 🍝', '햄버거 🍔', 
            '비빔밥 🥗', '부대찌개 🍲', '떡볶이 🍢', '냉면 🍜',
            '스테이크 🥩', '탕수육 🥡', '짜장면 🍜', '짬뽕 🍜'
        ]
    }
};

let currentLang = localStorage.getItem('lang') || 'en';
let currentTheme = localStorage.getItem('theme') || 'light';

// Initialize Theme
document.body.className = `${currentTheme}-mode`;
updateThemeIcon();

// Initialize Language
updateLanguage();

// Theme Toggle Logic
themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.body.className = `${currentTheme}-mode`;
    localStorage.setItem('theme', currentTheme);
    updateThemeIcon();
});

function updateThemeIcon() {
    const icon = themeToggle.querySelector('.mode-icon');
    icon.textContent = currentTheme === 'light' ? '🌙' : '☀️';
}

// Language Logic
langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        currentLang = btn.getAttribute('data-lang');
        localStorage.setItem('lang', currentLang);
        
        langButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        updateLanguage();
    });
});

function updateLanguage() {
    const t = translations[currentLang];
    
    // Update elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });

    // Update active lang button
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

// Tab Logic
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabName = btn.getAttribute('data-tab');
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        tabContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === `${tabName}-section`) {
                content.classList.add('active');
            }
        });
    });
});

// Lotto Colors
const colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
    '#ff5722', '#795548', '#9e9e9e', '#607d8b'
];

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
        const menus = translations[currentLang].menus;
        const randomIndex = Math.floor(Math.random() * menus.length);
        menuDisplay.textContent = menus[randomIndex];
        menuDisplay.style.opacity = '1';
    }, 200);
}

generateBtn.addEventListener('click', generateLottoNumbers);
recommendBtn.addEventListener('click', recommendMenu);

// Initial Execution
generateLottoNumbers();
