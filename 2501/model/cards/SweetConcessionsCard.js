class SweetConcessionsCard{
    static generateCards(teamsPlayingTodayArray, dayNumber){
        const result = [];
        const each = HelpMe.choice([

            {
                name: "Churro",
                cost: 4,
                rewardAmount: 7,
                valuables: new Valuables({ "money": 7 }),
                colorScheme: { light: "#000000", mid: "#ffeecc", dark: "#FFFFFF" , text:"#554400"},
                midColor: "#ffffaa",
                reduction: 3, // 7+4+1=12
                profilePic: "🥖",
                verb: "eaten"
              },
              {
                name: "Doughnut",
                cost: 5,
                rewardAmount: 9,
                valuables: new Valuables({ "money": 9 }),
                colorScheme: { light: "#000000", mid: "#ffeecc", dark: "#FFFFFF" , text:"#554400"},
                midColor: "#ffffaa",
                reduction: 5, // 9+4=13
                profilePic: "🍩",
                verb: "eaten"
              },
              {
                name: "Sundae",
                cost: 5,
                rewardAmount: 9,
                valuables: new Valuables({ "money": 9 }),
                colorScheme: { light: "#000000", mid: "#ffeecc", dark: "#FFFFFF" , text:"#554400"},
                midColor: "#ffffaa",
                reduction: 4, // 9+5+1=15
                profilePic: "🍨",
                verb: "eaten"
              },
              {
                name: "Cake",
                cost: 5,
                rewardAmount: 8,
                valuables: new Valuables({ "money": 8 }),
                colorScheme: { light: "#000000", mid: "#ffeecc", dark: "#FFFFFF" , text:"#554400"},
                midColor: "#ffffaa",
                reduction: 3, // 8+5+2=15
                profilePic: "🍰",
                verb: "eaten"
              },
              {
                name: "Honey Elixer",
                cost: 5,
                rewardAmount: 0.5,
                valuables: new Valuables({ "lives": 0.5 }),
                colorScheme: { light: "#000000", mid: "#ffeecc", dark: "#FFFFFF" , text:"#554400"},
                midColor: "#ffffaa",
                reduction: 2,
                profilePic: "🍯",
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
