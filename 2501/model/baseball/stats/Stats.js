/**
 * Represents player statistics in a game, including batting and pitching metrics.
 */
class Stats {

        /**
         * Restructures a plain JSON object into an instance of the `Stats` class.
         * @param {Object} jsonObject - The plain JSON object to convert.
         * @returns {Stats} The converted object with `Stats` prototype.
         */
        static restructure(jsonObject) {
            jsonObject = Object.setPrototypeOf(jsonObject, Stats.prototype);
            return jsonObject;
        }

        /**
     * Initializes a new instance of the `Stats` class with default values.
     */
        constructor() {

            // Win-loss record

            /** @type {number} Number of games played. */
            this.gamesPlayed = 0;

            /** @type {number} Number of games won. */
            this.wins = 0;

            /** @type {number} Number of games lost. */
            this.losses = 0;

            // Batting stats

            /** @type {number} Number of "Plate Appearances" which are awarded if: got a hit, base on balls, ground out, flyout, strikeout, or sacrifice fly. */
            this.plateAppearances = 0;

            /** @type {number} Number of "At Bats" which are awarded if: ground out, fly out, got a hit, or struck out. */
            this.atBats = 0;

            /** @type {number} Number of hits. */
            this.hits = 0;

            /** @type {number} Number of singles hit. */
            this.singles = 0;

            /** @type {number} Number of doubles hit. */
            this.doubles = 0;

            /** @type {number} Number of triples hit. */
            this.triples = 0;

            /** @type {number} Number of home runs hit. */
            this.homeRuns = 0;

            /** @type {number} Number of runs scored. */
            this.runsScored = 0;

            /** @type {number} Number of sacrifice flies. */
            this.sacrificeFlies = 0;

            /** @type {number} Total number of bases earned. */
            this.totalBases = 0;

            /** @type {number} Number of bases on balls (walks) received. */
            this.basesOnBalls = 0;

            /** @type {number} Number of strikeouts as a batter. */
            this.strikeoutsAtBat = 0;

            /** @type {number} Number of stolen bases. */
            this.stolenBases = 0;

            /** @type {number} Number of times hit by a pitch. */
            this.hitByPitch = 0;

            // Pitching stats

            /** @type {number} Number of innings pitched. */
            this.inningsPitched = 0;

            /** @type {number} Number of strikeouts thrown by the pitcher. */
            this.strikeoutsThrown = 0;

            /** @type {number} Number of runs allowed by the pitcher. */
            this.runsAllowed = 0;

            /** @type {number} Number of home runs allowed by the pitcher. */
            this.homeRunsAllowed = 0;

            /** @type {number} Number of walks allowed by the pitcher. */
            this.walksAllowed = 0;
    
        }


    


        /**
     * Calculates the batting average.
     * @returns {number} Batting average as a fixed-point number or `0` if at-bats are zero.
     */
        getBattingAverage() {
            return (this.atBats > 0 ? (this.hits / this.atBats).toFixed(3) : 0);
        }

                 /**
     * Calculates the hits per game (H/G).
     * @returns {number} H/G as a fixed-point number or `0` if games are zero.
     */
                 getHitsPerGame() {
                    return this.gamesPlayed > 0 ? (this.hits / this.gamesPlayed).toFixed(3) : 0;
                }

        /**
     * Calculates the on-base percentage (OBP).
     * @returns {number} OBP as a fixed-point number or `-1` if at-bats are zero.
     */
        getOnBasePercentage() {
            return this.atBats > 0 ? ((this.hits + this.basesOnBalls + this.hitByPitch) / (this.atBats + this.basesOnBalls + this.hitByPitch + this.sacrificeFlies)).toFixed(3) : 0;
        }

        /**
     * Calculates the on-base plus slugging percentage (OPS).
     * @returns {number} OPS as a fixed-point number or `-1` if at-bats are zero.
     */
        getOnBasePlusSlugging() {
            return this.atBats > 0 ? ((this.atBats * (this.hits + this.basesOnBalls + this.hitByPitch) + this.totalBases * (this.atBats + this.basesOnBalls + this.sacrificeFlies + this.hitByPitch)) / (this.atBats * (this.atBats + this.basesOnBalls + this.sacrificeFlies + this.hitByPitch))).toFixed(3) : -1;
        }

            /**
     * Calculates the runs per game (R/G).
     * @returns {number} R/G as a fixed-point number or `0` if games are zero.
     */
            getRunsPerGame() {
                return this.gamesPlayed > 0 ? (this.runsScored / this.gamesPlayed).toFixed(3) : 0;
            }

                /**
     * Calculates the runs per plate appearance (R/PA).
     * @returns {number} R/PA as a fixed-point number or `0` if plate appearances are zero.
     */
                getRunsPerPlateAppearance() {
                    return this.plateAppearances > 0 ? (this.runsScored / this.plateAppearances).toFixed(3) : 0;
                }

