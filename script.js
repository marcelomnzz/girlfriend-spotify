
const dataNamoro = new Date("2025-10-04T00:00:00");

function atualizarContador() {
    const agora = new Date();
    const diferenca = agora - dataNamoro;

    const segundosTotais = Math.floor(diferenca / 1000);
    const minutosTotais = Math.floor(segundosTotais / 60);
    const horasTotais = Math.floor(minutosTotais / 60);
    const diasTotais = Math.floor(horasTotais / 24);

    const anos = Math.floor(diasTotais / 365);
    const meses = Math.floor((diasTotais % 365) / 30);
    const dias = diasTotais - anos * 365 - meses * 30;

    const horas = horasTotais % 24;
    const minutos = minutosTotais % 60;
    const segundos = segundosTotais % 60;


    const blocos = document.querySelectorAll(".tempo span");

    if (blocos.length >= 6) {
        blocos[0].textContent = anos;
        blocos[1].textContent = meses;
        blocos[2].textContent = dias;
        blocos[3].textContent = horas;
        blocos[4].textContent = minutos;
        blocos[5].textContent = segundos;
    }
}


setInterval(atualizarContador, 1000);
atualizarContador();


const musica = document.getElementById("musica");
const playPauseBtn = document.getElementById("playPauseBtn");
const playIcon = document.getElementById("playIcon");
const pauseIcon = document.getElementById("pauseIcon");
const progressSlider = document.getElementById("progressSlider");
const rewindBtn = document.getElementById("rewindBtn");
const nextBtn = document.getElementById("nextBtn");


window.addEventListener("DOMContentLoaded", () => {
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
    progressSlider.value = 0;
    atualizarBarra();
});


playPauseBtn.addEventListener("click", () => {
    if (musica.paused) {
        musica.play();
        playIcon.style.display = "none";
        pauseIcon.style.display = "inline";
    } else {
        musica.pause();
        playIcon.style.display = "inline";
        pauseIcon.style.display = "none";
    }
});


musica.addEventListener("timeupdate", () => {
    if (musica.duration > 0) {
        const progresso = (musica.currentTime / musica.duration) * 100;
        progressSlider.value = progresso;
        atualizarBarra();
    }
});


musica.addEventListener("ended", () => {
    musica.currentTime = 0;
    progressSlider.value = 0;
    atualizarBarra();
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
});


progressSlider.addEventListener("input", () => {
    const novoTempo = (progressSlider.value / 100) * musica.duration;
    musica.currentTime = novoTempo;
    atualizarBarra();
});


rewindBtn.addEventListener("click", () => {
    musica.currentTime = Math.max(0, musica.currentTime - 5);
});

nextBtn.addEventListener("click", () => {
    musica.currentTime = Math.min(musica.duration, musica.currentTime + 5);
});


function atualizarBarra() {
    const valor = progressSlider.value;
    progressSlider.style.background = `linear-gradient(to right, #1DB954 ${valor}%, rgba(255, 255, 255, 0.3) ${valor}%)`;
}