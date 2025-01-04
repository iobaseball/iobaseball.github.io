

class TheOccultHand extends Upgrade {

    static generateCards(teamsPlayingTodayArray, dayNumber){
        return new TheOccultHand();
    }

    // static basePrice = 10;
    // static exponentPrice = 0;




    constructor(){
        super();
        this.name = "The Occult Hand";
        this.cost = Upgrade.prices[this.name].base + Math.pow(2, Upgrade.prices[this.name].exponent)
    }

    addUpgradeToUser(user) {
        if(user.valuables.money >= this.cost){
            user.valuables.money -= this.cost;
            const oldMax = user.maxCards;
            user.maxCards++;
            user.manager.notify(user)
            View.addAlert("purple",`
                As If Moved by an Occult Hand, Maximum Cards Increased!<br>
                ${oldMax} <span class='noto'>🃏</span> &rarr; ${user.maxCards} <span class='noto'>🃏</span>
                `,false);
            Upgrade.prices[this.name].exponent++;
        }
    }


    render(){
        const element = View.createElement("div",null,"col");    
        element.innerHTML = `
            <upgrade-card
                name="The Occult Hand"
                image="skeletonHand.png"
                cardline1="Greed, Aspiration, Mystic Manipulation"
                cardline2="Hold More <span class='noto'>🃏</span> Cards"
                cardline3="Hand Over Thy Money"
                cardline4="Cards Go Up"
                cost="-${this.cost}"
                height="150"
                width="100"
            ></upgrade-card>
        `
        return element
    }

    

}