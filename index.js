// models
import Artist from "./src/models/Artist.js";

// data
import { ray, playlistDATA } from "./data/ray.js";

// components
import Playlist from "./src/components/Playlist.js";

class App {
    artist;
    playlist;

    constructor(artist, playlist) {
        this.artist = new Artist(
            artist.firstname,
            artist.lastname,
            artist.nickname
        );
        this.playlist = new Playlist(playlist);
    }

    launch() {
        const header = document.querySelector("header h1");
        header.textContent = this.artist.fullName();
        document.title = this.artist.fullName();
        this.playlist.render();
        this.playlist.playlist[0].render();
    }
}

const app = new App(ray, playlistDATA);
app.launch();
