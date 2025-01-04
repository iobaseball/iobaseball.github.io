class TopOfTheInning extends AbstractBaseballGameState{

    constructor(){
        super();
        this.name = "TopOfTheInning";
    }
    


    handle(baseballGame){
        baseballGame.count = {
            balls: 0,
            strikes: 0,
            outs: 0
        }
        baseballGame.onBase = [null, null, null];
        this.nextState(baseballGame);
        return this.setupTopInning(baseballGame)
    }

    nextState(baseballGame){
        baseballGame.setGameState(new AwayPlayerStepsUpToBat());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }

    setupTopInning(baseballGame) {
        baseballGame.setInningTop(true);
        baseballGame.setOffenseTeam();
        baseballGame.setCountToZero();
        baseballGame.incrementInning();
        baseballGame.addBoxScoreInning();
        // home team is pitching
        baseballGame.homeTeam.pitcher.manager.notify(
            new GameEvent(GameEventType.INNINGS_PITCHED,baseballGame.homeTeam.leagueIdNumber,baseballGame.homeTeam.pitcher.leagueIdNumber)
        )

        // return "Top of inning " + baseballGame.getInning() + ', <a href="#" class="link link-light link-underline-opacity-25 link-underline-opacity-100-hover" onclick="app.view.statsModal.update('+baseballGame.awayTeam.leagueIdNumber+');" data-bs-target="#statsModal" data-bs-toggle="modal" >'+
        // baseballGame.getAwayTeamName() + "</a> batting.";
        return "Top of inning " + baseballGame.getInning() + ', ' +
        baseballGame.offenseTeam.getNameWithLink(20) + " batting.";
    }
}