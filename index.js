// models
import Artist from "./src/models/Artist.js";

// data
import { ray, playlistDATA } from "./data/ray.js";

// components
import Playlist from "./src/components/Playlist.js";
import Page from "./src/components/Page.js";

class App {
    artist;
    playlist;

    constructor(artist, playlist) {
        this.artist = new Artist(
            artist.firstname,
            artist.lastname,
            artist.nickname,
            artist.social,
            artist.shortDescription
        );
        this.playlist = new Playlist(playlist);
    }

    launch() {
        // make header contents
        const name = document.querySelector("header #name h1");
        const shortDescription = document.querySelector("header #name span");
        name.textContent = this.artist.fullName();
        shortDescription.textContent = this.artist.shortDescription;
        document.title = this.artist.fullName();

        document.querySelector(".fa-instagram").href =
            this.artist.social.instagram;
        document.querySelector(".fa-youtube").href = this.artist.social.youtube;
        document.querySelector(".fa-spotify").href = this.artist.social.spotify;
        document.querySelector(".fa-apple").href = this.artist.social.apple;
        document.querySelector(".fa-soundcloud").href =
            this.artist.social.soundcloud;
        document.querySelector(".fa-whatsapp").href =
            this.artist.social.whatsapp;

        // make playlist sidebar
        const highlight = "Reality Check";
        this.playlist.render(highlight);

        // bind singles/albums buttons
        const singlesButton = document.querySelector("button#singles");
        const albumsButton = document.querySelector("button#albums");
        singlesButton.addEventListener("click", () => {
            singlesButton.classList.add("button-clicked");
            albumsButton.classList.remove("button-clicked");
            this.playlist.switch("singles");
            if (sidebar.style.display !== "block") {
                sidebar.style.display = "block";
            }
        });
        albumsButton.addEventListener("click", () => {
            singlesButton.classList.remove("button-clicked");
            albumsButton.classList.add("button-clicked");
            this.playlist.switch("albums");
            if (sidebar.style.display !== "block") {
                sidebar.style.display = "block";
            }
        });

        // show landing page song/item only on mobile
        var w = window.innerWidth;
        if (w > 1000 && !highlight) {
            albumsButton.click();
        }

        // update footer
        const footer = document.querySelector("footer");
        const footerP = document.createElement("p");
        footerP.textContent = `© ${new Date().getFullYear()} ${ray.firstname} ${
            ray.lastname
        }. All rights reserved.`;
        footer.appendChild(footerP);

        footer.querySelector(".fa-instagram").href =
            this.artist.social.instagram;
        footer.querySelector(".fa-youtube").href = this.artist.social.youtube;
        footer.querySelector(".fa-apple").href = this.artist.social.apple;
        footer.querySelector(".fa-spotify").href = this.artist.social.spotify;
        footer.querySelector(".fa-soundcloud").href =
            this.artist.social.soundcloud;
        footer.querySelector(".fa-whatsapp").href = this.artist.social.whatsapp;

        // set up intro / credits pages
        const introPage = new Page("#intro-container");
        const introLink = document.querySelector("#header-intro-text-link");
        introLink.addEventListener("click", (event) => {
            event.preventDefault();
            introPage.render();
        });
        const footerIntroLink = document.querySelector(
            "#footer-intro-text-link"
        );
        footerIntroLink.addEventListener("click", (event) => {
            event.preventDefault();
            introPage.render();
        });

        const creditsPage = new Page("#credits-container");
        const creditsLink = document.querySelector("#header-credits-text-link");
        creditsLink.addEventListener("click", (event) => {
            event.preventDefault();
            creditsPage.render();
        });
        const footerCreditsLink = document.querySelector(
            "#footer-credits-text-link"
        );
        footerCreditsLink.addEventListener("click", (event) => {
            event.preventDefault();
            creditsPage.render();
        });
    }
}

const app = new App(ray, playlistDATA);
app.launch();
