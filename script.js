// 1. Lógica de Entrada
function enterSite() {
    const splash = document.getElementById('splash-screen');
    const content = document.getElementById('main-content');
    const themeBtn = document.getElementById('theme-toggler');
    
    splash.style.opacity = "0";
    setTimeout(() => {
        splash.style.display = "none";
        content.classList.remove('hidden');
        themeBtn.classList.remove('hidden');
        initApp();
    }, 1000);
}

// 2. Cambio de Temas
let themes = ['dark', 'pink', 'mint'];
let currentThemeIndex = 0;

function nextTheme() {
    currentThemeIndex = (currentThemeIndex + 1) % themes.length;
    const newTheme = themes[currentThemeIndex];
    document.body.setAttribute('data-theme', newTheme);
    
    const icon = document.getElementById('theme-icon');
    const footer = document.getElementById('footer-text');
    
    if(newTheme === 'dark') {
        icon.innerText = "✨ Nuestra Conexión ✨";
        footer.innerText = "Conectados por siempre © 2026";
    } else if (newTheme === 'pink') {
        icon.innerText = "❤️ Te quiero mucho ❤️";
        footer.innerText = "Hecho con amor para ti © 2026";
    } else {
        icon.innerText = "🌿 Contigo siento paz 🌿";
        footer.innerText = "Para Adriana con cariño © 2026";
    }
    document.getElementById('particle-container').innerHTML = '';
}

// 3. Sistema de Partículas
function createParticles() {
    const container = document.getElementById('particle-container');
    if(!container) return;
    const theme = document.body.getAttribute('data-theme');
    const p = document.createElement('div');
    p.classList.add('particle');
    
    if(theme === 'dark') p.innerHTML = '⭐';
    else if(theme === 'pink') p.innerHTML = '❤️';
    else p.innerHTML = '🌿';
    
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = Math.random() * 20 + 10 + 'px';
    p.style.setProperty('--d', Math.random() * 3 + 4 + 's');
    
    container.appendChild(p);
    setTimeout(() => p.remove(), 6000);
}
setInterval(createParticles, 800);

// 4. Inicialización
function initApp() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(f => observer.observe(f));
}

// Control Música
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');
musicBtn.addEventListener('click', () => {
    if (music.paused) { music.play(); musicBtn.innerText = '⏸️ Pausar'; }
    else { music.pause(); musicBtn.innerText = '🎵 Música'; }
});

// Modal
function openModal(src) { document.getElementById("modal").style.display = "block"; document.getElementById("img01").src = src; }
function closeModal() { document.getElementById("modal").style.display = "none"; }