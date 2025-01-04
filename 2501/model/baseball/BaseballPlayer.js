

class BaseballPlayer {

    static idCounter = 0;

    static restructure(jsonObject) {
        jsonObject = Object.setPrototypeOf(jsonObject, BaseballPlayer.prototype);
        jsonObject.attributes = PlayerAttributes.restructure(jsonObject.attributes);
        jsonObject.stats = Stats.restructure(jsonObject.stats);
        jsonObject.crest = Crest.restructure(jsonObject.crest);
        jsonObject.manager = EventManager.restructure(jsonObject.manager);
        jsonObject.attributes = PlayerAttributes.restructure(jsonObject.attributes);
        for (const [key, value] of Object.entries(jsonObject.conditions)) {
            PlayerCondition.restructure(jsonObject.conditions[key]);
        }
        return jsonObject;
    }

    // Keeps values in the range (0...10) inclusive
    static normalizeToTen(data) {
        data = Math.abs(data) % 20;
        if (data <= 10) {
            return data;
        }
        return 10 - (data - 10);
    }

    static nameList = ["Roynx Chewy", "Chrordelia Cistine", "Rustin Jiley", "Schelly Kenbeck"];



    // Constructor to initialize player attributes
    constructor(leagueIdNumber, year) {

        this.leagueIdNumber = leagueIdNumber;
        this.playerIdNumber = BaseballPlayer.idCounter++;
        this.firstName = Name.create_first_name(); // Player's name
        this.lastName = Name.create_last_name();
        this.nickName = Name.create_nickName(this.firstName, this.lastName);
        this.jerseyNumber = 0;
        this.teamPlaceAbbreviation = null;
        this.teamPlaceName = null;
        this.teamMascot = null;
        this.teamLeagueIdNumber = 0;
        this.crest = null;
        this.colorScheme = null;
        this.position = "null"; // Position on the field
        this.tattoos = Name.webSafeEmojiCodes[Name.getCharSum(this.firstName) % Name.webSafeEmojiCodes.length] +
            Name.webSafeEmojiCodes[Name.getCharSum(this.lastName) % Name.webSafeEmojiCodes.length];
        this.profilePic = Name.profileEmojis[(Name.getCharSum(this.firstName) * Name.getCharSum(this.lastName)) % Name.profileEmojis.length]
        this.age = Math.floor(Model.rng.random() * 11) + 20 + year; // age range is [20...30] inclusive
        this.attributes = PlayerAttributes.randomPlayer();
        this.conditions = {};
        this.stats = new Stats(); // current season only
        ////this.lifetimeStats = new Stats();
        this.manager = new EventManager();
    }

    addPlateAppearances() {
        this.stats.plateAppearances++;
        //this.lifetimeStats.plateAppearances++;
    }
    addAtBats() {
        this.stats.atBats++;
        //this.lifetimeStats.atBats++;
    }
    addBasesOnBalls() {
        this.stats.basesOnBalls++;
        //this.lifetimeStats.basesOnBalls++;
    }
    addDoubles() {
        this.stats.doubles++;
        //this.lifetimeStats.doubles++;
        this.addHits();
        this.addTotalBases(2)
    }
    addHits() {
        this.stats.hits++;
        //this.lifetimeStats.hits++;
    }
    addHomeRuns() {
        this.stats.homeRuns++;
        //this.lifetimeStats.homeRuns++;
        this.addHits();
        this.addTotalBases(4)
    }
    addHomeRunsAllowed() {
        this.stats.homeRunsAllowed++;
        //this.lifetimeStats.homeRunsAllowed++;
    }
    addInningsPitched() {
        this.stats.inningsPitched++;
        //this.lifetimeStats.inningsPitched++;
    }
    addLoss() {
        this.stats.losses++;
        this.stats.gamesPlayed++;
        //this.lifetimeStats.losses++;
        //this.lifetimeStats.gamesPlayed++;
    }
    addRunsAllowed() {
        this.stats.runsAllowed++;
        //this.lifetimeStats.runsAllowed++;
    }
    addRunsScored() {
        this.stats.runsScored++;
        //this.lifetimeStats.runsScored++;
    }
    addSacrificeFlies() {
        this.stats.sacrificeFlies++;
        //this.lifetimeStats.sacrificeFlies++;
    }
    addSingles() {
        this.stats.singles++;
        //this.lifetimeStats.singles++;
        this.addHits();
        this.addTotalBases(1)
    }
    addStrikeoutsAtBat() {
        this.stats.strikeoutsAtBat++;
        //this.lifetimeStats.strikeoutsAtBat++;
    }
    addStrikeoutsThrown() {
        this.stats.strikeoutsThrown++;
        //this.lifetimeStats.strikeoutsThrown++;
    }
    addTotalBases(num) {
        this.stats.totalBases += num;
        //this.lifetimeStats.totalBases += num;
    }
    addTriples() {
        this.stats.triples++;
        //this.lifetimeStats.triples++;
        this.addHits();
        this.addTotalBases(3)
    }
    addWalksAllowed() {
        this.stats.walksAllowed++;
        //this.lifetimeStats.walksAllowed++;
    }
    addWin() {
        this.stats.wins++;
        this.stats.gamesPlayed++;
        //this.lifetimeStats.wins++;
        //this.lifetimeStats.gamesPlayed++;
    }

