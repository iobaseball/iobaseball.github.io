/*
Paralyzed
Petrified
Stunned
Unconscious
Frightened
Grappled
Restrained
Poisoned
Exhausted
Frozen
Dazed
Marked
Bloodied
Quarried
Cursed
Blinded
Slowed
Blessed
*/

class PlayerCondition {

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, PlayerCondition.prototype);
    }

    static SHAKEN = new PlayerCondition("Shaken","uncertain",20,{"accuracy":-5,"balance":-5,"reliability":-5,"teamwork":-5})


    constructor(name, description, duration, mods = {}) {
        this.name = name;
        this.description = description;
        this.duration = duration; // null means indefinite
        this.active = true;
        this.modifiers = new PlayerAttributes(); // Object with attribute effects (e.g., { power: -2, strength: -2 })
        for (const [key, value] of Object.entries(mods)) {
            this.modifiers[key] = value;
        }
    }

    canBat(){
        return this.modifiers["canBat"] != false;
    }

    canCatch(){
        return this.modifiers["canCatch"] != false;
    }

    canPitch(){
        return this.modifiers["canPitch"] != false;
    }

    reduceDuration() {
        if (this.duration !== null && this.duration > 0) {
            this.duration -= 1;
        }
        if (this.duration === 0) {
            this.active = false;
        }
    }

    toString() {
        return `${this.name.toUpperCase()} ${this.description}`;
    }
}