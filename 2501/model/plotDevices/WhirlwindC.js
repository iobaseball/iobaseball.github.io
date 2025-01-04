class WhirlwindC extends PlotDevice {
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
            
            HelpMe.choice([
              `BREAKING NEWS: Continued Cost-Cutting Revives Retro Baseball for Fans`,
              `BREAKING NEWS: League Continues to Cut Costs, Fans Cheer Bare-Bones Baseball`,
              `BREAKING NEWS: League's Leaner Look Lingers as Budget Cuts Persist`
            ]),

            `ICEBOX INITIATIVE — The league has announced that all refrigerators and iceboxes at the stadium will be unplugged overnight to conserve energy.`,
            `Hot dogs bring the heat, while drinks take it easy with a relaxed, lukewarm charm.`,
            `SCALED-DOWN STRIKE ZONE — As a money-saving measure, the strike zone has been reduced and will now be referred to as the "strike subdivision."`,
            `Fans are excited about the new fun-sized boundary, which is already sparking lively debates.`,
            
            HelpMe.choice([
                `We wiil follow the fiscal fallout as this budget battle brews.`,
                `We will follow this story as the fiscal frugality fuels further cuts.`
            ]),
            `In a follow-up story, beloved league mascot Featherpaws McBray was caught distributing bootleg popcorn to fans at the game.`,
            `When asked for comment, Featherpaws McBray refused to speak and instead pointed to a series of hidden, arcane markings on the concession stand-`
        
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
  