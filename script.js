// COLORSelect
const colorMode = document.querySelector(".colorMode");
const colorSelect = document.querySelector(".colorSelect");
const rainbowMode = document.querySelector(".rainbowMode");
const eraserMode = document.querySelector(".eraserMode");
const reseterMode = document.querySelector(".resetMode");
let selectedColor;
colorSelect.addEventListener("change", function colorSelect(e) {
  selectedColor = e.target.value;
  colorMode.style.color = selectedColor;
});
//rainbow code
function randomColor() {
  const colors = ["red", "orange", "yellow", "green", "blue", "indigo"];
  let element = "";
  for (let i = 0; i < 1; i++) {
    element += colors[Math.floor(Math.random() * 5)];
  }
  return element;
}

colorMode.addEventListener("click", function () {
  document.querySelector(".divElement").addEventListener("click", function () {
    document.querySelector(".divElement").style.backgroundColor =
      colorSelect.value;
  });
});
rainbowMode.addEventListener("click", function () {
  document.querySelector(".divElement").addEventListener("click", function () {
    document.querySelector(".divElement").style.backgroundColor = randomColor();
  });
});
// erasermode
eraserMode.addEventListener("click", function () {
  document.querySelector(".divElement").addEventListener("click", function () {
    document.querySelector(".divElement").style.backgroundColor = "white";
  });
});
// reset
reseterMode.addEventListener("click", function () {
  document.querySelectorAll(".divElement").forEach((element) => {
    element.style.backgroundColor = "white";
  });
});

// GRID DIMENSION
const rangeInput = document.querySelector(".range");
const outputElement = document.querySelector(".dimension");
const container = document.querySelector(".canvas");

rangeInput.addEventListener("input", function (e) {
  const numberSides = e.target.value;
  container.innerHTML = "";
  outputElement.textContent = `${numberSides} x ${numberSides}`;
  container.style.gridTemplateRows = `repeat(${numberSides},1fr)`;
  container.style.gridTemplateColumns = `repeat(${numberSides},1fr)`;
  let ismousepressed = false;

  console.log(e.target.value);
  for (let row = 0; row < numberSides; row++) {
    for (let col = 0; col < numberSides; col++) {
      const divElement = document.createElement("div");
      divElement.classList.add("divElement");

      //color mode
      colorMode.addEventListener("click", function () {
        divElement.addEventListener("mousedown", function () {
          ismousepressed = true;
          divElement.style.backgroundColor = colorSelect.value;
        });
        divElement.addEventListener("mousemove", function () {
          if (ismousepressed) {
            divElement.style.backgroundColor = colorSelect.value;
          }
        });
        divElement.addEventListener("mouseup", function () {
          ismousepressed = false;
        });
      });

      // rainbow mode

      rainbowMode.addEventListener("click", function () {
        divElement.addEventListener("mousedown", function () {
          ismousepressed = true;
          divElement.style.backgroundColor = randomColor();
        });
        divElement.addEventListener("mousemove", function () {
          if (ismousepressed) {
            divElement.style.backgroundColor = randomColor();
          }
        });
        divElement.addEventListener("mouseup", function () {
          ismousepressed = false;
        });
      });
      // eraser mode
      eraserMode.addEventListener("click", function () {
        divElement.addEventListener("mousedown", function () {
          ismousepressed = true;
          divElement.style.backgroundColor = "white";
        });
        divElement.addEventListener("mousemove", function () {
          if (ismousepressed) {
            divElement.style.backgroundColor = "white";
          }
        });
        divElement.addEventListener("mouseup", function () {
          ismousepressed = false;
        });
      });

      container.appendChild(divElement);
    }
  }
});
