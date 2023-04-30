import forEach from "lodash.foreach";

export class Component {
  constructor({ element, elements }) {
    this.child = element;
    this.children = elements;
  }

  create() {
    this.element = this.getQuerySelector(this.child);

    this.elements = {};

    if (this.children && typeof this.children === "object") {
      forEach(this.children, (value, key) => {
        const elementNode = this.getQuerySelector(value);

        this.elements[key] = elementNode;
      });
    }
  }

  getQuerySelector(value) {
    let result =
      !value || value instanceof Element || value instanceof HTMLElement
        ? value
        : document.querySelectorAll(value);

    if (
      result &&
      result instanceof NodeList &&
      Array.from(result).length === 1
    ) {
      result = document.querySelector(value);
    }

    return result;
  }
}