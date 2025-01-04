class NewsTicker {
    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, NewsTicker.prototype);
        return jsonObject;
    }

    constructor() {
        this.favoriteNumber = Model.rng.random();
        this.counter = 0;
        this.items = ["WHERE HAVE YOU BEEN?"];
        this.breakingNewsItems = [];
        this.parentDiv;
        this.slideDivs;
        this.teamNames = [];
    }

    static demoText = [
        "<span class='noto'>🚨</span> PLEASE SUPPORT US ON PATREON <span class='noto'>🚨</span>",
        "<span class='noto'>🚨</span> WE ARE NOW DEMONSTRATING THE DEMO VERSION OF ioBASEBALL <span class='noto'>🚨</span>",
        "<span class='noto'>🚨</span> DEMO VERSION * PLEASE SUPPORT US ON PATREON * YOUR SUPPORT WILL ALLOW US TO CONTINUE <span class='noto'>🚨</span>",
    ];

static tickerMessages = [
    "EVERYTHING YOU SHOULD KNOW, MORE OR LESS",
    "A CALM VOICE OF REASON IN A CHAOTIC WORLD",
    "ACCEPT NO IMITATIONS",
    "DON'T BLAME THE TICKER IF YOU MISSED IT",
    "WE JUST REPORT IT, DON'T SHOOT THE MESSENGER",
    "MOVING TO THE LEFT",
    "FOR WHEN YOU NEED TO KNOW BUT WISH YOU DIDN'T",
    "IF IT MATTERS TO YOU, IT PROBABLY MATTERS TO US",
    "INFORMATION AT A COMFORTABLE PACE",
    "LUXURY INFO YOU DIDN'T KNOW YOU NEEDED",
    "CONCISE",
    "NOT MISSPELT",
    "JUST ONE INSIGHT AFTER ANOTHER",
    "THE PERFECT BALANCE OF SPEED AND PRECISION",
    "ACCURATE MORE OFTEN THAN NOT",
    "SOMETIMES WE'RE HERE JUST TO BRIGHTEN YOUR DAY",
    "YOUR COMPLETE SOURCE FOR INFORMATION, IN A NUTSHELL",
    "WE ARE BACK!",
    "I AM THE NEW TICKER",
    "NOT A BELLY ITCHER",
    "BATTER UP",
    "RECOMMENDED BY 1 OUT OF 10 PSYCHIATRIC THERAPISTS",
    "TELL YOUR THERAPIST WE SENT YOU",
    "A GAME WITH SIMPLE RULES AND DEVASTATING CONSEQUENCES",
    "A FRIENDLY GAME WITH A 100% DEATH GUARANTEE",
    "RULES THAT ARE EASY TO LEARN. CARNAGE THAT IS IMPOSSIBLE TO FORGET",
    "A CHARMING ROMP THROUGH DESTRUCTION AND DESPAIR",
    "I REMAIN UNCHANGED",
    "WHO'S ON FIRST BASE? PRIDE. SECOND BASE IS GREED. THIRD BASE WRATH. SLOTH IS ON THE BENCH",
    "WE NEED A PITCHER",
    "NO BAT? NO GLOVE? NO WORRY!",
    "STRIKE OUT? THAT'S JUST FREE BAT SWINGING PRACTICE",
    "OUT OF BOUNDS? WE CALL THAT CREATIVE PROBLEM SOLVING",
    "NO RULES? NO UMPIRES? NO STRESS!",
    "I ASSUME YOU SIGNED THE NON-DISCLOSURE AGREEMENT, RIGHT?",
    "YOU READ THE END-USER LICENSE AGREEMENT, RIGHT?",
    "ALL RAGGED ARRAYS WILL BE INFINITELY FLATTENED",
    "NINE-TIME ACADEMY AWARD WATCHING NEWS TICKER",
    "YOU ARE IMPORTANT AND YOU ARE NOT ALONE",
    "REMEMBER TO PILLAGE FIRST AND THEN BURN",
    "LEAVE NO STONE UNTURNED, LEAVE NO BRIDGES UNBURNED",
    "EVERY STEP TO HOME PLATE COULD BE YOUR LAST",
    "YOU CAN RUN THE BASES, BUT YOU CAN'T OUTRUN FATE",
    "BEWARE THE FINAL INNING",
    
]

