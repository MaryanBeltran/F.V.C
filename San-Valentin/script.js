let puntos = 0;
let intervalo = null;

const musica = document.getElementById("musica");
const puntosTexto = document.getElementById("puntos");
const btnContinuar = document.getElementById("btnContinuar");

/* =========================
   NAVEGACIÓN GENERAL
========================= */
function ocultarTodo() {
  document.querySelectorAll("section").forEach(section => {
    section.classList.remove("activa");
  });
}

function ir(id) {
  ocultarTodo();
  document.getElementById(id).classList.add("activa");
}

/* =========================
   MINIJUEGO
========================= */
function irMinijuego() {
  ir("minijuego");

  puntos = 0;
  puntosTexto.textContent = "0";
  btnContinuar.style.display = "none";

  musica.currentTime = 0;
  musica.play();

  iniciarJuego();
}

function iniciarJuego() {
  const zonaJuego = document.getElementById("zona-juego");
  zonaJuego.innerHTML = "";

  intervalo = setInterval(() => {
    if (puntos >= 10) return;

    const corazon = document.createElement("div");
    corazon.classList.add("corazon");
    corazon.textContent = "💗";
    corazon.style.left = Math.random() * 90 + "%";

    zonaJuego.appendChild(corazon);

    corazon.addEventListener("click", () => {
      puntos++;
      puntosTexto.textContent = puntos;
      corazon.remove();

      if (puntos >= 10) {
        ganarJuego();
      }
    });

    setTimeout(() => {
      corazon.remove();
    }, 3000);

  }, 1000);
}

function ganarJuego() {
  clearInterval(intervalo);
  btnContinuar.style.display = "inline-block";
}

/* =========================
   BOTONES DEL MINIJUEGO
========================= */
function volverCap2() {
  clearInterval(intervalo);
  musica.pause();
  musica.currentTime = 0;
  ir("cap2");
}

function continuarHistoria() {
  clearInterval(intervalo);
  musica.pause();
  musica.currentTime = 0;
  ir("cap3");
}

/* =========================
   ÁLBUM
========================= */
function abrirFoto(src, descripcion) {
  const overlay = document.getElementById("overlay");
  const fotoGrande = document.getElementById("fotoGrande");
  const desc = document.getElementById("descripcionFoto");

  fotoGrande.src = src;
  desc.textContent = descripcion;
  overlay.style.display = "flex";
}

document.getElementById("cerrar").addEventListener("click", cerrarOverlay);

function cerrarOverlay(e) {
  const overlay = document.getElementById("overlay");
  if (e.target.id === "overlay" || e.target.id === "cerrar") {
    overlay.style.display = "none";
  }
}
/* =========================
   MÚSICA
========================= */

// Lista de canciones
const playlist = [
  "assets/music/abrazame-camila.mp3",
  "assets/music/hombre de mi vida.mp3",
  "assets/music/Simplemente.mp3",
  "assets/music/besame.mp3",
  "assets/music/compartir.mp3",
  "assets/music/eres tu.mp3",
  "assets/music/te regalo.mp3",
  "assets/music/colgando.mp3",
  "assets/music/razon.mp3",
  "assets/music/100.mp3",
  "assets/music/corazon.mp3",

  "assets/music/religion.mp3",
  "assets/music/bueno.mp3",
  "assets/music/completo.mp3",
  "assets/music/quererte.mp3",
  "assets/music/metiste.mp3",
  "assets/music/amo.mp3",
  "assets/music/raiz.mp3",
  "assets/music/miel.mp3",
  "assets/music/veo.mp3",
  "assets/music/coleccionista.mp3",
  "assets/music/porque.mp3",
  "assets/music/patadas.mp3",
  "assets/music/mi-verdd.mp3",
  "assets/music/la-promesa.mp3",
  "assets/music/sabes.mp3",
  "assets/music/mirada.mp3",
  "assets/music/nuestro-sueno.mp3",
];

// Índice actual de la playlist
let indiceActual = 0;

// Reproductor
const reproductor = document.getElementById("reproductor");

// Cambiar canción
function cambiarCancion(nombreArchivo) {
    indiceActual = playlist.indexOf(nombreArchivo); // CORREGIDO
    reproductor.src = nombreArchivo;
    reproductor.play();
}

// Siguiente canción (autoplay)
function siguienteCancion() {
    indiceActual++;

    if (indiceActual >= playlist.length) {
        indiceActual = 0;
    }

    cambiarCancion(playlist[indiceActual]);
}

// Cuando termine la canción → Avanza
reproductor.addEventListener("ended", () => {
  
    siguienteCancion();
});


const progreso = document.getElementById("progreso");

reproductor.addEventListener("timeupdate",() => {
  progreso.max = reproductor.duration;
  progreso.value = reproductor.currentTime;
});

progreso.addEventListener("input", () => {
  reproductor.currentTime = progreso.value;
});

function irFinal(){
  ocultarTodo();

  document.getElementById("final").classList.add("activa");
}