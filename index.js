// models
import Artist from "./src/models/Artist.js";

// data
import { ray } from "./data/ray.js";

class App {
    artist;

    constructor(artist) {
        this.artist = new Artist(artist.firstname, artist.lastname);
    }

    launch() {
        const header = document.querySelector("header h1");
        header.textContent = this.artist.fullName();
        document.title = this.artist.fullName();
    }
}

const app = new App(ray);
app.launch();
