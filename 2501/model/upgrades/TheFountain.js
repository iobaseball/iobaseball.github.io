

class TheFountain extends Upgrade {

    static generateCards(teamsPlayingTodayArray, dayNumber){
        //if(dayNumber % 3 == 2){
            return new TheFountain();
        //}else{
            //return null;
        //}
        
    }

    //static moneyToMagicRatio = 3;
    // static basePrice = 0;
    // static exponentPrice = 1;
    //static plusOneHandSizePrice(){ return TheOccultHand.plusOneHandSizeBasePrice + Math.pow(2, TheOccultHand.plusOneHandSizeExponentPrice) }



    constructor(){
        super();
        this.name = "The Fountain";
        this.cost = Upgrade.prices[this.name].exponent;
    }

    addUpgradeToUser(user) {
        if(user.valuables.money >= this.cost){
            const oldMoney = user.valuables.money;
            user.valuables.money -= this.cost;
            if(this.cost % 3 == 0){
                const oldLevel = user.valuables.lives;
                user.valuables.lives++;
                
                View.addAlert("purple",`
                    +1<span class="noto">🩸</span> Life<br>
                    ${oldLevel}<span class='noto'>🩸</span> &rarr; ${user.valuables.lives}<span class='noto'>🩸</span>
                    `,false);
            } else {
                View.addAlert("purple",`
                    -${this.cost}<span class="noto">🪙</span> Money<br>
                    ${oldMoney}<span class="noto">🪙</span> &rarr; ${user.valuables.money}<span class="noto">🪙</span>
                    `,true);
            }
            user.manager.notify(user)
            Upgrade.prices[this.name].exponent++;
        }
    }


    render(){
        const element = View.createElement("div",null,"col");
        if(this.cost % 3 == 0){
            element.innerHTML = `
            <upgrade-card
                name="The Fountain"
                image="fountain.png"
                cardline1="Healing, Grace, Cold Embrace"
                cardline2="Gain +<span class='noto'>🩸</span> Life"
                cardline3="Health For Thy Wealth"
                cardline4="Lives Go Up"
                cost="-${this.cost}"
                height="170"
                width="170"
            ></upgrade-card>
        `
        } else {
            element.innerHTML = `
            <upgrade-card
                name="The Fountain"
                image="fountain.png"
                cardline1="Patience, Yearning, Waters Churning"
                cardline2="Make A Wish. -${this.cost}<span class='noto'>🪙</span> Money"
                cardline3="Waste Not, Want!"
                cardline4="Money Go Down"
                cost="-${this.cost}"
                height="170"
                width="170"
            ></upgrade-card>
        `
        }
       
        return element
    }

    

}