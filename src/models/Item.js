class Item {
    constructor(
        title,
        links,
        images,
        collab = [],
        album = {},
        year = "",
        type = "single",
        tracks = []
    ) {
        this.title = title;
        this.links = links;
        this.images = images;
        this.collab = "";
        this.album = album;
        this.year = year;
        this.type = type;
        this.tracks = tracks;

        // get collabs
        if (collab.length > 0) {
            this.collab = " ft.";
            collab.forEach((artist) => {
                this.collab += " " + artist.firstname + " " + artist.lastname;
            });
        }
    }

    render() {
        const display = document.querySelector("#display");
        display.innerHTML = "";

        // add title
        const h1 = document.createElement("h1");
        h1.textContent = this.title + this.collab + ` (${this.year})`;
        if (this.type === "album") {
            h1.textContent += " (Album)";
        }
        display.appendChild(h1);

        // add youtube iframe

        const youtube = document.createElement("iframe");
        youtube.src = this.links.youtube;
        youtube.allowfullscreen = true;
        youtube.width = "100%";
        youtube.height = "500rem";
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
        const download = document.createElement("a");
        download.className = "fa fa-download fa-2x";
        download.target = "_blank";
        const youtubeSocial = document.createElement("a");
        youtubeSocial.className = "fa-brands fa-youtube fa-2x";
        youtubeSocial.target = "_blank";
        youtubeSocial.href = this.links.youtube;
        const apple = document.createElement("a");
        apple.className = "fa-brands fa-apple fa-2x";
        apple.target = "_blank";
        const spotify = document.createElement("a");
        spotify.className = "fa-brands fa-spotify fa-2x";
        spotify.target = "_blank";
        const soundcloud = document.createElement("a");
        soundcloud.className = "fa-brands fa-soundcloud fa-2x";
        soundcloud.target = "_blank";
        social.append(download, youtubeSocial, apple, spotify, soundcloud);
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
            heading2.textContent = "Album:";
            heading3 = document.createElement("p");
            heading3.className = "heading";
            heading3.textContent = "Featuring:";
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
        } else {
            tracksBody = document.createElement("section");
            this.tracks.forEach((track) => {
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
        } else {
            metadata.append(headingYear, bodyYear, headingTracks, tracksBody);
        }

        display.appendChild(metadata);
    }
}

export default Item;
