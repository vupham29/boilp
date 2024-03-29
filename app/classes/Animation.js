import gsap from "gsap";
import Component from "./Component";

export default class Animation extends Component {
  constructor({ element, elements }) {
    super({ element, elements });

    this.createObserver();
  }

  createObserver() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.animateIn();
        } else {
          this.animateOut();
        }
      });
    });

    this.observer.observe(this.element);
  }

  animateIn() {
    gsap.fromTo(
      this.element,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
      },
    );
  }

  animateOut() {
    gsap.set(this.element, {
      autoAlpha: 0,
    });
  }

  destroy() {
    this.observer.disconnect();
  }
}
