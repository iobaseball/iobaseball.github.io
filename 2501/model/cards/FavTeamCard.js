class FavTeamCard extends TradingCard {

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, FavTeamCard.prototype);
        return jsonObject;
    }

    static generateCards(teamsPlayingTodayArray, dayNumber) {
        const result = [];
        for (let eachTeam of teamsPlayingTodayArray) {
            result.push(
                new FavTeamCard(
                    CardType.FAV_TEAM,
                    eachTeam,
                    4,
                    8,
                    new Valuables({ "greenMagic": 8}),
                    GameEventType.RUNS_SCORED
                )
            );
        }
        return result;
    }

    static getCardType() {
        return CardType.FAV_TEAM;
    }

    constructor(cardType, team, cost, rewardAmount, valuables, eventType) {
        super(cardType, null, team.colorScheme, cost, rewardAmount, valuables, eventType);
        
        this.name = team.place.name + " " + team.mascot;
        this.cardType = CardType.FAV_TEAM;
        this.team = team.place.abbreviation.toUpperCase() + " " + team.mascot;
        this.leagueIdNumber = team.leagueIdNumber;
        this.colorScheme = {light:team.colorScheme.light,mid:team.colorScheme.mid,dark:team.colorScheme.dark,text:"#FFFFFF"};
        this.profilePic = team.place.abbreviation.toUpperCase();
        this.gradientrotation = 0.1;
        this.eventString = "run scored";
        this.pastTenseEventString = "scored a run!";

        this.container = View.createElement("span");
        this.container.innerHTML = `
        <trading-card 
            onclick="app.view.statsModal.update(${this.leagueIdNumber});" 
            data-bs-target="#statsModal" 
            data-bs-toggle="modal"
            name="${this.name}"
            cardline1="+${this.rewardAmount} ${this.valuables.getShadedEmoji()} per ${this.eventString}"
            cardline2="${this.team}"
            cardline3="${this.cardType}"
            cardline4="Click for Team stats"
            cost="${this.cost}"
            colorlight="${this.colorScheme.light}"
            colormid="${this.colorScheme.mid}"
            colordark="${this.colorScheme.dark}"
            emoji="${this.profilePic}"
            fontsize="${(18/this.profilePic.length+3)+'px'}"
            fontfamily="monospace">
        </trading-card>`.trim();
        this.updateWebComponent()
    }

    // Method to update the web component with the current card data
    updateWebComponent = () => {
        super.updateWebComponent(); // Ensure base attributes are set
        this.container.querySelector("trading-card").setAttribute("name", this.name);
        this.container.querySelector("trading-card").setAttribute("cardline1", `+${this.rewardAmount} ${this.valuables?.getShadedEmoji() || ""} per ${this.eventString}`);
        this.container.querySelector("trading-card").setAttribute("cardline2", this.team);
        this.container.querySelector("trading-card").setAttribute("cardline3", this.cardType);
        this.container.querySelector("trading-card").setAttribute("cardline4", "Click for Team stats");
        this.container.querySelector("trading-card").setAttribute("cost", this.cost.toString());
        this.container.querySelector("trading-card").setAttribute("colorlight", this.colorScheme.light);
        this.container.querySelector("trading-card").setAttribute("colormid", this.colorScheme.mid);
        this.container.querySelector("trading-card").setAttribute("colordark", this.colorScheme.dark);
        this.container.querySelector("trading-card").setAttribute("emoji", this.profilePic);
        this.container.querySelector("trading-card").setAttribute("fontsize", (18 / this.profilePic.length + 3) + "px");
        this.container.querySelector("trading-card").setAttribute("fontfamily", "monospace");
        this.container.querySelector("trading-card").setAttribute("gradientrotation", this.gradientrotation.toString());
        this.container.querySelector("trading-card").setAttribute("onclick", `app.view.statsModal.update(${this.leagueIdNumber});`);
        this.container.querySelector("trading-card").setAttribute("data-bs-target", "#statsModal");
        this.container.querySelector("trading-card").setAttribute("data-bs-toggle", "modal");
    }

    // this approach is necessary so that one card can trigger other cards
    addRewardToUser(user) {
        user.valuables.add(this.valuables);
        // loop through other cards and see if any jokers are triggered
                // trigger any jokers
                user.handleEvent(new GameEvent(GameEventType.FAV_TEAM_CARD_TRIGGERED)); // trigger user's jokers
    }

    isTriggered(gameEvent) {
        if (gameEvent.teamId === this.leagueIdNumber && gameEvent.eventType === this.eventType) {
            
                View.addAlert(
                    "success",
                    `+${this.rewardAmount} ${this.valuables.getShadedEmoji()} <small> ${this.name} ${this.pastTenseEventString}</small>`,
                    true
                )
            
            return true;
        }
        return false;
    }

    render(){
        const container = View.createElement("span");
        container.innerHTML = `
        <trading-card 
            onclick="app.view.statsModal.update(${this.leagueIdNumber});" 
            data-bs-target="#statsModal" 
            data-bs-toggle="modal"
            name="${this.name}"
            cardline1="+${this.rewardAmount} ${this.valuables.getShadedEmoji()} per ${this.eventString}"
            cardline2="${this.team}"
            cardline3="${this.cardType}"
            cardline4="Click for Team stats"
            cost="${this.cost}"
            colorlight="${this.colorScheme.light}"
            colormid="${this.colorScheme.mid}"
            colordark="${this.colorScheme.dark}"
            emoji="${this.profilePic}"
            fontsize="${(18/this.profilePic.length+3)+'px'}"
            fontfamily="monospace">
        </trading-card>`.trim();
        return container
    }
}
