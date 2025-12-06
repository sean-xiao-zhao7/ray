import { resetSidebarColors } from "../helpers/sidebar.js";

class Item {
    playlistItem;

    constructor(
        title,
        links,
        images,
        collab = [],
        album = {},
        year = "",
        type = "single",
        tracks = [],
        trackNum = 0
    ) {
        this.title = title;
        this.links = links;
        this.images = images;
        this.collab = "";
        this.album = album;
        this.year = year;
        this.type = type;
        this.tracks = tracks;
        this.trackNum = trackNum;

        // get collabs
        if (collab.length > 0) {
            this.collab = " ft.";
            collab.forEach((artist, index) => {
                if (artist.nickname.length > 0) {
                    this.collab += " " + artist.nickname;
                } else {
                    this.collab +=
                        " " + artist.firstname + " " + artist.lastname;
                }
                if (index + 1 < collab.length) {
                    this.collab += ", ";
                }
            });
        }
    }

    setPlaylistItem(playlistItem) {
        this.playlistItem = playlistItem;
    }

    makeSocialButton(parent, social, faType = "fa-brands") {
        if (this.links[social]) {
            const socialButton = document.createElement("a");
            socialButton.className = `${faType} fa-${social} fa-2x`;
            socialButton.target = "_blank";
            socialButton.href = this.links[social];
            parent.appendChild(socialButton);
        }
    }

    // construct main section of the page for a single track/album
    render(highlight = true) {
        // reset sidebar and page container
        if (highlight) {
            resetSidebarColors();
            this.playlistItem.classList.add("item-link__clicked");
        }
        const display = document.querySelector("#display");
        display.innerHTML = "";

        // add main title
        const h1 = document.createElement("h1");
        h1.textContent = this.title + this.collab + ` (${this.year})`;
        if (this.type === "album" || this.type === "video-album") {
            h1.textContent += " (Album)";
        }
        display.appendChild(h1);

        // add album sub-title if exists
        let albumTitle;
        if (this.trackNum !== 0) {
            albumTitle = document.createElement("h2");
            albumTitle.classList.add("album-title");
            albumTitle.textContent = this.album.title;
            display.appendChild(albumTitle);
        }

        // set up embed iframe youtube player
        const embedElement = document.createElement("iframe");
        if (this.links.embed) {
            embedElement.src = this.links.embed;
        } else if (this.links.youtubeAlbum && this.type === "album") {
            embedElement.src = this.links.youtubeAlbum;
        } else {
            embedElement.src = this.links.youtube;
        }
        embedElement.allowfullscreen = true;
        embedElement.width = "100%";
        embedElement.height = "700rem";
        if (window.innerWidth < 500) {
            embedElement.height = "300rem";
        }
        embedElement.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        embedElement.loading = "lazy";
        display.appendChild(embedElement);

        // add social buttons
        const social = document.createElement("social");
        social.className = "social";
        this.makeSocialButton(social, "download", "fa");
        this.makeSocialButton(social, "youtube");
        this.makeSocialButton(social, "apple");
        this.makeSocialButton(social, "spotify");
        this.makeSocialButton(social, "soundcloud");
        this.makeSocialButton(social, "amazon");
        this.makeSocialButton(social, "deezer");
        this.makeSocialButton(social, "hypeddit");
        this.makeSocialButton(social, "pandora");
        this.makeSocialButton(social, "tidal");
        this.makeSocialButton(social, "yandex");
        display.appendChild(social);

        // add metadata container
        const metadata = document.createElement("section");
        metadata.className = "metadata";
        let headingAlbumTitle,
            headingCollab,
            headingTracks,
            bodyAlbumTitle,
            bodyCollab,
            tracksBody;

        // add metadata album title for singles
        if (this.type === "single" && this.album.title) {
            headingAlbumTitle = document.createElement("p");
            headingAlbumTitle.className = "heading";
            headingAlbumTitle.textContent = "Album:";
            bodyAlbumTitle = document.createElement("p");
            bodyAlbumTitle.className = "body";
            bodyAlbumTitle.textContent = this.album.title;
            metadata.append(headingAlbumTitle, bodyAlbumTitle);
        }

        // add metadata year released
        const headingYear = document.createElement("p");
        const bodyYear = document.createElement("p");
        headingYear.className = "heading";
        headingYear.textContent = "Year:";
        bodyYear.className = "body";
        bodyYear.textContent = this.year;
        metadata.append(headingYear, bodyYear);

        // add metadata tracks if any
        if (this.tracks.length > 0) {
            headingTracks = document.createElement("p");
            headingTracks.className = "heading";
            headingTracks.textContent = "Tracks:";
            tracksBody = document.createElement("section");
            this.tracks.playlist.forEach((track) => {
                const trackEl = document.createElement("p");
                trackEl.textContent = `${track.trackNum}. ${track.title}`;
                tracksBody.appendChild(trackEl);
            });
            metadata.append(headingTracks, tracksBody);
        }

        // add metadata collabs
        if (this.collab && this.collab.length > 0) {
            headingCollab = document.createElement("p");
            headingCollab.className = "heading";
            headingCollab.textContent = "Featuring:";
            bodyCollab = document.createElement("p");
            bodyCollab.className = "body";
            bodyCollab.textContent = this.collab.replace(" ft.", "");
            metadata.append(headingCollab, bodyCollab);
        }

        // add completed metadata to DOM
        display.appendChild(metadata);
    }
}

export default Item;