static shopSpecific = [
    "BOY, YOU'RE RICH",
    "BROWSE OUR LATEST DEALS",
    "BUY NOW OR REGRET IT FOREVER",
    "BUY NOW, THINK LATER",
    "BUY SOMETHIN' WILL YA!",
    "CAPITALISM NEVER SLEEPS, AND NEITHER DO I",
    "CAPITALISTS WILL KILL US ALL. HAPPY SHOPPING!",
    "CATCH THESE PRICES BEFORE THEY'RE GONE!",
    "CONSUME. OBEY. REPEAT. ",
    "CONVENIENTLY PRICED FOR MAXIMUM GUILT",
    "DON'T PITCH A FIT—JUST PAY UP!",
    "DON'T STRIKE OUT—MAKE A DEAL",
    "EVERY PURCHASE FUELS THE MACHINE",
    "EVERYTHING IS YOURS TO TAKE",
    "EVERYTHING'S PRICED TO DRAIN YOUR WALLET",
    "IF YOU BREAK IT, YOU BUY IT",
    "INVEST IN TRADING CARDS",
    "IT'S A HOME RUN KIND OF SALE",
    "IT'S A NINTH-INNING CLEARANCE EVENT",
    "JUST A SMALL COG IN THE GLOBAL MACHINE",
    "JUST ANOTHER DAY IN THE MERCHANDISE MINES",
    "LET'S PLAY MONEY MAKING GAME",
    "LOOK ON MY WARES, YE MIGHTY, AND REJOICE",
    "NO ETHICAL CONSUMPTION UNDER CAPITALISM",
    "NO SHIRT, NO SHOES, NO SCREAMING INTO THE ABYSS",
    "THOU SHALT NOT STEAL. THOU SHALT SAVE WITH OUR GREAT DEALS",
    "SHOP RIGHTEOUSLY WITH DIVINE DEALS",
    "OH BOY, THIS IS REALLY EXPENSIVE!",
    "PAY ME AND I'LL TALK",
    "ROUND THE BASES AND PICK YOUR FAVORITE!",
    "SAFE AT HOME-WITH THESE SAVINGS",
    "SOLD MY SOUL FOR CAPITALISM",
    "SHOP LOCAL, THINK ANTI-COLONIAL",
    "SHOP TILL YOU STOP",
    "SPEND BIG OR GET OUTTA THE BATTER'S BOX",
    "STEP UP TO THE PLATE AND SPEND BIG!",
    "SUPPORTING THE SYSTEM, ONE SALE AT A TIME",
    "SWING FOR THE FENCES WITH THESE PRICES",
    "TAKE ANY ONE YOU WANT",
    "THE ECONOMY RELIES ON YOUR IMPULSE",
    "THE MARKET WILL SOLVE EVERYTHING, RIGHT?",
    "THIS IS A GRAND SLAM OF SAVINGS",
    "THIS IS AMERICA'S PASTIME... SHOPPING!",
    "THIS ISN'T A CHARITY, BUT THANKS FOR DONATING",
    "WE TAKE YOUR MONEY AND SMILE ABOUT IT",
    "WHO NEEDS A BAT WHEN YOU CAN SWING A DEAL?",
    "WHO NEEDS ETHICS WHEN YOU HAVE A SALE?",
    "YOU'LL WANT TO SLIDE INTO THIS DEAL!",
    "YOUR DREAMS ARE NOW A PREMIUM SUBSCRIPTION",
    "YOUR WORTH IS IN YOUR WALLET",
    "OUR PITCHERS ARE LOCALLY SOURCED AND HARVESTED",
    "100% ORGANIC, SMALL-BATCH SLUGGERS",
    "OUR TRADING CARDS ARE HAND-CRAFTED, ONE PIXEL AT A TIME",
    "FREE-RANGE OUTFIELDERS WITH ETHICALLY SOURCED MITTS",
    "GLUTEN-FREE FASTBALLS, DELIVERED WITH ZERO EMISSIONS",
    "OUR BASES ARE CERTIFIED VEGAN",
    "STEP RIGHT UP AND PLUNGE INTO THE ABYSS—FUN FOR THE WHOLE FAMILY",
    "FRESHLY HARVESTED DREAD, NOW WITH 30% MORE TREPIDATION",
    "PREMIUM PHOBIAS ARE NOW AVAILABLE",
    "IN THIS ECONOMY?!?!",
    "WOW CHRISTMAS CAME EARLY. SANTA SAID SPEND MORE MONEY",
    "*SLAPS ROOF OF CAR* THIS BAD BOY CAN FIT SO MANY DIGITAL TRADING CARDS",
    "CHRISTMAS IS TOO COMMERCIALIZED. BASEBALL IS NOT COMMERCIALIZED ENOUGH",
    "WE CAN WORK WITH YOUR BUDGET. TAKE IT "

  ];

    /**
     * Cleans up expired breaking news items from the queue.
     * Should be explicitly called to handle cleanup logic.
     */
    cleanUpBreakingNews() {
        if (this.breakingNewsItems.length > 0) {
            this.breakingNewsItems.shift();
        }
    }

    /**
     * Marks the first breaking news item for removal if needed.
     */
    flagBreakingNewsForRemoval() {
        if (this.breakingNewsItems.length > 0) {
            const firstItem = this.breakingNewsItems[0];
            if (!firstItem.flaggedForRemoval) {
                firstItem.flaggedForRemoval = true;
            } else {
                // If already flagged, remove it
                this.breakingNewsItems.shift();
            }
        }
    }

    /**
     * Getter method only reads data; does not alter any state.
     * @returns {string[]} List of items to display (breaking news takes precedence).
     */
    getVisibleTickerItems() {
        if (this.breakingNewsItems.length > 0) {
            // Return only the first breaking news item
            return [this.breakingNewsItems[0].text];
        }

        return [...this.items];
    }

    handleEvent = (data) => {
        if (data.eventType === GameEventType.GAME_WINNER) {
            this.setBreakingNews(this.teamNames[data.teamId] + " win! ");
        }
    }

    // should occur on a fixed schedule, decrements breaking news countdown
    show() {

        this.parentDiv = document.getElementById('newsTickerContainer');
        this.slideDivs = this.parentDiv.querySelectorAll('.newsTickerItem');

        for (let i = 0; i < this.slideDivs.length; i++) {
            if (this.breakingNewsItems.length > 0) {
                this.slideDivs[i].innerHTML = this.breakingNewsItems[0].text;
                
            } else {
                this.slideDivs[i].innerHTML = this.items[i];
            }
            //this.slideDivs[i].style.top = (this.slideCounter % this.slideDivs.length * -1) + "em"; 
            //     this.slideDivs[i].style.left = (this.slideCounter % this.slideDivs.length * -100) + "vw"; 
        }
        if(this.breakingNewsItems.length > 0 && this.breakingNewsItems[0].flaggedForRemoval){
            this.breakingNewsItems.splice(0,1);
        } else if(this.breakingNewsItems.length > 0 && !this.breakingNewsItems[0].flaggedForRemoval){
            this.breakingNewsItems[0].flaggedForRemoval = true;
        }

    }

    setItems(array){

        this.items = array;
        //console.log(this.items)
    }

    setSpeed(numberOfSeconds){
            const ticker = document.getElementById('newsTickerRibbon');
            if (ticker) {
              ticker.style.animationDuration = `${numberOfSeconds}s`;
            }
          
    }

    // can happen out of schedule
    setBreakingNews(someString) {

        this.breakingNewsItems.push({
            text: '<span class="text-white">' + someString + '</span>',
            flaggedForRemoval: false
        });
        this.parentDiv = document.getElementById('newsTickerContainer');
        this.slideDivs = this.parentDiv.querySelectorAll('.newsTickerItem');

        for (let i = 0; i < this.slideDivs.length; i++) {
            this.slideDivs[i].innerHTML = this.breakingNewsItems[0].text;
        }
    }

    setShopText(){
        this.items = ["WHERE HAVE YOU BEEN?"];
        for(let i=0;i<12;i++){
            // ticker messages
            let temp = HelpMe.removeFirstHalfRandom(NewsTicker.tickerMessages);
            this.items.push(temp);
            NewsTicker.tickerMessages.push(temp);
            // shop specific
            temp = HelpMe.removeFirstHalfRandom(NewsTicker.shopSpecific);
            this.items.push(temp);
            NewsTicker.shopSpecific.push(temp);
            // demo text
            this.items.push(NewsTicker.demoText[i%3] );
        }
    }


    // can happen out of schedule
    update(myArray) {
        this.flagBreakingNewsForRemoval();
        //this.parentDiv = document.getElementById('newsTickerContainer');
        //this.slideDivs = this.parentDiv.querySelectorAll('.newsTickerItem');
        // add 2x as many items as there are games. add 4x if only 1 or 2 games.
        let multiplier = 2;
        if (myArray.length < 3) multiplier = 4;
        for (let i = 0; i < myArray.length * multiplier; i++) {
            this.items[i] = myArray[i % myArray.length].scoreString;
            //this.slideDivs[i].innerHTML = this.items[i];
        }
        this.setSpeed()
    }
}