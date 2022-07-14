class Artist {
    constructor(firstname, lastname, nickname = "") {
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = ` (${nickname})`;
    }

    fullName() {
        return this.firstname + " " + this.lastname + this.nickname;
    }
}

export default Artist;
