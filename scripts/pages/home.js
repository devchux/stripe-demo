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
    this.autoSelectBox();
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
        this.cancelAutoSelectBox();
      });
    });
  }

  onNavButtonClick() {
    forEach(this.elements.navButton, (button) => {
      button.addEventListener("click", () => {
        if (button.className === "left") {
          this.selectPrevBox();
        }
        if (button.className === "right") {
          this.selectNextBox();
        }
        this.cancelAutoSelectBox();
      });
    });
  }

  slideBoxWrapper(side) {
    this.addClass(this.elements.boxInnerWrapper, `${side}-slide-in`);

    const timer = setTimeout(() => {
      this.removeClass(this.elements.boxInnerWrapper, `${side}-slide-in`);

      clearTimeout(timer);
    }, 350);
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
      this.slideBoxWrapper("left");
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
      this.slideBoxWrapper("right");
      this.create();
      return;
    }

    this.create(false);
  }

  autoSelectBox() {
    this.interval = setInterval(() => {
      this.selectNextBox();
    }, 3000);
  }

  cancelAutoSelectBox() {
    clearInterval(this.interval);
  }

  selectNextBox() {
    const box = this.elements.activeBox.nextElementSibling;
    this.handleBoxSelection(box);
  }

  selectPrevBox() {
    const box = this.elements.activeBox.previousElementSibling;
    this.handleBoxSelection(box);
  }

  resetDataBoxes() {
    Array.from(this.elements.boxes).forEach((elem, index) => {
      elem.setAttribute("data-box", index);
    });
  }

  resetActiveBoxes() {
    forEach(this.elements.boxes, (elem) => {
      elem.classList.remove("active", "active-hover", "hover");
    });
  }

  create(hasReset = true) {
    super.create();
    if (hasReset) this.resetDataBoxes();
  }
}
