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

    this.rightMoves = 0;
    this.translateX = 8.5;
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

        this.elements.activeBox.classList.add("active-hover");
        box.classList.add("hover");
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

        this.elements.activeBox.classList.remove("active-hover");
        box.classList.remove("hover");
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
        let index = Number(this.elements.activeBox.getAttribute("data-box"));
        if (button.className === "left") {
          index = index === 0 ? this.elements.boxes.length : index;
          box = Array.from(this.elements.boxes).find(
            (elem) => Number(elem.getAttribute("data-box")) === index - 1
          );
        }
        if (button.className === "right") {
            index = index === this.elements.boxes.length ? -1 : index;
            box = Array.from(this.elements.boxes).find(
              (elem) => Number(elem.getAttribute("data-box")) === index + 1
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
    box.classList.add("active");

    if (
      this.elements.boxesInView[
        this.elements.boxesInView.length - 1
      ].getAttribute("data-box") === box.getAttribute("data-box") &&
      box.getAttribute("data-box") !==
        this.elements.boxes[this.elements.boxes.length - 1].getAttribute(
          "data-box"
        )
    ) {
      this.elements.boxesInView[0].classList.remove("in-view");
      this.elements.boxes[
        Number(box.getAttribute("data-box")) + 1
      ].classList.add("in-view");
      const firstBox = this.elements.boxes[0];
      this.elements.boxInnerWrapper.removeChild(
        this.elements.boxInnerWrapper.firstElementChild
      );
      this.elements.boxInnerWrapper.appendChild(firstBox);
      this.create();
      return;
    }

    if (
      this.elements.boxesInView[0].getAttribute("data-box") ===
        box.getAttribute("data-box") &&
      box.getAttribute("data-box") !==
        this.elements.boxes[0].getAttribute("data-box")
    ) {
      this.elements.boxesInView[
        this.elements.boxesInView.length - 1
      ].classList.remove("in-view");
      this.elements.boxes[
        Number(box.getAttribute("data-box")) - 1
      ].classList.add("in-view");
      const lastBox = this.elements.boxes[this.elements.boxes.length - 1];
      this.elements.boxInnerWrapper.removeChild(
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
}
