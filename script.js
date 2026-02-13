// 1. Efecto de aparición al bajar (Scroll)
const faders = document.querySelectorAll('.fade-in');
const observerOptions = { threshold: 0.1 };

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

faders.forEach(fader => observer.observe(fader));

// 2. Lógica de los corazones flotantes
function createHeart() {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.innerHTML = '❤️';
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    heart.style.animationDuration = Math.random() * 2 + 3 + 's';
    
    document.getElementById('heart-container').appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 5000);
}
setInterval(createHeart, 700);

// 3. Control de Música
const music = document.getElementById('bg-music');
const musicBtn = document.getElementById('music-control');

musicBtn.addEventListener('click', () => {
    if (music.paused) {
        music.play();
        musicBtn.innerText = '⏸️ Pausar Música';
    } else {
        music.pause();
        musicBtn.innerText = '🎵 Play Música';
    }
});

// 4. Modal para ampliar imágenes
function openModal(src) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = src;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}