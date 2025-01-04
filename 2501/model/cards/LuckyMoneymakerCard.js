// constructor(name, cost, rewardAmount, valuables, midColor, profilePic, otherCard, triggeredByEvent, pastTenseVerb) {
//  PITCHER_CARD_TRIGGERED:100,
// SLUGGER_CARD_TRIGGERED:101,
// FAV_TEAM_CARD_TRIGGERED:102,
// END_OF_DAY:103

class LuckyMoneymakerCard{



    static generateCards(teamsPlayingTodayArray, dayNumber){
        const result = [];
        const each = HelpMe.choice([

            {
                name: "Lucky Star",
                cost: 3,
                rewardAmount: LuckyJokerCard.luckyReward,
                valuables: new Valuables({ "money": LuckyJokerCard.luckyReward }),
                colorScheme: { light: "#000000", mid: "#ffeeaa", dark: "#FFFFFF" , text:"#554400"},
                profilePic: "🌟",
                otherCard:"Slugger",
                triggeredByEvent:GameEventType.SLUGGER_CARD_TRIGGERED,
                pastTenseVerb:"granted your wish",
                odds:4
              },
              {
                name: "Lucky Penny",
                cost: 3,
                rewardAmount: LuckyJokerCard.luckyReward,
                valuables: new Valuables({ "money": LuckyJokerCard.luckyReward}),
                colorScheme: { light: "#000000", mid: "#ffeeaa", dark: "#FFFFFF" , text:"#554400"},
                profilePic: "🪙",
                otherCard:"Fav Team",
                triggeredByEvent:GameEventType.FAV_TEAM_CARD_TRIGGERED,
                pastTenseVerb:"cashed in",
                odds:4
              },
              {
                name: "Lucky Key",
                cost: 5,
                rewardAmount: LuckyJokerCard.luckyReward,
                valuables: new Valuables({ "money": LuckyJokerCard.luckyReward }),
                colorScheme: { light: "#000000", mid: "#ffeeaa", dark: "#FFFFFF" , text:"#554400"},
                profilePic: "🔑",
                otherCard:"Pitcher",
                triggeredByEvent:GameEventType.PITCHER_CARD_TRIGGERED,
                pastTenseVerb:"unlocked treasure",
                odds:6
              },

              
            ])
            //for(let each of objArray){
                result.push(new LuckyJokerCard(each.name, each.cost, each.rewardAmount, each.valuables, each.colorScheme, each.profilePic, each.otherCard, each.triggeredByEvent, each.pastTenseVerb, each.odds));
            //}

            // if not coffee prohibition
            return result;
            
        }
    
    static getCardType(){return CardType.LUCKY_JOKER}

}


