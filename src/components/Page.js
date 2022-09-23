import { resetSidebarColors } from "../helpers/sidebar.js";

class Page {
    #page;

    constructor(contentSelector) {
        this.#page = contentSelector;
    }

    render() {
        const display = document.querySelector("#display");
        const source = document.querySelector(this.#page);
        display.innerHTML = source.innerHTML;
        display.scrollIntoView({ behavior: "smooth", block: "start" });
        resetSidebarColors();
    }
}

export default Page;
