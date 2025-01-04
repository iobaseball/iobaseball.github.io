// constructor(name, cost, rewardAmount, valuables, midColor, profilePic, otherCard, triggeredByEvent, pastTenseVerb) {
//  PITCHER_CARD_TRIGGERED:100,
// SLUGGER_CARD_TRIGGERED:101,
// FAV_TEAM_CARD_TRIGGERED:102,
// END_OF_DAY:103

class CursedMoneymakerCard{



    static generateCards(teamsPlayingTodayArray, dayNumber){
        const result = [];
        const each = HelpMe.choice([


          
                {
                  name: "Cursed Lottery Ticket",
                  cost: 4,
                  rewardAmount: LuckyJokerCard.cursedReward,
                  valuables: new Valuables({ "money": LuckyJokerCard.cursedReward }),
                  colorScheme: { light: "#ffaa33", mid: "#883300", dark: "#000000" , text:"#ffaa33"},
                  profilePic: "🎫",
                  otherCard:"Slugger",
                  triggeredByEvent:GameEventType.SLUGGER_CARD_TRIGGERED,
                  pastTenseVerb:"paid out",
                  odds:5
                },
                {
                    name: "Cursed Slot Machine",
                    cost: 4,
                    rewardAmount: LuckyJokerCard.cursedReward,
                    valuables: new Valuables({ "money": LuckyJokerCard.cursedReward}),
                    colorScheme: { light: "#ffaa33", mid: "#883300", dark: "#000000" , text:"#ffaa33"},
                    profilePic: "🎰",
                    otherCard:"Fav Team",
                    triggeredByEvent:GameEventType.FAV_TEAM_CARD_TRIGGERED,
                    pastTenseVerb:"hit the jackpot",
                    odds:5
                  },
                  {
                    name: "Cursed Credit Card",
                    cost: 6,
                    rewardAmount: LuckyJokerCard.cursedReward,
                    valuables: new Valuables({ "money": LuckyJokerCard.cursedReward }),
                    colorScheme: { light: "#ffaa33", mid: "#883300", dark: "#000000" , text:"#ffaa33"},
                    profilePic: "💳",
                    otherCard:"Pitcher",
                    triggeredByEvent:GameEventType.PITCHER_CARD_TRIGGERED,
                    pastTenseVerb:"paid off",
                    odds:7
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