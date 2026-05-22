// DOM Elements
const generateBtn = document.getElementById('generate-btn');
const lottoNumbersContainer = document.getElementById('lotto-numbers');
const recommendBtn = document.getElementById('recommend-btn');
const menuDisplay = document.getElementById('menu-display');
const menuImage = document.getElementById('menu-image');
const imagePlaceholder = document.getElementById('image-placeholder');
const menuImageContainer = document.getElementById('menu-image-container');
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
            { name: 'Pizza', emoji: '🍕' }, { name: 'Sushi', emoji: '🍣' }, 
            { name: 'Burger', emoji: '🍔' }, { name: 'Pasta', emoji: '🍝' }, 
            { name: 'Steak', emoji: '🥩' }, { name: 'Tacos', emoji: '🌮' }, 
            { name: 'Ramen', emoji: '🍜' }, { name: 'Fried Chicken', emoji: '🍗' }, 
            { name: 'Salad', emoji: '🥗' }, { name: 'Curry', emoji: '🍛' }, 
            { name: 'Fish and Chips', emoji: '🐟' }, { name: 'Sandwich', emoji: '🥪' }, 
            { name: 'Dim Sum', emoji: '🥟' }, { name: 'BBQ Ribs', emoji: '🍖' }, 
            { name: 'Pad Thai', emoji: '🍜' }, { name: 'Pho', emoji: '🍲' },
            { name: 'Burrito', emoji: '🌯' }, { name: 'Kebab', emoji: '🥙' }, 
            { name: 'Lasagna', emoji: '🥘' }, { name: 'Bibimbap', emoji: '🥗' }
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
            { name: '김치찌개', emoji: '🍲' }, { name: '된장찌개', emoji: '🥘' }, 
            { name: '제육볶음', emoji: '🐷' }, { name: '돈가스', emoji: '🍛' }, 
            { name: '초밥', emoji: '🍣' }, { name: '삼겹살', emoji: '🥓' }, 
            { name: '치킨', emoji: '🍗' }, { name: '피자', emoji: '🍕' }, 
            { name: '마라탕', emoji: '🌶️' }, { name: '쌀국수', emoji: '🍜' }, 
            { name: '파스타', emoji: '🍝' }, { name: '햄버거', emoji: '🍔' }, 
            { name: '비빔밥', emoji: '🥗' }, { name: '부대찌개', emoji: '🍲' }, 
            { name: '떡볶이', emoji: '🍢' }, { name: '냉면', emoji: '🍜' },
            { name: '스테이크', emoji: '🥩' }, { name: '탕수육', emoji: '🥡' }, 
            { name: '짜장면', emoji: '🍜' }, { name: '짬뽕', emoji: '🍜' }
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
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            el.textContent = t[key];
        }
    });
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

// Lotto Logic
const colors = [
    '#f44336', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5',
    '#2196f3', '#03a9f4', '#00bcd4', '#009688', '#4caf50',
    '#8bc34a', '#cddc39', '#ffeb3b', '#ffc107', '#ff9800',
    '#ff5722', '#795548', '#9e9e9e', '#607d8b'
];

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

// Menu Logic with Images
function recommendMenu() {
    const menus = translations[currentLang].menus;
    const randomMenu = menus[Math.floor(Math.random() * menus.length)];
    
    // Display text
    menuDisplay.textContent = `${randomMenu.name} ${randomMenu.emoji}`;
    
    // Fetch and display image
    showLoading();
    
    // Use LoremFlickr for reliable food images by keyword
    // Adding 'food' and a random seed to prevent caching the same image
    const searchTerm = currentLang === 'ko' ? encodeURIComponent(randomMenu.name) : randomMenu.name;
    const imageUrl = `https://loremflickr.com/500/400/food,${searchTerm}/all?lock=${Math.floor(Math.random() * 1000)}`;
    
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => {
        menuImage.src = imageUrl;
        menuImage.classList.remove('hidden');
        imagePlaceholder.classList.add('hidden');
        hideLoading();
    };
    img.onerror = () => {
        menuImage.classList.add('hidden');
        imagePlaceholder.classList.remove('hidden');
        imagePlaceholder.textContent = randomMenu.emoji;
        hideLoading();
    };
}

function showLoading() {
    let loader = menuImageContainer.querySelector('.loading-spinner');
    if (!loader) {
        loader = document.createElement('div');
        loader.classList.add('loading-spinner');
        menuImageContainer.appendChild(loader);
    }
    loader.style.display = 'block';
    menuImage.style.opacity = '0.3';
}

function hideLoading() {
    const loader = menuImageContainer.querySelector('.loading-spinner');
    if (loader) loader.style.display = 'none';
    menuImage.style.opacity = '1';
}

generateBtn.addEventListener('click', generateLottoNumbers);
recommendBtn.addEventListener('click', recommendMenu);

// Initial Execution
generateLottoNumbers();
