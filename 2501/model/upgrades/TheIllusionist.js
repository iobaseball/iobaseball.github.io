

class TheIllusionist extends Upgrade {

    static generateCards(teamsPlayingTodayArray, dayNumber){
        //if(dayNumber % 3 == 2){
            return new TheIllusionist();
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
        this.name = "The Illusionist";
        this.cost = Math.ceil(Upgrade.prices[this.name].exponent / 2);
    }

    addUpgradeToUser(user) {
        if(user.valuables.money >= this.cost){
            const oldMoney = user.valuables.money;
            user.valuables.money -= this.cost;
            
            View.addAlert("purple",`
                -${this.cost}<span class="noto">🪙</span> Money<br>
                ${oldMoney}<span class="noto">🪙</span> &rarr; ${user.valuables.money}<span class="noto">🪙</span>
                `,true);
            
            user.manager.notify(user)
            Upgrade.prices[this.name].exponent++;
        }
    }


    render(){
        const element = View.createElement("div",null,"col");
        
            element.innerHTML = `
            <upgrade-card
                name="The Illusionist"
                image="illusionist.png"
                cardline1="Secrecy, Deception, Unseen Connections"
                cardline2="Does Nothing?"
                cardline3="Make Thy Money Disappear"
                cardline4="The Pledge, The Turn"
                cost="-${this.cost}"
                height="170"
                width="170"
            ></upgrade-card>
        `

       
        return element
    }

    

}