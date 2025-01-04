class User {

    static restructure(jsonObject) {
        const user = new User();
        user.name = jsonObject.name;
        user.hasClickedUserIcon = jsonObject.hasClickedUserIcon;
        user.level = jsonObject.level;
        //Object.setPrototypeOf(jsonObject, User.prototype);
        user.valuables = Valuables.restructure(jsonObject.valuables);
        user.character = jsonObject.character;
        
        // jsonObject.manager = EventManager.restructure(jsonObject.manager)
        for(let i=0; i<jsonObject.cards.length;i++){
            user.cards[i] = TradingCard.restructure(jsonObject.cards[i])
        }
        user.maxCards = jsonObject.maxCards;
        user.cardsPurchased = jsonObject.cardsPurchased;
        user.upgradesPurchased = jsonObject.upgradesPurchased;
        user.favoriteSpeed = jsonObject.favoriteSpeed;
        user.manager = EventManager.restructure(jsonObject.manager)
        user.messageFeed = jsonObject.messageFeed;
        user.hasLost = jsonObject.hasLost;
        user.hasWon = jsonObject.hasWon;
        return user;
    }

    constructor(name) {
        this.name = name;
        this.hasClickedUserIcon = false;
        this.level = 0; // <span class="noto">🚀</span>
        this.valuables = new Valuables({
            "money": 30, // <span class="noto">🪙</span>🌝💰
            "redMagic": 1,// <span class="noto">🔥</span>🎟️
            "greenMagic": 13,// <span class="noto">🌵</span>🪴🌿☘️💹
            "blueMagic": 12,// <span class="noto">💧</span>💧💦🌊🧢
            "lives": 5 //<span class="noto">🩸</span>
        });
        this.character = {
            face: { emoji: '😀', x: 10, y: 12, scale: 14 },
           hat: { emoji: '🎩', x: 10, y: 3, scale: 4 },
           arms: { emoji: '✋🤚', x: 10, y: 20, scale: 4 },
           shirt: { emoji: '👕', x: 10, y: 20, scale: 6 },
           bottom: { emoji: '👖', x: 10, y: 26, scale: 6 },
           accessory: { emoji: '⚾', x: 15, y: 26, scale: 7 }
        };
        this.cards = []; // <span class="noto">🃏</span>
        this.maxCards = 5;
        this.cardsPurchased = 0;
        this.upgradesPurchased = 0;
        this.favoriteSpeed = 4000;
        this.manager = new EventManager();
        this.messageFeed = [];
        this.hasLost = false;
        this.hasWon = false;
    }

    

    addCard(cardToAdd, leagueIdObject) {
        //console.log(leagueIdObject)
        if (this.hasRoomForThisCard(cardToAdd)) {
            this.cards.push(cardToAdd);
            if (cardToAdd.leagueIdNumber > -1){
                leagueIdObject.manager.subscribe(this.handleEvent);
            }
        }
        this.manager.notify(this)
    }

    addMessage(message){
        const timestamp = new Date().toLocaleTimeString(); 
        this.messageFeed.push(timestamp + ": "+ message);
        this.manager.notify(this)
    }

    

    addValuables(v){
        this.valuables.add(v);
        this.manager.notify(this)
    }

    get clickedUserIcon() {
        return this.hasClickedUserIcon;
    }

    // necessary because index locations can become null while selling cards
    getCardsCount(){
        let count = 0;
        for(let i=0; i<this.cards.length; i++){
            if(this.cards[i] != null) count++;
        }
        return count;
    }

    // goal emoji is 🎯🏁
    getGoal(){
        return (this.level+1) * (this.level+1) * 5000 + (this.level+1) * 5000 + (this.level) * (this.level) * 4000 + (this.level) * 1000;
    }

    getReward(){
        // reward * (level ^ 3 / ( abs(level ^ 3 - yourScore ^ 3) + level ^ 3))
        const rewardAmount = 120 / (Math.max(this.level,0) + 2);
        return 1 + Math.ceil(rewardAmount * (Math.pow(this.getGoal(),3) / ( Math.abs(Math.pow(this.getGoal(),3) - Math.pow(this.getVictoryPoints(), 3)) + Math.pow(this.getGoal(),3))));
    }

    // victory points emoji is 👑 <span class="noto">👑</span>
    getVictoryPoints(){
        return this.valuables.greenMagic * this.valuables.redMagic * this.valuables.blueMagic;
    }

    handleEvent = (data) => {
        //console.log("User sees this data: ",data);
        // loop thru cards 
        for(let i=0; i<this.cards.length;i++){
            if(this.cards[i] != null && this.cards[i].isTriggered(data)){
                
                this.cards[i].addRewardToUser(this)
                
            }
        }
    }

    doesNotHaveCard = (card) => {
        //console.log(card)
        for(let eachCard of this.cards){
            if(eachCard.equals(card)){
                //console.log(eachCard.equals(card))
                return false;
            }
        }
        return true;
    }

    hasRoomForThisCard(card) {
        return this.getCardsCount() < this.maxCards;
    }

    

    removeNullCards(){
        this.cards = this.cards.filter(n => n);
    }

    sellCard(indexLoc) {
        if(indexLoc == null) throw new Error("null index")
        const sellMe = this.cards[indexLoc];
        if(sellMe != null){
            this.cards[indexLoc] = null;
            this.valuables.money += sellMe.sellValue;
            // unsubscribe from player. removes ALL subscriptions. so doubled cards would fail.
            //leagueIdObject.manager.unsubcribe(this.handleEvent)
            this.manager.notify(this)
        }
        
    }

    setCharacter = (sliders) => {
            this.character.hat.emoji = hats[parseInt(sliders.hatStyle.value) % hats.length];
            this.character.hat.x = parseInt(sliders.hatX.value);
            this.character.hat.y = parseInt(sliders.hatY.value);
            this.character.hat.scale = parseFloat(sliders.hatScale.value);
            this.character.face.emoji = faces[parseInt(sliders.faceStyle.value) % faces.length];
            this.character.face.x = parseInt(sliders.faceX.value);
            this.character.face.y = parseInt(sliders.faceY.value);
            this.character.face.scale = parseFloat(sliders.faceScale.value);
            this.character.shirt.emoji = shirts[parseInt(sliders.shirtStyle.value) % shirts.length];
            this.character.shirt.x = parseInt(sliders.shirtX.value);
            this.character.shirt.y = parseInt(sliders.shirtY.value);
            this.character.shirt.scale = parseFloat(sliders.shirtScale.value);
            this.character.arms.x = parseInt(sliders.shirtX.value);
            this.character.arms.y = parseInt(sliders.shirtY.value);
            this.character.arms.scale = parseFloat(sliders.shirtScale.value-2);
            this.character.bottom.emoji = bottoms[parseInt(sliders.bottomStyle.value) % bottoms.length];
            this.character.bottom.x = parseInt(sliders.bottomX.value);
            this.character.bottom.y = parseInt(sliders.bottomY.value);
            this.character.bottom.scale = parseFloat(sliders.bottomScale.value);
            this.character.accessory.emoji = accessories[parseInt(sliders.accessoryStyle.value) % accessories.length];
            this.character.accessory.x = parseInt(sliders.accessoryX.value);
            this.character.accessory.y = parseInt(sliders.accessoryY.value);
            this.character.accessory.scale = parseFloat(sliders.accessoryScale.value);
            //console.log(this.character.hat.emoji)
            this.manager.notify(this)
    }

    set clickedUserIcon(value) {
        this.hasClickedUserIcon = value;
    }
}