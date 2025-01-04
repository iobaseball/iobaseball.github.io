class BaseballGameMessage {

  static restructure(jsonObject) {
    Object.setPrototypeOf(jsonObject, BaseballGameMessage.prototype);
    return jsonObject;
  }

  constructor(game, log) {
    this.name = game.name;
    this.inning = game.getInningString();
    this.homeTeam = game.homeTeam.getName();
    this.homeTeamPlace = game.homeTeam.place;
    this.homeNameWithLink = game.homeTeam.getNameWithLink();
    this.homeId = game.homeTeam.leagueIdNumber;
    this.awayTeam = game.awayTeam.getName();
    this.awayNameWithLink = game.awayTeam.getNameWithLink();
    this.awayId = game.awayTeam.leagueIdNumber;
    this.score = structuredClone({
      away: game.scoreboard.getAwayScore(),
      home: game.scoreboard.getHomeScore(),
    });
    this.scoreString = game.getScore();
    this.baseIcons = game.getBaseIcons();
    this.count = structuredClone(game.count);
    this.boxScoreTable = game.scoreboard.getBoxScoreTable();
    this.done = game.done;
    this.log = "";
    if (log != null) {
      this.log += log;
    }
  }

  add(otherObject) {
    // This is never used???
    if (typeof otherObject === "string") {
      this.log.append(otherObject);
    } else if (BaseballGameMessage.prototype.isPrototypeOf(otherObject)) {
      this.log += otherObject.log;
    }
  }

  // render() {
  //   // this was a workaround that fixes an issue in which team Crests do not render gradients 
  //   // properly when the same GameMessage is displayed twice (on the Live Page and a Single Game Page)
  //   return new String(
  //     this.log.replace(/gradient/g, "gradient" + Math.random())
  //   );
  // }

  setGameState(game) {
    this.name = game.name;
    this.inning = game.getInningString();
    this.homeTeam = game.homeTeam.getName();
    this.homeTeamPlace = game.homeTeam.place;
    this.homeNameWithLink = game.homeTeam.getNameWithLink();
    this.homeId = game.homeTeam.leagueIdNumber;
    this.awayTeam = game.awayTeam.getName();
    this.awayNameWithLink = game.awayTeam.getNameWithLink();
    this.awayId = game.awayTeam.leagueIdNumber;
    this.score = structuredClone({
      away: game.scoreboard.getAwayScore(),
      home: game.scoreboard.getHomeScore(),
    });
    this.scoreString = game.getScore();
    this.baseIcons = game.getBaseIcons();
    this.count = structuredClone(game.count);
    this.boxScoreTable = game.scoreboard.getBoxScoreTable();
    this.done = game.done;
  }
}
