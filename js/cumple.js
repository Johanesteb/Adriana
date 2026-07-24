/* ==========================================================
   MUNDO DE CUMPLEAÑOS  —  LÓGICA ADICIONAL
   Este archivo NO modifica script.js. Solo lo complementa.
   Se carga DESPUÉS de script.js, al final del <body>.
   ========================================================== */


/* ----------------------------------------------------------
   1. CONFIGURACIÓN  (lo único que necesitas editar aquí)
   ---------------------------------------------------------- */

// Canción exclusiva del cumpleaños. Suena sola al entrar a la sección.
// Puedes poner más de una: ["audio/cumple1.mp3", "audio/cumple2.mp3"]
const CANCIONES_CUMPLE = ["audio/cumple1.mp3"];

// Fotos del cielo: img/cielo/cielo1.jpg, cielo2.jpg ...
// ✏️ Pon aquí cuántas fotos tienes de verdad (el script de PowerShell te dice el número)
const TOTAL_FOTOS_CIELO  = 215;
const PREFIJO_CIELO      = "img/cielo/cielo";
const EXTENSIONES_CIELO  = [".jpg", ".jpeg", ".png", ".webp"];

// Deseos que aparecen al abrir el regalo (agrega los que quieras)
const DESEOS = [
    "Que este año te traiga tantas razones para reír como las que tú me das a mí.",
    "Que nunca te falte cielo bonito para mirar.",
    "Que todo lo que estás construyendo te salga aún mejor de lo que imaginas.",
    "Que sigas siendo tan tú: eso es lo que me encanta.",
    "Que tengas paz los días difíciles y compañía los días largos.",
    "Que se te cumpla eso que pediste al soplar las velas.",
    "Que este sea el peor de tus próximos cumpleaños.",
    "Que sepas, siempre, lo importante que eres."
];


/* ----------------------------------------------------------
   2. ESTADO INTERNO
   ---------------------------------------------------------- */
let enCumple = false;
let indiceCancionCumple = 0;
let galeriaCieloLista = false;
let estadoPrevio = { musicaSonando: false, textoFooter: "" };


/* ----------------------------------------------------------
   3. NAVEGACIÓN ENTRE MUNDOS
   ---------------------------------------------------------- */
function irACumple() {
    if (enCumple) return;
    enCumple = true;

    // Tema exclusivo del cumpleaños
    document.body.setAttribute('data-theme', 'cumple');

    // Se esconde el mundo de "Nuestros Momentos" (sin borrar nada)
    document.querySelector('.hero').classList.add('oculto');
    document.querySelector('main.container').classList.add('oculto');
    document.getElementById('theme-toggler').classList.add('oculto');

    // Se muestra el mundo de cumpleaños
    document.getElementById('vista-cumple').classList.remove('oculto');
    document.getElementById('particulas-cumple').classList.remove('oculto');

    // Footer con mensaje de la fecha especial
    const footer = document.getElementById('footer-text');
    estadoPrevio.textoFooter = footer.innerText;
    footer.innerText = "Feliz cumpleaños, Adriana 🎂 © 2026";

    construirGaleriaCielo();
    animarSecciones();
    ponerMusicaDeCumple();
    marcarNav('cumple');

    window.scrollTo({ top: 0, behavior: 'smooth' });
    lanzarConfeti(80);
}

