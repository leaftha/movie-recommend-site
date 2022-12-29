let loaderElem;

let panelIitemElem;
let panelIistElem;

let PanelNum = 10;
let panelSize = 300;
let uniteRadian = (2 * Math.PI) / PanelNum;
let uniteDegree = 360 / PanelNum;

function setElem() {
  loaderElem = document.querySelector(".loader");
  panelIitemElem = document.querySelectorAll(".panel-item");
  panelIistElem = document.querySelector(".panel-list");
}

function setPanelItem() {
  const dist = panelSize / 2 / Math.tan(uniteRadian / 2) + panelSize * 0.65;
  for (let i = 0; i < panelIitemElem.length; i++) {
    panelIitemElem[i].style.transform = `rotateY(${
      uniteDegree * i
    }deg) translateZ(${-dist}px)`;
  }
}

window.addEventListener("load", () => {
  setElem();

  loaderElem.addEventListener("transitionend", function () {
    this.remove();
  });

  document.body.classList.remove("loader-event");

  setPanelItem();
});
