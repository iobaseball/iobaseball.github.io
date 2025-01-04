
const UnlockableUpgradeType = {
    THE_BOAR:"The Boar",
    THE_DEVILFISH:"The Devilfish",
    THE_FLIGHTLESS_FOWL:"The Flightless Fowl",
    THE_FOUNTAIN:"The Fountain",
    THE_POISON_APPLE:"The Poison Apple",
    THE_ILLUSIONIST:"The Illusionist"
}

// abstract class
class Upgrade {

    static restructure(jsonObject){
            switch(jsonObject.name){
                case "The Boar":
                    Object.setPrototypeOf(jsonObject, TheBoar.prototype);
                    break
                case "The Devilfish":
                    Object.setPrototypeOf(jsonObject, TheDevilfish.prototype);
                    break
                case "The Flightless Fowl":
                    Object.setPrototypeOf(jsonObject, TheFlightlessFowl.prototype);
                    break
                case "The Fountain":
                    Object.setPrototypeOf(jsonObject, TheFountain.prototype);
                    break
                case "The Illusionist":
                    Object.setPrototypeOf(jsonObject, TheIllusionist.prototype);
                    break
                case "The Occult Hand":
                    Object.setPrototypeOf(jsonObject, TheOccultHand.prototype);
                    break
                case "The Poison Apple":
                    Object.setPrototypeOf(jsonObject, ThePoisonApple.prototype);
                    break
            }
            return jsonObject;
    }

    static prices = {
        "The Boar": { "base": 1, "exponent": 0 },
        "The Devilfish": { "base": 4, "exponent": 0, "moneyToMagicRatio": 7 },
        "The Flightless Fowl": { "base": 5, "exponent": 2 },
        "The Fountain": { "base": 0, "exponent": 1 },
        "The Illusionist": { "base": 0, "exponent": 1},
        "The Occult Hand": { "base": 10, "exponent": 0 },
        "The Poison Apple": { "base": 4, "exponent": 0, "moneyToMagicRatio": 7 },

    }

    static generateCards(){
        return null;
    }

    constructor(){
        this.cost = 999;
    }

    addUpgradeToUser(user) {
        throw new Error("child classes must implement addUpgradeToUser method")
    }

    getCost(){
        return this.cost;
    }

    isAffordable(user){
        return this.cost <= user.valuables.money;
    }

    render(){
        throw new Error("child classes must implement render method")
    }

    

}