function irAInicio() {
    if (!enCumple) return;
    enCumple = false;

    // Vuelve al tema que estaba activo antes
    document.body.setAttribute('data-theme', themes[currentThemeIndex]);

    document.getElementById('vista-cumple').classList.add('oculto');
    const particulas = document.getElementById('particulas-cumple');
    particulas.classList.add('oculto');
    particulas.innerHTML = '';

    document.querySelector('.hero').classList.remove('oculto');
    document.querySelector('main.container').classList.remove('oculto');
    document.getElementById('theme-toggler').classList.remove('oculto');

    document.getElementById('footer-text').innerText = estadoPrevio.textoFooter;

    restaurarMusica();
    marcarNav('inicio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function marcarNav(vista) {
    document.getElementById('nav-inicio').classList.toggle('activo', vista === 'inicio');
    document.getElementById('nav-cumple').classList.toggle('activo', vista === 'cumple');
}

// Entrada en cascada de las secciones del cumpleaños
function animarSecciones() {
    document.querySelectorAll('#vista-cumple .fade-in').forEach((el, i) => {
        el.classList.remove('visible');
        setTimeout(() => el.classList.add('visible'), 180 * i + 100);
    });
}


/* ----------------------------------------------------------
   4. MÚSICA DEL CUMPLEAÑOS
   Guarda lo que estaba sonando y lo devuelve al salir.
   ---------------------------------------------------------- */
function ponerMusicaDeCumple() {
    estadoPrevio.musicaSonando = !music.paused;

    indiceCancionCumple = 0;
    music.src = CANCIONES_CUMPLE[indiceCancionCumple];
    music.currentTime = 0;

    const intento = music.play();
    if (intento) {
        intento
            .then(() => { musicBtn.innerText = '⏸️ Pausar'; })
            .catch(() => { musicBtn.innerText = '🎵 Música'; });
    }
}

function restaurarMusica() {
    music.src = playlist[currentSongIndex];
    if (estadoPrevio.musicaSonando) {
        music.play().catch(() => {});
        musicBtn.innerText = '⏸️ Pausar';
    } else {
        music.pause();
        musicBtn.innerText = '🎵 Música';
    }
}

// El botón ⏭️ sigue funcionando igual, pero dentro del cumpleaños
// se queda en la lista de canciones de cumpleaños.
const nextSongOriginal = nextSong;
window.nextSong = function () {
    if (enCumple) {
        indiceCancionCumple = (indiceCancionCumple + 1) % CANCIONES_CUMPLE.length;
        music.src = CANCIONES_CUMPLE[indiceCancionCumple];
        music.play().catch(() => {});
        musicBtn.innerText = '⏸️ Pausar';
    } else {
        nextSongOriginal();
    }
};


/* ----------------------------------------------------------
   5. GALERÍA "BAJO EL MISMO CIELO"
   Carga lenta (lazy loading): la foto se descarga solo
   cuando estás por llegar a ella.
   Si cielo1.png no existe, prueba cielo1.jpg, luego .jpeg...
   y si ninguna existe, esa casilla desaparece sola.
   ---------------------------------------------------------- */
function construirGaleriaCielo() {
    if (galeriaCieloLista) return;
    galeriaCieloLista = true;

    const grid = document.getElementById('grid-cielo');
    if (!grid) return;

    for (let i = 1; i <= TOTAL_FOTOS_CIELO; i++) {
        const casilla = document.createElement('div');
        casilla.className = 'cielo-item';

        const img = document.createElement('img');
        img.alt = 'Cielo ' + i;
        img.setAttribute('loading', 'lazy');   // carga lenta
        img.setAttribute('decoding', 'async');
        img.onclick = () => openModal(img.src);

        // Va probando extensión por extensión
        let intento = 0;
        img.onerror = () => {
            intento++;
            if (intento < EXTENSIONES_CIELO.length) {
                img.src = PREFIJO_CIELO + i + EXTENSIONES_CIELO[intento];
            } else {
                casilla.remove();
            }
        };
        img.src = PREFIJO_CIELO + i + EXTENSIONES_CIELO[0];

        casilla.appendChild(img);
        grid.appendChild(casilla);
    }
}


/* ----------------------------------------------------------
   6. PARTÍCULAS DE FIESTA (solo en el mundo de cumpleaños)
   ---------------------------------------------------------- */
const EMOJIS_FIESTA = ['🎈', '🎉', '🎂', '🎁', '✨', '🥳'];

function crearParticulaCumple() {
    const contenedor = document.getElementById('particulas-cumple');
    if (!contenedor) return;

    const p = document.createElement('div');
    p.classList.add('particle');
    p.innerHTML = EMOJIS_FIESTA[Math.floor(Math.random() * EMOJIS_FIESTA.length)];
    p.style.left = Math.random() * 100 + 'vw';
    p.style.fontSize = Math.random() * 22 + 12 + 'px';
    p.style.setProperty('--d', Math.random() * 3 + 5 + 's');

    contenedor.appendChild(p);
    setTimeout(() => p.remove(), 8000);
}

setInterval(() => { if (enCumple) crearParticulaCumple(); }, 600);


/* ----------------------------------------------------------
   7. REGALO + CONFETI
   (el botón del regalo ya no está en la página, pero dejo la
    función por si algún día quieres volver a ponerlo)
   ---------------------------------------------------------- */
function abrirRegalo() {
    const caja = document.getElementById('deseo-texto');
    if (!caja) return;
    caja.classList.remove('mostrar');

    setTimeout(() => {
        caja.innerText = '“' + DESEOS[Math.floor(Math.random() * DESEOS.length)] + '”';
        caja.classList.add('mostrar');
    }, 250);

    lanzarConfeti(45);
}

/* ----------------------------------------------------------
   8. ARCADE: cualquier tecla empieza la partida
   ---------------------------------------------------------- */
document.addEventListener('keydown', function arrancar(e) {
    const splash = document.getElementById('splash-screen');
    if (!splash || splash.style.display === 'none') return;
    if (e.key === 'Tab') return;              // dejar navegar con teclado
    document.removeEventListener('keydown', arrancar);
    enterSite();
});


function lanzarConfeti(cantidad = 50) {
    const contenedor = document.getElementById('confeti-container');
    if (!contenedor) return;

    for (let i = 0; i < cantidad; i++) {
        const c = document.createElement('div');
        c.className = 'confeti';
        c.style.left = Math.random() * 100 + 'vw';
        c.style.background = COLORES_CONFETI[Math.floor(Math.random() * COLORES_CONFETI.length)];
        c.style.width = (Math.random() * 6 + 7) + 'px';
        c.style.height = (Math.random() * 8 + 10) + 'px';
        c.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
        c.style.animationDelay = (Math.random() * 0.6) + 's';
        if (Math.random() > 0.6) c.style.borderRadius = '50%';

        contenedor.appendChild(c);
        setTimeout(() => c.remove(), 6000);
    }
}
