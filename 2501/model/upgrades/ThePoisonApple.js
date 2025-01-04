

class ThePoisonApple extends Upgrade {

    static generateCards(teamsPlayingTodayArray, dayNumber){
        return new ThePoisonApple();
    }

    // static moneyToMagicRatio = 7;
    // static basePrice = 4;
    // static exponentPrice = 0;
    //static plusOneHandSizePrice(){ return TheOccultHand.plusOneHandSizeBasePrice + Math.pow(2, TheOccultHand.plusOneHandSizeExponentPrice) }



    constructor(){
        super();
        this.name = "The Poison Apple";
        this.cost = Upgrade.prices[this.name].base + Math.pow(2, Upgrade.prices[this.name].exponent)
        this.greenMagicBoost = this.cost * Upgrade.prices[this.name].moneyToMagicRatio;
    }

    addUpgradeToUser(user) {
        if(user.valuables.money >= this.cost){
            user.valuables.money -= this.cost;
            const oldMagic = user.valuables.greenMagic;
            user.valuables.greenMagic += this.greenMagicBoost;
            user.manager.notify(user)
            View.addAlert("purple",`
                +${this.greenMagicBoost}<span class='noto'>🌵</span> Green Magic<br>
                ${oldMagic}<span class='noto'>🌵</span> &rarr; ${user.valuables.greenMagic}<span class='noto'>🌵</span>
                `,false);
            Upgrade.prices[this.name].exponent++;
            Upgrade.prices[this.name].moneyToMagicRatio++;
        }
    }


    render(){
        const element = View.createElement("div",null,"col");
        element.innerHTML = `
            <upgrade-card
                name="The Poison Apple"
                image="poisonApple.png"
                cardline1="Temptation, Corruption, Destruction"
                cardline2="+${this.greenMagicBoost}<span class='noto'>🌵</span> Green Magic"
                cardline3="Poisons Thee Well"
                cardline4="Numbers Go Up"
                cost="-${this.cost}"
                height="160"
                width="145"
            ></upgrade-card>
        `
        return element
    }

    

}