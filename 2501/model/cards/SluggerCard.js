class SluggerCard extends TradingCard {

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, SluggerCard.prototype);
        return jsonObject;
    }

    static generateCards(teamsPlayingTodayArray, dayNumber) {
        //console.log(teamsPlayingTodayArray)
        const result = [];
        for (let eachTeam of teamsPlayingTodayArray) {
            result.push(
                new SluggerCard(
                    CardType.SLUGGER,
                    eachTeam.getSlugger(),
                    2,
                    10,
                    new Valuables({ "blueMagic": 10 }),
                    GameEventType.HITS
                )
            );
        }
        return result;
    }

    static getCardType() {
        return CardType.SLUGGER;
    }

    constructor(cardType, player, cost, rewardAmount, valuables, eventType) {
        super(cardType, player, player.colorScheme, cost, rewardAmount, valuables, eventType);

        // Overwrite specific properties
        this.name = `${player.firstName} ${player.lastName}`;
        this.team = `${player.teamPlaceAbbreviation} ${player.teamMascot}`;
        this.leagueIdNumber = player.leagueIdNumber;
        this.colorScheme = {light:player.colorScheme.light,mid:player.colorScheme.mid,dark:player.colorScheme.dark,text:"#FFFFFF"};
        this.profilePic = player.profilePic;
        this.gradientrotation = 0.4;
        this.eventString = "hit";
        this.pastTenseEventString = "got a hit!";
        this.container = View.createElement("span");
        this.container.innerHTML = `
        <trading-card 
            onclick="app.view.statsModal.update(${this.leagueIdNumber});" 
            data-bs-target="#statsModal" 
            data-bs-toggle="modal"
            name="${this.name}"
            cardLine1="+${this.rewardAmount} ${this.valuables.getEmoji()} per ${this.eventString}"
            cardLine2="${this.team}"
            cardLine3="${this.cardType}"
            cardLine4="Click for Player stats"
            cost="${this.cost}"
            colorlight="${this.colorScheme.light}"
            colormid="${this.colorScheme.mid}"
            colordark="${this.colorScheme.dark}"
            gradientRotation="${this.gradientrotation}"
            emoji="${this.profilePic}"
            fontcolor="#FFFFFF"
            fontsize="13px"
            fontfamily="Noto Color Emoji,sans-serif"
        </trading-card>`.trim();
        this.updateWebComponent()
    }

    // Override the updateWebComponent method if necessary
    updateWebComponent() {
        super.updateWebComponent(); // Ensure base attributes are set
        this.container.querySelector("trading-card").setAttribute("cardline1", `+${this.rewardAmount} ${this.valuables?.getShadedEmoji() || ""} per ${this.eventString}`);
        this.container.querySelector("trading-card").setAttribute("cardline2", this.team);
        this.container.querySelector("trading-card").setAttribute("gradientrotation", this.gradientrotation.toString());
        this.container.querySelector("trading-card").setAttribute("cardline2", this.team);
        this.container.querySelector("trading-card").setAttribute("onclick", `app.view.statsModal.update(${this.leagueIdNumber});`);
        this.container.querySelector("trading-card").setAttribute("data-bs-target", "#statsModal");
        this.container.querySelector("trading-card").setAttribute("data-bs-toggle", "modal");
    }

    // Override/add additional methods as necessary
    addRewardToUser(user) {
        user.valuables.add(this.valuables);
        // trigger any jokers
        user.handleEvent(new GameEvent(GameEventType.SLUGGER_CARD_TRIGGERED)); // trigger user's jokers
    }

    isTriggered(gameEvent) {
        if(
            gameEvent.playerId === this.leagueIdNumber &&
            this.eventType === GameEventType.HITS &&
            (gameEvent.eventType === GameEventType.SINGLES ||
                gameEvent.eventType === GameEventType.DOUBLES ||
                gameEvent.eventType === GameEventType.TRIPLES ||
                gameEvent.eventType === GameEventType.HOME_RUNS)
        ){
            
                View.addAlert(
                    "success",
                    `+${this.rewardAmount} ${this.valuables.getShadedEmoji()} <small> ${this.name} ${this.pastTenseEventString}</small>`,
                    true
                )
            return true;
        }
        return false;
    }
}
