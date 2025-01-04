class PotionCard extends TradingCard{
    static generateCards(teamsPlayingTodayArray, dayNumber){
        const result = [];
        const each = HelpMe.choice([

            
            {
                name: "Red Potion",
                cost: 5,
                rewardAmount: 3,
                valuables: new Valuables({ "redMagic": 3 }),
                reduction:1,
                colorScheme: { light: "#000000", mid: "#FF0000", dark: "#FFFFFF" , text: "#550000" },
                profilePic: "🍷",
                otherCard:"Pitcher",
                triggeredByEvent:GameEventType.PITCHER_CARD_TRIGGERED,
                pastTenseVerb:"sipped"
            },
            {
                name: "Green Potion",
                cost: 5,
                rewardAmount: 4,
                valuables: new Valuables({ "greenMagic": 4 }),
                reduction:1,
                colorScheme: { light: "#000000", mid: "#00FF00", dark: "#FFFFFF" , text: "#005500" },
                profilePic: "🍾",
                otherCard:"Fav Team",
                triggeredByEvent:GameEventType.FAV_TEAM_CARD_TRIGGERED,
                pastTenseVerb:"sipped"
              },
              {
                name: "Blue Potion",
                cost: 5,
                rewardAmount: 4,
                valuables: new Valuables({ "blueMagic": 4 }),
                reduction:1,
                colorScheme: { light: "#000000", mid: "#0000FF", dark: "#FFFFFF" , text: "#000055" },
                profilePic: "🫙",
                otherCard:"Slugger",
                triggeredByEvent:GameEventType.SLUGGER_CARD_TRIGGERED,
                pastTenseVerb:"sipped"
              },
              {
                name: "Gold Potion",
                cost: 5,
                rewardAmount: 3,
                valuables: new Valuables({ "money": 3 }),
                reduction:1,
                colorScheme: { light: "#000000", mid: "#FFAA00", dark: "#FFFFFF" , text: "#000000" },
                profilePic: "⚱️",
                otherCard:"Slugger",
                triggeredByEvent:GameEventType.SLUGGER_CARD_TRIGGERED,
                pastTenseVerb:"sipped"
              },
              {
                name: "Health Potion",
                cost: 5,
                rewardAmount: 0.2,
                valuables: new Valuables({ "lives": 0.2 }),
                reduction: 0.1,
                colorScheme: { light: "#000000", mid: "#ffaaaa", dark: "#ffffff" , text: "#000000" },
                profilePic: "🏺",
                otherCard:"Slugger",
                triggeredByEvent:GameEventType.SLUGGER_CARD_TRIGGERED,
                pastTenseVerb:"sipped"
              },
             
            
              
            ])
            //for(let each of objArray){
                result.push(new PotionCard(each.name, each.cost, each.rewardAmount, each.valuables, each.colorScheme, each.profilePic, each.otherCard, each.triggeredByEvent, each.pastTenseVerb, each.reduction));
            //}

            // if not coffee prohibition
            return result;
            
        }

    static getCardType() {
        return CardType.POTION;
    }


      static restructure(jsonObject) {
          Object.setPrototypeOf(jsonObject, ConcessionsCard.prototype);
          return jsonObject;
      }



  constructor(name, cost, rewardAmount, valuables, colorScheme, profilePic, otherCard, triggeredByEvent, pastTenseVerb, reduction) {
    // constructor(cardType, player, colorScheme, cost, rewardAmount = "", valuables = null, eventType = "") {
      super(CardType.POTION, null, colorScheme, cost, rewardAmount, valuables, triggeredByEvent);
      this.reduction = reduction;
      this.name = name;
      this.rewardAmount2 = (rewardAmount - reduction);
      if(reduction < 1) this.rewardAmount2 = HelpMe.roundToTenth(rewardAmount - reduction);
      this.team = null;
      this.leagueIdNumber = -2;
      this.colorScheme = colorScheme;
      this.profilePic = profilePic;
      this.eventString = "when " + pastTenseVerb;
      this.otherCard = otherCard;
      switch(triggeredByEvent){
        case GameEventType.PITCHER_CARD_TRIGGERED:
            this.line1 = "When Pitcher Cards throw strikeout";
            this.otherCard = "Pitcher Cards"
            break;
        case GameEventType.FAV_TEAM_CARD_TRIGGERED:
            this.line1 = "When Fav Team Cards get a run";
            this.otherCard = "Fav Team Cards"
            break;
        case GameEventType.SLUGGER_CARD_TRIGGERED:
            this.line1 = "When Slugger Cards get a hit";
            this.otherCard = "Slugger Cards"
            break;
    }
    this.pastTenseEventString = "was " + pastTenseVerb + "!";
      this.pastTenseEventString = "was " + pastTenseVerb + "!";

      this.container = View.createElement("span");
      this.container.innerHTML = `
      <trading-card 
          onclick="app.view.statsModal.setText(this);" 
          data-bs-target="#statsModal" 
          data-bs-toggle="modal"
          name="${this.name}"
          cardline1="${this.line1}"
          cardline2="gain +${this.rewardAmount} ${this.valuables.getShadedEmoji()}"
          cardline3="Then, at end of day, ${this.rewardAmount} &rarr; ${this.rewardAmount2}"
          cardline4="${this.cardType}"
          cost="${this.cost}"
          colorlight="${this.colorScheme.light}"
          colormid="${this.colorScheme.mid}"
          colordark="${this.colorScheme.dark}"
          emoji="${this.profilePic}"
          rewardamount="${this.rewardAmount}"
          rewardamount2="${this.rewardAmount2}"
          rewardtype="${this.valuables.getEmoji()}"
          fontcolor="#000000"
          fontsize="14px"
          fontfamily="Noto Color Emoji,sans-serif"
          othercard="${this.otherCard}"
          >
      </trading-card>`.trim();
      }

  // Method to update the web component with the current card data
  updateWebComponent() {
      //super.updateWebComponent(); // Ensure base attributes are set
      this.container = View.createElement("span");
      this.container.innerHTML = `
      <trading-card 
          onclick="app.view.statsModal.setText(this);" 
          data-bs-target="#statsModal" 
          data-bs-toggle="modal"
          name="${this.name}"
          cardline1="${this.line1}"
          cardline2="gain +${this.rewardAmount} ${this.valuables.getShadedEmoji()}"
          cardline3="Then, at end of day, ${this.rewardAmount} &rarr; ${this.rewardAmount2}"
          cardline4="${this.cardType}"
          cost="${this.cost}"
          colorlight="${this.colorScheme.light}"
          colormid="${this.colorScheme.mid}"
          colordark="${this.colorScheme.dark}"
          emoji="${this.profilePic}"
          rewardamount="${this.rewardAmount}"
          rewardamount2="${this.rewardAmount2}"
          rewardtype="${this.valuables.getEmoji()}"
          fontcolor="#000000"
          fontsize="14px"
          fontfamily="Noto Color Emoji,sans-serif"
          othercard="${this.otherCard}"
          >
      </trading-card>`.trim();
      
  }

  // This approach is necessary so that one card can trigger other cards
  addRewardToUser(user) {
      user.valuables.add({...this.valuables}); 
      user.valuables.lives = HelpMe.roundToTenth(user.valuables.lives);
      
      
  }

  isTriggered(gameEvent) {
    //console.log(gameEvent.eventType)
    if(gameEvent.eventType === GameEventType.END_OF_DAY){
        this.reduceValuables()
    }
      if(gameEvent.eventType === this.eventType){
          View.addAlert(
              "success",
              `+${this.rewardAmount} ${this.valuables.getShadedEmoji()} <small> ${this.name} ${this.pastTenseEventString}</small>`,
              true
          )
      }
      return gameEvent.eventType === this.eventType;
  }

  reduceValuables() {
      this.rewardAmount -= this.reduction;
      if(this.reduction < 1) this.rewardAmount = HelpMe.roundToTenth(this.rewardAmount)
      this.rewardAmount2 -= this.reduction;
      if(this.reduction < 1) this.rewardAmount2 = HelpMe.roundToTenth(this.rewardAmount2)
      // loop through each of this.valuables and reduce the value
      for (let eachKey of Object.keys(this.valuables)) {
          if (this.valuables[eachKey] !== 0) {
              this.valuables[eachKey] -= this.reduction;
          }
      }
      console.log(this.valuables)
      // Update the web component with the new reward amounts
      this.updateWebComponent();
  }

  render(){
      const container = View.createElement("span");
      container.innerHTML = `
      <trading-card 
          onclick="app.view.statsModal.setText(this);" 
          data-bs-target="#statsModal" 
          data-bs-toggle="modal"
          name="${this.name}"
          cardline1="${this.line1}"
          cardline2="gain +${this.rewardAmount} ${this.valuables.getShadedEmoji()}"
          cardline3="Then, at end of day, ${this.rewardAmount} &rarr; ${this.rewardAmount2}"
          cardline4="${this.cardType}"
          cost="${this.cost}"
          colorlight="${this.colorScheme.light}"
          colormid="${this.colorScheme.mid}"
          colordark="${this.colorScheme.dark}"
          emoji="${this.profilePic}"
          rewardamount="${this.rewardAmount}"
          rewardamount2="${this.rewardAmount2}"
          rewardtype="${this.valuables.getEmoji()}"
          fontcolor="#000000"
          fontsize="14px"
          fontfamily="Noto Color Emoji,sans-serif"
          othercard="${this.otherCard}"
          >
      </trading-card>`.trim();

      return container;
  }
  
}
