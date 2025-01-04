class BottomOfTheInning extends AbstractBaseballGameState{
    constructor(){
        super();
    this.name = "BottomOfTheInning";
    }
    handle(baseballGame){
        baseballGame.count = {
            balls: 0,
            strikes: 0,
            outs: 0
        }
        baseballGame.onBase = [null, null, null];
        this.nextState(baseballGame)
        return this.setupBottomInning(baseballGame)
    }

    nextState(baseballGame){
        baseballGame.setGameState(new HomePlayerStepsUpToBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }

    setupBottomInning(baseballGame) {
        baseballGame.setInningTop(false);
        baseballGame.setOffenseTeam();
        baseballGame.setCountToZero()
        baseballGame.addBoxScoreInning();
        // away team is pitching
        baseballGame.awayTeam.pitcher.manager.notify(
            new GameEvent(GameEventType.INNINGS_PITCHED,baseballGame.awayTeam.leagueIdNumber,baseballGame.awayTeam.pitcher.leagueIdNumber)
        )
        return "Bottom of inning " + baseballGame.getInning() + ', ' +
        baseballGame.offenseTeam.getNameWithLink(20) + " batting.";
    }
}