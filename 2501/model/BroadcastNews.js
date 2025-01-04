class BroadcastNews {

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, BroadcastNews.prototype);
        return jsonObject;
    }

    constructor() {
        this.firstName = Name.create_first_name(); // Player's name
        this.lastName = Name.create_last_name();
        this.place = HelpMe.choice([
            "Backcountry",
            "Badlands",
            "Baffin Bay",
            "Baker Island",
            "Bakersfield",
            "Banff",
            "Barkley Sound",
            "Barnegat Bay",
            "Baton Rouge",
            "Bay Area",
            "Bayshore",
            "Bayou",
            "Beantown",
            "Beaumont",
            "Bellevue",
            "Bellingham Bay",
            "Belmont Bay",
            "Berkeley",
            "Berkshires",
            "Big Bend",
            "Big Horn",
            "Bighorn Basin",
            "Billings",
            "Biloxi",
            "Birch Bay",
            "Biscayne",
            "Black Canyon",
            "Black Hills",
            "Black Swamp",
            "Blue Ridge",
            "Blue Water",
            "Bluegrass",
            "Bodega Bay",
            "Boise",
            "Boone County",
            "Boonslick",
            "Bootheel",
            "Boreal Plains",
            "Borscht Belt",
            "Boulder",
            "Brazos Valley",
            "Bridgeport",
            "Bristol Bay",
            "British Columbia",
            "Brockton",
            "Bronx",
            "Brookside",
            "Brownsville",
            "Bryce Canyon",
            "Buckeye",
            "Buffalo",
            "Bushwick",
            "Butte",
            "Burbank",
            "Burned-over District",
            "Buzzards Bay"
        ]);
        this.secondWord = HelpMe.choice([
            "Babble", 
            "Babbler",
            "Ballpark",
            "Banter",
            "Barker",
            "Baseball",
            "Bell",
            "Bombast",
            "Boomtown",
            "Broadcast",
            "Broadcaster",
            "Bulletin",
            "Bugle",
            "Bugler",
            "Busybody",
            "Buzz",
            "Canon",
            "Canonical",
            "Mumbler",
            "Murmur",
            "Tattler",
            "Tattletale",
        ]);
        this.network = HelpMe.choice(["News", "Network", "Media","Messenger"]);
        this.colorScheme = {
            light:"#efae8f", // 19, 75%, 75%
            mid:"#c24b3c", // 7, 53%, 50%
            dark:"#455019", //72, 52%, 21%
            
        };
        //this.crest = new Crest(this.colorScheme,this.getNewsAbbreviation(),33,4,15,3)
        this.crest = new Crest(this.colorScheme,this.getNewsAbbreviation(),25,4,15,3)
    }

    getFullName(){
        return `${this.crest.render(40)} <span style="background:'${this.colorScheme.light}';color:'${this.colorScheme.dark}';border-radius:'2px';"/>${this.place} ${this.secondWord} ${this.network}</span`;
    }

    getNewsAbbreviation(){
        return `${this.place[0]}${this.secondWord[0]}${this.network[0]}`;
    }

    getNewsName(){
        return `${this.place} ${this.secondWord} ${this.network}`;
    }

    getReporterName(){
        return `${this.firstName} ${this.lastName}`;
    }


    
}
