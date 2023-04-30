import { Home } from "./pages/home";

class App {
  constructor() {
    this.create();
  }

  create() {
    this.class = new Home();

    this.class.create();
    this.class.onLoad();
  }
}

new App();
