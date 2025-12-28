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
    emptySpace.style.height = "calc(var(--vh, 1vh) * 100)";
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

function sendConfirmation() {
    const nombre = document.getElementById("nombreInput").value;
    if(!nombre) {
        alert("Por favor escribe tu nombre");
        return;
    }

    fetch("https://script.google.com/macros/s/AKfycbyRmKPsdt7IWyGYIArH35L9A16F4hGNns7xhJiG3LpB6GzHziJNnPlkLhMONXKAVgMj/exec", {
        method: "POST",
        body: new URLSearchParams({ nombre })
    })
    .then(res => res.text())
    .then(res => {
        if(res === "OK") {
            alert("¡Confirmación enviada! Gracias 😊");
            document.getElementById("nombreInput").value = "";
        } else {
            alert("Ocurrió un error, intenta de nuevo.");
        }
    })
    .catch(err => alert("Error: " + err));
}