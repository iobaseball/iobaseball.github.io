// A league has multiple Seasons
// A Season is a finite state machine that progresses thru preseason, regular season, and playoff tournament
// A Season has 1 FreeAgentRelease, 1 DraftCeremony, 1 RegularSeason, and 1 PlayoffTournament
// A Season has lists of the Season's top pitchers and the Season's top hitters/sluggers


const SeasonStates = {
    PRESEASON: 0,
    REGULAR_SEASON: 1,
    PLAYOFF_TOURNAMENT: 2,
    POSTSEASON: 3
}

class Season {

    static idCounter = 0;

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, Season.prototype);
        for (let i = 0; i < jsonObject.teams.length; i++) {
            jsonObject.teams[i] = BaseballTeam.restructure(jsonObject.teams[i]);
        }
        jsonObject.regularSeasonSchedule = RegularSeasonSchedule.restructure(jsonObject.regularSeasonSchedule)

        return jsonObject;
    }



    constructor(teamArray) {
        this.seasonIdNumber = Season.idCounter++;
        this.hasStarted = false;
        this.done = false;
        this.state = SeasonStates.REGULAR_SEASON;
        this.numberOfTeams = teamArray.length

        this.regularSeasonSchedule = new RegularSeasonSchedule(teamArray);
        this.playoffSchedulechedule = null;

        this.teams = teamArray

        this.regularSeasonScheduleComplete = false;
        this.playoffScheduleComplete = false;

    }



    doRegularSeason() {
        // check if all of today's games are over
    }



    // doWeek() {
    //   console.log("\nWeek " + (this.currentWeek))
    //   let weeksInSchedule = this.days.length
    //   //# if this.currentWeek % this.numberOfTeams == 0 && this.currentDay == 0:
    //   //#   this.setSchedule()
    //   //for i in range(this.days[this.currentWeek%(weeksInSchedule)].length){
    //   for (let i = 0; i < this.days[this.currentWeek % (weeksInSchedule)].length; i++) {
    //     this.doGame()
    //   }
    //   //# console.log("Week "+str(this.currentWeek)+" Standings")
    //   //# this.getStandings()
    // }

    getGameDetails(day) {
        if (day == null) throw new Error("null day")
        if (this.state === SeasonStates.REGULAR_SEASON) {
            return this.regularSeasonSchedule.getGameDetails(day)
        }
    }

    getStandings() {
        let result = ""
        let count = 1
        let myArray = [];
        for (let key in this.standings) {
            myArray.push({
                teamName: key,
                wins: this.standings[key].wins,
                losses: this.standings[key].losses
            })
        }
        //# Reverse/Descending Sort
        //let tempList = sorted(this.standings.items(),key = lambda x: x[1]["wins"],reverse = true)
        myArray.sort(function (a, b) {
            return b.wins - a.wins
        })
        //# find max field width
        let fieldWidth = 0
        for (let eachTeam of myArray) {
            fieldWidth = Math.max(fieldWidth, eachTeam.getName().length + 1)
        }
        //# build result string
        //for each in tempList:
        for (let each of myArray) {
            //result += "{rank:>2}. ".format(rank = count)
            result += count + ". "
            //result += ("{name:<" + (fieldWidth) + "}").format(name = each[0] + ":")
            result += each.getName() + ": "
            // result += "{score:>4}".format(
            //   score = (each[1]["wins"])) + "-" + (
            //   each[1]["losses"]) + "\n"
            result += each.wins + "-" + each.losses + "\n"
            count += 1
        }
        //console.log(result)
    }

    getTodaysGames(day) {
        if (day == null) throw new Error("null day")
        if (this.state == SeasonStates.REGULAR_SEASON) {
            return this.regularSeasonSchedule.days[day]
        }
        else if (this.playoffSchedule != null && this.state == SeasonStates.PLAYOFF_TOURNAMENT) {
            return this.playoffSchedule.days[day]
        }
    }



    doPlayoffs(messageLevel = 0) {
        let temp, today, winTeam;
        let awayTeam;
        let homeTeam;
        if (this.playoffSchedulechedule == null) {
            this.daysPlayoffWeekOne()
        }
        //console.log("Playoff Week " + (this.currentPlayoffWeek) + " Day " + (this.currentPlayoffDay))
        today = this.playoffSchedulechedule[this.currentPlayoffWeek][this.currentPlayoffDay]
        if (today[0]["rank"] < today[1]["rank"]) {
            awayTeam = today[1]
            homeTeam = today[0]
        } else {
            awayTeam = today[0]
            homeTeam = today[1]
        }
        //console.log("#" + (awayTeam["rank"]) + " " + awayTeam["team"].getName() + " at #" + (homeTeam["rank"]) + " " + homeTeam["team"].getName())
        temp = new Game(awayTeam["team"], homeTeam["team"])
        temp.generate(messageLevel)
        //console.log(this.getPlayoffScore(awayTeam, homeTeam, temp))
        //# add win to standings
        this.standings[temp.winningTeam.getName()]["wins"] += 1
        this.standings[temp.losingTeam.getName()]["losses"] += 1
        if (temp.winningTeam == homeTeam["team"]) {
            winTeam = homeTeam
        } else {
            winTeam = awayTeam
        }
        //# if not final round
        if (this.currentPlayoffWeek < this.playoffSchedulechedule.length - 1) {
            //# add to next week's schedule
            this.playoffSchedulechedule[this.currentPlayoffWeek + 1][Math.floor(this.currentPlayoffDay / 2)].push(winTeam)
            //console.log(this.getPlayoffBracket())
            //# increase day/week
            this.currentPlayoffDay += 1
            //# if day >= number of games this week
            if (this.currentPlayoffDay >= this.playoffSchedulechedule[this.currentPlayoffWeek].length) {
                this.currentPlayoffWeek += 1
                this.currentPlayoffDay = 0
            }
        } else {
            //# this WAS the final round
            //console.log("* * * PLAYOFF CHAMPS: " + winTeam["team"].getFullName() + " * * *")
            this.playoffScheduleComplete = true
        }
    }



    // getQBRanking(limit = 0) {
    //   let resultString = ""
    //   let result = []
    //   let count;
    //   //for each in this.teams:
    //   for (let each of this.teams) {
    //     result.push({
    //       name: each.qb.teamName + " " + each.qb.firstName + " " + each.qb.lastName,
    //       rating: each.qb.stats.getPasserRating()
    //     })
    //   }
    //   //result = dict(sorted(result.items(), key = lambda item: item[1], reverse = true))
    //   result.sort(function(a, b) {
    //     return b.rating - a.rating
    //   })
    //   count = 1
    //   if (limit < 1) {
    //     limit = this.teams.length
    //   }
    //   resultString += ("Quarterback Ranking\n")
    //   for (let each of result) {
    //     resultString += ("  " + (count) + ". " + each.name + ": " + (Math.round(each.rating * 100) / 100) + "\n")
    //     count += 1
    //     if (count > limit) {
    //       break
    //     }
    //     //#console.log(result)

    //   }
    //   return resultString
    // }




    // getTopQB() {
    //   let result = []
    //   //for each in this.teams:
    //   for (let each of this.teams) {
    //     result.push({
    //       rating: each.qb.stats.getPasserRating(),
    //       object: each.qb
    //     })
    //   }
    //   result.sort(function(a, b) {
    //     return b.rating - a.rating
    //   })
    //   return result[0].object
    // }

    // getMVPRanking(limit = 3) {
    //   let resultString = ""
    //   let result = []
    //   let count = 1;
    //   //for eachTeam in this.teams:
    //   for (let eachTeam of this.teams) {
    //     //for eachPlayer in eachTeam.players:
    //     for (let eachPlayer of eachTeam.players) {
    //       result.push({
    //         name: eachPlayer.teamName + " " + eachPlayer.firstName + " " + eachPlayer.lastName,
    //         rating: eachPlayer.stats.getMVPRating()
    //       })
    //     }
    //   }
    //   //console.log(result)
    //   //result = dict(sorted(result.items(), key = lambda item: item[1], reverse = true))
    //   result.sort(function(a, b) {
    //     return b.rating - a.rating
    //   })
    //   //console.log(result)
    //   if (limit < 1) {
    //     limit = this.teams.length
    //   }
    //   resultString += ("MVP Ranking\n")
    //   for (let each of result) {
    //     resultString += ("  " + (count) + ". " + each.name + ": " + (Math.round(each.rating * 100) / 100) + "\n")
    //     count += 1
    //     if (count > limit) {
    //       break
    //     }

    //   }
    //   return resultString
    // }

    isRegularSeasonDone(day) {
        
        if (day == null) throw new Error("null day")
        if (this.state == SeasonStates.REGULAR_SEASON) {
            // console.log("isTodayDone = "+this.regularSeasonSchedule.isTodayDone(day))
            // console.log(day)
            // console.log(this.regularSeasonSchedule.days.length)
            // return this.regularSeasonSchedule.isTodayDone(day) && day >= this.regularSeasonSchedule.days.length - 1;
            return day >= this.regularSeasonSchedule.days.length - 1;
        }
        return false

    }

    isTodayDone(day) {
        if (day == null) throw new Error("null day")
        if (this.state == SeasonStates.REGULAR_SEASON) {
            return this.regularSeasonSchedule.isTodayDone(day)
        }
        else if (this.playoffSchedule != null && this.state == SeasonStates.PLAYOFF_TOURNAMENT) {
            return this.playoffSchedule.isTodayDone(day)
        }

    }

    next() {
        switch (this.state) {
            case SeasonStates.PRESEASON:
                break
            case SeasonStates.REGULAR_SEASON:
                break
            case SeasonStates.PLAYOFF_TOURNAMENT:
                break
        }
    }

    nextGameMessages(day) {
        if (day == null) throw new Error("null day")
        if (this.state === SeasonStates.REGULAR_SEASON) {
            return this.regularSeasonSchedule.nextGameMessages(day)
        }
    }
}