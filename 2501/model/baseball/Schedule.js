    /* this is an "abstract" parent class that contains basic resources all schedules share */
    class AbstractSchedule {

        static restructure(jsonObject) {
            Object.setPrototypeOf(jsonObject, AbstractSchedule.prototype);
            for (let i = 0; i < jsonObject.days.length; i++) {
                for (let j = 0; j < jsonObject.days[i].length; j++) {
                    jsonObject.days[i][j] = Game.restructure(jsonObject.days[i][j]);
                }
            }
            return jsonObject;
            }

        constructor(teams) {
            this.hasStarted = false;
            this.done = false;
            this.teams = teams;
            this.standings = {};
            // this.days is a 2Darray. Each inner array represents a day. Each day contains 1 or more Games.
            this.days = [[]];
            this.printSchedule = [[]]
        }    

        isTodayDone(dayNumber){
            if(dayNumber == null) throw new Error("dayNumber is null")
            let gamesToday = this.days[dayNumber];
            for(let eachGame of gamesToday){
                if(eachGame.isGameOver() === false){
                    return false;
                }
            }
            return true;
        }

        setPrintSchedule(){
            for (let i=0; i < this.days.length; i++) {
                for (let j=0; j < this.days[i].length; j++) {
                    this.printSchedule[i][j] = this.days[i][j].getScore();
                }
                this.printSchedule.push([]);
            }
        }
    }