class WhirlwindB extends PlotDevice {
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
              `BREAKING NEWS: Continuing Budget Cuts Revitalize Baseball, Fans Relish Return to Simplicity`,
              `BREAKING NEWS: Big Cuts Continue—Baseball's Budget Gets Brutal Chop`,
              `BREAKING NEWS: Baseball Budget Cuts Continue to Batter League`,
            ]),
            HelpMe.choice([
              `NOSTALGIC NIGHT GAMES — Forget the floodlights, it's time for "vintage torchlight" to shine!`,
              `NOSTALGIC NIGHT GAMES — Say farewell to glaring stadium lights, and hello to the cozy charm of "vintage torchlight"!`
          ]),
          `Players will navigate the field by moonlight and the flicker of flaming torches, making every long fly ball an un-electrifying adventure.`,

            
            `MASCOT MERGER MASTERPIECE — The league has decided to streamline its mascot efforts with a single, all-encompassing character. Why bother with multiple mascots when one can do it all?`,
            `Players and fans will now be thrilled by the league's latest creation: a bizarre half-bird, half-bear with the head of a donkey, a trumpet nose, and the legs of a kangaroo.`,
            `This curious creature, named "Featherpaws McBray," promises to captivate with its signature hops and cheerful honks.`,
            `I asked one young fan how they felt about the new league mascot and they replied-`
        
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
          HelpMe.choice([
            `We will keep you current as this cost-cutting crunch continues.`,
            `We will track this belt-tightening turmoil as it continues to unfold.`,
        ]),
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
  