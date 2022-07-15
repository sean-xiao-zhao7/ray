class Item {
    constructor(title, links, images, collab = []) {
        this.title = title;
        this.links = links;
        this.images = images;
        this.collab = "";

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

        // title
        const h1 = document.createElement("h1");
        h1.textContent = this.title + this.collab;
        display.appendChild(h1);

        // youtube
        // <iframe
        //     width="560"
        //     height="315"
        //     src="https://www.youtube.com/embed/gYhCogfX0DU"
        //     title="YouTube video player"
        //     frameborder="0"
        //     allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        //     allowfullscreen
        // ></iframe>;
        const youtube = document.createElement("iframe");
        youtube.src = this.links.youtube;
        youtube.allowfullscreen = true;
        youtube.width = "100%";
        youtube.height = "60%";
        youtube.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        display.appendChild(youtube);
    }
}

export default Item;
