//from Player import Player

class FreeAgentRelease{
    constructor(teams,freeAgentList){
      this.teams = teams
      this.freeAgentList = freeAgentList
      this.sessionState = 0
      this.sessionMessages = []
      this.doReleases()
    }
  
    getNext(){
      let result = this.sessionMessages[this.sessionState]
      this.sessionState += 1
      return result
    }
  
    isFreeAgentReleaseOver(){
      return this.sessionState >= this.sessionMessages.length
    }
  
    doReleases(){
      this.sessionMessages.push("Free Agent Release\n")
      //for eachTeam in this.teams:
      for(let eachTeam of this.teams){
        let winRatio = eachTeam.getWinRatio()
        if (winRatio < 0.5){
          let worstPlayer = eachTeam.players[eachTeam.players.length-1]
          this.sessionMessages.push(eachTeam.getName() + " only won "+str(round(winRatio*100))+"% of their games this season and will release "+worstPlayer.getName()+" as a free agent.\n\n")
          //# level up
          worstPlayer.dailyXp = Player.xpBetweenLevels
          if (worstPlayer.isLevelUp()){
            this.sessionMessages.push(worstPlayer.setLevelUp())
            worstPlayer.updateXp()
            worstPlayer.resetDailyXp()
          }
          //# add player to freeAgentList
          this.freeAgentList.push(worstPlayer)
          eachTeam.removePlayer(worstPlayer)
          //# remove player from old team
          this.sessionMessages.push(""+eachTeam.place+" -"+worstPlayer.getName()+": "+str(worstPlayer.getRating())+"\n")
        }
      }
    }
  }
  