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
            artist.nickname,
            artist.social
        );
        this.playlist = new Playlist(playlist);
    }

    launch() {
        // make header contents
        const header = document.querySelector("header h1");
        header.textContent = this.artist.fullName();
        document.title = this.artist.fullName();

        document.querySelector(".fa-instagram").href =
            this.artist.social.instagram;
        document.querySelector(".fa-youtube").href = this.artist.social.youtube;
        document.querySelector(".fa-apple").href = this.artist.social.apple;
        document.querySelector(".fa-spotify").href = this.artist.social.spotify;
        document.querySelector(".fa-soundcloud").href =
            this.artist.social.soundcloud;

        // make playlist sidebar
        this.playlist.render();
        this.playlist.playlist[0].render();

        // bind singles/albums buttons
        const singlesButton = document.querySelector("button#singles");
        const albumsButton = document.querySelector("button#albums");
        singlesButton.addEventListener("click", () => {
            this.playlist.switch("singles");
        });
        albumsButton.addEventListener("click", () => {
            this.playlist.switch("albums");
        });
    }
}

const app = new App(ray, playlistDATA);
app.launch();
