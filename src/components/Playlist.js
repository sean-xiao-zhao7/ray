import Item from "../models/Item.js";

class Playlist {
    playlist = [];

    constructor(playlist = []) {
        if (playlist.length > 0) {
            this.makeModels(playlist);
        }
    }

    makeModels(playlist) {
        playlist.forEach((data) => {
            const newItem = new Item(
                data.title,
                data.links,
                data.images,
                data.collab,
                data.album,
                data.year,
                data.type,
                data.tracks
            );
            this.playlist.push(newItem);
        });
    }

    render() {
        const sidebar = document.querySelector("#sidebar");
        this.playlist.forEach((item) => {
            const playlistItem = document.createElement("section");
            playlistItem.className = "item-link";
            const titleElement = document.createElement("span");
            titleElement.textContent = item.title;
            if (item.type === "album") {
                titleElement.textContent += " (Album)";
            }
            playlistItem.appendChild(titleElement);
            playlistItem.addEventListener("click", () => {
                const otherItems = document.querySelectorAll(
                    ".item-link__clicked"
                );
                if (otherItems.length > 0) {
                    otherItems.forEach((oI) => {
                        oI.classList.remove("item-link__clicked");
                    });
                }
                playlistItem.classList.add("item-link__clicked");
                item.render();

                // hide list on mobile
                const hamburger = document.querySelector("#mobile-menu-toggle");
                if (window.getComputedStyle(hamburger).display !== "none") {
                    sidebar.style.display = "none";
                    hamburger.querySelector("span").textContent =
                        "See discography";
                }
            });
            sidebar.appendChild(playlistItem);
        });
        // bind mobile menu toggle
        const hamburger = document.querySelector("#mobile-menu-toggle");
        hamburger.addEventListener("click", (event) => {
            event.preventDefault();
            if (sidebar.style.display === "block") {
                sidebar.style.display = "none";
                hamburger.querySelector("span").textContent = "See discography";
            } else {
                sidebar.style.display = "block";
                hamburger.querySelector("span").textContent =
                    "Hide discography";
            }
        });
    }
}

export default Playlist;
