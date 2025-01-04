//from Player import Player
//from Name import Name

class DraftCeremony {
    constructor(teams, freeAgentList) {
      this.teams = teams
      this.freeAgentList = freeAgentList
      this.draftPlayerList = []
      this.sessionState = 0
      this.sessionMessages = []
    }
  
  
    getNext() {
      let result = this.sessionMessages[this.sessionState]
      this.sessionState += 1
      return result
    }
  
    isDraftCeremonyOver() {
      return this.sessionState >= this.sessionMessages.length
    }
  
    generateDraftPlayers() {
      ////# generate twice as many players as teams, so there can be two rounds of draft picks
      //for i in range(len(this.teams)*2){
      for (let i = 0; i < this.teams.length * 3; i++) {
        let temp1 = new BaseballPlayer();
        let temp2 = new BaseballPlayer();
        if (temp1.getGrade() > temp2.getGrade()) {
          this.draftPlayerList.push(temp1)
        } else {
          this.draftPlayerList.push(temp2)
        }
      }
      //# sort from lowest grade to highest grade
      //this.draftPlayerList.sort(key=lambda x: x.getGrade(), reverse=False)
      this.draftPlayerList.sort(function(a, b) {
        return a.getGrade() - b.getGrade()
      })
    }
  
  
    doDraft() {
      this.sessionMessages.push("Draft Ceremony\n")
      this.generateDraftPlayers()
      //# sort teams by win ratio (includes playoff games) from highest ratio to lowest ratio
      //this.teams.sort(key=lambda x: x.getWinRatio(), reverse=True)
      this.teams.sort(function(a, b) {
        return b.getWinRatio() - a.getWinRatio()
      })
      //# Round One
      this.sessionMessages.push("Round One\n")
      this.doSingleRoundOfDraft()
  
      this.sessionMessages.push("Round Two\n")
      //# add the free agents to the draft player list
      //while len(this.freeAgentList) > 0:
      while (this.freeAgentList.length > 0) {
        this.draftPlayerList.push(this.freeAgentList.pop())
      }
      //# sort from lowest grade to highest grade
      //this.draftPlayerList.sort(key=lambda x: x.getGrade(), reverse=False)
      this.draftPlayerList.sort(function(a, b) {
        return a.getGrade() - b.getGrade()
      })
      //# begin round two
      this.doSingleRoundOfDraft()
      //# add any remaining draft players to the free agent list
      //while len(this.draftPlayerList) > 0:
      while (this.draftPlayerList.length > 0) {
        this.draftPlayerList.pop()
        //# quietly give them a level up
        temp.dailyXp = Player.xpBetweenLevels
        if (temp.isLevelUp()) {
          temp.setLevelUp()
          temp.updateXp()
          temp.resetDailyXp()
        }
        this.freeAgentList.push(temp)
      }
    }
  
    doSingleRoundOfDraft() {
      //# reverse for loop
      //for i in range(len(this.teams)-1,0,-1){
      for (let i = this.teams.length - 1; i >= 0; i--) {
        let eachTeam = this.teams[i]
        //# get the highest graded player from index -1
        let newPlayer = this.draftPlayerList.pop()
        eachTeam.addPlayer(newPlayer)
        if (newPlayer.stats.gamesPlayed > 0) {
          this.sessionMessages.push(eachTeam.getName() + " sign free agent " + newPlayer.getName() + "")
        } else {
          this.sessionMessages.push(eachTeam.getName() + " sign " + newPlayer.getName() + " from " + Name.getCollege() + "")
        }
        //# level up
        newPlayer.dailyXp = Player.xpBetweenLevels
        if (newPlayer.isLevelUp()) {
          this.sessionMessages.push(newPlayer.setLevelUp())
          newPlayer.updateXp()
          newPlayer.resetDailyXp()
        }
        //# + stuff
        this.sessionMessages.push(eachTeam.place + " +" + newPlayer.getName() + ": " + str(newPlayer.getRating()) + "\n")
      }
    }
  }