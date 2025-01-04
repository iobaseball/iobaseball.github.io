

class TheFlightlessFowl extends Upgrade {

    static generateCards(teamsPlayingTodayArray, dayNumber){
        //if(dayNumber % 3 == 2){
            return new TheFlightlessFowl();
        //}else{
            //return null;
        //}
        
    }

    //static moneyToMagicRatio = 3;
    // static basePrice = 9;
    // static exponentPrice = 2;
    //static plusOneHandSizePrice(){ return TheOccultHand.plusOneHandSizeBasePrice + Math.pow(2, TheOccultHand.plusOneHandSizeExponentPrice) }



    constructor(){
        super();
        this.name = "The Flightless Fowl";
        this.cost = Upgrade.prices[this.name].base + Math.pow(2, Upgrade.prices[this.name].exponent)
    }

    addUpgradeToUser(user) {
        if(user.valuables.money >= this.cost){
            user.valuables.money -= this.cost;
            const oldLevel = user.level;
            user.level -= 2;
            user.manager.notify(user)
            View.addAlert("purple",`
                -2<span class='noto'>🚀</span> Levels<br>
                ${oldLevel}<span class='noto'>🚀</span> &rarr; ${user.level}<span class='noto'>🚀</span>
                `,false);
            Upgrade.prices[this.name].exponent++;
        }
    }


    render(){
        const element = View.createElement("div",null,"col");
        element.innerHTML = `
            <upgrade-card
                name="The Flightless Fowl"
                image="dodo.png"
                cardline1="Slothfulness, Deviation, Self-Limitation"
                cardline2="Retreat -2<span class='noto'>🚀</span> Levels"
                cardline3="Embrace Thy Extinction"
                cardline4="Numbers Go Down"
                cost="-${this.cost}"
                height="130"
                width="125"
            ></upgrade-card>
        `
        return element
    }

    

}