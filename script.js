// 1. Lógica de la Clave
function checkPassword() {
    const input = document.getElementById('password-input').value.toLowerCase().trim();
    const overlay = document.getElementById('password-overlay');
    const content = document.getElementById('main-content');
    const error = document.getElementById('error-msg');

    // LA CLAVE QUE PEDISTE
    if (input === "piensabienlo") {
        overlay.style.opacity = "0";
        setTimeout(() => {
            overlay.style.display = "none";
            content.classList.remove('hidden');
            // Iniciar animaciones de entrada
            triggerFadeIn();
        }, 1000);
    } else {
        error.style.display = "block";
        document.getElementById('password-input').value = "";
    }
}

// Permitir presionar "Enter" para entrar
document.getElementById('password-input').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') checkPassword();
});

// 2. Efecto de Estrellas
function createStars() {
    const container = document.getElementById('star-container');
    if(!container) return;
    for (let i = 0; i < 100; i++) {
        const star = document.createElement('div');
        star.classList.add('star');
        const size = Math.random() * 3 + 'px';
        star.style.width = size;
        star.style.height = size;
        star.style.top = Math.random() * 100 + 'vh';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.setProperty('--t', Math.random() * 3 + 2 + 's');
        container.appendChild(star);
    }
}

// 3. Scroll Reveal
function triggerFadeIn() {
    createStars();
    const faders = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    faders.forEach(f => observer.observe(f));
}

// 4. Control de Música
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');

musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicBtn.innerText = '⏸️ Pausar';
    } else {
        music.pause();
        musicBtn.innerText = '🎵 Música';
    }
});

// 5. Modal Fotos
function openModal(src) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("img01").src = src;
}
function closeModal() {
    document.getElementById("modal").style.display = "none";
}