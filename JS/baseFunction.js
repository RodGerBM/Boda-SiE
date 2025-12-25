const sealBtn = document.querySelector(".wax-seal");
const envelopeFront = document.querySelector(".envelope-front");
const envelopeBack = document.querySelector(".envelope-back");
const openableEnevelope = document.querySelector(".openable")
const openedEnevelope = document.querySelector(".opened")
const dissolvedText = document.querySelector(".vanish")

const body = document.body;

sealBtn.addEventListener("click", () => {
    envelopeFront.style.top = "110%";
    envelopeBack.style.top = "110%";
    
    openableEnevelope.style.transform = "rotateX(90deg)";
    openedEnevelope.style.transform = "rotateX(180deg)";

    dissolvedText.style.opacity = 0;

    body.classList.remove('no-scroll');
});

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});