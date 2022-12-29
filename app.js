let loadElem;

function setElem() {
  loadElem = document.querySelector(".loader-event");
}

window.addEventListener("load", () => {
  setElem();

  loadElem.addEventListener(    "transitionend", () => {
    this.remove();
  });

  document.body.classList.remove("loader-event");
});
