import { data } from "./data.js";
import { ProjectView } from "./ProjectView.js";

let loaderElem;

let projectview;

let panelIitemElem;
let panelIistElem;
let panelElem;
let scrollListElem;

let observerElem;
let scroll;
let prevPageYOffset;
let currentIndex;
let currentPanel;

let PanelNum = 10;
let panelSize = 300;
let uniteRadian = (2 * Math.PI) / PanelNum;
let uniteDegree = 360 / PanelNum;

function setElem() {
  loaderElem = document.querySelector(".loader");
  panelIitemElem = document.querySelectorAll(".panel-item");
  panelIistElem = document.querySelector(".panel-list");
  observerElem = document.querySelectorAll(".observer");
  panelElem = document.querySelector(".panel");
  scrollListElem = document.querySelector(".scroll-list");
}

function setPanelItem() {
  const dist = panelSize / 2 / Math.tan(uniteRadian / 2) + panelSize * 0.65;
  for (let i = 0; i < panelIitemElem.length; i++) {
    panelIitemElem[i].style.transform = `rotateY(${
      uniteDegree * i
    }deg) translateZ(${-dist}px)`;
  }
}

function removeActive() {
  if (currentPanel) {
    currentPanel.classList.remove("active");
  }
}

function setCurrentPanel() {
  removeActive();
  currentPanel = panelIitemElem[currentIndex];
  currentPanel.classList.add("active");
}

function rotatePanel() {
  panelIistElem.style.transform = `
    translateZ(${PanelNum * 85}px)
    rotateY(${-uniteDegree * currentIndex}deg)`;
  setCurrentPanel();
}

window.addEventListener("load", () => {
  setElem();

  loaderElem.addEventListener("transitionend", function () {
    this.remove();
  });

  document.body.classList.remove("loader-event");

  setPanelItem();

  projectview = new ProjectView();

  const io = new IntersectionObserver((entries, observer) => {
    for (let i = 0; i < entries.length; i++) {
      if (entries[i].isIntersecting) {
        if (entries[i].target.classList.contains("observer-start")) {
          currentIndex = 0;
          rotatePanel();
          continue;
        }
        const panelIndex = entries[i].target.dataset.panelIndex * 1;
        if (panelIndex >= 0) {
          if (scroll === "up") {
            currentIndex = entries[i].target.dataset.panelIndex * 1 + 1;
          } else {
            currentIndex = entries[i].target.dataset.panelIndex;
          }
          if (currentIndex < PanelNum) {
            rotatePanel();
          }
        }
        if (
          scroll === "up" &&
          entries[i].target.classList.contains("header-content")
        ) {
          panelIistElem.style.transform = `
              translateZ(0px)
              rotateY(0deg)`;
          removeActive();
        }

        if (
          scroll === "down" &&
          entries[i].target.classList.contains("observer-end")
        ) {
          panelElem.classList.add("done");
        }
        if (scroll === "up" && currentIndex === PanelNum - 1) {
          panelElem.classList.remove("done");
        }
      }
    }
  });

  observerElem.forEach((item) => {
    io.observe(item);
  });

  window.addEventListener("scroll", () => {
    if (prevPageYOffset > window.pageYOffset) {
      scroll = "up";
    } else {
      scroll = "down";
    }
    prevPageYOffset = window.pageYOffset;
  });

  scrollListElem.addEventListener("click", (e) => {
    if (e.target.classList.contains("content-btn")) {
      projectview.show(data[e.target.dataset.panelIndex]);
    }
  });
});
