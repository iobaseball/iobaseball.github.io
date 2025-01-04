class WhirlwindE extends PlotDevice {
    constructor(model) {
        super(model);
        this.insuranceAdjusterFirstName = Name.create_first_name()
        this.insuranceAdjusterLastName = Name.create_last_name()
        this.insuranceSubname = this.insuranceAdjusterFirstName.substring(0, Math.ceil(this.insuranceAdjusterFirstName.length/2));
        this.insuranceAdjusterFullName = this.insuranceAdjusterFirstName + " " + this.insuranceAdjusterLastName + ", insurance claims agent";

        this.introScript = [

            this.generatePosts(
                model.world.league.getCommissionerFullName(),
                model.world.league.colorScheme,
                [
                    `So, ${this.insuranceSubname}, as you can see, this is just your classic ballpark. Great American pastime and all that.`,
                    "Our insurance does NOT cover Acts of Gods. Now, we've had a few run-of-the-mill hiccups, but nothing... absolutely nothing that would qualify as Acts of Gods. Just normal insurable stuff."
                ]
            ),
            this.generatePosts(
                this.insuranceAdjusterFullName,
                null,
                [
                    `Please, call me ${this.insuranceAdjusterFirstName}. Run-of-the-mill hiccups, huh? And what are those? They look like— dare I say— massive peanut shells? Is someone trapped in there?`
                ]
            ),
            this.generatePosts(
                model.world.league.getCommissionerFullName(),
                model.world.league.colorScheme,
                [
                    "No, no, no, just an, uh... mascot's costume. Sometimes people have trouble unzipping the costume and have to be pecked free by birds.",
                    `But that's just a normal workplace hazard. Like tripping over a loose base... falling into a secret tunnel. Definitely insurable, ${this.insuranceSubname}.`
                ]
            ),
            this.generatePosts(
                this.insuranceAdjusterFullName,
                null,
                [
                    "Right. And the weather? I read that it turned into- Salmon? Also, the paperwork mentioned water damage from a flood of Immateria?",
                    "What exactly is Immateria? Sounds like something out of a science fiction novel. Possibly supernatural Acts of Gods?"
                ]
            ),
            this.generatePosts(
                model.world.league.getCommissionerFullName(),
                model.world.league.colorScheme,
                [
                    "Ah, yes, the Salmon skies! Such a beautiful thing to witness the migration flight. Entirely natural.",
                    "Immateria... well, it's just, uh, a typo! That should have said, 'A surge of inn material.'",
                    `You know... material... from an inn... that washed through the stadium. Beds, tables, mini-fridges... nothing major, ${this.insuranceSubname}.`
                ]
            ),
            this.generatePosts(
                this.insuranceAdjusterFullName,
                null,
                "When you put it like that, it seems mostly straight-forward."
            ),
            this.generatePosts(
                model.world.league.getCommissionerFullName(),
                model.world.league.colorScheme,
                [
                    "Of course! Nothing divine about it! It's all part of the game's unique culture.",
                    "The crack of the bat! The roar of the crowd! The rogue umpire incinerating a... a... sudden wind storm?!"
                ]
            ),
            this.generatePosts(
                this.insuranceAdjusterFullName,
                null,
                "What in the world—?! No! Tornado?! No, no, NO!!"
            ),
            this.generatePosts(
                model.world.league.getCommissionerFullName(),
                model.world.league.colorScheme,
                [
                    `WOAH LOOK AT THE WIND DAMAGE! WOW! WHAT A WHIRLWIND! ARE YOU SEEING THIS ${this.insuranceSubname.toUpperCase()}?!`,
                    `HOLD ON ${this.insuranceSubname.toUpperCase()}! CAN'T HAVE YOU GETTING BLOWN AWAY BEFORE YOU SIGN THAT INSURANCE CHECK!`
                ]
            )
        ]

        // END SCRIPT POSITIVE --------------------------------------------------------------------------------------------

        this.endScriptPositive = [
            // broadcast news
            this.generatePosts(
                model.world.newsNetwork.getFullName(),
                model.world.newsNetwork.colorScheme,
                [
                    "WEATHER REPORT: Whirling Winds Return. What's Causing The Curious Current? Weather Watchers Wonder What's at Work",
                ]
            ),
            this.generatePosts(
                this.insuranceAdjusterFullName,
                null,
                [
                    "I've never seen such a sudden-intense windstorm! If you hadn't pulled me into the dugout- I- I- ",
                    "You know what? I WILL approve your claim. But next time, can we please-PLEASE-have this conversion over the phone?"
                ]
            )
        ]

        // END SCRIPT NEGATIVE --------------------------------------------------------------------------------------------

        this.endScriptNegative = [
            // broadcast news
            this.generatePosts(
                model.world.newsNetwork.getFullName(),
                model.world.newsNetwork.colorScheme,
                [
                    "WEATHER REPORT: Whirling Winds Return. What's Causing The Curious Current? Weather Watchers Wonder What's at Work",
                ]
            ),
            this.generatePosts(
                model.world.league.getCommissionerFullName(),
                model.world.league.colorScheme,
                [
                    "Well, shoot. I will have to give the insurance company a call. Let them know they'll need to send another insurance agent.",
                    `HANG IN THERE ${this.insuranceSubname.toUpperCase()}! I'M SURE THIS TWISTER IS ONLY TEMPORARY. YOU'LL BE ON THE GROUND SOON!`,
                    `They just keep spinning around up there... YOU'RE DOING GREAT, ${this.insuranceSubname.toUpperCase()}!`,
                    `We might need to purchase additional insurance...`,
                    `REMEMBER ${this.insuranceSubname.toUpperCase()}... THIS IS ALL PERFECTLY NATURAL!`
                ]
            ),
        ]
    }// END OF CONSTRUCTOR
}