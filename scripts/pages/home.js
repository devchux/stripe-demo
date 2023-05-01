import forEach from "lodash.foreach";
import { Component } from "../classes/component";

export class Home extends Component {
  constructor() {
    super({
      elements: {
        navButton: "main > .button-wrapper > button",
        boxInnerWrapper: "main > .box-wrapper > .box-inner-wrapper",
        boxes: "main > .box-wrapper > .box-inner-wrapper > .box",
        activeBox: "main > .box-wrapper > .box-inner-wrapper > .box.active",
        boxesInView: "main > .box-wrapper > .box-inner-wrapper > .box.in-view",
      },
    });
  }

  onLoad() {
    this.onBoxMouseOver();
    this.onBoxMouseOut();
    this.onSelectBox();
    this.onNavButtonClick();
  }

  onBoxMouseOver() {
    forEach(this.elements.boxes, (box) => {
      box.addEventListener("mouseover", () => {
        if (
          box.classList.contains("active") ||
          !box.classList.contains("in-view")
        )
          return;

        this.addClass(this.elements.activeBox, "active-hover");
        this.addClass(box, "hover");
      });
    });
  }

  onBoxMouseOut() {
    forEach(this.elements.boxes, (box) => {
      box.addEventListener("mouseleave", () => {
        if (
          box.classList.contains("active") ||
          !box.classList.contains("in-view")
        )
          return;

        this.removeClass(this.elements.activeBox, "active-hover");
        this.removeClass(box, "hover");
      });
    });
  }

  onSelectBox() {
    forEach(this.elements.boxes, (box) => {
      box.addEventListener("click", () => {
        this.handleBoxSelection(box);
      });
    });
  }

  onNavButtonClick() {
    forEach(this.elements.navButton, (button) => {
      button.addEventListener("click", () => {
        let box = null;
        let index = this.getBoxIndex(this.elements.activeBox);
        if (button.className === "left") {
          index = index === 0 ? this.elements.boxes.length : index;
          box = Array.from(this.elements.boxes).find(
            (elem) => this.getBoxIndex(elem) === index - 1
          );
        }
        if (button.className === "right") {
          index = index === this.elements.boxes.length ? -1 : index;
          box = Array.from(this.elements.boxes).find(
            (elem) => this.getBoxIndex(elem) === index + 1
          );
        }
        this.handleBoxSelection(box);
      });
    });
  }

  resetDataBoxes() {
    Array.from(this.elements.boxes).forEach((elem, index) => {
      elem.setAttribute("data-box", index);
    });
  }

  resetActiveBoxes() {
    forEach(this.elements.boxes, (elem) => {
      elem.classList.remove("active");
      elem.classList.remove("active-hover");
      elem.classList.remove("hover");
    });
  }

  create(hasReset = true) {
    super.create();
    if (hasReset) this.resetDataBoxes();
  }

  handleBoxSelection(box) {
    if (box.classList.contains("active") || !box.classList.contains("in-view"))
      return;

    this.resetActiveBoxes();
    this.addClass(box, "active");

    if (
      this.getBoxIndex(this.getLastElement(this.elements.boxesInView)) ===
        this.getBoxIndex(box) &&
      this.getBoxIndex(box) !==
        this.getBoxIndex(this.getLastElement(this.elements.boxes))
    ) {
      this.removeClass(
        this.getFirstElement(this.elements.boxesInView),
        "in-view"
      );
      this.addClass(this.elements.boxes[this.getBoxIndex(box) + 1], "in-view");
      const firstBox = this.getFirstElement(this.elements.boxes);
      this.removeChild(
        this.elements.boxInnerWrapper,
        this.elements.boxInnerWrapper.firstElementChild
      );
      this.appendChild(this.elements.boxInnerWrapper, firstBox);
      this.create();
      return;
    }

    if (
      this.getBoxIndex(this.getFirstElement(this.elements.boxesInView)) ===
        this.getBoxIndex(box) &&
      this.getBoxIndex(box) !==
        this.getBoxIndex(this.getFirstElement(this.elements.boxes))
    ) {
      this.removeClass(
        this.getLastElement(this.elements.boxesInView),
        "in-view"
      );
      this.addClass(this.elements.boxes[this.getBoxIndex(box) - 1], "in-view");
      const lastBox = this.getLastElement(this.elements.boxes);
      this.removeChild(
        this.elements.boxInnerWrapper,
        this.elements.boxInnerWrapper.lastElementChild
      );
      this.elements.boxInnerWrapper.insertBefore(
        lastBox,
        this.elements.boxInnerWrapper.firstElementChild
      );
      this.create();
      return;
    }

    this.create(false);
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
}
