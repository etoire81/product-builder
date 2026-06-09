const menuResult = document.getElementById('menu-result');
const recommendBtn = document.getElementById('recommend-btn');

const menus = [
    '🔥 삼겹살에 소주',
    '🍗 바삭한 치킨',
    '🍕 치즈 듬뿍 피자',
    '🍣 신선한 초밥',
    '🍔 두툼한 햄버거',
    '🥘 매콤한 마라탕',
    '🍜 뜨끈한 라면',
    '🍲 든든한 김치찌개',
    '🍛 부드러운 카레',
    '🍝 고소한 파스타',
    '🥢 달콤 짭짤 짜장면',
    '🌯 멕시칸 타코',
    '🍱 정갈한 돈카츠',
    '🥗 건강한 샐러드',
    '🍲 뜨끈한 국밥',
    '🔥 화끈한 닭발',
    '🥟 속이 꽉 찬 만두',
    '🥘 보글보글 부대찌개',
    '🥪 간편한 샌드위치',
    '🥩 육즙 가득 스테이크'
];

function getRandomMenu() {
    return menus[Math.floor(Math.random() * menus.length)];
}

function startRoulette() {
    recommendBtn.disabled = true;
    menuResult.classList.add('rolling');
    menuResult.classList.remove('highlight');

    let count = 0;
    const maxCount = 15; // 룰렛 회수
    
    const interval = setInterval(() => {
        menuResult.textContent = getRandomMenu();
        count++;

        if (count >= maxCount) {
            clearInterval(interval);
            finishRoulette();
        }
    }, 80); // 0.08초마다 변경
}

function finishRoulette() {
    const finalMenu = getRandomMenu();
    menuResult.textContent = finalMenu;
    menuResult.classList.remove('rolling');
    menuResult.classList.add('highlight');
    recommendBtn.disabled = false;
}

recommendBtn.addEventListener('click', startRoulette);