    addCondition(condition) {
        if (this.conditions.hasOwnProperty(condition.name)) { // does player already have this condition?
            this.conditions[condition.name].duration = condition.duration; // reset the duration
        } else {
            this.conditions[condition.name] = condition;
        }
    }

    canBat() {
        for (let eachCondition of this.conditions) {
            if (!eachCondition.modifiers.canBat) return false;
        }
        return true;
    }

    canCatch() {
        for (let eachCondition of this.conditions) {
            if (!eachCondition.modifiers.canCatch) return false;
        }
        return true;
    }

    canPitch() {
        for (let eachCondition of this.conditions) {
            if (!eachCondition.modifiers.canPitch) return false;
        }
        return true;
    }

    equals(otherObject) {
        return this.playerIdNumber === otherObject.playerIdNumber &&
            this.leagueIdNumber === otherObject.leagueIdNumber &&
            this.firstName === otherObject.firstName &&
            this.lastName === otherObject.lastName &&
            this.jerseyNumber === otherObject.jerseyNumber
    }

    getAccuracy(){
        let result = this.attributes.accuracy;
        for (const eachCondition of Object.values(this.conditions)) {
            result += eachCondition.modifiers.accuracy;
        }
        return result;
    }

    getBalance(){
        let result = this.attributes.balance;
        for (const eachCondition of Object.values(this.conditions)) {
            result += eachCondition.modifiers.balance;
        }
        return result;
    }

    getBattingAptitude() {
        return (this.getSwinginess() + this.getThwackiness() + this.getPower() - this.getTiredness(50)) / 3;
    }

    getConditions() {
        let result = "";
        for (const eachCondition of Object.values(this.conditions)) {
            result += eachCondition.toString() + ", ";
        }
        // Remove the trailing comma and space, if any
        return result.slice(0, -2) || "Normal";
    }
    

    getDefaultPosition() {
        return Name.playerPositions[Name.getCharSum(this.firstName + this.lastName) % Name.playerPositions.length]
    }

    getDefenseAptitude() {
        return (this.getReliability() + this.getTeamwork() - this.getTiredness(50)) / 2;
    }

    /*
    getDefenseScore
    Factors:
    - reliability
    - teamwork
    - hunger
    - tiredness
*/
    getDefenseScore(pitchNumber) {
        let tiredness = this.getTiredness(pitchNumber);
        return BaseballPlayer.normalizeToTen((this.getReliability() + this.getTeamwork()) / 2 + this.getHunger() - tiredness);
    }

    getEra() {
        if (this.stats.gamesPitched == 0) {
            return -1;
        }
        return this.stats.runsAllowed / this.stats.gamesPitched;
    }

    getFullName(crestSize = 40) {
        return this.crest.render(crestSize) + "&nbsp;" + this.teamPlaceAbbreviation + " " + this.firstName + " " + this.lastName;
    }

    getFullNameWithLink(crestSize = 40) {
        return this.crest.render(crestSize) + `&nbsp;<a href="#" 
                class="link link-light link-underline-opacity-25 link-underline-opacity-100-hover" 
                onclick="app.view.statsModal.update(${this.leagueIdNumber});" data-bs-target="#statsModal" data-bs-toggle="modal" >`
            + this.teamPlaceAbbreviation + " " + this.firstName + " " + this.lastName + '</a>';
    }

    getHealthiness(){
        let result = this.attributes.healthiness;
        for (const eachCondition of Object.values(this.conditions)) {
            result += eachCondition.modifiers.healthiness;
        }
        return result;
    }


