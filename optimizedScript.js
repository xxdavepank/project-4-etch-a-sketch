const colorMode = document.querySelector(".colorMode");
const colorSelect = document.querySelector(".colorSelect");
const rainbowMode = document.querySelector(".rainbowMode");
const eraserMode = document.querySelector(".eraserMode");
const reseterMode = document.querySelector(".resetMode");
const rangeInput = document.querySelector(".range");
const outputElement = document.querySelector(".dimension");
const container = document.querySelector(".canvas");
let selectedMode = "colorMode";
let ismousepressed = false;

function setMode(mode) {
  selectedMode = mode;
}

function applyColor(element) {
  if (selectedMode === "colorMode") {
    element.style.backgroundColor = colorSelect.value;
  } else if (selectedMode === "rainbowMode") {
    element.style.backgroundColor = randomColor();
  } else if (selectedMode === "eraserMode") {
    element.style.backgroundColor = "white";
  }
}

function randomColor() {
  const colors = ["red", "orange", "yellow", "green", "blue", "indigo"];
  return colors[Math.floor(Math.random() * colors.length)];
}

colorSelect.addEventListener("change", function colorSelect(e) {
  colorMode.style.color = e.target.value;
});

colorMode.addEventListener("click", function () {
  setMode("colorMode");
});

rainbowMode.addEventListener("click", function () {
  setMode("rainbowMode");
});

eraserMode.addEventListener("click", function () {
  setMode("eraserMode");
});

reseterMode.addEventListener("click", function () {
  document.querySelectorAll(".divElement").forEach((element) => {
    element.style.backgroundColor = "white";
  });
});

rangeInput.addEventListener("input", function (e) {
  const numberSides = e.target.value;
  container.innerHTML = "";
  outputElement.textContent = `${numberSides} x ${numberSides}`;
  container.style.gridTemplateRows = `repeat(${numberSides},1fr)`;
  container.style.gridTemplateColumns = `repeat(${numberSides},1fr)`;

  for (let row = 0; row < numberSides; row++) {
    for (let col = 0; col < numberSides; col++) {
      const divElement = document.createElement("div");
      divElement.classList.add("divElement");
      container.appendChild(divElement);
    }
  }
});

container.addEventListener("mousedown", function (e) {
  ismousepressed = true;
  applyColor(e.target);
});

container.addEventListener("mousemove", function (e) {
  if (ismousepressed) {
    applyColor(e.target);
  }
});

container.addEventListener("mouseup", function () {
  ismousepressed = false;
});
