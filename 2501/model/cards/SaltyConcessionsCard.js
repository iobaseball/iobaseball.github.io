class SaltyConcessionsCard{
    static generateCards(teamsPlayingTodayArray, dayNumber){
        const result = [];
        const each = HelpMe.choice([
            {
                name: "Popcorn",
                cost: 4,
                rewardAmount: 18,
                valuables: new Valuables({ "greenMagic": 18 }),
                colorScheme: { light: "#000000", mid: "#ccffcc", dark: "#FFFFFF" , text:"#005500"},
                midColor: "#ccffcc",
                reduction: 2,
                profilePic: "🍿",
                verb: "eaten"
              },
              {
                name: "Pretzel",
                cost: 5,
                rewardAmount: 21,
                
                valuables: new Valuables({ "greenMagic": 21 }),
                colorScheme: { light: "#000000", mid: "#ccffcc", dark: "#FFFFFF" , text:"#005500"},
                midColor: "#ccffcc",
                reduction: 2,
                profilePic: "🥨",
                verb: "eaten"
              },
              {
                name: "Popcorn",
                cost: 4,
                rewardAmount: 18,
                valuables: new Valuables({ "greenMagic": 18 }),
                colorScheme: { light: "#000000", mid: "#ccffcc", dark: "#FFFFFF" , text:"#005500"},
                midColor: "#ccffcc",
                reduction: 2,
                profilePic: "🍿",
                verb: "eaten"
              },
              {
                name: "Pretzel",
                cost: 5,
                rewardAmount: 21,
                valuables: new Valuables({ "greenMagic": 21 }),
                colorScheme: { light: "#000000", mid: "#ccffcc", dark: "#FFFFFF" , text:"#005500"},
                midColor: "#ccffcc",
                reduction: 2,
                profilePic: "🥨",
                verb: "eaten"
              },
              {
                name: "Pickle of Power",
                cost: 11,
                rewardAmount: 0.5,
                valuables: new Valuables({ "lives": 0.5 }),
                colorScheme: { light: "#000000", mid: "#ccffcc", dark: "#FFFFFF", text:"#005500"},
                midColor: "#ccffcc",
                reduction: 2,
                profilePic: "🥒",
                verb: "eaten"
              },
            ])
            //for(let each of objArray){
                result.push(new ConcessionsCard(each.name, each.cost, each.rewardAmount, each.valuables, each.reduction, each.profilePic, each.verb, each.colorScheme));
            //}
            return result;
            
        }
    
    static getCardType(){return CardType.CONCESSIONS}

}