        /**
     * Calculates the earned run average (ERA) for the pitcher.
     * @returns {number} ERA as a fixed-point number or `999` if no innings pitched.
     */
        getEarnedRunAverage() {
            return this.inningsPitched > 0 ? ((this.runsAllowed / this.inningsPitched) * 9).toFixed(3) : 999;
        }

        /**
         * Calculates the average number of strikeouts per nine innings.
         * @returns {number} Strikeouts per nine innings, or 0 if innings pitched is 0.
         */
        getStrikeoutsPerNineInnings() {
            if (this.inningsPitched === 0) return 0; // Avoid division by zero
            return ((this.strikeoutsThrown / this.inningsPitched) * 9).toFixed(2);
        }



        /**
     * Converts a camelCase string key to Title Case format.
     * @param {string} key - The camelCase key to convert.
     * @returns {string} The formatted Title Case string.
     */
        stringFormatKey(key) {
            // Convert camelCase to Title Case
            return key
                .replace(/([A-Z])/g, " $1")
                .replace(/^./, (str) => str.toUpperCase());
        }

    //     /**
    //    * Generates an HTML table displaying the player's statistics.
    //    * @returns {string} HTML string representing the statistics table.
    //    */
    //     getStatsTable() {
    //         const rows = Object.entries(this)
    //             .map(
    //                 ([key, value]) => `
    //       <tr>
    //         <td>${this.stringFormatKey(key)}</td>
    //         <td>${value}</td>
    //       </tr>`
    //             )
    //             .join("");

    //         return `
    //     <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
    //       <tbody>
    //         ${rows}
    //       </tbody>
    //     </table>
    //   `;
    //     }

    /**
     * Generates an HTML table displaying the record and pitching statistics.
     * Additional pitching stats are only shown if inningsPitched > 0.
     * @returns {string} HTML string representing the table.
     */
    getRecordAndPitcherStats() {
        const { gamesPlayed, wins, losses, inningsPitched, strikeoutsThrown, runsAllowed, homeRunsAllowed, walksAllowed } = this;

        const rows = `
        <tr>
            <td>${this.stringFormatKey("gamesPlayed")}</td>
            <td>${gamesPlayed}</td>
        </tr>
        <tr>
            <td>Win Percent</td>
            <td>${gamesPlayed > 0 ? Math.round(wins/gamesPlayed*100)+"%" : "0%"}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("wins")}</td>
            <td>${wins}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("losses")}</td>
            <td>${losses}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("inningsPitched")}</td>
            <td>${inningsPitched}</td>
        </tr>
        ${
            inningsPitched > 0
            ? `
            <tr>
            <td>Earned Run Average</td>
            <td>${this.getEarnedRunAverage()}</td>
            </tr>
            <tr>
            <td>Strikeouts Per 9 Innings</td>
            <td>${this.getStrikeoutsPerNineInnings()}</td>
            </tr>
            <tr>
            <td>${this.stringFormatKey("strikeoutsThrown")}</td>
            <td>${strikeoutsThrown}</td>
            </tr>
            <tr>
            <td>${this.stringFormatKey("runsAllowed")}</td>
            <td>${runsAllowed}</td>
            </tr>
            <tr>
            <td>${this.stringFormatKey("homeRunsAllowed")}</td>
            <td>${homeRunsAllowed}</td>
            </tr>
            <tr>
            <td>${this.stringFormatKey("walksAllowed")}</td>
            <td>${walksAllowed}</td>
            </tr>
        `
            : ""
        }
        `;

        return `
        <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
            <tbody>
                ${rows}
            </tbody>
        </table>
    `.trim();
    }

    /**
     * Generates an HTML table displaying the batter's statistics.
     * @returns {string} HTML string representing the table.
     */
    getBatterStats() {
        const { plateAppearances, atBats, hits, singles, doubles, triples, homeRuns, runsScored, stolenBases, strikeoutsAtBat, sacrificeFlies } = this;

        const rows = `
        <tr>
            <td>Batting Average</td>
            <td>${this.getBattingAverage()}</td>
        </tr>
        <!--tr>
            <td>${this.stringFormatKey("plateAppearances")}</td>
            <td>${plateAppearances}</td>
        </tr-->
        <tr>
            <td>${this.stringFormatKey("atBats")}</td>
            <td>${atBats}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("hits")}</td>
            <td>${hits}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("singles")}</td>
            <td>${singles}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("doubles")}</td>
            <td>${doubles}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("triples")}</td>
            <td>${triples}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("homeRuns")}</td>
            <td>${homeRuns}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("runsScored")}</td>
            <td>${runsScored}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("stolenBases")}</td>
            <td>${stolenBases}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("strikeoutsAtBat")}</td>
            <td>${strikeoutsAtBat}</td>
        </tr>
        <tr>
            <td>${this.stringFormatKey("sacrificeFlies")}</td>
            <td>${sacrificeFlies}</td>
        </tr>
        `;

        return `
        <table class="table table-dark table-striped table-bordered small table-sm table-borderless">
        <tbody>
            ${rows}
        </tbody>
        </table>
    `.trim();
    }


}