export default class Utils {
  constructor({ element, elements = {} }) {
    this.selector = element;
    this.selectorChildren = elements;

    // create DOM elements
    this.create();
  }

  create() {
    try {
      if (this.selector instanceof window.HTMLElement) {
        this.element = this.selector;
      } else {
        this.element = document.querySelector(this.selector);
      }

      // element doesn't exist
      if (!this.element) {
        this.catchError(new Error("Can not find an element"));
      }

      this.elements = {};
      for (const [key, entry] of Object.entries(this.selectorChildren)) {
        // entry is a NodeList or Element
        if (
          entry instanceof window.HTMLElement ||
          entry instanceof window.NodeList ||
          Array.isArray(entry)
        ) {
          this.elements[key] = entry;
        }
        // string => so we have to find a dom elements
        else {
          const elements = document.querySelectorAll(entry);
          this.elements[key] = elements;

          if (elements.length === 0) {
            this.elements[key] = null;
          } else if (elements.length === 1) {
            this.elements[key] = elements[0];
          }
        }
      }
    } catch (e) {
      this.catchError(e);
    }
  }

  catchError(e) {
    throw new Error("Can not find an element, error message", e.message);
  }
}
