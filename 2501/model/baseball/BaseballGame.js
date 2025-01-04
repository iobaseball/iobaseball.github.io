/*
BaseballGame is a finite state machine.
Using the Iterator Design Pattern because a game generates a series of 
  Strings that describe the actions taking place in the game.
Also using the State Behavioral Design Pattern so that control is driven by
  the seperate state classes.
https://en.wikipedia.org/wiki/State_pattern
*/
// const BaseballGameState = {
//     PLAY_BALL: 0,
//     TOP_OF_THE_INNING: 1,
//     AWAY_PLAYER_STEPS_UP_TO_BAT: 2,
//     AWAY_PLAYER_AT_BAT: 3,
//     BOTTOM_OF_THE_INNING: 4,
//     HOME_PLAYER_STEPS_UP_TO_BAT: 5,
//     HOME_PLAYER_AT_BAT: 6,
//     INNING_IS_NOW_AN_OUTING: 7,
//     END_OF_GAME: 8
// }

class BaseballGame {
    // #gameIdNumber;
    // #homeTeam;
    // #awayTeam;
    // #pitchNumber;
    // #defenseTeam;
    // #offenseTeam;
    // #batter;
    // #pitcher;
    // #count;
    // #score;
    // #inning;
    // #hasStarted;
    // #done;
    // #gameState;
    // #onBase;

