//
// A PlayoffSchedule has teams
// A PlayoffSchedule needs to know the RegularSeason standings, but doesn't alter the standings
// A PlayoffSchedule has a bracket 
// A PlayoffSchedule has a schedule that is a 3D array. Days > Games > Teams


class PlayoffSchedule  extends AbstractSchedule {
     ////# static methods
    //@staticmethod
    static recursive2DArrayPlayoffSort(myArray) {
        let result = []
        if (myArray.length == 1) {
          //# split into pairs
          //for i in range(myArray[0].length){
          for (let i = 0; i < myArray[0].length; i++) {
            if (i % 2 == 0) {
              result.push([])
            }
            result[Math.floor(i / 2)].push(myArray[0][i])
          }
          return result
        } else {
          //for i in range(Math.floor(myArray.length/2)){
          for (let i = 0; i < Math.floor(myArray.length / 2); i++) {
            result.push([])
            //for each in myArray[i]:
            for (let each of myArray[i]) {
              result[i].push(each)
            }
            //for each2 in myArray[-1-i]:
            for (let each2 of myArray[myArray.length - 1 - i]) {
              result[i].push(each2)
            }
          }
          return Season.recursive2DArrayPlayoffSort(result)
        }
      }

      static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, PlayoffSchedule.prototype);
        for (let i = 0; i < jsonObject.schedule.length; i++) {
          for (let j = 0; j < jsonObject.schedule[i].length; j++) {
            jsonObject.schedule[i][j] = Object.setPrototypeOf(jsonObject.schedule[i][j], Game.prototype);
          }
        }
        return jsonObject;
      }


    constructor(teams, regularSeasonStandings){
      super(teams);
      this.standings = regularSeasonStandings;
    }

    getPlayoffScore(awayTeam, homeTeam, playoffGame) {
        let fieldWidth = Math.max(playoffGame.away.getName().length,
          playoffGame.home.getName().length) + 1
        let awayScore = playoffGame.getAwayScore()
        let homeScore = playoffGame.getHomeScore()
        let result = "\n"
        //result += "{rank:>2}. ".format(rank = awayTeam["rank"])
        result += awayTeam.rank + ". "
        //result += ("{name:<" + (fieldWidth) +
        //  "}").format(name = playoffGame.away.getName() + ":")
        result += playoffGame.away.getName() + ": "
        //result += "{score:>3}".format(score = (awayScore)) + "\n"
        result += awayScore + "\n"
        //result += "{rank:>2}. ".format(rank = homeTeam["rank"])
        result += homeTeam.rank + ". "
        //result += ("{name:<" + (fieldWidth) +
        //  "}").format(name = playoffGame.home.getName() + ":")
        result += playoffGame.home.getName() + ": "
        //result += "{score:>3}".format(score = (homeScore))
        result += homeScore + "\n"
        return result
      }
    
    
      getPlayoffBracket() {
        let bracket, tempGame, tempTeam;
        if (this.playoffSchedule == null) {
          return
        }
        //# find max field width
        let fieldWidth = 0
        for (let eachTeam of this.teams) {
          fieldWidth = Math.max(fieldWidth, eachTeam.getName().length + 5)
        }
        //#result = "PLAYOFF BRACKET:\n"
        bracket = {}
        bracket["totalRows"] = this.playoffSchedule[0].length * 2
        bracket["totalCols"] = this.playoffSchedule.length
        bracket["text"] = []
        //for i in range(bracket["totalRows"]){
        for (let i = 0; i < bracket["totalRows"]; i++) {
          bracket["text"].push([])
          //for j in range(bracket["totalCols"]){
          for (let j = 0; j < bracket["totalCols"]; j++) {
            bracket["text"][i].push("")
          }
        }
        //for row in range(this.playoffSchedule[0].length*2){
        for (let row = 0; row < this.playoffSchedule[0].length * 2; row++) {
          //for col in range(this.playoffSchedule.length){
          for (let col = 0; col < this.playoffSchedule.length; col++) {
            let result = ""
            if (Math.floor(row / 2) >= this.playoffSchedule[col].length || this.playoffSchedule[col][Math.floor(row / 2)].length <= 0) {
              continue
            }
            tempGame = this.playoffSchedule[col][Math.floor(row / 2)]
            if (tempGame.length < 2 && row % 2 == 1) {
              continue
            }
            tempTeam = tempGame[row % 2]
            //result += "{rank:>2}. ".format(rank = tempTeam["rank"])
            result += tempTeam["rank"] + ". "
            //result += ("{name:<" + (fieldWidth) + "}").format(name = tempTeam["team"].getName() + "")
            result += tempTeam["team"].getName()
            //# put result in bracket object
            bracket["text"][row + col * 2][col] = result
          }
        }
        //# build the output string
        let output = "\nPLAYOFF BRACKET:\n"
        //console.log("FieldWidth=" + fieldWidth)
        //for i in range(bracket["totalRows"]){
        for (let i = 0; i < bracket["totalRows"]; i++) {
          if (i % 2 == 0) {
            //# add space between matchups
            output += "\n"
          }
          //for j in range(bracket["totalCols"]){
          for (let j = 0; j < bracket["totalCols"]; j++) {
            output += bracket["text"][i][j]
            //console.log("length=" + bracket["text"][i][j].length)
            for (let k = 0; k < fieldWidth - bracket["text"][i][j].length; k++) {
              output += " "
            }
          }
          output += "\n"
        }
        return output
      }

      

      schedulePlayoffWeekOne() {
        //# generate empty playoff game array
        this.playoffSchedule = [];
        let gameCounter = 1;
        let teamArray = [];
        //# repeat for teamsInLeague / 2 -1 weeks
        while (gameCounter <= Math.floor(this.numberOfTeams / 2)) {
          //# insert new week at index 0
          this.playoffSchedule.splice(0, 0, [])
          //# insert gameCounter games this week
          //for i in range(gameCounter){
          for (let i = 0; i < gameCounter; i++) {
            this.playoffSchedule[0].splice(0, 0, [])
          }
          gameCounter = gameCounter * 2
        }
        let numberOfPlayoffTeams = gameCounter;
        for (let key in this.standings) {
          teamArray.push({
            teamName: key,
            wins: this.standings[key].wins,
            losses: this.standings[key].losses
          })
        }
        //# Reverse/Descending Sort
        //sortedList = sorted(this.standings.items(),key = lambda x: x[1]["wins"],reverse = true)
        teamArray.sort(function(a, b) {
          return b.wins - a.wins
        })
        //# find top numberOfPlayoffTeams/2 teams
        let week = 0;
        let day = 0;
        //for i in range(Math.floor(numberOfPlayoffTeams / 2)){
        for (let i = 0; i < Math.floor(numberOfPlayoffTeams / 2); i++) {
          //for each in this.teams:
          for (let each of this.teams) {
            if (each.getName() == teamArray[i].getName()) {
              this.playoffSchedule[week][day].splice(0, 0, {
                "rank": i + 1,
                "team": each
              })
              day += 1
              break
            }
          }
        }
        //# starting with last day of playoff week
        day = Math.floor(numberOfPlayoffTeams / 2) - 1
        //# find next numberOfPlayoffTeams/2 teams
        let startIndex = Math.floor(numberOfPlayoffTeams / 2)
        //for i in range(startIndex,startIndex + Math.floor(numberOfPlayoffTeams/2)){
        for (let i = startIndex; i < startIndex + Math.floor(numberOfPlayoffTeams / 2); i++) {
          //for each in this.teams:
          for (let each of this.teams) {
            if (each.getName() == teamArray[i].getName()) {
              this.playoffSchedule[week][day].splice(0, 0, {
                "rank": i + 1,
                "team": each
              })
              day -= 1
              break
            }
          }
        }
        //# sort into playoff order
        let week1 = this.playoffSchedule[0];
        this.playoffSchedule[0] = Season.recursive2DArrayPlayoffSort(week1);
      }

}