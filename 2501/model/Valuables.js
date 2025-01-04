// A Valuables object represents a set of counters. 
// Each User has 1 set of Valuables
// A TradingCard has 1 set of Valuables that it provides as a reward

class Valuables{

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, Valuables.prototype);
        return jsonObject;
    }

    constructor(objectLiteral){
        this.redMagic = objectLiteral.redMagic || 0; // <span class="noto">🔥</span>🎟️
        this.greenMagic = objectLiteral.greenMagic || 0; // <span class="noto">🌵</span>🪴🌿☘️💹
        this.blueMagic = objectLiteral.blueMagic || 0; // <span class="noto">💧</span>💦🌊🧢
        this.money = objectLiteral.money || 0; // <span class="noto">🪙</span>🪙🌝💰
        this.lives = objectLiteral.lives || 0; //<span class="noto">🩸</span>
    }

    add(otherValuables){
        for (let key in otherValuables) {
            if (otherValuables.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                this[key] += otherValuables[key];
            }
        }
    }

    mult(otherValuables){
        for (let key in otherValuables) {
            if (otherValuables.hasOwnProperty(key) && this.hasOwnProperty(key)) {
                if(otherValuables[key] != 0){
                    this[key] *= otherValuables[key];
                }
            }
        }
    }

    getEmoji(){
        let result = "";
        if(this.redMagic > 0) result += "🔥"
        if(this.greenMagic > 0) result += "🌵"
        if(this.blueMagic > 0) result += "💧"
        if(this.money > 0) result += "🪙"
        if(this.lives > 0) result += "🩸"
        return result
    }

    getShadedEmoji(){
        let result = "";
        if(this.redMagic > 0) result += "<span class='noto shaded_outline_aqua'>🔥</span>"
        if(this.greenMagic > 0) result += "<span class='noto shaded_outline_magenta'>🌵</span>"
        if(this.blueMagic > 0) result += "<span class='noto shaded_outline_yellow'>💧</span>"
        if(this.money > 0) result += "<span class='noto shaded_outline_magenta'>🪙</span>"
        if(this.lives > 0) result += "<span class='noto shaded_outline_aqua'>🩸</span>"
        return result
    }

    setMagicToZero(){
        this.redMagic = 0;
        this.greenMagic = 0;
        this.blueMagic = 0;
    }
}