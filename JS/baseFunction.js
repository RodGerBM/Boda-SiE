const emptySpace = document.querySelector(".empty-space");
const hand = document.querySelector(".scroll.scroll")
const sealBtn = document.querySelector(".wax-seal");
const envelopeFront = document.querySelector(".envelope-front");
const envelopeBack = document.querySelector(".envelope-back");
const openableEnvelope = document.querySelector(".openable");
const openedEnvelope = document.querySelector(".opened");
const hint = document.querySelector(".seal-hint");
const body = document.body;

function setVH() {
    document.documentElement.style.setProperty(
        "--vh",
        `${window.innerHeight * 0.01}px`
    );
}

setVH();
window.addEventListener("resize", setVH);

function openEnvelope() {
    const vh = window.innerHeight * 0.01; // 1vh real en px
    emptySpace.style.height = `${vh * 85}px`; // 85% de la altura de la pantalla
    hand.style.opacity = "100%";
    envelopeFront.style.top = "110%";
    envelopeBack.style.top = "110%";
    openableEnvelope.style.transform = "rotateX(90deg)";
    openedEnvelope.style.transform = "rotateX(180deg)";
    hint.style.opacity = 0;
    setTimeout(() => {
        body.classList.remove("no-scroll");
    }, 1000);
}

sealBtn.addEventListener("pointerup", openEnvelope);

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});


window.addEventListener('scroll', () => {
    hand.style.opacity = "0%";
});

const targetDate = new Date("2026-02-21T19:00:00");

const countdown = document.getElementById("countdown");
const numbers = countdown.querySelectorAll(".number");

function updateCountdown() {
    const now = new Date();
    const diff = targetDate - now;

    if (diff <= 0) {
        numbers[0].textContent = "00";
        numbers[1].textContent = "00";
        numbers[2].textContent = "00";
        numbers[3].textContent = "00";
        return;
    }

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));

    numbers[0].textContent = days.toString().padStart(2, "0");
    numbers[1].textContent = hours.toString().padStart(2, "0");
    numbers[2].textContent = minutes.toString().padStart(2, "0");
    numbers[3].textContent = seconds.toString().padStart(2, "0");
}

setInterval(updateCountdown, 1000);
updateCountdown();

const music = document.getElementById("bgMusic");

music.volume = 0;
music.muted = false;

function startMusicFade() {
    music.currentTime = 6;
    music.play().catch(() => {});

    let volume = 0;
    const targetVolume = 0.4;
    const fadeDuration = 3000; // 3 segundos
    const steps = 30;
    const stepTime = fadeDuration / steps;
    const step = targetVolume / steps;

    const fade = setInterval(() => {
        volume += step;
        music.volume = Math.min(volume, targetVolume);
        if (volume >= targetVolume) {
            clearInterval(fade);
        }
    }, stepTime);
}

// cuando se abre la invitación
document.addEventListener("click", startMusicFade, { once: true });
document.addEventListener("touchstart", startMusicFade, { once: true });