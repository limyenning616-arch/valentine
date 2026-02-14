const checkbox = document.getElementById('checkbox-btn');
const captchaBox = document.getElementById('step-checkbox');
const captchaModal = document.getElementById('captcha-modal');
const grid = document.getElementById('grid');
const verifyBtn = document.getElementById('verify-btn');
const headerTitle = document.getElementById('instruction-text');

let selectedTiles = new Set();

const VALENTINE_IMAGES = [
    'assets/untitled-1.png',
    'assets/untitled-2.png',
    'assets/untitled-3.png',
    'assets/untitled-4.png',
    'assets/untitled-5.png',
    'assets/untitled-6.png',
    'assets/untitled-7.png',
    'assets/untitled-8.png',
    'assets/untitled-9.png'
];

// 1️⃣ Click Checkbox → Go straight to Valentine CAPTCHA
checkbox.addEventListener('click', () => {

    checkbox.classList.add('loading');

    setTimeout(() => {
        captchaBox.classList.add('hidden');
        captchaModal.classList.remove('hidden');

        startValentineCaptcha();
    }, 1200);
});

function startValentineCaptcha() {

    captchaModal.classList.add('valentine-mode');
    headerTitle.innerText = "Select all the hearts 💖";

    setupGrid();
}

function setupGrid() {

    grid.innerHTML = '';
    selectedTiles.clear();
    verifyBtn.disabled = true;

    for (let i = 0; i < 9; i++) {
        const tile = document.createElement('div');
        tile.classList.add('tile');

        tile.style.backgroundImage = `url('${VALENTINE_IMAGES[i]}')`;
        tile.style.backgroundSize = 'cover';
        tile.style.backgroundPosition = 'center';

        tile.dataset.index = i;
        tile.addEventListener('click', () => toggleTile(tile));

        grid.appendChild(tile);
    }
}

function toggleTile(tile) {

    const index = tile.dataset.index;

    if (selectedTiles.has(index)) {
        selectedTiles.delete(index);
        tile.classList.remove('selected');
    } else {
        selectedTiles.add(index);
        tile.classList.add('selected');
    }

    verifyBtn.disabled = selectedTiles.size === 0;
}

// 2️⃣ Click Verify → Show Success Screen
verifyBtn.addEventListener('click', () => {

    captchaModal.classList.add('hidden');
    document.getElementById('success-screen').classList.remove('hidden');

    launchConfetti();
});

// 🎉 Confetti
function launchConfetti() {

    const colors = ['#ff6b81', '#ff4757', '#ffffff'];

    for (let i = 0; i < 120; i++) {
        const conf = document.createElement('div');

        conf.style.position = 'fixed';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.top = '-10vh';
        conf.style.width = '10px';
        conf.style.height = '10px';
        conf.style.backgroundColor =
            colors[Math.floor(Math.random() * colors.length)];

        conf.style.animation = `fall ${Math.random() * 3 + 2}s linear forwards`;

        document.body.appendChild(conf);
    }

    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes fall {
            to { transform: translateY(110vh) rotate(720deg); }
        }
    `;

    document.head.appendChild(style);
}
