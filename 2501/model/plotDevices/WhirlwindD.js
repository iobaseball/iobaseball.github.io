class WhirlwindD extends PlotDevice {
  constructor(model) {
    super(model);
    this.introScript = [
      // broadcast news
      this.generatePosts(
        model.world.newsNetwork.getFullName(),
        model.world.newsNetwork.colorScheme,
        [
          `This is ${model.world.newsNetwork.getReporterName()} for ${model.world.newsNetwork.getNewsAbbreviation()}, ${model.world.newsNetwork.getNewsName()}.` +
            " " +
            HelpMe.choice([
              `Reporting live from lovely ${
                model.world.getGameDetails()[0].homeTeamPlace.name
              } tonight.`,
              `Reporting live from beautiful ${
                model.world.getGameDetails()[0].homeTeamPlace.name
              } tonight.`,
            ]),
          HelpMe.choice([
            `Following the final flourish of the game, the Commissioner of Baseball called for an unscheduled press conference. The tension is thick, the mood murky.`,
            `After the conclusion of the game, the Commissioner of Baseball announced an unscheduled press conference. The atmosphere is tense and uncertain.`,
          ]),
          HelpMe.choice([
            `Dozens of players, staffers, and league luminaries have gathered in the press room. Concern creeps amongst the crowd of competitors.`,
            `Dozens of players, staff, and league officials have assembled in the press room. Worry lingers among the crowd.`,
          ]) +
            " " +
            HelpMe.choice([
              `The Commissioner is striding to the stage, stepping into the spotlight, and ready to speak.`,
              `The Commissioner is making his way to the stage, stepping into the spotlight, ready to address the room.`,
            ]),
        ]
      ),
      // commissioner
      this.generatePosts(
        model.world.league.getCommissionerFullName(),
        model.world.league.colorScheme,
        [
          "Alright, folks. " +
            HelpMe.choice([
              "That was fun.",
              "Wow! What a day!",
              "Baseball baseball baseball. Am I right?",
              "Is it just me or did today simply fly by!",
              "Gosh. Now I know why they call baseball 'The Beautiful Game' ",
              "As we say in baseball... 'everybody huddle up' ",
              "These are exciting times",
              "Well, that was a home run of a day, wasn't it?",
              "Phew! What a game-changer of a day.",
              "Wow, today felt like running bases non-stop. Who's with me?",
              "Before we start, does anyone have good news?",
              "Did anyone see that game earlier?",
              "How about this weather? Weird right?",
              "Should we get started?",
              "Let's see... light banter... Anybody into jazz? Any jazz fans in the house? No?",
              "Does anyone have any burning questions before we dive in? No?",
              "Anyone want to volunteer some good news before we begin? No?",
              "Can someone remind me why we're in the baseball business? No?",
              "Did someone give me a double-shot in my coffee... because I feel wired!",
              "Is it just me or do we need so more coffee?",
              "*taps microphone* Is this thing ONLINE?",
              "*taps microphone* Can you hear me out there?",
              "*taps microphone* Testing, testing, 1-2-3.",
              "*taps microphone* Hello hello",
              "*taps microphone* ECHO!!! Echo!! Echo! echo",
              "*taps microphone* Is there an echo in here, or is it just static?",
              "Let's do this.",
              "Let's get down to business.",
              "Here we go again.",
              "Everyone...",
              "Hope you're ready for this one.",
              "Here's hoping this is productive.",
              "Let's keep this pain to a minimum, shall we?",
              "Let's not waste any more time.",
              "Let's make this quick.",
              "Let's jump right in.",
              "Let's see... Nullification. Incineration.",
              "Okay. Welcome back.",
              "So... let's get started, I guess.",
              "Okay, folks, settle in.",
              "Let's see how this goes.",
              "We step up to the plate and here's the pitch...",
              "Step up to the plate. Here's the pitch.",
              "We gotta get started.",
              "Something's brewing. And it's not coffee.",
              "Looks like we're in the bottom of the inning.",
              "Well, I assume we all know why we're here... I hope.",
              "Buckle up. This meeting might be a bumpy ride.",
              "Let's try to keep this short.",
              "Here's a weather forecast. There's a storm brewing.",
              "Let's dive right into the chaos, shall we?",
              "Let's dive in and hope this doesn't turn into a disaster.",
            ]),
          HelpMe.choice([
            "We're shutting this league down. We're through.",
            "It's over. We're shutting this league down.",
            "We're shutting this league down. This is the end.",
            "Well, let's get this over with. We're shutting this league down.",
            "We're done here. We're shutting this league down.",
          ]),
        ]
      ),
      // end of commissioner
      // broadcast news
      this.generatePosts(
        model.world.newsNetwork.getFullName(),
        model.world.newsNetwork.colorScheme,
        `BREAKING: io League Baseball Cancels Competition, Calls It Quits.`
      ),
      // back to commissioner
      this.generatePosts(
        model.world.league.getCommissionerFullName(),
        model.world.league.colorScheme,
        "The cutbacks aren't working. We're almost out of money, so... " +
          HelpMe.choice([
            "you're all fired.",
            "your services are no longer required. Don't let the door hit you on the way out. You're all fired.",
            "consider this your final curtain call. Take a bow and exit stage left. You're all fired.",
            "we're downsizing... by 100%. Spoiler alert: You didn't make the cut. You're all fired.",
            "effective immediately, you're being relieved of your duties. You're all fired.",
            "the league's moving in a new direction. We're selling everything for scrap. You're all fired.",
            "consider this your permanent vacation notice. Enjoy it. You're all fired.",
            "let's just say... we're decluttering the office. EVERYTHING must go. You're all fired.",
            "you've been reassigned. Your job title is now: unemployed. You're all fired.",
          ])
      ),
      // broadcast news
      this.generatePosts(
        model.world.newsNetwork.getFullName(),
        model.world.newsNetwork.colorScheme,
        [
          "BREAKING BULLETIN: Commissioner Hurls Hardball, Cancels League, Cuts Careers Cold.",
          HelpMe.choice([
            "Gasps gripped the gathered group at the grim proclamation.",
            "Gasps seized the gathered crowd at the grim announcement.",
          ]) +
            " " +
            HelpMe.choice([
              "Players and personnel are pained, paralyzed, and predictably perturbed.",
              "Players and staff are shaken, frozen in place, and understandably upset.",
            ]),
        ]
      ),
      // back to commissioner
      this.generatePosts(
        model.world.league.getCommissionerFullName(),
        model.world.league.colorScheme,
        [
          HelpMe.choice([
            "The current business model simply isn't sustainable.",
            "We're burning through our seed money. Once that's gone, no more sunflower seeds.",
            "Finance department is a literal black hole",
            "This job pays peanuts compared to other industries.",
            "Hope I don't sound too heavy-handed, but the league's a sinking ship. We're too dense.",
            "We're swimming in shark-infested waters",
            "We're bleeding money faster than we can make it.",
            "It's like pulling teeth trying to get anything done around here. I LOVE pulling teeth, but it's just not a long-term solution.",
            "This place feels more like a desert than a business some days.",
          ]) +
            " " +
            HelpMe.choice([
              "Look on the bright side. Finding a new job can be fun!",
              "Look on the bright side. Unemployment might suit you better.",
              "Look on the bright side. We might be able to flee the country before the debt collectors get here.",
              "It's not personal. It's just business and you're all bad at business.",
              "Without your job, you'll have more free time now.",
              "Don't be sad. Not everyone is cut out for greatness.",
              "Think of this as a learning experience: don't disappoint your next boss.",
              "Well, we all saw this coming, didn't we?",
              "I'm doing you a favor. You should be thanking me for this wake-up call.",
              "Chin up! It's not like you were making a huge impact here anyway.",
              "Good luck out there. You're going to need it. This is a tough job market.",
            ]),
          HelpMe.choice([
            "Our expansion strategy is about as effective as a fish trying to swim upstream.",
            "No new growth or expansion. Our only area of expansion is our debts.",
            "No new growth or expansion. The magic is gone, folks.",
            "No growth or expansion. I wouldn't blame the investors if they jumped ship.",
            "No growth or expansion. Some days it feels like all the blood has drained from this place.",
          ]) +
            " " +
            HelpMe.choice([
              "The management doesn't trust any of you anymore. Who can blame them?",
              "You've burned through so many managers. Why? What's your problem with management?",
              "The budget is tight because you wasted too much time fighting management instead of doing your job.",
              "If you think fighting with the management will save this league, you've been misled.",
            ]),
          HelpMe.choice([
            "You've missed deadlines because you lack discipline.",
            "You act like discipline isn't needed here.",
            "Your lack of discipline is why we're always cleaning up the same messes.",
            "You have no discipline, this league is just a collection of individual excuses.",
            "Discipline starts with accountability, and accountability starts with you.",
            "The lack of discipline here isn't a surprise, considering how little effort you put in.",
          ]),
          HelpMe.choice([
            "If we act quickly, we can sell off some junk and make a little money.",
            "Alright, enough whining. We can sell off some junk and make a little money.",
            "Forget the mistakes. Let's pivot, sell off some junk, and make a little money.",
            "We can't change the past, but we can sell off some junk and make a little money.",
            "Let's put our focus on quick wins. Let's sell off some junk and make a little money.",
            "Stop the blame game. Let's pivot, sell off some junk, and make a little money.",
          ]),
          HelpMe.choice([
            "We can sell these fax machines.",
            "We can sell these old coffee cups.",
            "We can sell those flood pumps.",
            "We can sell the solar panels.",
            "We can sell the salmon cannons.",
          ]) +
            " " +
            HelpMe.choice([
              "We can sell all the leftover concessions.",
              "Stale popcorn is still good, right?",
              "We can sell these bags of peanuts.",
              "There's that huge bin that's full of stolen shoes. It's a nice bin. If we empty it out I bet somebody will buy that bin.",
              "We can auction off that whiteboard that no one's used since making those YouTube videos.",
            ]) +
            " " +
            HelpMe.choice([
              "Does anyone want to buy a bucket of chum?",
              "Anyone want to buy a wet pretzel?",
              "Does anyone want to buy some cold fries?",
              "Anyone want to buy a some snake oil?",
              "Does anyone want to buy a lootcrate?",
              "Anyone want to buy a square sun?",
              "Does anyone want to buy a news ticker?",
              "Anyone want to buy a microphone?",
              "Does anyone want to buy a vault?",
              "Anyone want to buy a forbidden book?",
            ]),
          HelpMe.choice([
            "Everything must go!",
            "Make an offer!",
            "Who wants to make a deal?",
            "Prices are negotiable—always.",
            "I'll cut you a deal if you act fast!",
            "Cash talks. Let's make it happen.",
            "Don't wait. This offer won't last forever!",
          ]) +
            " " +
            HelpMe.choice([
              "As my old Boss used to say... 'Profits!' ",
              "As my old Boss used to say... 'Sometimes the baseball business isn't easily blexplained' ",
              "As my old Boss used to say... 'Please don't incinerate me' ",
              "As my old Boss used to say... 'It's called the baseball BUSINESS, not baseball friend-ness' ",
            ]),
          HelpMe.choice([
            "Lol. What was I saying? Oh yeah...",
            "Right? Anyway as I was saying...",
            "Ha. So as I was saying...",
            "Haha. In conclusion...",
            "Hahaha. In summary...",
          ]),
          HelpMe.choice([
            "We're shutting this league down. You're all fired. io League Baseball is... over? What is that?",
            "It's over. You're all fired. io League Baseball is... through? What is that?",
            "This is the end. You're all fired. io League Baseball is... over? Who is that?",
            "We're done here. You're all fired. io League Baseball is... through? Who is that?",
            "The season is over. You're all fired. io League Baseball is... done? What's happening?",
            "This league is through. You're all fired. io League Baseball is... done? What's happening?",
            "You're all fired. The season is over. io League Baseball is... done? What is that?",
          ]),
        ]
      ),
      // broadcast news
      this.generatePosts(
        model.world.newsNetwork.getFullName(),
        model.world.newsNetwork.colorScheme,
        [
          "Something strange is stirring, folks. The commissioner stopped suddenly as a foul, foreboding wind whipped wildly through the press room.",
          "The ominous occurrence rattled the windows, sending the American flags on the stage flailing in a frenzied flurry. The air was filled with an eerie echo like a chilling chorus of cries, causing reporters to clutch their coats and hats.",
          "The doors slammed shut with a deafening din, silencing the scene and leaving everyone frozen in fear. A mysterious, melodic voice murmured...",
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
        "The lights flickering faintly, followed by a heavy hush. After a brief, breathless beat, the Commissioner continued."
      ),
      // back to commissioner
      this.generatePosts(
        model.world.league.getCommissionerFullName(),
        model.world.league.colorScheme,
        [
          "That strange... uh... indoor wind storm... just gave me a brilliant idea. We have insurance right?!",
          "H.R. is telling me that insurance claims were never filed, because our insurance does NOT cover some Acts Of Gods nonsense? ",
          "This is amazing! I'll handle it. I'm handling it I've got a guaranteed new revenue stream, folks. You'll see!",
          "Consider yourselves un-fired. I've saved the league once again. I just keep impressing myself!",
          "The league is not shutting down after all. Play ball!",
        ]
      ),
      // broadcast news
      this.generatePosts(
        model.world.newsNetwork.getFullName(),
        model.world.newsNetwork.colorScheme,
        [
          "UPDATE: Curveball Commissioner Changes Course, Un-Cancels League, Announces New Insurance Subterfuge Strategy.",
          
        ]
      ),
    ];

    // END SCRIPT POSITIVE ------------------------------------------------------------------------------------------

    this.endScriptPositive = [
      // broadcast news
      this.generatePosts(
        model.world.newsNetwork.getFullName(),
        model.world.newsNetwork.colorScheme,
        "The lights flickering faintly, followed by a heavy hush. After a brief, breathless beat, the Commissioner continued."
      ),
      // back to commissioner
      this.generatePosts(
        model.world.league.getCommissionerFullName(),
        model.world.league.colorScheme,
        [
          "That strange... uh... indoor wind storm... just gave me a brilliant idea. We have insurance right?!",
          "H.R. is telling me that insurance claims were never filed, because our insurance does NOT cover some Acts Of Gods nonsense? ",
          "This is amazing! I'll handle it. I'm handling it I've got a guaranteed new revenue stream, folks. You'll see!",
          "Consider yourselves un-fired. I've saved the league once again. I just keep impressing myself!",
          "The league is not shutting down after all. Play ball!",
        ]
      ),
      // broadcast news
      this.generatePosts(
        model.world.newsNetwork.getFullName(),
        model.world.newsNetwork.colorScheme,
        [
          "UPDATE: Curveball Commissioner Changes Course, Un-Cancels League, Announces New Insurance Subterfuge Strategy.",
        ]
      ),
    ];
  } // end of constructor
}
