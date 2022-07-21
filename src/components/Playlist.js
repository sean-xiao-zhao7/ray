import Item from "../models/Item.js";

class Playlist {
    #originalPlaylist = [];
    playlist = [];

    constructor(playlist = [], isAlbum = false) {
        if (playlist.length > 0) {
            this.#makeModels(playlist);
        }
        this.isAlbum = isAlbum;
    }

    #makeModels(playlist) {
        playlist.forEach((data) => {
            // make album tracks playlist
            let tracksPlaylist = [];
            if (data.type === "album") {
                tracksPlaylist = new Playlist(data.tracks, true);
            }
            const newItem = new Item(
                data.title,
                data.links,
                data.images,
                data.collab,
                data.album,
                data.year,
                data.type,
                tracksPlaylist,
                data.trackNum
            );
            this.playlist.push(newItem);
            this.#originalPlaylist.push(newItem);
        });
    }

    switch(type) {
        switch (type) {
            case "singles":
                this.playlist = this.#originalPlaylist.filter(
                    (item) => item.type !== "album"
                );
                break;
            case "albums":
                this.playlist = this.#originalPlaylist.filter(
                    (item) => item.type === "album"
                );
                break;
            default:
                break;
        }
        this.render();
    }

    render() {
        const sidebar = document.querySelector("#sidebar");
        sidebar.innerHTML = "";
        this.playlist.forEach((item) => {
            const playlistItem = document.createElement("section");
            item.setPlaylistItem(playlistItem);

            // set attributes
            playlistItem.className = "item-link";
            const titleElement = document.createElement("span");
            const trackNum = this.isAlbum ? `${item.trackNum}. ` : "";
            titleElement.textContent = `${trackNum}${item.title}`;
            if (item.type === "album") {
                titleElement.textContent += " (Album)";
            }
            playlistItem.appendChild(titleElement);

            // set on click
            playlistItem.addEventListener("click", () => {
                // if this item is an album, update list with album's tracks
                if (item.type === "album" && item.tracks.playlist.length > 0) {
                    item.tracks.render();
                    return;
                }

                // if it's a single, show the content
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

        // show the first item in display
        this.playlist[0].render();

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
