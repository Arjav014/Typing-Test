const typingTest = document.querySelector(".typing-text p");
const input = document.querySelector(".input-field");
const time = document.querySelector(".time span");
const mistakes = document.querySelector(".mistake span");
const wpm = document.querySelector(".wpm span");
const cpm = document.querySelector(".cpm span");
const btn = document.querySelector("button");

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistake = 0;
let isTyping = false;

function loadParagraph(){
    const Paragraph = [
        "Avoid daydreaming about the years to come",
        "You are the most important person in your whole life",
        "Always be true to who you are and ignore what other people have to say about you",
        "Only demonstrate your strength when its really required",
        "Lorem ipsum dolor sit amet consectetur adipisicing elit",
        "Possimus distinctio suscipit repudiandae unde aut quisquam deserunt minima",
        "ipsam voluptas deleniti quaerat nobis nam ad et atque qui dolorum consequatur totam"
    ];
    const randomIndex = Math.floor(Math.random() * Paragraph.length);
    typingTest.innerHTML = "";
    for(const char of Paragraph[randomIndex]){
        typingTest.innerHTML += `<span>${char}</span>`;
    }
    typingTest.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => input.focus());
}

function initTyping(){
    const char = typingTest.querySelectorAll("span");
    const typedChar = input.value.charAt(charIndex);

    if (event.inputType === "deleteContentBackward") {
        if (charIndex > 0) {
            charIndex--; 
            if (char[charIndex].classList.contains("incorrect")) {
                mistake--; 
            }
            char[charIndex].classList.remove("correct", "incorrect"); 
            mistakes.innerText = mistake;
            cpm.innerText = charIndex - mistake; 
        }
    } else {
        if (charIndex < char.length && timeLeft > 0) {
            if (!isTyping) {
                timer = setInterval(initTime, 1000);
                isTyping = true;
            }
            if (char[charIndex].innerText === typedChar) {
                char[charIndex].classList.add("correct");
            } else {
                mistake++;
                char[charIndex].classList.add("incorrect");
            }
            charIndex++;
            mistakes.innerText = mistake;
            cpm.innerText = charIndex - mistake;
        } else {
            clearInterval(timer);
            input.value = "";
        }
    }
}

function initTime(){
    if (timeLeft > 0) {
        timeLeft--;
        time.innerText = timeLeft;
        let wpmVal = Math.round(((charIndex - mistake) / 5) / (maxTime - timeLeft) * 60);
        wpm.innerText = wpmVal;
    } else {
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = "";
    charIndex = 0;
    mistake = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistakes.innerText = 0;
}

input.addEventListener("input", initTyping);
btn.addEventListener("click", reset);
loadParagraph();
