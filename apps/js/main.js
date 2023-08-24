// Select elements
const slider = document.querySelector("#range");
const lengthDisplay = document.querySelector(".length");
const checkboxesContainer = document.querySelector(".checkboxes");
const generatorBtn = document.querySelector("#generator");
const output = document.querySelector("#output");
const copyBtn = document.querySelector("#copy-btn");
const passGenerated = document.querySelector(".pass-generated");
const strength = document.querySelector("#strength");
const bars = document.querySelector(".bars");
const tagOne = document.querySelector(".tag-1");

// Add event listeners
slider.addEventListener("input", updateLength);
checkboxesContainer.addEventListener("change", updateSelectedTypes);
generatorBtn.addEventListener("click", generatePassword);
copyBtn.addEventListener("click", copyPassword);

// Define variables
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVXYZ";
const lowerCase = "abcdefghijklmnopqrstuvxyz";
const numbers = "0123456789";
const specialChars = "£$&()*+[]@#^-_!?";

// Define functions
function updateLength(e) {
    lengthDisplay.innerText = e.target.value;
}

function updateSelectedTypes(e) {
    const selectedTypes = Array.from(
        e.target.querySelectorAll('input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.id);
}

function option(choice) {
    return choice == "upperCase"
        ? upperCase
        : choice == "lowerCase"
        ? lowerCase
        : choice == "numbers"
        ? numbers
        : specialChars
        ? specialChars
        : numbers;
}

function generatePassword() {
    const selectedTypes = Array.from(
        checkboxesContainer.querySelectorAll('input[type="checkbox"]:checked')
    ).map((checkbox) => checkbox.id);
    const length = lengthDisplay.innerText;

    let password = "";

    for (let i = 0; i < length; i++) {
        const choice =
            selectedTypes[Math.floor(Math.random() * selectedTypes.length)];
        const passwordOption = option(choice);

        const char =
            passwordOption[Math.floor(Math.random() * passwordOption.length)];
        password += char;
    }

    if (selectedTypes.length > 0) {
        passGenerated.innerText = password;
        getStrength(password);
    }
}

function getStrength(password) {
    let score = zxcvbn(password).score;

    strength.innerText =
        score <= 1
            ? "TOO-WEAK"
            : score === 2
            ? "WEAK"
            : score === 3
            ? "MEDIUM"
            : "STRONG";
    bars.className = `bars flex ${
        score <= 1
            ? "too-weak"
            : score === 2
            ? "weak"
            : score === 3
            ? "medium"
            : "strong"
    }`;
}

function copyPassword() {
    password = passGenerated.innerText;

    navigator.clipboard
        .writeText(password)
        .then(() => {
            tagOne.innerText = "COPIED! ";
            setTimeout(() => {
                tagOne.innerText = "";
            }, 1000);
        })
        .catch((err) => {
            console.error("Failed to copy: ", err);
        });
}
