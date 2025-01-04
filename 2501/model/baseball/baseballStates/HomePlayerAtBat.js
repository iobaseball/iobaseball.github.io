class HomePlayerAtBat extends AbstractBaseballGameState {
    constructor(){
        super();
    this.name = "HomePlayerAtBat"
    }

    handle(baseballGame) {
        let result = baseballGame.nextPitch();
        if (baseballGame.getOuts() >= 3) {
            this.nextState(baseballGame);
        } else if (baseballGame.getStrikes() >= 3) {
            this.previousState(baseballGame)
            this.setCountToZero();
        } else if (baseballGame.getBalls() >= 4) {
            this.previousState(baseballGame)
            this.setCountToZero();
        }
        // check if game is over
        if (baseballGame.getOuts() >= 3 && baseballGame.getInning() >= 9 && baseballGame.scoreboard.getHomeScore() != baseballGame.scoreboard.getAwayScore()) {
            baseballGame.setGameState(new FinalMessage());
        }
        return result
    }

    nextState(baseballGame) {
        baseballGame.setGameState(new InningIsNowAnOuting());
    }

    previousState(baseballGame) {
        baseballGame.setGameState(new HomePlayerStepsUpToBat());
    }
}