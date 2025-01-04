class BaseballGameBoxScore {

    static restructure(jsonObject) {
        Object.setPrototypeOf(jsonObject, BaseballGameBoxScore.prototype);
        return jsonObject;
    }

    constructor(awayTeam, homeTeam) {
        if(awayTeam===null) throw new Error("awayTeam can not be null");
        if(homeTeam===null) throw new Error("homeTeam can not be null");
        
        this.away = {
                name: awayTeam.getFullNameWithLink(),
                innings: [],
                runs: 0,
                hits: 0, 
                errors: 0  
            };
        this.home = {
                name: homeTeam.getFullNameWithLink(),
                innings: [],
                runs: 0, 
                hits: 0, 
                errors: 0  
            };
        
    }

    addNewInning(isTopOfInning, inningNumber){
        if(isTopOfInning===null) throw new Error("isTopOfInning can not be null");
        if(inningNumber===null) throw new Error("inningNumber can not be null");
        // check if new inning needs added to box score
        if(isTopOfInning && inningNumber > this.away.innings.length){
            this.away.innings.push(0);
        }
        if(!isTopOfInning && inningNumber > this.home.innings.length){
            this.home.innings.push(0);
        }
    }

    incrementHits(isTopOfInning) {
        if(isTopOfInning===null) throw new Error("isTopOfInning can not be null");
        if (isTopOfInning) {
            this.away.hits++;
        } else{
            this.home.hits++;
        }
    }

    incrementScore(isTopOfInning) {
        if(isTopOfInning===null) throw new Error("isTopOfInning can not be null");
        if (isTopOfInning) {
            this.away.innings[this.away.innings.length - 1]++;
            this.away.runs++;
        } else{
            this.home.innings[this.home.innings.length - 1]++;
            this.home.runs++;
        }
    }

    getBoxScoreTable() {
        const maxInnings = Math.max(
            this.away.innings.length,
            this.home.innings.length
        )
            
        ;

        const inningsHeaders = Array.from({ length: maxInnings }, (_, i) => `<th class="text-secondary">${i + 1}</th>`).join("");

        const formatInnings = (innings, max) =>
            Array.from({ length: max }, (_, i) => `<td>${innings[i] ?? ""}</td>`).join("");

        return `
            <table class="table table-dark table-striped table-bordered text-center shadow overflow-hidden">
                <thead>
                    <tr>
                        <th class="text-secondary">Team</th>
                        ${inningsHeaders}
                        <th class="text-secondary">R</th>
                        <th class="text-secondary">H</th>
                        <th class="text-secondary">E</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-start">${this.away.name}</td>
                        ${formatInnings(this.away.innings, maxInnings)}
                        <td>${this.away.runs}</td>
                        <td>${this.away.hits}</td>
                        <td>${this.away.errors}</td>
                    </tr>
                    <tr>
                        <td class="text-start">${this.home.name}</td>
                        ${formatInnings(this.home.innings, maxInnings)}
                        <td>${this.home.runs}</td>
                        <td>${this.home.hits}</td>
                        <td>${this.home.errors}</td>
                    </tr>
                </tbody>
            </table>
        `.trim();
    }
    

    getScore(inningString) {
        if(inningString===null) throw new Error("inningString can not be null")
        if (this.away.innings.length == 0) {
            return this.away.name 
            + " @ " 
            + this.home.name 
        }
        return "<span class='pe-4'>" 
        + inningString 
        + "</span><span class='pe-4'>" 
        + this.away.name 
        + ":&nbsp;" + this.getAwayScore() 
        + "</span><span class='pe-4'>" 
        + this.home.name 
        + ":&nbsp;" + this.getHomeScore()
        + "</span>";
    }

    getAwayScore(){
        return this.away.runs;
    }

    getHomeScore(){
        return this.home.runs;
    }
}