    static idCounter = 0;

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, BaseballGame.prototype);
        jsonObject.homeTeam = BaseballTeam.restructure(jsonObject.homeTeam);
        jsonObject.awayTeam = BaseballTeam.restructure(jsonObject.awayTeam);
        jsonObject.defenseTeam = BaseballTeam.restructure(jsonObject.defenseTeam);
        jsonObject.offenseTeam = BaseballTeam.restructure(jsonObject.offenseTeam);
        jsonObject.scoreboard = BaseballGameBoxScore.restructure(jsonObject.scoreboard);
        if (jsonObject.batter != null) jsonObject.batter = BaseballPlayer.restructure(jsonObject.batter);
        jsonObject.pitcher = BaseballPlayer.restructure(jsonObject.pitcher);
        jsonObject.gameState = AbstractBaseballGameState.restructure(jsonObject.gameState);
        if (jsonObject.onBase[0] != null) jsonObject.onBase[0] = BaseballPlayer.restructure(jsonObject.onBase[0]);
        if (jsonObject.onBase[1] != null) jsonObject.onBase[1] = BaseballPlayer.restructure(jsonObject.onBase[1]);
        if (jsonObject.onBase[2] != null) jsonObject.onBase[2] = BaseballPlayer.restructure(jsonObject.onBase[2]);
        return jsonObject;
    }

    static useAOrAn(nextWord) {
        if ("aeiou".indexOf(nextWord.toLowerCase().charAt(0)) != -1) {
            return "an";
        } else {
            return "a";
        }
    }

    static pitchDescriptions = [
        "mint condition++", "excellent++", "outstanding++", "exceptional++", "superior++", "impressive++",
        "good+", "competent+", "strong+", "reliable+", "admirable+",
        "average", "satisfactory", "adequate", "mediocre", "passable",
        "meh-", "deficient-", "insufficient-", "inadequate-", "weak-",
        "flailing--", "unacceptable--", "unsatisfactory--", "lacking--", "inferior--", "wild--"
    ]

    constructor(awayTeamObject, homeTeamObject) {
        if(awayTeamObject===null) throw new Error("awayTeamObject can not be null");
        if(homeTeamObject===null) throw new Error("homeTeamObject can not be null");
        this.name = awayTeamObject.getNameWithLink() + " @ " + homeTeamObject.getNameWithLink();
        this.hasStarted = false;
        this.done = false;
        this.finalMessage = false;
        this.gameIdNumber = BaseballGame.idCounter++;
        this.homeTeam = homeTeamObject;
        this.awayTeam = awayTeamObject;
        this.pitchNumber = 0;
        this.defenseTeam = this.homeTeam;
        this.offenseTeam = this.awayTeam;
        this.batter = null;
        //this.pitcher = this.homeTeam.getPitcher();
        this.count = {
            balls: 0,
            strikes: 0,
            outs: 0
        }
        this.scoreboard = new BaseballGameBoxScore(awayTeamObject, homeTeamObject);
        this.inning = 0;
        this.isTopOfInning = true;
        this.gameState = new PlayBall();
        this.onBase = [null, null, null];
    }

    addBoxScoreInning(){
        this.scoreboard.addNewInning(this.isTopOfInning, this.inning);
    }

    //advanceBaseRunners(numberToAdvance, isSacrificeFly) {
    //     let result = "";
    //     if (numberToAdvance == null) {
    //         numberToAdvance = 0;
    //     }
    //     if (this.onBase[2] != null && numberToAdvance >= 1) { // THIRD BASE RUNNER SCORES
    //         result += "<br>" + this.onBase[2].getNameWithLink() + " SCORES!";
    //         this.pitcher.setHungerUp()
    //         this.incrementScore();
    //         this.onBase[2].manager.notify(new GameEvent(GameEventType.RUNS_SCORED, this.offenseTeam.leagueIdNumber, this.onBase[2].leagueIdNumber));
    //         this.pitcher.manager.notify(new GameEvent(GameEventType.RUNS_ALLOWED, this.defenseTeam.leagueIdNumber, this.pitcher.leagueIdNumber));
    //         this.onBase[2] = null;
    //         if (isSacrificeFly) {
    //             this.batter.manager.notify(new GameEvent(GameEventType.SACRIFICE_FLIES, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber))
    //         }
    //     }
    //     if (this.onBase[1] != null && numberToAdvance >= 2) { // SECOND BASE RUNNER SCORES
    //         result += "<br>" + this.onBase[1].getNameWithLink() + " SCORES!";
    //         this.incrementScore();
    //         this.onBase[1].manager.notify(new GameEvent(GameEventType.RUNS_SCORED, this.offenseTeam.leagueIdNumber, this.onBase[1].leagueIdNumber));
    //         this.pitcher.manager.notify(new GameEvent(GameEventType.RUNS_ALLOWED, this.defenseTeam.leagueIdNumber, this.pitcher.leagueIdNumber));
    //         this.onBase[1] = null;
    //         if (isSacrificeFly) {
    //             this.batter.manager.notify(new GameEvent(GameEventType.SACRIFICE_FLIES, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber))
    //         }
    //     } else if (this.onBase[1] != null && numberToAdvance == 1) { // SECOND BASE RUNNER advances
    //         this.onBase[1 + numberToAdvance] = this.onBase[1];
    //         this.onBase[1] = null;
    //     }
    //     if (this.onBase[0] != null && numberToAdvance >= 3) { // FIRST BASE RUNNER SCORES
    //         result += "<br>" + this.onBase[0].getNameWithLink() + " SCORES!";
    //         this.incrementScore();
    //         this.onBase[0].manager.notify(new GameEvent(GameEventType.RUNS_SCORED, this.offenseTeam.leagueIdNumber, this.onBase[0].leagueIdNumber));
    //         this.pitcher.manager.notify(new GameEvent(GameEventType.RUNS_ALLOWED, this.defenseTeam.leagueIdNumber, this.pitcher.leagueIdNumber));
    //         this.onBase[0] = null;
    //         if (isSacrificeFly) {
    //             this.batter.manager.notify(new GameEvent(GameEventType.SACRIFICE_FLIES, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber))
    //         }
    //     } else if (this.onBase[0] != null && numberToAdvance >= 1) { // FIRST BASE RUNNER advances
    //         this.onBase[0 + numberToAdvance] = this.onBase[0];
    //         this.onBase[0] = null;

    //     }
    //     return result;
    // }

    // handles 2nd base runner advancing by 1 and 1st base runner advancing by 1 or 2
    getBaseRunnerAdvancesOrScores(baseIndex, numberToAdvance, isSacrificeFly = false){
        if (this.onBase[baseIndex] && (baseIndex + numberToAdvance) >= 3) { // base index 3 would be home base
            return this.getBaseRunnerScores(baseIndex, numberToAdvance, isSacrificeFly)
        }
        // runner does not score
        else if (this.onBase[baseIndex] && numberToAdvance > 0) {
            this.onBase[baseIndex + numberToAdvance] = this.onBase[baseIndex];
            this.onBase[baseIndex] = null;
        }
        return "";
    }

    getBaseRunnerCount(){
        let count = 0
        for(let each of this.onBase){
            if (each != null) count++
        }
        return count;
    }

    getBaseRunnerMovement(numberToAdvance, isSacrificeFly = false){
        numberToAdvance = numberToAdvance || 0;
        let result = "";
        result += this.getBaseRunnerScores(2, numberToAdvance, isSacrificeFly); // Handle third base
        result += this.getBaseRunnerAdvancesOrScores(1, numberToAdvance); // Handle second base
        result += this.getBaseRunnerAdvancesOrScores(0, numberToAdvance); // Handle first base
        return result;
    }

    getBaseRunnerScores(baseIndex, numberToAdvance, isSacrificeFly = false){
        if (this.onBase[baseIndex] && (baseIndex + numberToAdvance) >= 3) { // base index 3 would be home base
            let runner = this.onBase[baseIndex];
            this.incrementScore();
            this.offenseTeam.manager.notify(new GameEvent(GameEventType.RUNS_SCORED, this.offenseTeam.leagueIdNumber, runner.leagueIdNumber));
            this.pitcher.manager.notify(new GameEvent(GameEventType.RUNS_ALLOWED, this.defenseTeam.leagueIdNumber, this.pitcher.leagueIdNumber));
            this.onBase[baseIndex] = null;
            if (isSacrificeFly) {
                this.batter.manager.notify(new GameEvent(GameEventType.SACRIFICE_FLIES, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber))
            }
            // NOTE: it's not necessary to award the batter a plate appearance here because it was already awarded for the flyout
            return `<br>${runner.getFullNameWithLink(20)} SCORES!`;
        }
        return "";
    }

    

    getAtBat(pitchScore) {
        let result = "";

        if (this.batter.isSwingingBat(this.pitchNumber, pitchScore)) {
            // batter swings
            if (this.batter.isContactingBall(this.pitchNumber, pitchScore)) {
                // makes contact
                let hitScore = this.batter.getHitScore(this.pitchNumber, pitchScore);
                // foul, out, hit a single, double, triple, home run
                result += this.getFlyBall(hitScore);
            } else {
                // swinging but doesn't make contact
                this.count.strikes++;
                result += "<br>" + this.batter.getFullNameWithLink(20) + " gets a STRIKE swinging, " + this.count.balls + "-" + this.count.strikes

                if (this.count.strikes >= 3) {
                    this.count.outs++;
                    result += " " + this.batter.getFullNameWithLink(20) + " STRIKES OUT swinging. " + this.getOutsString()
                    this.batter.manager.notify(new GameEvent(GameEventType.STRIKEOUTS_AT_BAT, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber));
                    this.batter.manager.notify(
                        new GameEvent(GameEventType.PLATE_APPEARANCES,this.offenseTeam.leagueIdNumber,this.batter.leagueIdNumber)
                    )
                    this.batter.manager.notify(
                        new GameEvent(GameEventType.AT_BATS,this.offenseTeam.leagueIdNumber,this.batter.leagueIdNumber)
                    )
                    this.pitcher.manager.notify(new GameEvent(GameEventType.STRIKEOUTS_THROWN, this.defenseTeam.leagueIdNumber, this.pitcher.leagueIdNumber));
                    this.setCountToZero();
                    this.gameState.previousState(this);
                }
            }
        } else {
            // batter doesn't swing
            if (pitchScore > 5) {
                this.count.strikes++;
                result += "<br>" + this.batter.getFullNameWithLink(20) + " gets a STRIKE looking, " + this.count.balls + "-" + this.count.strikes

                if (this.count.strikes >= 3) {
                    this.count.outs++
                    result += " " + this.batter.getFullNameWithLink(20) + " STRIKES OUT looking. " + this.getOutsString();
                    this.batter.manager.notify(new GameEvent(GameEventType.STRIKEOUTS_AT_BAT, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber));
                    this.batter.manager.notify(
                        new GameEvent(GameEventType.PLATE_APPEARANCES,this.offenseTeam.leagueIdNumber,this.batter.leagueIdNumber)
                    )
                    this.batter.manager.notify(
                        new GameEvent(GameEventType.AT_BATS,this.offenseTeam.leagueIdNumber,this.batter.leagueIdNumber)
                    )
                    this.pitcher.manager.notify(new GameEvent(GameEventType.STRIKEOUTS_THROWN, this.defenseTeam.leagueIdNumber, this.pitcher.leagueIdNumber));
                    this.setCountToZero()
                    this.gameState.previousState(this);
                }
            } else {
                this.count.balls++;
                result += "<br>" + this.batter.getFullNameWithLink(20) + " is looking. BALL looking, " + this.count.balls + "-" + this.count.strikes
                this.pitcher.setHungerUp()
                if (this.count.balls >= 4) {
                    // BASE ON BALLS
                    this.gameState.previousState(this);
                    result += ". Take your base."
                    this.batter.manager.notify(new GameEvent(GameEventType.BASES_ON_BALLS, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber));
                    this.batter.manager.notify(
                        new GameEvent(GameEventType.PLATE_APPEARANCES,this.offenseTeam.leagueIdNumber,this.batter.leagueIdNumber)
                    )
                    this.pitcher.manager.notify(new GameEvent(GameEventType.WALKS_ALLOWED, this.defenseTeam.leagueIdNumber, this.pitcher.leagueIdNumber));
                    result += this.walkAndAdvanceBaseRunners()
                    this.setCountToZero()
                }
            }
        }
        return result;
    }

    equals(otherObject) {
        return this.gameIdNumber === otherObject.gameIdNumber &&
            this.homeTeam.equals(otherObject.homeTeam) &&
            this.awayTeam.equals(otherObject.awayTeam) &&
            this.jerseyNumber === otherObject.jerseyNumber
    }

    getFlyBall(hitScore) {
        let result = "";
        // 50% of weak hits are foul
        if (hitScore <= 2.5 && Model.rng.random() > 0.5) {
            result += "<br>" + this.batter.getFullNameWithLink(20) + " hits a foul ball"
            if (this.count.strikes < 2) {
                this.count.strikes++;
            }
        } else {

            let defender = this.defenseTeam.getRandomPlayer();
            let defenseScore = defender.getDefenseScore(this.pitchNumber);
            if (defenseScore >= hitScore * 2) {
                result += "<br>" + this.batter.getFullNameWithLink(20) + " hits a ground out to "
                this.count.outs++;
                result += defender.getFullNameWithLink(20) + ". " + this.getOutsString()
                this.batter.manager.notify(
                    new GameEvent(GameEventType.PLATE_APPEARANCES,this.offenseTeam.leagueIdNumber,this.batter.leagueIdNumber)
                )
                this.batter.manager.notify(
                    new GameEvent(GameEventType.AT_BATS,this.offenseTeam.leagueIdNumber,this.batter.leagueIdNumber)
                )
                defender.setHungerDown()
                this.batter.setHungerUp()
                if (this.count.outs < 3) {
                    // possible sacrifice fly
                    result += this.getBaseRunnerMovement(1, true)
                }
            } else if (defenseScore >= hitScore) {
                result += "<br>" + this.batter.getFullNameWithLink(20) + " hits a fly ball. "
                this.count.outs++;
                result += defender.getFullNameWithLink(20) + " makes the catch. " + this.getOutsString()
                this.batter.manager.notify(
                    new GameEvent(GameEventType.PLATE_APPEARANCES,this.offenseTeam.leagueIdNumber,this.batter.leagueIdNumber)
                )
                this.batter.manager.notify(
                    new GameEvent(GameEventType.AT_BATS,this.offenseTeam.leagueIdNumber,this.batter.leagueIdNumber)
                )
                defender.setHungerDown()
                this.batter.setHungerUp()
                if (this.count.outs < 3) {
                    // possible sacrifice fly
                    result += this.getBaseRunnerMovement(1, true)
                }
            } else if (hitScore <= defenseScore * 1.999) {
                result += "<br>" + this.batter.getFullNameWithLink(20) + " hits a SINGLE"
                result += this.getBaseRunnerMovement(1)
                this.onBase[0] = this.batter;
                this.incrementHits()
                this.pitcher.setHungerUp()
                defender.setHungerUp()
                this.batter.setHungerDown()
                this.batter.manager.notify(
                    new GameEvent(GameEventType.SINGLES, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber)
                )
            } else if (hitScore <= defenseScore * 2.999) {
                result += "<br>" + this.batter.getFullNameWithLink(20) + " hits a DOUBLE"
                result += this.getBaseRunnerMovement(2)
                this.onBase[1] = this.batter;
                this.incrementHits()
                this.pitcher.setHungerUp()
                defender.setHungerUp()
                this.batter.setHungerDown()
                this.batter.manager.notify(
                    new GameEvent(GameEventType.DOUBLES, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber)
                )
            } else if (hitScore <= defenseScore * 3.999) {
                result += "<br>" + this.batter.getFullNameWithLink(20) + " hits a TRIPLE"
                result += this.getBaseRunnerMovement(3)
                this.onBase[2] = this.batter;
                this.incrementHits()
                this.pitcher.setHungerUp()
                defender.setHungerUp()
                this.batter.setHungerDown()
                this.batter.manager.notify(
                    new GameEvent(GameEventType.TRIPLES, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber)
                )
            } else {
                switch(this.getBaseRunnerCount()){
                    case 0:
                        result += "<br>" + this.batter.getFullNameWithLink(20) + " hits a HOME RUN!"
                        break
                    case 1:
                        result += "<br>" + this.batter.getFullNameWithLink(20) + " hits a TWO-RUN HOME RUN!"
                        break
                    case 2:
                        result += "<br>" + this.batter.getFullNameWithLink(20) + " hits a THREE-RUN HOME RUN!"
                        break
                    case 3:
                        result += "<br>" + this.batter.getFullNameWithLink(20) + " hits a GRAND SLAM HOME RUN!"
                        break
                }
                this.incrementScore();
                this.incrementHits()
                result += this.getBaseRunnerMovement(4)
                this.pitcher.setHungerUp()
                defender.setHungerUp()
                this.batter.setHungerDown()
                this.batter.manager.notify(
                    new GameEvent(GameEventType.HOME_RUNS, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber)
                )
                this.pitcher.manager.notify(
                    new GameEvent(GameEventType.HOME_RUNS_ALLOWED, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber)
                )
                this.offenseTeam.manager.notify(new GameEvent(GameEventType.RUNS_SCORED, this.offenseTeam.leagueIdNumber, this.batter.leagueIdNumber));
                this.pitcher.manager.notify(new GameEvent(GameEventType.RUNS_ALLOWED, this.defenseTeam.leagueIdNumber, this.pitcher.leagueIdNumber));
            }
            this.gameState.previousState(this);
            this.count.balls = 0;
            this.count.strikes = 0;
        }

        return result;
    }



    setCountToZero() {
        if (this.count.balls >= 4) {
            this.batter.setHungerDown()
            this.pitcher.setHungerUp()
            this.count.strikes = 0;
            this.count.balls = 0;
        }
        if (this.count.strikes >= 3) {
            this.batter.setHungerUp()
            this.pitcher.setHungerDown()
            this.count.strikes = 0;
            this.count.balls = 0;
        }
    }

    getAwayTeamName() {
        return this.awayTeam.getName();
    }

    getBalls() {
        return this.count.balls;
    }

    getBaseIcons() {
        // let result = "<br>"
        let result = "";
        if (this.onBase[2] != null) {
            result += "⬥"
        } else {
            result += "⬦"
        }
        if (this.onBase[1] != null) {
            result += "⬥"
        } else {
            result += "⬦"
        }
        if (this.onBase[0] != null) {
            result += "⬥"
        } else {
            result += "⬦"
        }
        return result;
    }

    getBatterFullName() {
        return this.batter.getFullName(20);
    }

    getBatterName() {
        return this.batter.getName();
    }

    


    getCountString() {
        return "B: " + this.count.balls +
            "<br>S: " + this.count.strikes +
            "<br>O: " + this.count.outs
    }

    getGameDetails(){
        return new BaseballGameMessage(this,"");
    }

    getHomeTeamName() {
        return this.homeTeam.getName();
    }

    getInning() {
        return this.inning;
    }
    getInningString() {
        let result = ""
        if (this.inning == 0) {
            result = "🔜"
        } else if (this.inning != 0 && this.done == false) {
            result = this.inning + "▲ ";
            if (this.offenseTeam.equals(this.homeTeam)) {
                result = this.inning + "▼ "
            }
        } else if (this.inning != 0 && this.finalMessage) {
            result = "FINAL " + this.inning + "▲ ";
            if (this.offenseTeam.equals(this.homeTeam)) {
                result = "FINAL " + this.inning + "▼ "
            }
        }
        return result;
    }

    getLosingTeam() {
        if (this.scoreboard.getHomeScore() < this.scoreboard.getAwayScore()) {
            return this.homeTeam;
        }
        if (this.scoreboard.getHomeScore() > this.scoreboard.getAwayScore()) {
            return this.awayTeam;
        }
        return null;
    }

    getOuts() {
        return this.count.outs;
    }

    getOutsString() {
        if (this.count.outs == 1) {
            return this.count.outs + " OUT!"
        } else if (this.count.outs > 1) {
            return this.count.outs + " OUTS!"
        }
    }

    getPitchDescription(pitchScore) {
        return BaseballGame.pitchDescriptions[Math.floor((BaseballGame.pitchDescriptions.length - 1) - pitchScore * (BaseballGame.pitchDescriptions.length - 1) / 10)];
    }

    getScore() {
        if(!this.hasStarted) return this.awayTeam.getNameWithLink()+" @ "+this.homeTeam.getNameWithLink();
        return this.getInningString()+" "+this.awayTeam.getNameWithLink()+":&nbsp;"+this.scoreboard.getAwayScore()+" "+this.homeTeam.getNameWithLink()+":&nbsp;"+this.scoreboard.getHomeScore();
    }

    getStrikes() {
        return this.count.strikes;
    }

    getWinningTeam() {

        if (this.scoreboard.getHomeScore() > this.scoreboard.getAwayScore() ) {
            return this.homeTeam;
        }
        if (this.scoreboard.getHomeScore() < this.scoreboard.getAwayScore() ) {
            return this.awayTeam;
        }
        return null;
    }

    hasNext() {
        return !this.done;
    }

    incrementHits() {
        this.batter.manager.notify(
            new GameEvent(GameEventType.PLATE_APPEARANCES,this.offenseTeam.leagueIdNumber,this.batter.leagueIdNumber)
        )
        this.batter.manager.notify(
            new GameEvent(GameEventType.AT_BATS,this.offenseTeam.leagueIdNumber,this.batter.leagueIdNumber)
        )
        this.scoreboard.incrementHits(this.isTopOfInning);
    }

    incrementInning() {
        this.inning++;
    }

    incrementScore() {
        this.scoreboard.incrementScore(this.isTopOfInning);
    }

    isGameOver() {
        return this.done;
    }

    next() {
        return new BaseballGameMessage(this, this.gameState.handle(this))
    }

    nextBatter() {
        this.batter = this.offenseTeam.getNextBatter();
        return this.batter;
    }



    nextPitch() {
        this.pitchNumber++;
        let result = "";
        this.pitcher = this.defenseTeam.getPitcher();
        let pitchScore = this.pitcher.getPitchScore(this.pitchNumber);
        result += this.pitcher.getFullNameWithLink(20) + " throws ";
        result += BaseballGame.useAOrAn(this.getPitchDescription(pitchScore));
        result += " " + this.getPitchDescription(pitchScore) + " pitch"
        return result + this.getAtBat(pitchScore);
    }



    setGameState(newState) {
        if (newState instanceof AbstractBaseballGameState && !this.done) {
            this.gameState = newState;
        } else {
            throw new Error("oof bad game state")
        }
    }

    setGameOver() {
        this.done = true;
    }

    setGameStarted() {
        this.hasStarted = true;
    }

    setInningTop(isTop) {
        this.isTopOfInning = isTop === true;
    }

    setOffenseTeam() {
        if (this.isTopOfInning) {
            this.offenseTeam = this.awayTeam;
            this.defenseTeam = this.homeTeam;
        } else {
            this.offenseTeam = this.homeTeam;
            this.defenseTeam = this.awayTeam;
        }
    }
    

    walkAndAdvanceBaseRunners() {
        let result = "";
        // find the first empty base or all base runners advance by 1
        if (this.onBase[0] == null) {
            this.onBase[0] = this.batter;
        } else if (this.onBase[1] == null) {
            this.onBase[1] = this.onBase[0];
            this.onBase[0] = this.batter;
        } else if (this.onBase[2] == null) {
            this.onBase[2] = this.onBase[1];
            this.onBase[1] = this.onBase[0];
            this.onBase[0] = this.batter;
        } else {
            result = this.getBaseRunnerMovement(1);
            this.onBase[0] = this.batter;
        }
        return result;
    }








}