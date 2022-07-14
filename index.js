import Artist from "./src/models/Artist.js";

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

const app = new App({
    firstname: "Raymond",
    lastname: "Mowla",
});
app.launch();
