let lastColorCount = 8;
const noteKey = 'dismissibleNote';
const dismissibleNote = document.getElementById("dismissible-note");
const closeNoteBtn = document.getElementById("close-note");
const neverShowAgainCheckbox = document.getElementById("never-show-again");
const generateBtn = document.getElementById("generate-btn");
const paletteDiv = document.getElementById("palette");
const colorCountInput = document.getElementById("color-count");
const toggleMode = document.getElementById("toggle-mode");
const copyAllBtn = document.getElementById("copy-all-btn");

function generatePalette() {
    const numColors = parseInt(colorCountInput.value, 10) || 8;

    if (!toggleMode.checked) {
        paletteDiv.innerHTML = "";
        lastColorCount = 0;
    }

    if (numColors > lastColorCount) {
        for (let i = lastColorCount; i < numColors; i++) {
            const color = `#${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")}`;
            const colorDiv = document.createElement("div");
            colorDiv.className = "palette-color";
            colorDiv.style.background = color;
            colorDiv.textContent = color;

            // Copy color to clipboard
            colorDiv.addEventListener("click", () => {
                const tempInput = document.createElement("input");
                tempInput.value = color;
                document.body.appendChild(tempInput);
                tempInput.select();
                document.execCommand("copy");
                document.body.removeChild(tempInput);
                alert(`Copied: ${color}`);
            });

            paletteDiv.appendChild(colorDiv);
        }
    } else if (numColors < lastColorCount) {
        const children = Array.from(paletteDiv.querySelectorAll(".palette-color"));
        const difference = lastColorCount - numColors;

        for (let i = 0; i < difference; i++) {
            paletteDiv.removeChild(children[children.length - 1 - i]);
        }
    }

    lastColorCount = numColors;
}

function closeNote() {
    dismissibleNote.style.display = 'none';
    if (neverShowAgainCheckbox.checked) {
        localStorage.setItem(noteKey, 'true');
    }
}

function copyAllColors() {
    const colors = Array.from(paletteDiv.children)
        .map(div => div.textContent)
        .join(', ');

    const tempInput = document.createElement("input");
    tempInput.value = colors;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
    alert(`Copied all colors: ${colors}`);
}

window.onload = function () {
    if (localStorage.getItem(noteKey) !== 'true') {
        dismissibleNote.style.display = 'block';
    } else {
        dismissibleNote.style.display = 'none';
    }
    generatePalette();
};

generateBtn.addEventListener("click", generatePalette);
closeNoteBtn.addEventListener("click", closeNote);
copyAllBtn.addEventListener("click", copyAllColors);
