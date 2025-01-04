class PitcherCard extends TradingCard {

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, PitcherCard.prototype);
        return jsonObject;
    }

    static generateCards(teamsPlayingTodayArray, dayNumber) {
        const result = [];
        for (let eachTeam of teamsPlayingTodayArray) {
            result.push(
                new PitcherCard(
                    CardType.PITCHER,
                    eachTeam.getPitcher(),
                    10,
                    3,
                    new Valuables({ "redMagic": 3 }),
                    GameEventType.STRIKEOUTS_THROWN
                )
            );
        }
        return result;
    }

    static getCardType() {
        return CardType.PITCHER;
    }

    constructor(cardType, player, cost, rewardAmount, valuables, eventType) {
        super(cardType, player, player.colorScheme, cost, rewardAmount, valuables, eventType);

        this.name = player.firstName + " " + player.lastName;
        this.team = player.teamPlaceAbbreviation + " " + player.teamMascot;
        this.leagueIdNumber = player.leagueIdNumber;
        this.colorScheme = {light:player.colorScheme.light,mid:player.colorScheme.mid,dark:player.colorScheme.dark,text:"#FFFFFF"};
        this.profilePic = player.profilePic;
        this.gradientrotation = 0.6;
        this.rewardAmount = rewardAmount;
        this.valuables = valuables;
        
        this.eventString = "strikeout thrown";
        this.pastTenseEventString = "threw a strikeout!";
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

    // Method to update the web component with the current card data
    updateWebComponent() {
        super.updateWebComponent(); // Ensure base attributes are set
        this.container.querySelector("trading-card").setAttribute("name", this.name);
        this.container.querySelector("trading-card").setAttribute("cardline1", `+${this.rewardAmount} ${this.valuables?.getShadedEmoji() || ""} per ${this.eventString}`);
        this.container.querySelector("trading-card").setAttribute("cardline2", this.team);
        this.container.querySelector("trading-card").setAttribute("cardline3", this.cardType);
        this.container.querySelector("trading-card").setAttribute("cardline4", "Click for Player stats");
        this.container.querySelector("trading-card").setAttribute("cost", this.cost.toString());
        this.container.querySelector("trading-card").setAttribute("colorlight", this.colorScheme.light);
        this.container.querySelector("trading-card").setAttribute("colormid", this.colorScheme.mid);
        this.container.querySelector("trading-card").setAttribute("colordark", this.colorScheme.dark);
        this.container.querySelector("trading-card").setAttribute("gradientrotation", this.gradientrotation.toString());
        this.container.querySelector("trading-card").setAttribute("emoji", this.profilePic);
        this.container.querySelector("trading-card").setAttribute("fontsize", "13px");
        this.container.querySelector("trading-card").setAttribute("fontfamily", "Noto Color Emoji,sans-serif");
        this.container.querySelector("trading-card").setAttribute("onclick", `app.view.statsModal.update(${this.leagueIdNumber});`);
        this.container.querySelector("trading-card").setAttribute("data-bs-target", "#statsModal");
        this.container.querySelector("trading-card").setAttribute("data-bs-toggle", "modal");
    }

    // This approach is necessary so that one card can trigger other cards
    addRewardToUser(user) {
        user.valuables.add(this.valuables);
        //console.log(this.name)
        // trigger any jokers
        user.handleEvent(new GameEvent(GameEventType.PITCHER_CARD_TRIGGERED)); // trigger user's jokers
    }

    isTriggered(gameEvent) {
        if(gameEvent.eventType === this.eventType && gameEvent.playerId === this.leagueIdNumber ){
            View.addAlert(
                "success",
                `+${this.rewardAmount} ${this.valuables.getShadedEmoji()} <small> ${this.name} ${this.pastTenseEventString}</small>`,
                true
            )
        }
        return gameEvent.playerId === this.leagueIdNumber && gameEvent.eventType === this.eventType;
    }
}
