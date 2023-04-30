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
      },
    });
  }

  onLoad() {
    this.onBoxMouseOver();
    this.onBoxMouseOut();
    this.onSelectBox();
  }

  onBoxMouseOver() {
    forEach(this.elements.boxes, (box) => {
      box.addEventListener("mouseover", () => {
        if (box.classList.contains("active")) return;

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
        if (
          box.classList.contains("active") ||
          !box.classList.contains("in-view")
        )
          return;

        forEach(this.elements.boxes, (elem) => {
          elem.classList.remove("active");
          elem.classList.remove("active-hover");
          elem.classList.remove("hover");
        });

        box.classList.add("active");
        super.create();
      });
    });
  }
}
