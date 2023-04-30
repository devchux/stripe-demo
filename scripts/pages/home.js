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
    this.distanceMoved = 7;
  }

  onLoad() {
    this.onBoxMouseOver();
    this.onBoxMouseOut();
    this.onSelectBox();
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

        if (
          this.elements.boxesInView[
            this.elements.boxesInView.length - 1
          ].getAttribute("data-box") === box.getAttribute("data-box") &&
          box.getAttribute("data-box") !==
            this.elements.boxes[this.elements.boxes.length - 1].getAttribute(
              "data-box"
            )
        ) {
          this.rightMoves++;
          const translateX =
            this.rightMoves * this.distanceMoved -
            (this.rightMoves === this.elements.boxes.length / 2 ? 2.5 : 0);
          console.log(translateX);
          this.elements.boxInnerWrapper.style.transform = `translateX(-${translateX}%)`;
          this.elements.boxesInView[0].classList.remove("in-view");
          this.elements.boxes[
            Number(box.getAttribute("data-box")) + 1
          ].classList.add("in-view");
        }

        super.create();
      });
    });
  }
}
