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

  getFirstElement(elements) {
    return elements[0];
  }

  getLastElement(elements) {
    return elements[elements.length - 1];
  }

  getBoxIndex(element) {
    return Number(element.getAttribute("data-box"));
  }

  addClass(element, name) {
    return element.classList.add(name);
  }

  removeClass(element, name) {
    return element.classList.remove(name);
  }

  appendChild(parent, child) {
    return parent.appendChild(child);
  }

  removeChild(parent, child) {
    return parent.removeChild(child);
  }

  swapElements(element, element2) {
    const element2_copy = element2.cloneNode(true);
    element.parentNode.insertBefore(element2_copy, element);
    element2.parentNode.insertBefore(element, element2);
    element2.parentNode.replaceChild(element2, element2_copy);
}
}
