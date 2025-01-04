const ModelState = {
    MORNING: 0,
    AFTERNOON: 1,
    POSTGAME_AFTERNOON: 2,
    NIGHT: 3,
    PERFORMANCE: 4
}


class Model {

    static rng;

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, Model.prototype);
        jsonObject.world = World.restructure(jsonObject.world);
        for(let i=0; i<jsonObject.users.length; i++){
            jsonObject.users[i] = User.restructure(jsonObject.users[i]);
        }
        for(let i=0; i<jsonObject.plot.length; i++){
            jsonObject.plot[i] = PlotDevice.restructure(jsonObject.plot[i]);
        }
        
        return jsonObject;
    }

//
    constructor(worldNumber, year) {
        Model.rng = new MersenneTwister(parseInt(worldNumber))
        // The state of the model
        //this.game = JSON.parse(localStorage.getItem('savedGame')) || new Game();
        this.world = new World(year);
        this.users = [new User()];
        
        this.plot = [new WhirlwindA(this), new WhirlwindB(this), new WhirlwindC(this), new WhirlwindD(this), new WhirlwindE(this)];
        this.world.shop.addCards(this.world.league.getTeamsPlayingToday(this.world.year, this.world.day), this.world.day, this.users[0]);
        this.world.shop.setCardsOnDisplay();
        // check if save exists
        if(localStorage.getItem('savedState') != null){
            this.loadGame()
        }else{
            this.state = ModelState.MORNING;
        }
    }

    addUser() {
        const newUser = new User();

        this.users.push(newUser)
    }



    _commit(todos) {
        this.onTodoListChanged(todos)
        localStorage.setItem('todos', JSON.stringify(todos))
    }

    attemptShopCardPurchase(value, user) {
        user.removeNullCards();
        
        if (this.isPurchaseAffordable(this.world.shop.cardsOnDisplay[value].cost, user) 
            && this.userHasRoom(value, user)) { // is affordable? & has room?

            const buyingCard = this.world.shop.getCardPurchase(value, user);
            if (buyingCard) {
                user.addCard(buyingCard, this.world.league.lookup(buyingCard.leagueIdNumber));
                user.cardsPurchased++;
            }
        }
        
    }

    attemptShopUpgradePurchase(value, user) {
        user.removeNullCards();

        if (this.isPurchaseAffordable(this.world.shop.upgradesOnDisplay[value].cost, user)) {
            //console.log("affordable")
            const buyingUpgrade = this.world.shop.getUpgradePurchase(value, user);
            if (buyingUpgrade) {
                buyingUpgrade.addUpgradeToUser(user);
                user.upgradesPurchased++;
            }
        }
        
    }



    getNextGameMessages() {
        return this.world.nextGameMessages();
    }

    isPurchaseAffordable(cost, user){
        //console.log(cost)
        return cost <= user.valuables.money
    }




    next() {
        switch (this.state) {
            case ModelState.MORNING:
                console.log("morning -> afternoon")
                // shop cleans out all the old cards
                this.world.shop.setInventoryToZero();
                this.world.shop.decreaseDisplaySize();
                this.state = ModelState.AFTERNOON;
                // clean out NULL sold cards from user's hand
                this.users[0].removeNullCards();
                this.saveGame()
                break;
            case ModelState.AFTERNOON:
                console.log("afternoon -> postgame_afternoon")
                this.state = ModelState.POSTGAME_AFTERNOON;
                // clean out NULL sold cards from user's hand
                this.users[0].removeNullCards();
                this.world.league.setPrintSchedule(this.world.year); // update the schedule with the new scores
                this.saveGame()
                break;
            case ModelState.POSTGAME_AFTERNOON:
                console.log("postgame_afternoon -> night")
                this.state = ModelState.NIGHT;
                // clean out NULL sold cards from user's hand
                this.users[0].removeNullCards();
                this.saveGame()
                break;
            case ModelState.NIGHT:
                console.log("night -> performance")

                this.state = ModelState.PERFORMANCE;
                // clean out NULL sold cards from user's hand
                this.users[0].removeNullCards();
                this.saveGame()
                break;
            case ModelState.PERFORMANCE:
                console.log("performance -> morning")
                this.world.day++;
                // setup shop for next day
                this.world.shop.addCards(this.world.league.getTeamsPlayingToday(this.world.year, this.world.day), this.world.day, this.users[0]);
                this.world.shop.setCardsOnDisplay();
                this.state = ModelState.MORNING;
                // clean out NULL sold cards from user's hand
                this.users[0].removeNullCards();
                this.saveGame()
                break;
        }
    }

    nextPlotMessage() {
        return this.plot[this.world.day % this.plot.length].next(this)
    }

    openLootcrateCard(index){
        //console.log(this.world.shop.unlockableCardTypes)
        // remove from unlockable array
        const selectedCardType =  this.world.shop.unlockableCardTypes.splice(index,1)[0];
        //console.log(this.world.shop.unlockableCardTypes)
        
        // add to unlocked array
        this.world.shop.unlockedCardTypes.unshift(selectedCardType); // add to the beginning of the shop
        //console.log(selectedCardType)
        // update the lootcrateModal
        document.getElementById("lootcrateDescription").innerHTML = `You have unlocked <span class="fs-4">${selectedCardType}</span> cards! Find them in the Trading Card Shop!`;
        // move the unselected items (the new index 0 and index 1) to the end of the unlockable array
        const unselectedItems = this.world.shop.unlockableCardTypes.splice(0,2);
        //console.log(this.world.shop.unlockableCardTypes)
        this.world.shop.unlockableCardTypes.push(...unselectedItems);
        //console.log(this.world.shop.unlockableCardTypes)
    }

    openLootcrateUpgrade(index){
        const selectedUpgrade =  this.world.shop.unlockableUpgrades.splice(index,1)[0];
        this.world.shop.unlockedUpgrades.unshift(selectedUpgrade); // add to the beginning of the upgrades
        document.getElementById("lootcrateDescription").innerHTML = `You have unlocked <span class="fs-4">${selectedUpgrade}</span> upgrade. Look for it where mysterious, forbidden upgrades are sold.`;
        const unselectedItems = this.world.shop.unlockableUpgrades.splice(0,2);
        this.world.shop.unlockableUpgrades.push(...unselectedItems);
    }

    readdUserCards(){
        const numCards = this.users[0].cards.length;
        for(let i=0;i<numCards;i++){
            // get the first card
            const card = this.users[0].cards.shift();
            // readd the first card
            this.users[0].addCard(card, this.world.league.lookup(card.leagueIdNumber))
        }
    }

    reloadTeams() {
        this.world.reloadTeams()
    }
    resetPlotDeviceState() {
        this.plot[this.world.day % this.plot.length].state = PlotDeviceState.INTRO_SCRIPT
    }
    saveGame(){
        // year
        localStorage.setItem('year',JSON.stringify(this.world.year))
        // day
        localStorage.setItem('day',JSON.stringify(this.world.day))
        // model state
        localStorage.setItem('savedState',JSON.stringify(this.state))
        
        // teams
        for(let i=0;i<this.world.league.teams.length;i++){
            localStorage.setItem('team'+i,JSON.stringify(this.world.league.teams[i]))
        }
        // printSchedule
        localStorage.setItem('printSchedule',JSON.stringify(this.world.league.seasons[this.world.year].regularSeasonSchedule.printSchedule))
        // upgrade prices
        localStorage.setItem('upgrades',JSON.stringify(Upgrade.prices))

        // users
        localStorage.setItem('user',JSON.stringify(this.users[0]))
        
        // shop
        localStorage.setItem('shop',JSON.stringify(this.world.shop))
        // rng
        localStorage.setItem('rng', JSON.stringify(Model.rng))
    }
    loadGame(){
        const savedState = localStorage.getItem('savedState');
        if (savedState) {
            // year
            this.world.year = JSON.parse(localStorage.getItem('year'));
            // day
            this.world.day = JSON.parse(localStorage.getItem('day'));
            // model state
            this.state = JSON.parse(savedState);
            // printSchedule
            this.world.league.seasons[this.world.year].regularSeasonSchedule.printSchedule = JSON.parse(localStorage.getItem('printSchedule'))
            // teams
            for(let i=0;i<this.world.league.teams.length;i++){
                this.world.league.teams[i] = BaseballTeam.restructure(JSON.parse(localStorage.getItem('team'+i)))
                // resubscribe
                this.world.league.teams[i].manager.subscribe(this.world.league.handleEvent);
                this.world.league.teams[i].setup()
                for(const eachPlayer of this.world.league.teams[i].players){
                    eachPlayer.manager.subscribe(this.world.league.handleEvent);
                }
            }
            // upgrade prices
            Upgrade.prices = JSON.parse(localStorage.getItem('upgrades'))
            // users
            this.users[0] =  User.restructure(JSON.parse(localStorage.getItem('user')));
            this.readdUserCards()
            // shop
            this.world.shop = Shop.restructure(JSON.parse(localStorage.getItem('shop')))
            // rng
            Model.rng = Object.setPrototypeOf(JSON.parse(localStorage.getItem('rng')), MersenneTwister.prototype);
            this.reloadTeams()
        }


    }
    userHasRoom(value, user){
        
        return user.hasRoomForThisCard(this.world.shop.cardsOnDisplay[value])
    }

}