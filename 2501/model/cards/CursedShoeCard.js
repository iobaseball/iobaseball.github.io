// constructor(name, cost, rewardAmount, valuables, midColor, profilePic, otherCard, triggeredByEvent, pastTenseVerb) {
//  PITCHER_CARD_TRIGGERED:100,
// PITCHER_CARD_TRIGGERED:101,
// FAV_TEAM_CARD_TRIGGERED:102,
// END_OF_DAY:103

class CursedShoeCard{
    static generateCards(teamsPlayingTodayArray, dayNumber){
        const result = [];
        const each = HelpMe.choice([

          {
            name: "Cursed Shoes",
            cost: 4,
            rewardAmount: LuckyJokerCard.cursedReward,
            valuables: new Valuables({ "redMagic": LuckyJokerCard.cursedReward }),
            colorScheme: { light: "#ffaaaa", mid: "#550000", dark: "#000000" , text:"#ffaaaa"},
            profilePic: "👠",
            otherCard:"Fav Team",
            triggeredByEvent:GameEventType.FAV_TEAM_CARD_TRIGGERED,
            pastTenseVerb:"radiated red",
            odds:3
          },
         
          {
            name: "Cursed Boots",
            cost: 4,
            rewardAmount: LuckyJokerCard.cursedReward,
            valuables: new Valuables({ "greenMagic": LuckyJokerCard.cursedReward }),
            colorScheme: { light: "#aaffaa", mid: "#005500", dark: "#000000" , text:"#aaffaa"},
            profilePic: "🥾",
            otherCard:"Fav Team",
            triggeredByEvent:GameEventType.FAV_TEAM_CARD_TRIGGERED,
            pastTenseVerb:"glowed green",
            odds:3
          },

            {
              name: "Cursed Sneakers",
              cost: 4,
              rewardAmount: LuckyJokerCard.cursedReward,
              valuables: new Valuables({ "blueMagic": LuckyJokerCard.cursedReward}),
              colorScheme: { light: "#aaaaff", mid: "#000055", dark: "#000000" , text:"#aaaaff"},
              profilePic: "👟",
              otherCard:"Fav Team",
              triggeredByEvent:GameEventType.FAV_TEAM_CARD_TRIGGERED,
              pastTenseVerb:"beamed blue",
              odds:3
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