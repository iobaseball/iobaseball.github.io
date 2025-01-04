class HotConcessionsCard{
    static generateCards(teamsPlayingTodayArray, dayNumber){
        const result = [];
        const each = HelpMe.choice([
            {
                name: "Hot Dog",
                cost: 4,
                rewardAmount: 19,
                valuables: new Valuables({ "redMagic": 20 }),
                colorScheme: { light: "#000000", mid: "#ffcccc", dark: "#FFFFFF", text:"#550000"},
                midColor: "#ffcccc",
                reduction: 3,
                profilePic: "🌭",
                verb: "eaten"
              },
              {
                name: "Pizza",
                cost: 5,
                rewardAmount: 21,
                valuables: new Valuables({ "redMagic": 23 }),
                colorScheme: { light: "#000000", mid: "#ffcccc", dark: "#FFFFFF" , text:"#550000"},
                midColor: "#ffcccc",
                reduction: 2,
                profilePic: "🍕",
                verb: "eaten"
              },
              {
                name: "Hot Dog",
                cost: 4,
                rewardAmount: 19,
                valuables: new Valuables({ "redMagic": 20 }),
                colorScheme: { light: "#000000", mid: "#ffcccc", dark: "#FFFFFF" , text:"#550000"},
                midColor: "#ffcccc",
                reduction: 3,
                profilePic: "🌭",
                verb: "eaten"
              },
              {
                name: "Pizza",
                cost: 5,
                rewardAmount: 21,
                valuables: new Valuables({ "redMagic": 23 }),
                colorScheme: { light: "#000000", mid: "#ffcccc", dark: "#FFFFFF" , text:"#550000"},
                midColor: "#ffcccc",
                reduction: 2,
                profilePic: "🍕",
                verb: "eaten"
              },
              {
                name: "Hearty Stew",
                cost: 5,
                rewardAmount: 0.5,
                valuables: new Valuables({ "lives": 0.5 }),
                colorScheme: { light: "#000000", mid: "#ffcccc", dark: "#FFFFFF" , text:"#550000"},
                midColor: "#ffcccc",
                reduction: 2,
                profilePic: "🍲",
                verb: "eaten"
              }

            ])
            //for(let each of objArray){
                result.push(new ConcessionsCard(each.name, each.cost, each.rewardAmount, each.valuables, each.reduction, each.profilePic, each.verb, each.colorScheme));
            //}
            return result;
            
        }
    
    static getCardType(){return CardType.CONCESSIONS}

}