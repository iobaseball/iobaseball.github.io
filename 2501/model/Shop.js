


class Shop{

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, Shop.prototype);
        for(let i=0; i<jsonObject.cardPiles.length; i++){
            for(let j=0; j<jsonObject.cardPiles[i].length; j++){
                jsonObject.cardPiles[i][j] = TradingCard.restructure(jsonObject.cardPiles[i][j]);
            }
        }
        for(let i=0; i<jsonObject.cardsOnDisplay.length; i++){
            jsonObject.cardsOnDisplay[i] = TradingCard.restructure(jsonObject.cardsOnDisplay[i]);
        }
        for(let i=0; i<jsonObject.upgradesOnDisplay.length; i++){
            jsonObject.upgradesOnDisplay[i] = Upgrade.restructure(jsonObject.upgradesOnDisplay[i]);
        }
        return jsonObject;
    }

    constructor(){
        this.displaySize = 30
        
        this.unlockableCardTypes = HelpMe.shuffle([
            UnlockableCardType.COFFEE_CONCESSIONS,
            UnlockableCardType.CURSED_HAT,
            UnlockableCardType.CURSED_MONEYMAKER,
            UnlockableCardType.CURSED_SHIRT,
            UnlockableCardType.CURSED_SHOE,
            UnlockableCardType.HOT_CONCESSIONS,
            UnlockableCardType.LUCKY_HAT,
            UnlockableCardType.LUCKY_MONEYMAKER,
            UnlockableCardType.LUCKY_SHIRT,
            UnlockableCardType.LUCKY_SHOE,
            UnlockableCardType.POTION,
            UnlockableCardType.SALTY_CONCESSIONS,
            UnlockableCardType.SWEET_CONCESSIONS,
        ]);

        this.unlockableUpgrades = HelpMe.shuffle([
            UnlockableUpgradeType.THE_BOAR,
            UnlockableUpgradeType.THE_DEVILFISH,
            UnlockableUpgradeType.THE_FLIGHTLESS_FOWL,
            UnlockableUpgradeType.THE_FOUNTAIN,
            UnlockableUpgradeType.THE_POISON_APPLE,
            UnlockableUpgradeType.THE_ILLUSIONIST
        ]);
        //this.unlockableUpgrades = []

        this.cardPiles = [
            [],
            [],
            [],
            []
        ]
        this.cardsOnDisplay = [];
        this.upgradesOnDisplay = [];
        this.unlockedCardTypes = ["Slugger","Fav Team","Pitcher"];
        this.unlockedUpgrades = ["The Occult Hand"];
        // Mapping card types to their generator methods
        // this.cardGenerators = {
        //     "Slugger": SluggerCard.generateCards,
        //     "Fav Team": FavTeamCard.generateCards,
        //     "Pitcher": PitcherCard.generateCards,
        //     [UnlockableCardType.COFFEE_CONCESSIONS]: CoffeeConcessionsCard.generateCards,
        //     [UnlockableCardType.CURSED_HAT]: CursedHatCard.generateCards,
        //     [UnlockableCardType.CURSED_MONEYMAKER]: CursedMoneymakerCard.generateCards,
        //     [UnlockableCardType.CURSED_SHIRT]: CursedShirtCard.generateCards,
        //     [UnlockableCardType.CURSED_SHOE]: CursedShoeCard.generateCards,
        //     [UnlockableCardType.HOT_CONCESSIONS]: HotConcessionsCard.generateCards,
        //     [UnlockableCardType.LUCKY_HAT]: LuckyHatCard.generateCards,
        //     [UnlockableCardType.LUCKY_MONEYMAKER]: LuckyMoneymakerCard.generateCards,
        //     [UnlockableCardType.LUCKY_SHIRT]: LuckyShirtCard.generateCards,
        //     [UnlockableCardType.LUCKY_SHOE]: LuckyShoeCard.generateCards,
        //     [UnlockableCardType.POTION]: PotionCard.generateCards,
        //     [UnlockableCardType.SALTY_CONCESSIONS]: SaltyConcessionsCard.generateCards,
        //     [UnlockableCardType.SWEET_CONCESSIONS]: SweetConcessionsCard.generateCards,
        //     "The Occult Hand": TheOccultHand.generateCards,
        //     [UnlockableUpgradeType.THE_BOAR]: TheBoar.generateCards,
        //     [UnlockableUpgradeType.THE_DEVILFISH]: TheDevilfish.generateCards,
        //     [UnlockableUpgradeType.THE_FLIGHTLESS_FOWL]: TheFlightlessFowl.generateCards,
        //     [UnlockableUpgradeType.THE_FOUNTAIN]: TheFountain.generateCards,
        //     [UnlockableUpgradeType.THE_POISON_APPLE]: ThePoisonApple.generateCards,
        //     [UnlockableUpgradeType.THE_ILLUSIONIST]: TheIllusionist.generateCards,
        // };
        //this.manager = new EventManager();
    }


    addCards(teamsPlayingTodayArray, dayNumber,user){
        if(user == null) throw new Error("null user")
        this.cardPiles = [];
        for(let i=0; i<this.unlockedCardTypes.length; i++){
            const cards = this.generateCards(this.unlockedCardTypes[i], teamsPlayingTodayArray, dayNumber);
            // for(let eachCard of cards){
            //     if(!user.hasCard(eachCard)){
            //         this.cardPiles.push(eachCard);
            //     }
                
            // }
            this.cardPiles.push(cards.filter(user.doesNotHaveCard));
        }
        this.upgradesOnDisplay = []
        for(let i=0; i<this.unlockedUpgrades.length; i++){
            const upgrade = this.generateCards(this.unlockedUpgrades[i], teamsPlayingTodayArray, dayNumber);
            if(upgrade != null) this.upgradesOnDisplay.push(upgrade);
        }
        
    }

    attemptShopPurchase(value, user) {
        const card = this.cardsOnDisplay[value];
        if (this.isPurchaseAffordable(value, user) && user.hasRoomForThisCard(card)) {
            user.addCards(card);
            user.valuables.money -= card.cost;
            // Mark card as sold
            this.cardsOnDisplay[value] = null;
        }
    }

    decreaseDisplaySize(){
        // do nothing
        //this.displaySize = Math.max(this.displaySize - 1, this.unlockedCardTypes.length);
    }

    // generateCards(cardType, teamsPlayingTodayArray, dayNumber) {
    //     const generator = this.cardGenerators[cardType];
    //     if (!generator) {
    //         throw new Error(`Oops. ${cardType} not found.`);
    //     }
    //     return generator(teamsPlayingTodayArray, dayNumber);
    // }

    generateCards(cardType, teamsPlayingTodayArray, dayNumber){
        switch(cardType){
            case "Slugger":
                return SluggerCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case "Fav Team":
                return FavTeamCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case "Pitcher":
                return PitcherCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.COFFEE_CONCESSIONS:
                return CoffeeConcessionsCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.CURSED_HAT:
                return CursedHatCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.CURSED_MONEYMAKER:
                return CursedMoneymakerCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.CURSED_SHIRT:
                return CursedShirtCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.CURSED_SHOE:
                return CursedShoeCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.HOT_CONCESSIONS:
                return HotConcessionsCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.LUCKY_HAT:
                return LuckyHatCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.LUCKY_MONEYMAKER:
                return LuckyMoneymakerCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.LUCKY_SHIRT:
                return LuckyShirtCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.LUCKY_SHOE:
                return LuckyShoeCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.POTION:
                return PotionCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.SALTY_CONCESSIONS:
                return SaltyConcessionsCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableCardType.SWEET_CONCESSIONS:
                return SweetConcessionsCard.generateCards(teamsPlayingTodayArray, dayNumber);
            case "The Occult Hand":
                return TheOccultHand.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableUpgradeType.THE_BOAR:
                return TheBoar.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableUpgradeType.THE_DEVILFISH:
                return TheDevilfish.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableUpgradeType.THE_FLIGHTLESS_FOWL:
                return TheFlightlessFowl.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableUpgradeType.THE_FOUNTAIN:
                return TheFountain.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableUpgradeType.THE_POISON_APPLE:
                return ThePoisonApple.generateCards(teamsPlayingTodayArray, dayNumber);
            case UnlockableUpgradeType.THE_ILLUSIONIST:
                return TheIllusionist.generateCards(teamsPlayingTodayArray, dayNumber);
            default:
                throw new Error("Oops. "+cardType+" not found.")

        }
    }

    getCardsOnDisplay() {
        
        
        return this.cardsOnDisplay;
    }

    getUpgradesOnDisplay(){

        return this.upgradesOnDisplay;
    }

    getCost(index){
        if(index == -1) return getTheOccultHandPrice();
        return this.cardsOnDisplay[index].cost;
    }

    getCardPurchase(index, user){
        if(!this.isPurchaseAffordable(this.cardsOnDisplay[index].cost, user)) {
            return null;
        }
        user.valuables.money -= this.cardsOnDisplay[index].cost;
        const card = this.cardsOnDisplay[index];
        // update the shop
        this.cardsOnDisplay[index] == null;
        return card;
    }
    getUpgradePurchase(index, user){
        if(!this.isPurchaseAffordable(this.upgradesOnDisplay[index].cost, user)) {
            return null;
        }
        // user.valuables.money -= this.upgradesOnDisplay[index].cost;
        const upgrade = this.upgradesOnDisplay[index];
        // update the shop
        this.upgradesOnDisplay[index] == null;
        return upgrade;
    }
    isCardInShop(leagueIdNumber, cardType){
        for(let eachPile of Object.values(this.cardPiles)){
            for(let each of eachPile){
                if(each.leagueIdNumber === leagueIdNumber && each.cardType === cardType) return true
            }
        }

        return false
    }
    isPurchaseAffordable(cost, user){
        
        return user.valuables.money >= cost;
    }

    setCardsOnDisplay() {
        
        const numberOfCardPiles = Object.keys(this.cardPiles).length;
        // const cardDistribution = Shop.splitNWays(this.displaySize, numberOfCardPiles)
        // this.cardsOnDisplay = [];
        // for(let i=0; i<numberOfCardPiles; i++){
        //     const currentPile = this.cardPiles[i];
        //     for(let j=0; j<cardDistribution[i]; j++){
        //         this.cardsOnDisplay.push(HelpMe.removeRandom(currentPile));
        //     }
        // }
        const temp2dArray = Array.from({ length: numberOfCardPiles }, () => []); // Create n rows, each initialized as an empty array
        for(let i=0; i<this.displaySize; i++){ // using for-loop so we aren't stuck in infinite loop
            // grab 1 random card from each cardPile
            for(let j=0; j<numberOfCardPiles; j++){
                const currentPile = this.cardPiles[j];
                const card = HelpMe.removeRandom(currentPile)
                if(card != null) temp2dArray[j].push(card);
                if(HelpMe.getRaggedArraySize(temp2dArray) >= this.displaySize){
                    i = 99999;
                    break;
                }
            }
        }
        
        this.cardsOnDisplay = temp2dArray.flat(Infinity)
    }

    setSluggerCards(number){
        for(let i=0; i<number; i++){
            if(this.sluggerCards.length == 0) break
            const indexToRemove = Math.floor(Model.rng.random()*this.sluggerCards.length)
            const addedCard = this.sluggerCards.splice(indexToRemove, 1)[0]
            this.cardsOnDisplay.push(addedCard);
        }
    }
    setFavTeamCards(number){
        for(let i=0; i<number; i++){
            if(this.favTeamCards.length == 0) break
            const indexToRemove = Math.floor(Model.rng.random()*this.favTeamCards.length)
            const addedCard = this.favTeamCards.splice(indexToRemove, 1)[0]
            this.cardsOnDisplay.push(addedCard);
        }
    }
    setInventoryToZero(){
        // destroy remaining cards
        this.favTeamCards = [];
        this.pitcherCards = [];
        this.sluggerCards = [];
        this.cardsOnDisplay = [];
        this.upgradesOnDisplay = [];
    }
    setPitcherCards(number){
        for(let i=0; i<number; i++){
            if(this.pitcherCards.length == 0) break
            const indexToRemove = Math.floor(Model.rng.random()*this.pitcherCards.length)
            const addedCard = this.pitcherCards.splice(indexToRemove, 1)[0]
            this.cardsOnDisplay.push(addedCard);
        }
    }

}