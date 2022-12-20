class Artist {
    constructor(
        firstname,
        lastname,
        nickname = "",
        social,
        shortDescription = ""
    ) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.nickname = ` (${nickname})`;
        this.social = social;
        this.shortDescription = shortDescription;
    }

    fullName() {
        return this.firstname + " " + this.lastname + this.nickname;
    }
}

export default Artist;
