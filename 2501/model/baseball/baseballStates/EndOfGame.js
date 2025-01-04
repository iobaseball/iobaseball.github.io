class EndOfGame extends AbstractBaseballGameState{
    constructor(){
        super();
    this.name = "EndOfGame";
    }
    handle(baseballGame){
        baseballGame.count = {
            balls: 0,
            strikes: 0,
            outs: 0
        }
        baseballGame.onBase = [null, null, null];
        baseballGame.setGameOver();
        baseballGame.homeTeam.batterUpNumber = 0;
        baseballGame.awayTeam.batterUpNumber = 0;
        return baseballGame.getWinningTeam().getNameWithLink(20)+" defeated "+baseballGame.getLosingTeam().getNameWithLink(20)
        
    }

    nextState(baseballGame){
        throw new Error("Cannot move to next state");
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }


}