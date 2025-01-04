const CardType = {
    PITCHER:"Pitcher",
    SLUGGER:"Slugger",
    FAV_TEAM:"Fav Team",
    CONCESSIONS:"Concessions",
    JOKER:"Joker",
    LUCKY_JOKER:"Lucky Joker",
    APOCRYPHA:"Apocrypha",
    CELESTIAL:"Celestial",
    POTION:"Potion",
}

const UnlockableCardType = {
    COFFEE_CONCESSIONS:"Coffee Concessions",
    CURSED_HAT:"Cursed Hat",
    CURSED_MONEYMAKER:"Cursed Moneymaker",
    CURSED_SHIRT:"Cursed Shirt",
    CURSED_SHOE:"Cursed Shoe",
    HOT_CONCESSIONS:"Hot Concessions",
    LUCKY_HAT:"Lucky Hat",
    LUCKY_MONEYMAKER:"Lucky Moneymaker",
    LUCKY_SHIRT:"Lucky Shirt",
    LUCKY_SHOE:"Lucky Shoe",
    POTION:"Potion",
    SALTY_CONCESSIONS:"Salty Concessions",
    SWEET_CONCESSIONS:"Sweet Concessions"
}

class TradingCard {

    static restructure(jsonObject){
        switch(jsonObject.cardType){
            case "Pitcher":
                Object.setPrototypeOf(jsonObject, PitcherCard.prototype);
                break
            case "Slugger":
                Object.setPrototypeOf(jsonObject, SluggerCard.prototype);
                break
            case "Fav Team":
                Object.setPrototypeOf(jsonObject, FavTeamCard.prototype);
                break
            case "Concessions":
                Object.setPrototypeOf(jsonObject, ConcessionsCard.prototype);
                break
            case "Joker":
                Object.setPrototypeOf(jsonObject, JokerCard.prototype);
                break
            case "Lucky Joker":
                Object.setPrototypeOf(jsonObject, LuckyJokerCard.prototype);
                break
            case "Apocrypha":
                Object.setPrototypeOf(jsonObject, ConcessionsCard.prototype);
                break
            case "Celestial":
                Object.setPrototypeOf(jsonObject, JokerCard.prototype);
                break
            case "Potion":
                Object.setPrototypeOf(jsonObject, LuckyJokerCard.prototype);
                break
        }
        jsonObject.valuables = Valuables.restructure(jsonObject.valuables);
        return jsonObject;
    }

    static counter = 0;

    

    constructor(cardType, player, colorScheme, cost, rewardAmount = "", valuables = null, eventType = "") {
        this.cardId = TradingCard.counter++;
        this.name = player ? `${player.firstName} ${player.lastName}` : "Unknown Player";
        this.cardType = cardType || "Generic Type";
        this.team = player ? `${player.teamPlaceAbbreviation} ${player.teamMascot}` : "Unknown Team";
        this.leagueIdNumber = player ? player.leagueIdNumber : null;
        this.colorScheme = colorScheme;
        this.gradientrotation = 0;
        this.profilePic = player ? player.profilePic : "🏈";
        this.cost = cost || 0;
        this.sellValue = Math.floor(this.cost * 0.8);
        this.rewardAmount = rewardAmount || "";
        this.valuables = valuables || null;
        this.eventType = eventType || "";

        // Create the web component
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
            cardline4="Click for Player stats"
            cost="${this.cost}"
            colorlight="${this.colorScheme.light}"
            colormid="${this.colorScheme.mid}"
            colordark="${this.colorScheme.dark}"
            gradientrotation="${this.gradientrotation}"
            emoji="${this.profilePic}"
            rewardtype="${this.valuables.getEmoji()}"
            fontcolor="${this.colorScheme.text}"
            fontsize="14px"
            fontfamily="Noto Color Emoji,sans-serif"
        >    
        </trading-card>`.trim();
    }

    equals(otherCard){
        if(this.cardType == "Slugger" || this.cardType == "Fav Team" || this.cardType == "Pitcher"){
            return this.cardType === otherCard.cardType && this.leagueIdNumber === otherCard.leagueIdNumber
        }
        return false
    }

    isAffordable(user){
        return this.cost <= user.valuables.money && user.getCardsCount() < user.maxCards;
    }

    isTriggered(){
        throw new Error("subclasses must implement isTriggered")
    }

    // Method to sync data to the web component
    updateWebComponent() {
        this.container.querySelector("trading-card").setAttribute("name", this.name);
        this.container.querySelector("trading-card").setAttribute("cardline1", `+${this.rewardAmount} ${this.valuables?.getShadedEmoji() || ""} per ${this.eventType}`);
        this.container.querySelector("trading-card").setAttribute("cardline2", this.team);
        this.container.querySelector("trading-card").setAttribute("cardline3", this.cardType);
        this.container.querySelector("trading-card").setAttribute("cardline4", "Click for Player stats");
        this.container.querySelector("trading-card").setAttribute("cost", this.cost.toString());
        this.container.querySelector("trading-card").setAttribute("colorlight", this.colorScheme.light);
        this.container.querySelector("trading-card").setAttribute("colormid", this.colorScheme.mid);
        this.container.querySelector("trading-card").setAttribute("colordark", this.colorScheme.dark);
        this.container.querySelector("trading-card").setAttribute("gradientrotation", this.gradientrotation.toString());
        this.container.querySelector("trading-card").setAttribute("emoji", this.profilePic);
        this.container.querySelector("trading-card").setAttribute("fontcolor", "#FFFFFF");
        this.container.querySelector("trading-card").setAttribute("fontsize", `14px`);
        this.container.querySelector("trading-card").setAttribute("fontfamily", "Noto Color Emoji,sans-serif");
    }

    render() {
        //this.updateWebComponent();
        //return this.container;
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
            cardline4="Click for Player stats"
            cost="${this.cost}"
            colorlight="${this.colorScheme.light}"
            colormid="${this.colorScheme.mid}"
            colordark="${this.colorScheme.dark}"
            gradientrotation="${this.gradientrotation}"
            emoji="${this.profilePic}"
            rewardtype="${this.valuables.getEmoji()}"
            fontcolor="${this.colorScheme.text}"
            fontsize="14px"
            fontfamily="Noto Color Emoji,sans-serif"
        >    
        </trading-card>`.trim();

        return container;
    }

    // Update data and sync with the web component
    updateData(data) {
        Object.assign(this, data);
        this.updateWebComponent();
    }
}
