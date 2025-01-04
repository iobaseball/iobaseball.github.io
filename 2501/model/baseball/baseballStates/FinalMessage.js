class FinalMessage extends AbstractBaseballGameState{
    constructor(){
        super();
    this.name = "FinalMessage";
    }
    handle(baseballGame){
        baseballGame.finalMessage = true;
        this.nextState(baseballGame)
        baseballGame.getWinningTeam().manager.notify(
            new GameEvent(GameEventType.GAME_WINNER,baseballGame.getWinningTeam().leagueIdNumber)
        )
        baseballGame.getLosingTeam().manager.notify(
            new GameEvent(GameEventType.GAME_LOSER,baseballGame.getLosingTeam().leagueIdNumber)
        )
        return baseballGame.getWinningTeam().getNameWithLink(20)+" defeated "+baseballGame.getLosingTeam().getNameWithLink(20)
        
    }

    nextState(baseballGame){
        baseballGame.setGameState(new EndOfGame());
    }

    previousState(baseballGame){
        throw new Error("Cannot move back to previous state");
    }


}