    /*
getHitScore
Factors:
- pitchScore
- hittingPower
- hunger
- tiredness
*/
    getHitScore(pitchNumber, pitchScore) {
        let tiredness = this.getTiredness(pitchNumber);
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        // the easiest pitch to hit is 5 (out of 10)
        return BaseballPlayer.normalizeToTen(this.getPower() + this.getHunger() - tiredness - Math.abs(pitchScore - 5));
    }

    getHunger(){
        let result = this.attributes.hunger;
        for (const eachCondition of Object.values(this.conditions)) {
            result += eachCondition.modifiers.hunger;
        }
        return result;
    }

    getMetabolism(){
            let result = this.attributes.metabolism;
            for (const eachCondition of Object.values(this.conditions)) {
                result += eachCondition.modifiers.metabolism;
            }
            return result;
    }

    getName(params) {
        //console.log(params)
        if (params == null) return this.teamPlaceAbbreviation + "&nbsp;" + this.lastName;
        let result = "";
        if (params.firstName) result += this.firstName + " ";
        if (params.nickName) result += `"${this.nickName}" `;
        if (params.lastName) result += this.lastName + " ";
        return result;
    }

    getNameWithLink(crestSize = 40) {
        return this.crest.render(crestSize) + `&nbsp;<a href="#" 
        class="link link-light link-underline-opacity-25 link-underline-opacity-100-hover" 
        onclick="app.view.statsModal.update(${this.leagueIdNumber});" data-bs-target="#statsModal" data-bs-toggle="modal" >`
            + this.teamPlaceAbbreviation + " " + this.lastName + '</a>';
    }

    getOverallAptitude() {
        return (this.getDefenseAptitude() + this.getPitchingAptitude() + this.getBattingAptitude() - this.getTiredness(50)) / 3;
    }

    getPitchingAptitude() {
        return (this.getAccuracy() + this.getStrength() + this.getMetabolism() - this.getTiredness(50)) / 3;
    }

    /*
    getPitchScore
    Factors:
    - pitchStrength
    - wobbliness (which is 10 - pitchAccuracy)
    - hunger
    - tiredness
*/
    getPitchScore(pitchNumber) {
        let tiredness = this.getTiredness(pitchNumber);
        let wobblinessFactor = Math.abs(Math.sin(pitchNumber * (10 - this.getAccuracy()) * 0.5) * (10 - this.getAccuracy()) * 0.5); // cycles from 0...(10 - this.getAccuracy()) * 0.5
        return BaseballPlayer.normalizeToTen(this.getStrength() - wobblinessFactor + this.getHunger() - tiredness * 2);
    }

    getPower(){
        let result = this.attributes.power;
        for (const eachCondition of Object.values(this.conditions)) {
            result += eachCondition.modifiers.power;
        }
        return result;
    }
    getReliability(){
        let result = this.attributes.reliability;
        for (const eachCondition of Object.values(this.conditions)) {
            result += eachCondition.modifiers.reliability;
        }
        return result;
    }


