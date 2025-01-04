class PlayerAttributes{

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, PlayerAttributes.prototype);
        return jsonObject;
    }

    static randomPlayer(){
        const result = new PlayerAttributes()
        result.hunger = 1;
        result.metabolism = BaseballPlayer.normalizeToTen(Model.rng.random() * 6 + Model.rng.random() * 6);
        // tiredness
        result.healthiness = BaseballPlayer.normalizeToTen(Model.rng.random() * 6 + Model.rng.random() * 6);
        result.balance = BaseballPlayer.normalizeToTen(Model.rng.random() * 6 + Model.rng.random() * 6);
        // pitching
        result.strength = BaseballPlayer.normalizeToTen(Model.rng.random() * 6 + Model.rng.random() * 6);
        result.accuracy = BaseballPlayer.normalizeToTen(Model.rng.random() * 6 + Model.rng.random() * 6);
        // batting
        result.swinginess = BaseballPlayer.normalizeToTen(Model.rng.random() * 6 + Model.rng.random() * 6);
        result.thwackiness = BaseballPlayer.normalizeToTen(Model.rng.random() * 6 + Model.rng.random() * 6);
        result.power = BaseballPlayer.normalizeToTen(Model.rng.random() * 6 + Model.rng.random() * 6);

        // defense
        result.reliability = BaseballPlayer.normalizeToTen(Model.rng.random() * 6 + Model.rng.random() * 6);
        result.teamwork = BaseballPlayer.normalizeToTen(Model.rng.random() * 6 + Model.rng.random() * 6);
        return result;
    }

    constructor(){
        this.canBat = true;
        this.canCatch = true;
        this.canPitch = true;
        this.hunger = 0;
        this.metabolism = 0; // aka hungerRate
        // tiredness
        this.healthiness = 0;
        this.balance = 0;
        // pitching
        this.strength = 0; // pitchStrength
        this.accuracy = 0; // pitchAccuracy
        // batting
        this.swinginess = 0;
        this.thwackiness = 0;
        this.power = 0; // hittingPower

        // defense
        this.reliability = 0;
        this.teamwork = 0;
    }
}