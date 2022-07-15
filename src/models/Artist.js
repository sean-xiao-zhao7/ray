class Artist {
    constructor(firstname, lastname, nickname = "", social) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = ` (${nickname})`;
        this.social = social;
    }

    fullName() {
        return this.firstname + " " + this.lastname + this.nickname;
    }
}

export default Artist;
