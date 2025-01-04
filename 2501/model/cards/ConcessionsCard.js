
    // 🌭  🍕  🍿  🥨  ☕  🧋 🥖  🍩  🍨   🍰

    class ConcessionsCard extends TradingCard {

        static restructure(jsonObject) {
            Object.setPrototypeOf(jsonObject, ConcessionsCard.prototype);
            return jsonObject;
        }

    static getCardType() {
        return CardType.CONCESSIONS;
    }

    constructor(name, cost, rewardAmount, valuables, reduction, profilePic, verb, colorScheme) {
        super(CardType.CONCESSIONS, null, colorScheme, cost, rewardAmount, valuables, GameEventType.END_OF_DAY);
        this.reduction = reduction;
        this.name = name;
        this.rewardAmount2 = rewardAmount - reduction;
        this.team = null;
        this.leagueIdNumber = -2;
        this.colorScheme = colorScheme;
        this.profilePic = profilePic;
        this.eventString = "when " + verb;
        this.pastTenseEventString = "was " + verb + "!";

        this.container = View.createElement("span");
        this.container.innerHTML = `
        <trading-card 
            onclick="app.view.statsModal.setText(this);" 
            data-bs-target="#statsModal" 
            data-bs-toggle="modal"
            name="${this.name}"
            cardline1="+${this.rewardAmount} ${this.valuables.getShadedEmoji()} ${this.eventString}"
            cardline2="at end of day"
            cardline3="${this.rewardAmount} &rarr; ${this.rewardAmount2}"
            cardline4="${this.cardType}"
            cost="${this.cost}"
            colorlight="${this.colorScheme.light}"
            colormid="${this.colorScheme.mid}"
            colordark="${this.colorScheme.dark}"
            emoji="${this.profilePic}"
            rewardamount="${this.rewardAmount}"
            rewardamount2="${this.rewardAmount2}"
            rewardtype="${this.valuables.getEmoji()}"
            fontcolor="#000000"
            fontsize="14px"
            fontfamily="Noto Color Emoji,sans-serif"
            >
        </trading-card>`.trim();
        }

    // Method to update the web component with the current card data
    updateWebComponent() {
        //super.updateWebComponent(); // Ensure base attributes are set
        this.container = View.createElement("span");
        this.container.innerHTML = `
        <trading-card 
            onclick="app.view.statsModal.setText(this);" 
            data-bs-target="#statsModal" 
            data-bs-toggle="modal"
            name="${this.name}"
            cardline1="+${this.rewardAmount} ${this.valuables.getShadedEmoji()} ${this.eventString}"
            cardline2="at end of day"
            cardline3="${this.rewardAmount} &rarr; ${this.rewardAmount2}"
            cardline4="Concessions"
            cost="${this.cost}"
            colorlight="${this.colorScheme.light}"
            colormid="${this.colorScheme.mid}"
            colordark="${this.colorScheme.dark}"
            emoji="${this.profilePic}"
            rewardamount="${this.rewardAmount}"
            rewardamount2="${this.rewardAmount2}"
            rewardtype="${this.valuables.getEmoji()}"
            fontcolor="#000000"
            fontsize="14px"
            fontfamily="Noto Color Emoji,sans-serif"
            >
        </trading-card>`.trim();
    }

    // This approach is necessary so that one card can trigger other cards
    addRewardToUser(user) {
        user.valuables.add({...this.valuables}); // create a copy of valuable because they're about to change
        setTimeout(()=>{
            this.reduceValuables()
        },100);
        // loop through other cards and see if any jokers are triggered
    }

    isTriggered(gameEvent) {
        if(gameEvent.eventType === this.eventType){
            View.addAlert(
                "success",
                `+${this.rewardAmount} ${this.valuables.getShadedEmoji()} <small> ${this.name} ${this.pastTenseEventString}</small>`,
                true
            )
        }
        return gameEvent.eventType === this.eventType;
    }

    reduceValuables() {
        this.rewardAmount -= this.reduction;
        this.rewardAmount2 -= this.reduction;
        // loop through each of this.valuables and reduce the value
        for (let eachKey of Object.keys(this.valuables)) {
            if (this.valuables[eachKey] !== 0) {
                this.valuables[eachKey] -= this.reduction;
            }
        }
        // Update the web component with the new reward amounts
        this.updateWebComponent();
    }

    render(){
        const container = View.createElement("span");
        container.innerHTML = `
        <trading-card 
            onclick="app.view.statsModal.setText(this);" 
            data-bs-target="#statsModal" 
            data-bs-toggle="modal"
            name="${this.name}"
            cardline1="+${this.rewardAmount} ${this.valuables.getShadedEmoji()} ${this.eventString}"
            cardline2="at end of day"
            cardline3="${this.rewardAmount} &rarr; ${this.rewardAmount2}"
            cardline4="${this.cardType}"
            cost="${this.cost}"
            colorlight="${this.colorScheme.light}"
            colormid="${this.colorScheme.mid}"
            colordark="${this.colorScheme.dark}"
            emoji="${this.profilePic}"
            rewardamount="${this.rewardAmount}"
            rewardamount2="${this.rewardAmount2}"
            rewardtype="${this.valuables.getEmoji()}"
            fontcolor="#000000"
            fontsize="14px"
            fontfamily="Noto Color Emoji,sans-serif"
            >
        </trading-card>`.trim();
        return container;
    }
}
