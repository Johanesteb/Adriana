// 1. Efecto Scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(f => observer.observe(f));

// 2. Corazones y hojas flotantes
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    // Mezcla de corazones y hojas para el estilo menta
    heart.innerHTML = Math.random() > 0.5 ? '❤️' : '🌿';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 15 + 10 + 'px';
    heart.style.animationDuration = Math.random() * 3 + 4 + 's';
    
    document.getElementById('heart-container').appendChild(heart);
    setTimeout(() => heart.remove(), 7000);
}
setInterval(createHeart, 900);

// 3. Control de Música
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

// 4. Modal
function openModal(src) {
    document.getElementById("modal").style.display = "block";
    document.getElementById("img01").src = src;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}