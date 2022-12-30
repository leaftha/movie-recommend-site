export class ProjectView {
  constructor() {
    this.bodyElem = document.createElement("div");
    this.bodyElem.classList.add("cover-panel");
    document.body.appendChild(this.bodyElem);

    this.bodyElem.addEventListener("click", (e) => {
      if (e.target.classList.contains("back-btn")) {
        this.close();
      }
    });
  }

  show(data) {
    document.body.classList.add("lock");

    this.bodyElem.innerHTML = `
        <section class="project-view">
            <button class="back-btn"><span></span></button>
            <header class="project-header">
            <div class="width-setter">
                <h1 class="project-title">${data.title}</h1>
            </div>
            </header>
            <div class="project-view-content width-setter">
                <div class="slider">
                    <ul class="slide-list">
                        <li class="slide-item"><img src="${data.slide1}" alt="" srcset=""></li>
                        <li class="slide-item"><img src="${data.slide2}" alt="" srcset=""></li>
                        <li class="slide-item"><img src="${data.slide3}" alt="" srcset=""></li>
                    </ul>
                </div>
                <div class="project-view-desc width-setter">${data.description}</div>
            </div>
        </section>
    `;
    const timerId = setTimeout(() => {
      this.bodyElem.classList.add("active");
      clearTimeout(timerId);
    }, 100);
  }

  close() {
    this.bodyElem.classList.add("close");
    document.body.classList.remove("lock");
    const timerId = setTimeout(() => {
      this.bodyElem.classList.remove("active", "close");
      clearTimeout(timerId);
    }, 1000);
  }
}
