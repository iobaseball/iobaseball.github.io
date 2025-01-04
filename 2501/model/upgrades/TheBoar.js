

class TheBoar extends Upgrade {

    static generateCards(teamsPlayingTodayArray, dayNumber){
        return new TheBoar();
    }



    //static plusOneHandSizePrice(){ return TheOccultHand.plusOneHandSizeBasePrice + Math.pow(2, TheOccultHand.plusOneHandSizeExponentPrice) }



    constructor(){
        super();
        this.name = "The Boar";
        this.cost = Upgrade.prices[this.name].exponent * 2 + Upgrade.prices[this.name].base;
        this.reward = Math.min(Math.pow(2, Upgrade.prices[this.name].exponent), 30); // max reward 30
        
    }

    addUpgradeToUser(user) {
        if(user.valuables.money >= this.cost){
            const money1 = user.valuables.money;
            user.valuables.money -= this.cost;
            const money2 = user.valuables.money;
            user.valuables.money += this.reward;
            user.manager.notify(user)
            View.addAlert("purple",`
                -${this.cost}<span class="noto">🪙</span> Money, +${this.reward}<span class="noto">🪙</span> Money<br>
                ${money1}<span class="noto">🪙</span> &rarr; ${money2}<span class="noto">🪙</span> &rarr; ${user.valuables.money}<span class="noto">🪙</span>
                `,false);
            Upgrade.prices[this.name].exponent++;
        }
    }


    render(){
        const element = View.createElement("div",null,"col");
        element.innerHTML = `
            <upgrade-card
                name="The Boar"
                image="boar.png"
                cardline1="Defiance, Persistence, Feral Resistance"
                cardline2="Spend ${this.cost}<span class='noto'>🪙</span>, Earn ${this.reward}<span class='noto'>🪙</span>"
                cardline3="Cast Thy Pearls Before Swine"
                cardline4="Boarish Capitalism"
                cost="-${this.cost}"
                height="145"
                width="145"
            ></upgrade-card>
        `
        return element
    }

    

}