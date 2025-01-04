// const WorldStates = {
//     SETUP: 0,
//     MORNING: 1,
//     AFTERNOON: 2,
//     EVENING:3,
//     NIGHT: 4
// }



class World{

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, World.prototype);
        jsonObject.league = League.restructure(jsonObject.league);
        jsonObject.newsTicker = NewsTicker.restructure(jsonObject.newsTicker)
        jsonObject.shop = Shop.restructure(jsonObject.shop);
        jsonObject.newsNetwork = newsNetwork.restructure(jsonObject.newsNetwork);
        return jsonObject;
    }

    constructor(year){
        this.year = year;
        this.day = 0;
        this.league = new League(24, this.year);
        this.newsTicker = new NewsTicker();
        // news tickers subscribes to teams so it can display winning teams
        for(let each of this.league.teams){
            this.newsTicker.teamNames[each.leagueIdNumber] = each.getName();
            each.manager.subscribe(this.newsTicker.handleEvent);
        }
        this.shop = new Shop();
        //this.shop.addCards(this.league.getTeamsPlayingToday(this.year,this.day),this.day)
        
        
        this.newsNetwork = new BroadcastNews();
    }

    



    getGameDetails(){
        return this.league.getGameDetails(this.year,this.day);
    }

    getSchedule() {
        return this.league.getSchedule();
    }

    getStandingsTableBatters(limit) {
        return this.league.getStandingsTableBatters(limit);
    }

    getStandingsTablePitchers(limit) {
        return this.league.getStandingsTablePitchers(limit);
    }

    getStandingsTableTeams() {
        return this.league.getStandingsTableTeams();
    }

    getStandingsTableTeamScoring(limit) {
        return this.league.getStandingsTableTeamScoring(limit);
    }

    getTime(){
        return "Year "+this.model.world.league.currentSeason+" Day "+this.model.world.league.seasons[this.model.world.league.currentSeason].currentDay;
    }

    isTodayDone(year, day) {
        if(year == null) throw new Error("null year")
        if(day == null) throw new Error("null day")
        return this.league.isTodayDone(year, day);
    }

    nextGameMessages(year, day){
        if(year == null) throw new Error("null year")
        if(day == null) throw new Error("null day")
        return this.league.nextGameMessages(year, day);
    }

    

    

    reloadTeams() {
        this.league.reloadTeams(this.year, this.day);
    }
    

    
}