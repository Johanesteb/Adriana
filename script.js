// 1. Scroll Effect
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(f => observer.observe(f));

// 2. Corazones Flotantes
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.animationDuration = Math.random() * 2 + 4 + 's';
    
    document.getElementById('heart-container').appendChild(heart);
    
    setTimeout(() => heart.remove(), 6000);
}
setInterval(createHeart, 800);

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