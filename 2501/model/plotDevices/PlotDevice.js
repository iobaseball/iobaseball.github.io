const PlotDeviceState = {
    LOAD_INTRO_SCRIPT: 0,
    INTRO_SCRIPT: 1,
    JUDGEMENT: 2,
    END_SCRIPT: 3,
    END: 4,
};
// 
const crypticUnicode = "⧫︎⏁⨅⩊⟅⟁⤫⤧⦸⨷⟊⏂⏇⩎⧆⟠⏞⤂⩏⧨⩰⏊⧀⩚⏁⨂⟃⤿ȴɣɮƏǂȢȹʭʚʘʓʋʅɻɸɷɮɕɅ˫˧ː⌀⌆⌇⌐⌒⌔⌕⌖⌗⌙⌠⌡⌤⌬⌭⌮⌯⌰⌱⌲⌳⌊⌋⌸⌻⌾⍋⍒⍚⍝⎎⎍⏧⏣⎲⎳⏈⏅⏂⏁⏄⎶⎓⎔⍦⎑⎊⎄⍢⍽⍿⍾⍼⍻∭∴⊨⊇∝⎛⎜⎝ ⎟ ⎬ ⎨⏚␢⏛␣├┤┴║╖╜╮╰░▒▓▘▝▤▵△▽▿◊◎◙◫◬☉☊☋☌☍☖☤♃♄♅♆♮⚀⚘⚞⚟⚭⚮⚯⚲⚳⚴⛫⚵⚶⚷⚸⚹⚺⚻⚼⛬⛮⛯⛶⛼⛻⟱⤋⥉⥏⥌⥍⥑Ⱡⱡ〄﴾﴿︗︘︴︷︸⎡⎤⎧⎨⎩⎫⎬⎭⎰⎱⏞⏟⟀⟁⟂⟃⟄⟇⟈⟉⟌⟐⟓⟔⟗⟕⟖⟘⟜⟟⟠⦡⦷⦼⧰⧸⧹⨌⫵⪥╕╗╛╝╡╢╣╫╭╮╯╰▌▍▎▏▔▚▞▀◍◯▩｟｠∏∐∰≉≮≯≢Ⅎ℧ɐɔɟʞℲ⅋ɹʎ";

const negativePhrases = [
    "Awful Evil",
    "Beyond Hope",
    "Blasphemy",
    "Blood Bath",
    "Broken Hearts",
    "Broken Spirit",
    "Cursed Luck",
    "Cursed",
    "Dark Fate",
    "Defeat",
    "Defeated",
    "Descent",
    "Fallen Below",
    "Fire Walk",
    "Forbidden",
    "Go Down",
    "Incineration",
    "Instability",
    "Lost Glory",
    "Lost Hope",
    "Low Ball",
    "Misfortune",
    "Nullification",
    "Shame",
    "Sinister Odds",
    "So Below",
    "Solar Eclipse",
    "Strike",
    "Under",
    "Underhanded",
    "Unstable",
    "Wanting",
    "Wild Low",
    "You Sink",
];
const positivePhrases = [
    "Ambitious",
    "Ascension",
    "Blessings",
    "Champion Spirit",
    "Clutch Performance",
    "Diamond Dreams",
    "Divinity",
    "Elite Ambition",
    "Field Of Triumph",
    "Go Up",
    "Golden Glove",
    "Grand Slam",
    "Hero Journey",
    "Home Run",
    "Idolized",
    "Magic",
    "Over",
    "Partytime",
    "Shining Suns",
    "Swing Stars",
    "The Sun",
    "Triumphant",
    "Victory",
    "Winning Streak",
];




