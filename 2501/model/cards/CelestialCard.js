    // 🍫 🍇 🍲 🐦‍⬛ 🦇 🎱
    class CelestialCard extends TradingCard {
        static level = 1

        static generateCards(teamsPlayingTodayArray, dayNumber){
            if(CelestialCard.level < 4) CelestialCard.level++
            const result = [];
            const each = HelpMe.choice([

                    {
                        name: "Ursa Major",
                        cost: 0,
                        rewardAmount: CelestialCard.level,
                        valuables: new Valuables({ "redMagic": CelestialCard.level }),
                        colorScheme: { light: "#FFD700", mid: "#483d00  ", dark: "#000000 " , text:"#FFD700"},
                        reduction: 1,
                        profilePic: "🐻✨",
                        verb:"illuminated",
                        eventType:GameEventType.END_OF_DAY
                    },
                    {
                        name: "Orion",
                        cost: 0,
                        rewardAmount: CelestialCard.level,
                        valuables: new Valuables({ "greenMagic": CelestialCard.level }),
                        colorScheme: { light: "#FFD700", mid: "#483d00  ", dark: "#000000 " , text:"#FFD700"},
                        reduction: 1,
                        profilePic: "🏹✨",
                        verb:"illuminated",
                        eventType:GameEventType.END_OF_DAY
                    },
                    {
                        name: "Full Moon",
                        cost: 0,
                        rewardAmount: CelestialCard.level,
                        valuables: new Valuables({ "blueMagic": CelestialCard.level }),
                        colorScheme: { light: "#FFD700", mid: "#483d00  ", dark: "#000000 " , text:"#FFD700"},
                        reduction: 1,
                        profilePic: "🌝✨",
                        verb:"illuminated",
                        eventType:GameEventType.END_OF_DAY
                    },
                    {
                        name: "Cassiopeia",
                        cost: 0,
                        rewardAmount: CelestialCard.level,
                        valuables: new Valuables({ "money": CelestialCard.level }),
                        colorScheme: { light: "#FFD700", mid: "#483d00  ", dark: "#000000 " , text:"#FFD700"},
                        reduction: 1,
                        profilePic: "👸✨",
                        verb:"illuminated",
                        eventType:GameEventType.END_OF_DAY
                    },
                    {
                        name: "Canis Major",
                        cost: 0,
                        rewardAmount: CelestialCard.level + 1,
                        valuables: new Valuables({ "redMagic": CelestialCard.level + 1 }),
                        colorScheme: { light: "#FFD700", mid: "#483d00  ", dark: "#000000 " , text:"#FFD700"},
                        reduction: 1,
                        profilePic: "✨🐕",
                        verb:"illuminated",
                        eventType:GameEventType.PITCHER_CARD_TRIGGERED
                    },
                    {
                        name: "Draco",
                        cost: 0,
                        rewardAmount: CelestialCard.level + 1,
                        valuables: new Valuables({ "greenMagic": CelestialCard.level + 1 }),
                        colorScheme: { light: "#FFD700", mid: "#483d00  ", dark: "#000000 " , text:"#FFD700"},
                        reduction: 1,
                        profilePic: "✨🐉",
                        verb:"illuminated",
                        eventType:GameEventType.FAV_TEAM_CARD_TRIGGERED,
                    },
                    {
                        name: "Cygnus",
                        cost: 0,
                        rewardAmount: CelestialCard.level + 1,
                        valuables: new Valuables({ "blueMagic": CelestialCard.level + 1 }),
                        colorScheme: { light: "#FFD700", mid: "#483d00  ", dark: "#000000 " , text:"#FFD700"},
                        reduction: 1,
                        profilePic: "✨🦢",
                        verb:"illuminated",
                        eventType:GameEventType.SLUGGER_CARD_TRIGGERED
                    },
                    
                ])
                //for(let each of objArray){
                    result.push(new CelestialCard(each.name, each.cost, each.rewardAmount, each.valuables, each.reduction, each.profilePic, each.verb, each.colorScheme, each.eventType));
                //}

                // if not coffee prohibition
                return result;
                
            }

        static restructure(jsonObject) {
            Object.setPrototypeOf(jsonObject, CelestialCard.prototype);
            return jsonObject;
        }

        static getCardType() {
            return CardType.CELESTIAL;
        }

        constructor(name, cost, rewardAmount, valuables, reduction, profilePic, verb, colorScheme, eventType) {
            super(CardType.CELESTIAL, null, colorScheme, cost, rewardAmount, valuables, eventType);
            this.reduction = reduction;
            this.name = name;
            this.rewardAmount2 = rewardAmount - reduction;
            this.team = null;
            this.leagueIdNumber = -4;
            this.colorScheme = colorScheme;
            this.profilePic = profilePic;
            this.eventString = "will be " + verb;
            this.line1 = profilePic;
            
            //console.log(this)

            switch(eventType){
                case GameEventType.END_OF_DAY:
                    this.line1 = "At end of day";
                    this.otherCard = "end of day"
                    break;
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
            this.pastTenseEventString = "was " + verb + "!";

            this.container = View.createElement("span");
            this.container.innerHTML = `
            <trading-card 
                onclick="app.view.statsModal.setText(this);" 
                data-bs-target="#statsModal" 
                data-bs-toggle="modal"
                name="${this.name}"
                cardline1="${this.line1}"
                cardline2="${this.valuables.getShadedEmoji()} x${this.rewardAmount} ${this.eventString}"
                cardline3="${this.rewardAmount} &rarr; ${this.rewardAmount2}"
                cardline4="${this.cardType}"
                cost="${this.cost}"
                colorlight="${this.colorScheme.light}"
                colormid="${this.colorScheme.mid}"
                colordark="${this.colorScheme.dark}"
                emoji="${this.profilePic}"
                rewardamount="${this.rewardAmount}"
                rewardamount2="${this.rewardAmount2}"
                rewardtype="${this.valuables.getEmoji()}"
                fontcolor="${this.colorScheme.text}"
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
                cardline2="${this.valuables.getShadedEmoji()} x${this.rewardAmount} ${this.eventString}"
                cardline3="${this.rewardAmount} &rarr; ${this.rewardAmount2}"
                cardline4="${this.cardType}"
                cost="${this.cost}"
                colorlight="${this.colorScheme.light}"
                colormid="${this.colorScheme.mid}"
                colordark="${this.colorScheme.dark}"
                emoji="${this.profilePic}"
                rewardamount="${this.rewardAmount}"
                rewardamount2="${this.rewardAmount2}"
                rewardtype="${this.valuables.getEmoji()}"
                fontcolor="${this.colorScheme.text}"
                fontsize="14px"
                fontfamily="Noto Color Emoji,sans-serif"
                othercard="${this.otherCard}"
                >
            </trading-card>`.trim();
        }

        // This approach is necessary so that one card can trigger other cards
        addRewardToUser(user) {
            if(this.rewardAmount <= 0) return;
            user.valuables.mult({...this.valuables}); // create a copy of valuable because they're about to change
            setTimeout(()=>{
            this.reduceValuables()
            },100);
            // loop through other cards and see if any jokers are triggered
        }

        addUpgradeToUser(user){
            // TODO 
        }

        isTriggered(gameEvent) {
            if(this.rewardAmount <= 0) return false;
            if(gameEvent.eventType === this.eventType){
                View.addAlert(
                    "success",
                    `${this.valuables.getShadedEmoji()} x${this.rewardAmount} <small> ${this.name} ${this.pastTenseEventString}</small>`,
                    true
                )
            }
            
            return gameEvent.eventType === this.eventType;
        }

        reduceValuables() {
            if(this.rewardAmount <= 0){
                this.rewardAmount = 0;
            }
            this.rewardAmount -= this.reduction;
            this.rewardAmount2 -= this.reduction;
            // loop through each of this.valuables and reduce the value
            for (let eachKey of Object.keys(this.valuables)) {
                if (this.valuables[eachKey] !== 0) {
                    this.valuables[eachKey] -= this.reduction;
                }
            }
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
                cardline2="${this.valuables.getShadedEmoji()} x${this.rewardAmount} ${this.eventString}"
                cardline3="${this.rewardAmount} &rarr; ${this.rewardAmount2}"
                cardline4="${this.cardType}"
                cost="${this.cost}"
                colorlight="${this.colorScheme.light}"
                colormid="${this.colorScheme.mid}"
                colordark="${this.colorScheme.dark}"
                emoji="${this.profilePic}"
                rewardamount="${this.rewardAmount}"
                rewardamount2="${this.rewardAmount2}"
                rewardtype="${this.valuables.getEmoji()}"
                fontcolor="${this.colorScheme.text}"
                fontsize="14px"
                fontfamily="Noto Color Emoji,sans-serif"
                othercard="${this.otherCard}"
                >
            </trading-card>`.trim();
            return container
        }
    }
