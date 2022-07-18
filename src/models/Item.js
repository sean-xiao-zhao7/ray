class Item {
    constructor(title, links, images, collab = [], album = {}, year = "") {
        this.title = title;
        this.links = links;
        this.images = images;
        this.collab = "";
        this.album = album;
        this.year = year;

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
        display.appendChild(h1);

        // add youtube iframe

        const youtube = document.createElement("iframe");
        youtube.src = this.links.youtube;
        youtube.allowfullscreen = true;
        youtube.width = "100%";
        youtube.height = "60%";
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

        /* add metadata */
        // add headings
        const metadata = document.createElement("section");
        metadata.className = "metadata";
        const heading1 = document.createElement("p");
        heading1.className = "heading";
        heading1.textContent = "Download:";
        const headingYear = document.createElement("p");
        headingYear.className = "heading";
        headingYear.textContent = "Year:";
        const heading4 = document.createElement("p");
        heading4.className = "heading";
        heading4.textContent = "Spotify:";
        const heading5 = document.createElement("p");
        heading5.className = "heading";
        heading5.textContent = "Soundcloud:";
        const heading6 = document.createElement("p");
        heading6.className = "heading";
        heading6.textContent = "Apple Music:";

        // for single track only
        const heading2 = document.createElement("p");
        heading2.className = "heading";
        heading2.textContent = "Album:";
        const heading3 = document.createElement("p");
        heading3.className = "heading";
        heading3.textContent = "Featuring:";

        // add bodies to headings
        const body1 = document.createElement("p");
        body1.className = "body";
        body1.textContent = "Click to download";
        const bodyYear = document.createElement("p");
        bodyYear.className = "body";
        bodyYear.textContent = this.year;
        const body4 = document.createElement("p");
        body4.className = "body";
        body4.textContent = this.links.spotify;
        const body5 = document.createElement("p");
        body5.className = "body";
        body5.textContent = this.links.soundcloud;
        const body6 = document.createElement("p");
        body6.className = "body";
        body6.textContent = this.links.apple;

        // for single tracks only
        const body2 = document.createElement("p");
        body2.className = "body";
        body2.textContent = this.album.title;
        const body3 = document.createElement("p");
        body3.className = "body";
        body3.textContent = this.collab.replace(" ft.", "");

        metadata.append(
            heading1,
            body1,
            heading2,
            body2,
            headingYear,
            bodyYear,
            heading3,
            body3,
            heading4,
            body4,
            heading5,
            body5,
            heading6,
            body6
        );

        display.appendChild(metadata);
    }
}

export default Item;
