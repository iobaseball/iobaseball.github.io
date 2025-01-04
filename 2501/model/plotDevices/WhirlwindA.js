class WhirlwindA extends PlotDevice {
    constructor(model) {
      super(model);
      this.teamPlace = model.world.league.teams[0].place.name;
      this.pitcherName = model.world.league.teams[0].pitcher.getName({firstName:true,nickName:true,lastName:true})
      this.pitcherLastName = model.world.league.teams[0].pitcher.getName({firstName:false,nickName:false,lastName:true})
      this.introScript = [
        // broadcast news
        this.generatePosts(
          model.world.newsNetwork.getFullName(),
          model.world.newsNetwork.colorScheme,
          [
            // "⧫︎⏁⨅⩊⟅⟁⤫⤧⦸⨷⟊⏂⏇⩎⧆⟠⏞⤂⩏⧨⩰⏊⧀⩚⏁⨂⟃⤿ȴɣɮƏǂȢȹʭʚʘʓʋʅɻɸɷɮɕɅ˫˧ː⌀⌆⌇⌐⌒⌔⌕⌖⌗⌙⌠⌡⌤⌬⌭⌮⌯⌰⌱⌲⌳⌊⌋⌸⌻⌾⍋⍒⍚⍝⎎⎍⏧⏣⎲⎳⏈⏅⏂⏁⏄⎶⎓⎔⍦⎑⎊⎄⍢⍽⍿⍾⍼⍻𓀀𓀁𓀂𓀃𓀄𓀅𓀆𓀇𓀈𓀉𓀊𓀋𓀌𓀍𓀎𓀏𓀐𓀑𓀒𓀓𓀔𓀕𓀖𓀗𓀘𓀙𓀚𓀛𓀜𓀝∭∴⊨⊇∝⎛⎜⎝ ⎟ ⎬ ⎨⏚␢⏛␣├┤┴║╖╜╮╰░▒▓▘▝▤▵△▽▿◊◎◙◫◬☉☊☋☌☍☖☤♃♄♅♆♮⚀⚘⚞⚟⚭⚮⚯⚲⚳⚴⛫⚵⚶⚷⚸⚹⚺⚻⚼⛬⛮⛯⛶⛼⛻⟱⤋⥉⥏⥌⥍⥑Ⱡⱡ〄﴾﴿︗︘︴︷︸⎡⎤⎧⎨⎩⎫⎬⎭⎰⎱⏞⏟⟀⟁⟂⟃⟄⟇⟈⟉⟌⟐⟓⟔⟗⟕⟖⟘⟜⟟⟠⦡⦷⦼⧰⧸⧹⨌⫵⪥🜃🜁🜚☿🜶🜍🜅🜆🜉🜓🜖🜏🝛🝰🝮🜎🜇🜟🜤🜽🜼🜷🜴🜳🜰🝃🝄🝘🝭🝖🝠🝲🝣╕╗╛╝╡╢╣╫╭╮╯╰▌▍▎▏▔▚▞▀◍◯▩｟｠⊛≗∀∌∄∏∐∰≉≮≯≢≾≿⋰⋱⋎⋏⨇⨈⨹⨺⨻⩑⩒⩓⩔⩕⩖⩗⩘⩙⩚⩛⩜⩝⩞⩟⪓⪔⫷⫸ⅎ⅏⅄⅁	⅂℺Ⅎ℧⟅⟆⦕⦖⧚⧛⎛⎜⎝⎞⎟⎠⎡⎢⎣⎤⎥⎦⎧⎨⎩⎪⎫⎬⎭⎮⎷⍓⍔⍌⍍⭔⬯⬠⬡◌⃜◌⃝◌⃞◌⃟◌⃥◌⃦∃ɐɔɟʞℲ⅋ɹʎ",
            HelpMe.choice([
              `BREAKING NEWS: League Laments Lavish Spending, Launches Leaner Logistics`,
              `BREAKING NEWS: Budget Cuts Bring Baseball Back to Basics`,
              `BREAKING NEWS: League Embraces Simpler, Savvier Baseball with Budget Cuts`,
              `BREAKING NEWS: Baseball Returns to Roots with Streamlined Spending`

            ]),
            HelpMe.choice([
                `KERNELS CURB COSTS — The league announced new budget-saving ballpark bites today. Only un-popped popcorn will be offered at the stands!`,
                `KERNELS CURB COSTS — The league announced new money-saving snacks today. For a penny-pinching pop, un-popped popcorn is now the only option at the stands!`
            ]),
            HelpMe.choice([
              `Fans can enjoy the excitement of popping their own kernels right in their seats. Bring your own pan, or share a campfire with the fan next to you!`,
              `Fans can savor the thrill of popping their own kernels right in their seats—just don't forget to bring your stovetop!`,
            ]),
            `PITCHING PLAINS PREVAIL — In a bold move to save a buck and shake things up, the traditional pitching mound has been scrapped in favor of the "pitching flat."`,
            `Not just a money-saver on dirt, this innovation puts pitchers and batters on equal footing—literally!`,
            
            HelpMe.choice([
              `We will keep you up-to-date as this budget crunch continues.`,
              `We will update you as the budget squeeze storms ahead.`,
              `We will keep you posted as the penny-pinching process progresses`,
              `We will update you as the cost-cutting crusade continues`
            ]),
            `In other news, ${this.teamPlace} pitcher ${this.pitcherName} has reportedly taken up knitting in the locker room.`,
            `A new hobby, or just a way to calm nerves before a big game?`,
            `When asked for comment, ${this.pitcherLastName} looked into the sky and whispered a single curious phrase-`
        
        ]
        ),
        
      ];
      // end of intro script
  
      // END SCRIPT NEGATIVE ------------------------------------------------------------------------------------------
  
      this.endScriptNegative = [
        // broadcast news
        this.generatePosts(
          model.world.newsNetwork.getFullName(),
          model.world.newsNetwork.colorScheme,
          `That's all for now, ladies and gents! Stay tuned for more twists, turns, and terrific tales from the world of baseball—this is ${model.world.newsNetwork.getReporterName()} for ${model.world.newsNetwork.getNewsAbbreviation()}, ${model.world.newsNetwork.getNewsName()} signing off!`
        ),
        
      ];
  
      // END SCRIPT POSITIVE ------------------------------------------------------------------------------------------
  
      this.endScriptPositive = [
        // broadcast news
        this.generatePosts(
            model.world.newsNetwork.getFullName(),
            model.world.newsNetwork.colorScheme,
            `That's all for now, ladies and gents! Stay tuned for more twists, turns, and terrific tales from the world of baseball—this is ${model.world.newsNetwork.getReporterName()} for ${model.world.newsNetwork.getNewsAbbreviation()}, ${model.world.newsNetwork.getNewsName()} signing off!`
          ),
      ];
    } // end of constructor
  }
  