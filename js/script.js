// CONFIGURACIÓN DE MÚSICA (Añade aquí tus canciones del repositorio)
const playlist = ["audio/cancion1.mp3", "audio/cancion2.mp3", "audio/cancion3.mp3", "audio/cancion4.mp3", "audio/cancion5.mp3"];
let currentSongIndex = 0;
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');

// Cargar primera canción al inicio
music.src = playlist[currentSongIndex];

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    music.src = playlist[currentSongIndex];
    music.play();
    musicBtn.innerText = '⏸️ Pausar';
}

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

function initApp() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-in').forEach(f => observer.observe(f));
}

musicBtn.addEventListener('click', () => {
    if (music.paused) { 
        music.play(); 
        musicBtn.innerText = '⏸️ Pausar'; 
    }
    else { 
        music.pause(); 
        musicBtn.innerText = '🎵 Música'; 
    }
});

function openModal(src) { document.getElementById("modal").style.display = "block"; document.getElementById("img01").src = src; }
function closeModal() { document.getElementById("modal").style.display = "none"; }