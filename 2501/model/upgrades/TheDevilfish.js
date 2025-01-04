

class TheDevilfish extends Upgrade {

    static generateCards(teamsPlayingTodayArray, dayNumber){
        return new TheDevilfish();
    }

    // static moneyToMagicRatio = 7;
    // static basePrice = 4;
    // static exponentPrice = 0;
    //static plusOneHandSizePrice(){ return TheOccultHand.plusOneHandSizeBasePrice + Math.pow(2, TheOccultHand.plusOneHandSizeExponentPrice) }



    constructor(){
        super();
        this.name = "The Devilfish";
        this.cost = Upgrade.prices[this.name].basePrice + Math.pow(2, Upgrade.prices[this.name].exponent)
        this.blueMagicBoost = this.cost * Upgrade.prices[this.name].moneyToMagicRatio;
    }

    addUpgradeToUser(user) {
        if(user.valuables.money >= this.cost){
            user.valuables.money -= this.cost;
            const oldBlueMagic = user.valuables.blueMagic;
            user.valuables.blueMagic += this.blueMagicBoost;
            user.manager.notify(user)
            View.addAlert("purple",`
                +${this.blueMagicBoost}<span class='noto'>💧</span> Blue Magic<br>
                ${oldBlueMagic}<span class='noto'>💧</span> &rarr; ${user.valuables.blueMagic}<span class='noto'>💧</span>
                `,false);
            Upgrade.prices[this.name].exponent++;
            Upgrade.prices[this.name].moneyToMagicRatio++;
        }
    }


    render(){
        const element = View.createElement("div",null,"col");
        element.innerHTML = `
            <upgrade-card
                name="The Devilfish"
                image="devilfish.png"
                cardline1="Persuasion, Evasion, Liquidation"
                cardline2="+${this.blueMagicBoost}<span class='noto'>💧</span> Blue Magic"
                cardline3="In Gods Ye Trust"
                cardline4="Numbers Go Up"
                cost="-${this.cost}"
                height="140"
                width="140"
            ></upgrade-card>
        `
        return element
    }

    

}