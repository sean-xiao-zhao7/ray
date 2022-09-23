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

    render(highlight = true) {
        // highlight sidebar item
        if (highlight) {
            const otherItems = document.querySelectorAll(".item-link__clicked");
            if (otherItems.length > 0) {
                otherItems.forEach((oI) => {
                    oI.classList.remove("item-link__clicked");
                });
            }
            this.playlistItem.classList.add("item-link__clicked");
        }

        // render main content
        const display = document.querySelector("#display");
        display.innerHTML = "";

        // add title
        const h1 = document.createElement("h1");
        h1.textContent = this.title + this.collab + ` (${this.year})`;
        if (this.type === "album" || this.type === "video-album") {
            h1.textContent += " (Album)";
        }
        display.appendChild(h1);

        // add album title if exists
        let albumTitle;
        if (this.trackNum !== 0) {
            albumTitle = document.createElement("h2");
            albumTitle.classList.add("album-title");
            albumTitle.textContent = this.album.title;
            display.appendChild(albumTitle);
        }

        // add youtube iframe

        const youtube = document.createElement("iframe");
        youtube.src =
            this.type === "album"
                ? this.links.youtubeAlbum
                : this.links.youtube;
        youtube.allowfullscreen = true;
        youtube.width = "100%";
        youtube.height = "500rem";
        if (window.innerWidth < 500) {
            youtube.height = "300rem";
        }
        youtube.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        display.appendChild(youtube);
        /* example
        <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/gYhCogfX0DU"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
        ></iframe>;
        */

        // add social buttons
        // <a href="#" class="fa-brands fa-instagram fa-2x" target="_blank"></a>
        // <a href="#" class="fa-brands fa-youtube fa-2x" target="_blank"></a>
        // <a href="#" class="fa-brands fa-apple fa-2x" target="_blank"></a>
        // <a href="#" class="fa-brands fa-spotify fa-2x" target="_blank"></a>
        // <a href="#" class="fa-brands fa-soundcloud fa-2x" target="_blank"></a>
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
        // this.makeSocialButton(social, "napster");
        display.appendChild(social);

        /* add metadata */
        // add headings
        const metadata = document.createElement("section");
        metadata.className = "metadata";
        const headingYear = document.createElement("p");
        headingYear.className = "heading";
        headingYear.textContent = "Year:";
        // for single track only
        let heading2, heading3, headingTracks;
        if (this.type === "single") {
            heading2 = document.createElement("p");
            heading2.className = "heading";
            if (!this.album.title) {
                heading2.textContent = "";
            } else {
                heading2.textContent = "Album:";
            }

            heading3 = document.createElement("p");
            heading3.className = "heading";
            if (this.collab) {
                heading3.textContent = "Featuring:";
            } else {
                heading3.textContent = "";
            }
        } else {
            headingTracks = document.createElement("p");
            headingTracks.className = "heading";
            headingTracks.textContent = "Tracks:";
        }

        // add bodies to headings
        const bodyYear = document.createElement("p");
        bodyYear.className = "body";
        bodyYear.textContent = this.year;
        // for single tracks only
        let body2, body3, tracksBody;
        if (this.type === "single") {
            body2 = document.createElement("p");
            body2.className = "body";
            body2.textContent = this.album.title;
            body3 = document.createElement("p");
            body3.className = "body";
            body3.textContent = this.collab.replace(" ft.", "");
        } else if (this.tracks.length > 0) {
            tracksBody = document.createElement("section");
            this.tracks.playlist.forEach((track) => {
                const trackEl = document.createElement("p");
                trackEl.textContent = `${track.trackNum}. ${track.title}`;
                tracksBody.appendChild(trackEl);
            });
        }
        // add elements to metadata container
        if (this.type === "single") {
            metadata.append(
                heading2,
                body2,
                headingYear,
                bodyYear,
                heading3,
                body3
            );
        } else if (this.tracks.length > 0) {
            metadata.append(headingYear, bodyYear, headingTracks, tracksBody);
        } else {
            metadata.append(headingYear, bodyYear);
        }

        display.appendChild(metadata);
    }
}

export default Item;
