class PlaceholderCard extends TradingCard{
    constructor() {
        super(null, null, {light:"#000",mid:"#000",dark:"#000",text:"#FFF"}, 0, 0, new Valuables({}), "")
        //const card = new TradingCard(null, null, {light:"#000",mid:"#000",dark:"#000",text:"#FFF"}, 0, 0, new Valuables({}), "");
        this.leagueIdNumber = -1;
        // Placeholder card setup
        this.container.innerHTML = `
            <trading-card 
                name="Your Cards Go Here"
                cardline1="Placeholder <span class='noto'>🫥</span>"
                cardline2="This Is Where I'd Put My Cards"
                cardline3="If I Had Any"
                cardline4="(not a real card)"
                cost="?"
                colorlight="rgba(127,127,255,0.0)"
                colormid="rgba(127,127,255,0.0)"
                colordark="rgba(127,127,255,0.0)"
                emoji=" "
                fontSize="13px"
                fontFamily="Arial,sans-serif">
            </trading-card>`.trim();
    }

    render(){
        const container = View.createElement("span")
            container.innerHTML = `
                <trading-card 
                    name="Your Cards Go Here"
                    cardline1="Placeholder <span class='noto'>🫥</span>"
                    cardline2="This Is Where I'd Put My Cards"
                    cardline3="If I Had Any"
                    cardline4="(not a real card)"
                    cost="?"
                    colorlight="rgba(127,127,255,0.0)"
                    colormid="rgba(127,127,255,0.0)"
                    colordark="rgba(127,127,255,0.0)"
                    emoji=" "
                    fontSize="13px"
                    fontFamily="Arial,sans-serif">
                </trading-card>`.trim();
                return container;
        
    }
}