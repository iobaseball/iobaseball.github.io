class BaseballTeam {
    static idCounter = 0;

    static restructure(jsonObject) {
        jsonObject = Object.setPrototypeOf(jsonObject, BaseballTeam.prototype);
        jsonObject.crest = Crest.restructure(jsonObject.crest);
        jsonObject.manager = EventManager.restructure(jsonObject.manager);
        if (jsonObject.pitcher != null)
            jsonObject.pitcher = BaseballPlayer.restructure(jsonObject.pitcher);
        for (let i = 0; i < jsonObject.players.length; i++) {
            jsonObject.players[i] = BaseballPlayer.restructure(jsonObject.players[i]);
        }
        if (jsonObject.captain != null)
            jsonObject.captain = BaseballPlayer.restructure(jsonObject.captain);
        jsonObject.stats = Stats.restructure(jsonObject.stats);
        
        return jsonObject;
    }

    // static generateCrest(colorScheme,teamPlaceAbbreviation){
    //     // black font with white shadow
    //     let crest = `
    //         <span 
    //             class="font-monospac fw-bold text-black" 
    //             style=
    //             "-webkit-text-stroke: 1px rgba(255,255,255,0.8);
    //             text-shadow: 1px 1px 0px rgba(255,255,255,0.8);
    //     `
    //     if(Model.rng.random() <0.5){
    //         // white font with black shadow
    //         crest = `
    //         <span 
    //             class="font-monospac fw-bold text-white" 
    //             style=
    //             "-webkit-text-stroke: 1px rgba(0,0,0,0.8);
    //             text-shadow: 1px 1px 0px rgba(0,0,0,0.8);
    //         `
    //     }
    //     let randShape = Math.floor(Model.rng.random() * 10);
    //     switch(randShape) {
    //         case 0:
    //             // hex
    //             crest += `clip-path: polygon(
    //                 -50% 50%,
    //                 50% 100%,
    //                 150% 50%,
    //                 50% 0
    //               );`
    //             break;
    //         case 1:
    //             // streched pentagon
    //             crest += `  clip-path: polygon(50% 0%,100% 45%,75% 85%, 25% 85%,0% 45%);`
    //             break;
    //         case 2:
    //             // bottom heavy tri
    //             crest += `clip-path: polygon(50% 0, 100% 85%, 0 85%);`
    //             break;
    //         case 3:
    //             // top heavy tri
    //             crest += `clip-path: polygon(
    //                 0 15%, 
    //                 100% 15%, 
    //                 50% 100%);`
    //             break;
    //         case 4:
    //             // penant
    //             crest += `clip-path: polygon(
    //                 15% 0%, 
    //                 100% 50%, 
    //                 15% 100%);`
    //             break;
    //         case 5:
    //             // home plate
    //             crest += `clip-path: polygon(
    //                 0% 0, 
    //                 100% 0, 
    //                 100% 55%, 
    //                 50% 100%,
    //                 0% 55%
    //                 );`
    //             break;
    //         case 6:
    //             // bottom heavy trapezoid
    //             crest += `clip-path: polygon(20% 0, 80% 0, 100% 100%, 0 100%);`
    //             break;
    //         case 7:
    //             // top heavy trapezoid
    //             crest += `clip-path: polygon(0% 0, 100% 0, 80% 100%, 20% 100%);`
    //             break;
    //         case 8:
    //             // diamond
    //             crest += `  clip-path: polygon(100% 50%,50% 100%,0% 50%,50% 0%);`
    //             break;
    //         case 9:
    //         default:
    //             // square
    //             break;

    //     }
            

    //    crest += `background:`;
    //     let randomNum = Math.floor(Model.rng.random() * 13);
    //     switch (randomNum) {
    //         case 0:
    //             crest += "linear-gradient(0deg"
    //             break;
    //         case 1:
    //             crest += "linear-gradient(45deg"
    //             break;
    //         case 2:
    //             crest += "linear-gradient(90deg"
    //             break;
    //         case 3:
    //             crest += "linear-gradient(135deg"
    //             break;
    //         case 4:
    //             crest += "radial-gradient(circle at top left"
    //             break;
    //         case 5:
    //             crest += "radial-gradient(circle at top center"
    //             break;
    //         case 6:
    //             crest += "radial-gradient(circle at top right"
    //             break;
    //         case 7:
    //             crest += "radial-gradient(circle at center left"
    //             break;
    //         case 8:
    //             crest += "radial-gradient(circle at center center"
    //             break;
    //         case 9:
    //             crest += "radial-gradient(circle at center right"
    //             break;
    //         case 10:
    //             crest += "radial-gradient(circle at bottom left"
    //             break;
    //         case 11:
    //             crest += "radial-gradient(circle at bottom center"
    //             break;
    //         case 12:
    //             crest += "radial-gradient(circle at bottom right"
    //             break;
    //     }
    //     return crest += `, ${colorScheme.mid} 50%, ${colorScheme.light} 50%);">&nbsp;${teamPlaceAbbreviation[0]}&nbsp;</span>`
        
    // }

    // static debug() {
    //     let temp = new BaseballTeam();
    //     temp.players = [];
    //     //for i in range(Team.playersPerTeam):
    //     for (let i = 0; i < BaseballTeam.playersPerTeam; i++) {
    //         tempPlayer = new BaseballPlayer.debug();
    //         tempPlayer.teamName = temp.getPlace();
    //         temp.players.push(tempPlayer);
    //     }
    //     return temp;
    // }

    //# teamNameList = json.loads(requests.get('https://raw.githubusercontent.com/dariusk/corpora/master/data/humans/firstNames.json').text)["firstNames"]
    //alert(Name.teamNameList);
    //Name.shuffle(Name.teamNameList);
    //static teamNameList = Name.teamNameList;
    //random.seed(10) not possible to seed in vanilla JS

    


    static teamPlaceList = [];
    static playersPerTeam = 9;

    constructor(leagueIdNumber) {
        this.leagueIdNumber = leagueIdNumber;
        this.teamIdNumber = BaseballTeam.idCounter++;
        this.jerseyNumberList = [];
        // this.place = Name.places[Math.floor(Model.rng.random() * Name.places.length)]
        // while (this.place in BaseballTeam.teamPlaceList) {
        //   this.place = Name.places[Math.floor(Model.rng.random() * Name.places.length)]
        // }
        //BaseballTeam.teamPlaceList.push(this.place)
        //this.colorScheme = Name.colorCombos.splice(Math.floor(Model.rng.random() * Name.colorCombos.length), 1)[0];
        this.colorScheme = colorCombinations.splice(
            Math.floor(((this.leagueIdNumber+1)*3 +Model.rng.random()*3) % colorCombinations.length),
            1
        )[0];
        
        this.place = null;
        if (Name.places.length > 0) {
            this.place = Name.places.splice(
                Math.floor(Model.rng.random() * Name.places.length),
                1
            )[0];
        }
        this.crest = new Crest(this.colorScheme,this.place.abbreviation);

        this.mascot = Name.teamNameList.splice(
            Math.floor(Model.rng.random() * Name.teamNameList.length),
            1
        )[0];
        this.pitcher = null;
        this.captain = null;

        this.mood = Model.rng.random() * 0.5 + Model.rng.random() * 0.5;
        this.hunger = 1;
        this.hungerRate = 0.35;
        this.players = [];

        this.stats = new Stats();
        //this.lifetimeStats = new Stats();
        this.xp = 0;

        this.batterUpNumber = 0;
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
        this.addTotalBases(2);
    }
    addHits() {
        this.stats.hits++;
        //this.lifetimeStats.hits++;
    }
    addHomeRuns() {
        this.stats.homeRuns++;
        //this.lifetimeStats.homeRuns++;
        this.addHits();
        this.addTotalBases(4);
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
        for (let eachPlayer of this.players) {
            eachPlayer.addLoss();
        }
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
        this.addHits();
        this.addTotalBases(1);
    }
    addSingles() {
        this.stats.singles++;
        //this.lifetimeStats.singles++;
        this.addHits();
        this.addTotalBases(1);
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
        this.addTotalBases(3);
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
        for (let eachPlayer of this.players) {
            eachPlayer.addWin();
        }
    }

    addPlayer(newPlayer) {
        newPlayer.teamPlaceAbbreviation = this.place.abbreviation;
        newPlayer.teamPlaceName = this.place.name;
        newPlayer.teamMascot = this.mascot;
        newPlayer.colorScheme = this.colorScheme;
        newPlayer.crest = this.crest;
        newPlayer.teamLeagueIdNumber = this.leagueIdNumber;
        newPlayer.jerseyNumber = this.getJerseyNumber();
        this.players.push(newPlayer);
        this.setup();
    }

    equals(otherObject) {
        return (
            this.teamIdNumber === otherObject.teamIdNumber &&
            this.mascot === otherObject.mascot &&
            this.teamPlaceName === otherObject.teamPlaceName &&
            this.colorScheme === otherObject.colorScheme
        );
    }

    getJerseyNumber() {
        let result = Math.floor(Model.rng.random() * 98)+1;
        //# don't use while loop in case the jerseyNumberList ever fills up
        //for i in range(Team.playersPerTeam):
        for (let i = 0; i < BaseballTeam.playersPerTeam; i++) {
            if (!this.jerseyNumberList.includes(result)) {
                break;
            }
            result = Math.floor(Model.rng.random() * 98)+1;
        }
        this.jerseyNumberList.push(result);
        return result;
    }

    getName(crestSize = 40) {
        return (
            this.crest.render(crestSize) + "&nbsp;" +
            this.place.abbreviation.toUpperCase() +
            " " +
            this.mascot
        );
    }

    getNameWithLink(crestSize = 40) {
        return (
            this.crest.render(crestSize) + '&nbsp;<a href="#" class="link link-light link-underline-opacity-25 link-underline-opacity-100-hover" onclick="app.view.statsModal.update(' +
            this.leagueIdNumber +
            ');" data-bs-target="#statsModal" data-bs-toggle="modal" >' +
            this.place.abbreviation.toUpperCase() + " " + this.mascot +
            "</a>"
        );
    }

    getFullName(crestSize = 40) {
        return (
            
            this.crest.render(crestSize) + "&nbsp;" +
            this.place.name.toUpperCase() +
            " " +
            this.mascot
        );
    }

    getFullNameWithLink(crestSize = 40) {
        return (
            this.crest.render(crestSize) + '&nbsp;<a href="#" class="link link-light link-underline-opacity-25 link-underline-opacity-100-hover" onclick="app.view.statsModal.update(' +
            this.leagueIdNumber +
            ');" data-bs-target="#statsModal" data-bs-toggle="modal" >' 
            + this.place.name.toUpperCase() + " " + this.mascot +
            "</a>"
        );
    }

    getPlace(crestSize = 40) {
        return this.crest.render(crestSize) + "&nbsp;" + this.place.name.toUpperCase();
    }

    getNextBatter() {
        return this.players[this.batterUpNumber++ % this.players.length];
    }

    getPitcher() {
        if (this.pitcher == null) {
            this.setup();
        }
        return this.pitcher;
    }

    getPlayerList() {
        let result = "";
        for (let each of this.players) {
            result += `
            <tr>
                <td>
                    <a href="#" onclick="app.view.statsModal.update(${each.leagueIdNumber})" class="link text-light link-offset-2 link-light link-underline-opacity-25 link-underline-opacity-100-hover">
                        ${each.firstName} "${each.nickName}" ${each.lastName}
                    </a>
                </td>
                <td>${each.position}</td>
            </tr>
        `;
        }
        return result.trim();
    }

    getRandomPlayer() {
        return this.players[Math.floor(Model.rng.random() * this.players.length)];
        //for i in range(10):
        // for (let i = 0; i < 10; i++) { // try max 10 times
        //   result = this.players[Math.floor(Model.rng.random() * this.players.length)]
        //   if (!result.isAsleep()) {
        //     break
        //   }
        // }
        // return result
    }

    getSlugger(){
        if(this.stats.gamesPlayed == 0){
            return this.captain
        }
        // Copy the original array to avoid modifying the original 
        const dataCopy = [...this.players];
        // sort by most hits
        dataCopy.sort((a, b) => b.stats.hits - a.stats.hits);
        if(dataCopy[0].stats.hits > 0){
            return dataCopy[0];
        } else {
            return this.captain
        }
    }

    getStats() {
        return this.getFullName() + "\n" + this.stats;
    }

    getTeamAptitude() {
        let total = 0;
        for (let each of this.players) {
            total += parseFloat(each.getBattingAptitude());
            total += parseFloat(each.getDefenseAptitude());
        }
        total += this.pitcher.getPitchingAptitude();
        return ((total / (this.players.length * 2 + 1)) * 100) / 100;
    }

    getWinRatio() {
        if (this.stats.gamesPlayed == 0) {
            return 0;
        }
        return this.stats.gamesWon / this.stats.gamesPlayed;
    }

    //# returns a string
    levelUpPlayers() {
        let result = "";

        for (let eachPlayer of this.players) {
            if (eachPlayer.isLevelUp()) {
                result += eachPlayer.setLevelUp();
            }
            //# all players update xp, levelup or not
            eachPlayer.updateXp();
        }
        //# could change the team's lineup
        this.setup();
        return result;
    }

    removePlayer(formerPlayer) {
        formerPlayer.teamPlaceAbbreviation = null;
        formerPlayer.teamMascot = null;
        formerPlayer.colorScheme = null;
        formerPlayer.crest = null;
        this.players.remove(formerPlayer);
        this.setup();
    }

    resetSeasonStats() {
        this.stats = new Stats();
    }

    setHungerUp() {
        //this.hunger += Model.rng.random() * this.hungerRate + Model.rng.random() * this.hungerRate
        for (let eachPlayer of this.players) {
            eachPlayer.setHungerUp();
        }
    }

    setHungerDown() {
        // if (this.hunger > 0.01 && this.hungerRate < 1) {
        //   this.hunger *= this.hungerRate;
        // }
        // else if (this.hunger > 0.01 && this.hungerRate >= 1) {
        //     this.hunger *= 0.5;
        // }
        for (let eachPlayer of this.players) {
            eachPlayer.setHungerDown();
        }
    }

    setPositions() {
        //# reset positions
        for (let eachPlayer of this.players) {
            eachPlayer.position = null;
        }
        //# find pitcher
        //this.players.sort(key=lambda x: x.getPitchingAptitude(), reverse=true)
        this.players.sort(function (a, b) {
            return b.getPitchingAptitude() - a.getPitchingAptitude();
        });
        for (let eachPlayer of this.players) {
            if (eachPlayer.position == null) {
                eachPlayer.position = "Pitcher";
                this.pitcher = eachPlayer;
                break;
            }
        }
        //# find captain
        //this.players.sort(key=lambda x: x.getBattingAptitude(), reverse=true)
        this.players.sort(function (a, b) {
            return b.getBattingAptitude() - a.getBattingAptitude();
        });
        for (let eachPlayer of this.players) {
            if (eachPlayer.position == null) {
                eachPlayer.position = "Captain";
                this.captain = eachPlayer;
                break;
            }
        }
        // swap index 0 with index 3 (the cleanup hitter position)
        if(this.players.length >= 4){
            let temp = this.players[0];
            this.players[0] = this.players[3];
            this.players[3] = temp;
            //# fill in with random position names
            for (let eachPlayer of this.players) {
                if (eachPlayer.position == null) {
                    eachPlayer.position = eachPlayer.getDefaultPosition();
                }
            }
        }
        
    }

    setup() {
        // for (let i = 0; i < this.players.length; i++) {
        //     this.players[i].teamName = this.crest.render() + " " + this.place.abbreviation;
        // }
        this.setPositions();
    }

//     getStatsTable() {
//         return `
//         <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
//             <tr>
//                 <th colspan="2" class="text-center">Players</th>
//             </tr>
//             ${this.getPlayerList()}
//             <tr><td>Number of Players</td><td>${this.players.length}</td></tr>
//         </table>
//         <details>
//             <summary>Stats</summary>
//             ${this.stats.getStatsTable()}
//         </details>
//         <details>
//             <summary>Info</summary>
//             <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
//                 <tr><td>Team ID</td><td>${this.teamIdNumber}</td></tr>
//                 <tr><td>Place</td><td>${this.place.abbreviation}, ${this.place.name
//             }</td></tr>
//                 <tr><td>Team Name</td><td>${this.mascot}</td></tr>
//                 <tr><td>Crest</td><td>${this.crest.render()}</td></tr>
//                 <tr><td>Color Scheme Light</td><td><div style="color:black;background:${this.colorScheme.light};">${this.colorScheme.light}</div></td></tr>
//                 <tr><td>Color Scheme Mid</td><td> <div style="color:black;background:${this.colorScheme.mid};">${this.colorScheme.mid}</div></td></tr>
//                 <tr><td>Color Scheme Dark</td><td> <div style="background:${this.colorScheme.dark};">${this.colorScheme.dark}</div></td></tr>

//                 <tr><td>Team Aptitude</td><td>${this.getTeamAptitude().toFixed(
//                 1
//             )}</td></tr>
//                 <tr><td>Mood</td><td>${this.mood.toFixed(1)}</td></tr>
//                 <tr><td>Hunger</td><td>${this.hunger.toFixed(1)}</td></tr>
//                 <tr><td>Hunger Rate</td><td>${this.hungerRate.toFixed(
//                 1
//             )}</td></tr>
//                 <tr><td>XP</td><td>${this.xp.toFixed(1)}</td></tr>
//                 <tr><td>Batter Up Number</td><td>${this.batterUpNumber
//             }</td></tr>
//                 <tr><td>Jersey Numbers</td><td>${this.jerseyNumberList.join(
//                 ", "
//             )}</td></tr>
//             </table>
//         </details>
//         <details>
//             <summary>//this.lifetimeStats</summary>
//             ${//this.lifetimeStats.getStatsTable()}
//         </details>
//   `.trim();
//     }
getStatsTable() {
    return `
        <ul class="nav nav-tabs nav-fill" id="teamTab" role="tablist">
            <li class="nav-item" role="presentation">
                <button class="nav-link link-secondary active" id="players-tab" data-bs-toggle="tab" data-bs-target="#players" 
                type="button" role="tab" aria-controls="players" aria-selected="true">Players</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link link-secondary" id="info-tab" data-bs-toggle="tab" data-bs-target="#info" 
                type="button" role="tab" aria-controls="info" aria-selected="false">Info</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link link-secondary" id="crest-tab" data-bs-toggle="tab" data-bs-target="#crest" 
                type="button" role="tab" aria-controls="crest" aria-selected="false">Crest</button>
            </li>
            <li class="nav-item" role="presentation">
                <button class="nav-link link-secondary" id="stats-tab" data-bs-toggle="tab" data-bs-target="#stats" 
                type="button" role="tab" aria-controls="stats" aria-selected="false">Stats</button>
            </li>

            <!--li class="nav-item" role="presentation">
                <button class="nav-link link-secondary" id="lifetime-tab" data-bs-toggle="tab" data-bs-target="#lifetime" 
                type="button" role="tab" aria-controls="lifetime" aria-selected="false">Lifetime Stats</button>
            </li-->
        </ul>

        <div class="tab-content" id="teamTabContent">
            <!-- Players Tab -->
            <div class="tab-pane fade show active" id="players" role="tabpanel" aria-labelledby="players-tab">
                <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
                    <tr>
                        <th colspan="2" class="text-center">Players</th>
                    </tr>
                    ${this.getPlayerList()}
                    <tr><td>Number of Players</td><td>${this.players.length}</td></tr>
                </table>
            </div>



            <!-- Info Tab -->
            <div class="tab-pane fade" id="info" role="tabpanel" aria-labelledby="info-tab">
                <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
                    <tr><td>League ID</td><td>${this.leagueIdNumber}</td></tr>
                    <tr><td>Place</td><td>${this.place.abbreviation}, ${this.place.name}</td></tr>
                    <tr><td>Team Name</td><td>${this.mascot}</td></tr>
                    <tr><td>Crest</td><td>${this.crest.render()}</td></tr>
                    <tr><td>Color Scheme Light</td>
                        <td><div style="color:black;background:${this.colorScheme.light};">${this.colorScheme.light}</div></td>
                    </tr>
                    <tr><td>Color Scheme Mid</td>
                        <td><div style="color:black;background:${this.colorScheme.mid};">${this.colorScheme.mid}</div></td>
                    </tr>
                    <tr><td>Color Scheme Dark</td>
                        <td><div style="background:${this.colorScheme.dark};">${this.colorScheme.dark}</div></td>
                    </tr>
                    <tr><td>Team Aptitude</td><td>${this.getTeamAptitude().toFixed(1)}</td></tr>
                    <tr><td>Mood</td><td>${this.mood.toFixed(1)}</td></tr>
                    <tr><td>Hunger</td><td>${this.hunger.toFixed(1)}</td></tr>
                    <tr><td>Hunger Rate</td><td>${this.hungerRate.toFixed(1)}</td></tr>
                    <tr><td>XP</td><td>${this.xp.toFixed(1)}</td></tr>
                    <tr><td>Batter Up Number</td><td>${this.batterUpNumber}</td></tr>
                    <tr><td>Jersey Numbers</td><td>${this.jerseyNumberList.join(", ")}</td></tr>
                </table>
            </div>
                        <!-- Stats Tab -->
            <div class="tab-pane fade" id="crest" role="tabpanel" aria-labelledby="crest-tab">
                <div class="row">
                    <div class="col text-center">
                    ${this.crest.render(300)}
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


    updateXp() {
        this.xp += this.dailyXp;
        this.dailyXp = 0;
    }
}
