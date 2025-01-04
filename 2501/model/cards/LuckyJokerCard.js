
class LuckyJokerCard extends JokerCard {

    static luckyReward = 4;
    static cursedReward = 7;
    

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, LuckyJokerCard.prototype);
        return jsonObject;
    }

    static getCardType() {
        return CardType.LUCKY_JOKER;
    }

    constructor(name, cost, rewardAmount, valuables, colorScheme, profilePic, otherCard, triggeredByEvent, pastTenseVerb,odds) {
        super(name, cost, rewardAmount, valuables, colorScheme, profilePic, otherCard, triggeredByEvent, pastTenseVerb);
        this.odds = odds;
        this.eventString = `${this.otherCard} Cards have 1 in ${this.odds} `;
        this.pastTenseEventString = pastTenseVerb + "!";
        this.cardType = CardType.LUCKY_JOKER
        this.container = View.createElement("span");
        this.container.innerHTML = `
        <trading-card 
            onclick="app.view.statsModal.setText(this);" 
            data-bs-target="#statsModal" 
            data-bs-toggle="modal"
            name="${this.name}"
            cardline1="${this.eventString}"
            cardline2="chance to give +${this.rewardAmount} <span class='noto'>${this.valuables.getShadedEmoji()}</span>"
            cardline3="when triggered"
            cardline4="${this.cardType}"
            cost="${this.cost}"
            colorlight="${this.colorScheme.light}"
            colormid="${this.colorScheme.mid}"
            colordark="${this.colorScheme.dark}"
            emoji="${this.profilePic}"
            gradientRotation="1"
            rewardamount="${this.rewardAmount}"
            rewardtype="${this.valuables.getShadedEmoji()}"
            fontcolor="${this.colorScheme.text}"
            fontsize="14px"
            fontfamily="Noto Color Emoji,sans-serif"
            odds="1 in ${this.odds}"
            othercard="${this.otherCard}"
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
            cardline1="${this.eventString}"
            cardline2="chance to give +${this.rewardAmount} <span class='noto'>${this.valuables.getShadedEmoji()}</span>"
            cardline3="when triggered"
            cardline4="${this.cardType}"
            cost="${this.cost}"
            colorlight="${this.colorScheme.light}"
            colormid="${this.colorScheme.mid}"
            colordark="${this.colorScheme.dark}"
            emoji="${this.profilePic}"
            gradientRotation="1"
            rewardamount="${this.rewardAmount}"
            rewardtype="${this.valuables.getShadedEmoji()}"
            fontcolor="${this.colorScheme.text}"
            fontsize="14px"
            fontfamily="Noto Color Emoji,sans-serif"
            odds="1 in ${this.odds}"
            othercard="${this.otherCard}"
            >
        </trading-card>`.trim();
        // this.container.querySelector("trading-card").setAttribute("name", this.name);
        // this.container.querySelector("trading-card").setAttribute("cardline1", `+${this.rewardAmount} ${this.valuables.getShadedEmoji()} ${this.eventString}`);
        // this.container.querySelector("trading-card").setAttribute("cardline2", "at end of day");
        // this.container.querySelector("trading-card").setAttribute("cardline3", `${this.rewardAmount} &rarr; ${this.rewardAmount2}`);
        // this.container.querySelector("trading-card").setAttribute("cardline4", "Concessions");
        // this.container.querySelector("trading-card").setAttribute("cost", this.cost.toString());
        // this.container.querySelector("trading-card").setAttribute("colorlight", this.colorScheme.light);
        // this.container.querySelector("trading-card").setAttribute("colormid", this.colorScheme.mid);
        // this.container.querySelector("trading-card").setAttribute("colordark", this.colorScheme.dark);
        // this.container.querySelector("trading-card").setAttribute("emoji", this.profilePic);
        // this.container.querySelector("trading-card").setAttribute("rewardamount", this.rewardAmount.toString());
        // this.container.querySelector("trading-card").setAttribute("rewardamount2", this.rewardAmount2.toString());
        // this.container.querySelector("trading-card").setAttribute("rewardtype", this.valuables.getEmoji());
        // this.container.querySelector("trading-card").setAttribute("fontcolor", "#000000");
        // this.container.querySelector("trading-card").setAttribute("fontsize", "14px");
        // this.container.querySelector("trading-card").setAttribute("fontfamily", "Noto Color Emoji,sans-serif");
        // this.container.querySelector("trading-card").setAttribute("onclick", "app.view.statsModal.setText(this);");
        // this.container.querySelector("trading-card").setAttribute("data-bs-target", "#statsModal");
        // this.container.querySelector("trading-card").setAttribute("data-bs-toggle", "modal");
    }

    // This approach is necessary so that one card can trigger other cards
    addRewardToUser(user) {
        user.valuables.add(this.valuables);
    }

    isTriggered(gameEvent) {
        if(Model.rng.random()*this.odds < 1){
            if(gameEvent.eventType === this.eventType){
                View.addAlert(
                    "success",
                    `+${this.rewardAmount} ${this.valuables.getShadedEmoji()} <small> ${this.name} ${this.pastTenseEventString}</small>`,
                    true
                )
            }
            return gameEvent.eventType === this.eventType;
        }
    }

    render(){
        const container = View.createElement("span");
        container.innerHTML = `
        <trading-card 
            onclick="app.view.statsModal.setText(this);" 
            data-bs-target="#statsModal" 
            data-bs-toggle="modal"
            name="${this.name}"
            cardline1="${this.eventString}"
            cardline2="chance to give +${this.rewardAmount} <span class='noto'>${this.valuables.getShadedEmoji()}</span>"
            cardline3="when triggered"
            cardline4="${this.cardType}"
            cost="${this.cost}"
            colorlight="${this.colorScheme.light}"
            colormid="${this.colorScheme.mid}"
            colordark="${this.colorScheme.dark}"
            emoji="${this.profilePic}"
            gradientRotation="1"
            rewardamount="${this.rewardAmount}"
            rewardtype="${this.valuables.getShadedEmoji()}"
            fontcolor="${this.colorScheme.text}"
            fontsize="14px"
            fontfamily="Noto Color Emoji,sans-serif"
            odds="1 in ${this.odds}"
            othercard="${this.otherCard}"
            >
        </trading-card>`.trim();
        return container
    }


}
