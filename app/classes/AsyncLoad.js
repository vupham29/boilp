import Component from "./Component";

export default class AsyncLoad extends Component {
  constructor({ element }) {
    super({ element });
    this.createObserver();
  }

  createObserver() {
    this.observer = new window.IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // already have the src
          if (!this.element.src) {
            this.element.src = this.element.getAttribute("data-src");
            this.element.onload = () => {
              this.element.classList.add("loaded");
            };
          }

          // unobserve
          this.observer.unobserve(entry.target);
        }
      });
    });

    this.observer.observe(this.element);
  }

  destroy() {
    this.observer.disconnect();
  }
}