class PlotDevice {

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, PlotDevice.prototype);
        return jsonObject;
    }

    // static choiceCount(count, array) {
    //     const shuffled = array.slice().sort(() => Math.random() - 0.5); // Shuffle the array
    //     return shuffled.slice(0, count); // Return the first 3 items from the shuffled array
    // }
    static crypticPhrase(phraseArray) {
        let result = "";
        const word = HelpMe.choice(phraseArray);
        for (let eachLetter of word) {
            result += HelpMe.choice(crypticUnicode) + HelpMe.choice(crypticUnicode) + eachLetter;
        }
        return result + HelpMe.choice(crypticUnicode) + HelpMe.choice(crypticUnicode);

    }


    constructor(model) {
        //console.log("Constructor called"); // Debugging
        this.introScript = [];
        this.endScriptPositive = [];
        this.endScriptNegative = [];
        this.plotPoints = [];
        this.state = PlotDeviceState.LOAD_INTRO_SCRIPT; // Ensure the initial state is set
        //console.log("this.state initialized:", this.state);
    }

   

    getJudgement(model) {
        // did user reach the goal?
        const vp =
            model.users[0].getVictoryPoints()
        if (vp >= model.users[0].getGoal()) {
            //this.addSuccessAlerts(model);
            this.loadEndScriptPositive(model);
            // model.users[0].valuables.money += model.users[0].getReward();
            // model.users[0].level++;
            // model.users[0].valuables.setMagicToZero();
            return {
                username: "⚙︎⧫︎⏁⨅⩊⟅⟁⤫ ⩎⧆⟠⏞⤧⦸⨷⟊⏂⏇⤂⩏⧨⩰",
                colorScheme: { light: "#000", mid: "#FFD700", dark: "#FFD700", background:"#FFD700"},
                log: "<div style='background:#FFD700;color:black;text-align:center;'>" + PlotDevice.crypticPhrase(positivePhrases) + "</div>",
            };
        } else {
            //this.addFailureAlerts(model);
            this.loadEndScriptNegative(model);
            // model.users[0].valuables.money += model.users[0].getReward();
            // model.users[0].lives--;
            return {
                username: "⚙︎⧫︎⏁⨅⩊⟅⟁⤫ ⩎⧆⟠⏞⤧⦸⨷⟊⏂⏇⤂⩏⧨⩰",
                colorScheme: { light: "#000", mid: "#A16DC3", dark: "#A16DC3", background:"#A16DC3"},
                log: "<div style='background:#A16DC3;color:black;text-align:center;'>" + PlotDevice.crypticPhrase(negativePhrases) + "</div>",
            };
        }
    }

    generatePosts(_username, _colorScheme, _log) {
        const plotPosts = []
        if (Array.isArray(_log)) {
            for (let eachLog of _log) {
                plotPosts.push(
                    {
                        username: _username,
                        colorScheme: _colorScheme || null,
                        log: eachLog
                    }
                );
            }
        } else if (typeof _log === "string") {
            plotPosts.push(
                {
                    username: _username,
                    colorScheme: _colorScheme || null,
                    log: _log
                }
            );
        }
        return plotPosts;
    }

    // Handle state transitions
    next(model) {
        //console.log("Current state:", this.state);
        switch (this.state) {
            case PlotDeviceState.LOAD_INTRO_SCRIPT:
                 // scripts may be ragged arrays, so flatten
                this.introScript = this.introScript.flat(Infinity);
                this.endScriptNegative = this.endScriptNegative.flat(Infinity);
                this.endScriptPositive = this.endScriptPositive.flat(Infinity);
                this.loadIntroScript();
                this.state = PlotDeviceState.INTRO_SCRIPT
            case PlotDeviceState.INTRO_SCRIPT:
                //console.log("In INTRO_SCRIPT state");
                if (this.plotPoints.length > 1) {
                    return this.plotPoints.shift();
                } else {
                    this.state = PlotDeviceState.JUDGEMENT; // Transition to the next state
                    return this.plotPoints.shift();
                }

            case PlotDeviceState.JUDGEMENT:
                //console.log("Moving to END_SCRIPT state");
                this.state = PlotDeviceState.END_SCRIPT;
                return this.getJudgement(model);

            case PlotDeviceState.END_SCRIPT:
                //console.log("In END_SCRIPT state");
                if (this.plotPoints.length > 1) {
                    return this.plotPoints.shift();
                } else {
                    this.state = PlotDeviceState.END; // Transition to the next state
                    return this.plotPoints.shift();
                }
                break;

            case PlotDeviceState.END:
                // show continue button
                const els = document.getElementsByClassName("nightContinueButton");
                Array.from(els).forEach((el) => { el.classList.remove("hide")});
                break;

            default:
                console.error("Unknown state.");
        }
    }

    loadIntroScript(model) {
        this.plotPoints = [...this.introScript]
    }; 
    loadEndScriptNegative(model) {
        this.plotPoints = [...this.endScriptNegative]
    }
    loadEndScriptPositive(model) {
        this.plotPoints = [...this.endScriptPositive]
    }
}
