// constructor(name, cost, rewardAmount, valuables, midColor, profilePic, otherCard, triggeredByEvent, pastTenseVerb) {
//  PITCHER_CARD_TRIGGERED:100,
// PITCHER_CARD_TRIGGERED:101,
// FAV_TEAM_CARD_TRIGGERED:102,
// END_OF_DAY:103

class LuckyShirtCard{
    static generateCards(teamsPlayingTodayArray, dayNumber){
        const result = [];
        const each = HelpMe.choice([

            {
                name: "Lucky Scarf",
                cost: 2,
                rewardAmount: LuckyJokerCard.luckyReward,
                valuables: new Valuables({ "redMagic": LuckyJokerCard.luckyReward }),
                colorScheme: { light: "#000000", mid: "#ffaaaa", dark: "#FFFFFF" , text:"#550000"},
                profilePic: "🧣",
                otherCard:"Pitcher",
                triggeredByEvent:GameEventType.PITCHER_CARD_TRIGGERED,
                pastTenseVerb:"radiated red",
                odds:4
              },
             
              {
                name: "Lucky Shirt",
                cost: 2,
                rewardAmount: LuckyJokerCard.luckyReward,
                valuables: new Valuables({ "greenMagic": LuckyJokerCard.luckyReward }),
                colorScheme: { light: "#000000", mid: "#aaffaa", dark: "#FFFFFF" , text:"#005500"},
                profilePic: "🥻",
                otherCard:"Pitcher",
                triggeredByEvent:GameEventType.PITCHER_CARD_TRIGGERED,
                pastTenseVerb:"glowed green",
                odds:4
              },

                {
                  name: "Lucky Coat",
                  cost: 2,
                  rewardAmount: LuckyJokerCard.luckyReward,
                  valuables: new Valuables({ "blueMagic": LuckyJokerCard.luckyReward }),
                  colorScheme: { light: "#000000", mid: "#aaaaff", dark: "#FFFFFF" , text:"#000055"},
                  profilePic: "🧥",
                  otherCard:"Pitcher",
                  triggeredByEvent:GameEventType.PITCHER_CARD_TRIGGERED,
                  pastTenseVerb:"beamed blue",
                  odds:4
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