    getStatsTable() {
        return `
            <ul class="nav nav-tabs nav-fill" id="playerTab" role="tablist">
                <li class="nav-item" role="presentation">
                    <button class="nav-link link-secondary active" id="details-tab" data-bs-toggle="tab" data-bs-target="#details" 
                    type="button" role="tab" aria-controls="details" aria-selected="true">Player Details</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link link-secondary" id="attributes-tab" data-bs-toggle="tab" data-bs-target="#attributes" 
                    type="button" role="tab" aria-controls="attributes" aria-selected="false">Attributes</button>
                </li>
                <li class="nav-item" role="presentation">
                    <button class="nav-link link-secondary" id="stats-tab" data-bs-toggle="tab" data-bs-target="#stats" 
                    type="button" role="tab" aria-controls="stats" aria-selected="false">Stats</button>
                </li>
                <!-- lifetime stats -->
                <!--li class="nav-item" role="presentation">
                    <button class="nav-link link-secondary" id="lifetime-tab" data-bs-toggle="tab" data-bs-target="#lifetime" 
                    type="button" role="tab" aria-controls="lifetime" aria-selected="false">Lifetime</button>
                </li-->
            </ul>
    
            <div class="tab-content" id="playerTabContent">
                <!-- Player Details Tab -->
                <div class="tab-pane fade show active" id="details" role="tabpanel" aria-labelledby="details-tab">
                    <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
                        <tr>
                            <th colspan="2" class="text-center">Player Details</th>
                        </tr>
                        <tr><td>Team</td><td>
                            ${this.crest.render(40)} <a href="#" onclick="app.view.statsModal.update(${this.teamLeagueIdNumber})" 
                            class="link text-light link-offset-2 link-light link-underline-opacity-25 link-underline-opacity-100-hover">
                                ${this.teamPlaceAbbreviation} ${this.teamPlaceName} ${this.teamMascot}
                            </a>
                        </td></tr>
                        <tr><td>League ID</td><td>${this.leagueIdNumber}</td></tr>
                        <tr><td>Full Name</td><td>${this.firstName} "${this.nickName}" ${this.lastName}</td></tr>
                        <tr><td>Jersey Number</td><td>${this.jerseyNumber}</td></tr>
                        <tr><td>Position</td><td>${this.position}</td></tr>
                        <tr><td>Tattoos</td><td><span class='noto fs-3'>${this.tattoos}</span></td></tr>
                        <tr><td>Age</td><td>${this.age}</td></tr>
                    </table>
                </div>

                                <!-- Attributes Tab -->
                <div class="tab-pane fade" id="attributes" role="tabpanel" aria-labelledby="attributes-tab">
                    <div class="row">
                        <div class="col col-lg-6">    
                            <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
                                <th colspan="2" class="text-center">Wellness</th>
                                 <tr><td>Status</td><td>${this.getConditions()}</td></tr>
                                <tr><td>Hunger</td><td>${this.getHunger().toFixed(1)}</td></tr>
                                <tr><td>Metabolism</td><td>${this.getMetabolism().toFixed(1)}</td></tr>
                                <tr><td>Healthiness</td><td>${this.getHealthiness().toFixed(1)}</td></tr>
                                <tr><td>Balance</td><td>${this.getBalance().toFixed(1)}</td></tr>
                                <tr>
                                    <th colspan="2" class="text-center">Pitching Attributes</th>
                                </tr>
                                <tr><td>Pitch Strength</td><td>${this.getStrength().toFixed(1)}</td></tr>
                                <tr><td>Pitch Accuracy</td><td>${this.getAccuracy().toFixed(1)}</td></tr>
                                <tr><td>Avg. Pitching Aptitude</td><td>${this.getPitchingAptitude().toFixed(1)}</td></tr>
                                <tr>
                            </table>
                        </div>
                        <div class="col col-lg-6">   
                            <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
                                <th colspan="2" class="text-center">Batting Attributes</th>
                                </tr>
                                <tr><td>Swinginess</td><td>${this.getSwinginess().toFixed(1)}</td></tr>
                                <tr><td>Thwackiness</td><td>${this.getThwackiness().toFixed(1)}</td></tr>
                                <tr><td>Hitting Power</td><td>${this.getPower().toFixed(1)}</td></tr>
                                <tr><td>Avg. Batting Aptitude</td><td>${this.getBattingAptitude().toFixed(1)}</td></tr>
                                <tr>
                                    <th colspan="2" class="text-center">Defense Attributes</th>
                                </tr>
                                <tr><td>Reliability</td><td>${this.getReliability().toFixed(1)}</td></tr>
                                <tr><td>Teamwork</td><td>${this.getTeamwork().toFixed(1)}</td></tr>
                                <tr><td>Avg. Defense Aptitude</td><td>${this.getDefenseAptitude().toFixed(1)}</td></tr>
                            </table>
                        </div>
                    </div>
                </div>
    
                <!-- Stats Tab -->
                <div class="tab-pane fade" id="stats" role="tabpanel" aria-labelledby="stats-tab">
                    <div class="row">
                        <div class="col col-lg-6">
                        ${this.stats.getRecordAndPitcherStats()}
                        </div>
                        <div class="col col-lg-6">
                        ${this.stats.getBatterStats()}
                        </div>
                    </div>
                </div>
    

    
                <!-- Lifetime Stats Tab -->
                <!--div class="tab-pane fade" id="lifetime" role="tabpanel" aria-labelledby="lifetime-tab">
                    <div class="row">
                        <div class="col col-lg-6">
                        {//this.lifetimeStats.getRecordAndPitcherStats()}
                        </div>
                        <div class="col col-lg-6">
                        {//this.lifetimeStats.getBatterStats()}
                        </div>
                    </div>
                </div-->
            </div>
        `.trim();
    }

