class PlayBall extends AbstractBaseballGameState{
    constructor(){
        super();
    this.name = "PlayBall";
    }

    handle(baseballGame){
        baseballGame.defenseTeam = baseballGame.homeTeam;
        baseballGame.offenseTeam = baseballGame.awayTeam;
        baseballGame.homeTeam.batterUpNumber = 0;
        baseballGame.awayTeam.batterUpNumber = 0;
        baseballGame.pitcher = baseballGame.defenseTeam.getPitcher();
        this.nextState(baseballGame);
        baseballGame.setGameStarted();
        return "PLAY BALL!";
    }

    nextState(baseballGame){
        baseballGame.setGameState(new TopOfTheInning());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }
}