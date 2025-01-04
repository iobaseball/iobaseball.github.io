class CoffeeConcessionsCard{
    static generateCards(teamsPlayingTodayArray, dayNumber){
        const result = [];
        const each = HelpMe.choice([

                {
                  name: "Coffee",
                  cost: 3,
                  rewardAmount: 15,
                  valuables: new Valuables({ "blueMagic": 15 }),
                  colorScheme: { light: "#000000", mid: "#ccccFF", dark: "#FFFFFF" , text:"#000055"},
                  reduction: 2,
                  profilePic: "☕",
                  verb:"sipped"
                },
                {
                  name: "Iced Latte",
                  cost: 5,
                  rewardAmount: 22,
                  valuables: new Valuables({ "blueMagic": 22 }),
                  colorScheme: { light: "#000000", mid: "#ccccFF", dark: "#FFFFFF" , text:"#000055"},
                  reduction: 3,
                  profilePic: "🧋",
                  verb:"sipped"
                },
                {
                  name: "Coffee",
                  cost: 3,
                  rewardAmount: 15,
                  valuables: new Valuables({ "blueMagic": 15 }),
                  colorScheme: { light: "#000000", mid: "#ccccFF", dark: "#FFFFFF", text:"#000055"},
                  reduction: 2,
                  profilePic: "☕",
                  verb:"sipped"
                },
                {
                  name: "Iced Latte",
                  cost: 5,
                  rewardAmount: 22,
                  valuables: new Valuables({ "blueMagic": 22 }),
                  colorScheme: { light: "#000000", mid: "#ccccFF", dark: "#FFFFFF" , text:"#000055"},
                  reduction: 3,
                  profilePic: "🧋",
                  verb:"sipped"
                },
                {
                  name: "Healing Brew",
                  cost: 5,
                  rewardAmount: 0.5,
                  valuables: new Valuables({ "lives": 0.5 }),
                  colorScheme: { light: "#000000", mid: "#ccccFF", dark: "#FFFFFF" , text:"#000055"},
                  reduction: 2,
                  profilePic: "🍵",
                  verb:"sipped"
                }
              
            ])
            //for(let each of objArray){
                result.push(new ConcessionsCard(each.name, each.cost, each.rewardAmount, each.valuables, each.reduction, each.profilePic, each.verb, each.colorScheme));
            //}

            // if not coffee prohibition
            return result;
            
        }
    
    static getCardType(){return CardType.CONCESSIONS}

}