    getStrength(){
        let result = this.attributes.strength;
        for (const eachCondition of Object.values(this.conditions)) {
            result += eachCondition.modifiers.strength;
        }
        return result;
    }

    getSummary() {
        return `${this.fullname}, ${this.position}`;
    }

    getSwinginess(){
        let result = this.attributes.swinginess;
        for (const eachCondition of Object.values(this.conditions)) {
            result += eachCondition.modifiers.swinginess;
        }
        return result;
    }

    getTeamwork(){
        let result = this.attributes.teamwork;
        for (const eachCondition of Object.values(this.conditions)) {
            result += eachCondition.modifiers.teamwork;
        }
        return result;
    }

    getThwackiness(){
        let result = this.attributes.thwackiness;
        for (const eachCondition of Object.values(this.conditions)) {
            result += eachCondition.modifiers.thwackiness;
        }
        return result;
    }

    /* 
        Tiredness is a value that hurts performance. Generally grows over the course of a game.
        Factors:
        - age
        - mood (which is basically 10 - balance)
        - healthiness
        - pitchNumber
    */
    getTiredness(pitchNumber) {
        let ageFactor = Math.abs(25 - this.age) * 0.65;
        let moodFactor = Math.abs(Math.sin(pitchNumber * (10 - this.getBalance()) * 0.5) * (10 - this.getBalance()) * 0.5); // cycles from 0...(10 - this.getBalance()) * 0.5
        //return [moodFactor , ageFactor , timeFactor];
        //return -1 * (moodFactor + ageFactor + timeFactor + attitudeFactor);
        return BaseballPlayer.normalizeToTen((ageFactor + moodFactor) / this.getHealthiness() * pitchNumber / 500 * 50);
    }








    /*
    isContactingBall
    Factors:
    - pitchScore
    - thwackiness
    - hunger
    - tiredness
*/
    isContactingBall(pitchNumber, pitchScore) {
        let tiredness = this.getTiredness(pitchNumber);
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        // the lower the pitch score, the easier to hit
        if (pitchScore <= this.getThwackiness() + this.getHunger() - tiredness || this.getThwackiness() + this.getHunger() - tiredness > Model.rng.random() * 5 + Model.rng.random() * 5) {
            return true;
        }
        return false;
    }

    /*
        isSwingingBat
        Factors:
        - pitchScore
        - swinginess
        - hunger
        - tiredness
    */
    isSwingingBat(pitchNumber, pitchScore) {
        let tiredness = this.getTiredness(pitchNumber);
        pitchScore = BaseballPlayer.normalizeToTen(pitchScore);
        // players prefer to swing at better pitches aka higher pitch scores
        if (pitchScore + this.getHunger() >= (10 - this.getSwinginess()) - tiredness || this.getSwinginess() + this.getHunger() - tiredness > Model.rng.random() * 6 + Model.rng.random() * 6) {
            return true;
        }
        return false;
    }





    removeCondition(conditionName) {
        delete this.conditions[conditionName];
    }

    setHungerDown() {
        if (this.getHunger() > 0.01) {
            this.attributes.hunger *= 0.5;
        }
        else {
            this.attributes.hunger = 0.01;
        }
    }

    setHungerUp() {
        this.attributes.hunger += Model.rng.random() * this.getMetabolism() * 0.1 + Model.rng.random() * this.getMetabolism() * 0.1
    }



    setNameFromList() {
        const nameListName = BaseballPlayer.nameList.pop();
        if (nameListName) {
            this.firstName = nameListName.substring(0, nameListName.indexOf(" "))
            this.lastName = nameListName.substring(nameListName.indexOf(" "))
        }
        this.tattoos = Name.webSafeEmojiCodes[Name.getCharSum(this.firstName) % Name.webSafeEmojiCodes.length] +
            Name.webSafeEmojiCodes[Name.getCharSum(this.lastName) % Name.webSafeEmojiCodes.length];
        this.profilePic = Name.profileEmojis[(Name.getCharSum(this.firstName) * Name.getCharSum(this.lastName)) % Name.profileEmojis.length]
    }

    updateConditions() {
        for (const [name, condition] of this.conditions) {
            condition.reduceDuration();
            if (!condition.active) {
                this.removeCondition(name);
            }
        }
    }

}