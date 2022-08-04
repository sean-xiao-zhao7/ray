import Item from "../models/Item.js";

class Playlist {
    #originalPlaylist = [];
    playlist = [];
    length;

    constructor(playlist = [], isAlbum = false, albumLinks = {}) {
        this.isAlbum = isAlbum;
        this.albumLinks = albumLinks;
        if (playlist.length > 0) {
            this.#makeModels(playlist);
        }
        this.length = playlist.length;
    }

    #makeModels(playlist) {
        playlist.forEach((data) => {
            // make album tracks playlist
            let tracksPlaylist = [];
            if (data.type === "album") {
                tracksPlaylist = new Playlist(data.tracks, true, data.links);
            }
            const newItem = new Item(
                data.title,
                this.isAlbum
                    ? { ...this.albumLinks, ...data.links }
                    : data.links,
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
            // if (item.type === "album") {
            //     titleElement.textContent += " (Album)";
            // }
            playlistItem.appendChild(titleElement);

            // set on click
            playlistItem.addEventListener("click", () => {
                // scroll to top
                const display = document.querySelector("#display");
                display.scrollIntoView({ behavior: "smooth", block: "start" });

                // if this item is an album, update list with album's tracks
                if (item.type === "album" && item.tracks.playlist.length > 0) {
                    item.tracks.render();
                    return;
                }

                // if it's a single, show the content
                item.render();
                if (
                    window.innerWidth < 850 &&
                    (item.type !== "album" || item.tracks.length < 1)
                ) {
                    sidebar.style.display = "none";
                }
            });

            sidebar.appendChild(playlistItem);
        });

        // show the first item in display
        this.playlist[0].render();
    }
}

export default Playlist;
