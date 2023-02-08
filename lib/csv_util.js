const fs = require('fs');
const path = require('path');

const writeTeamCsv = async function(data, callback) {
    const headers = [
        "Team ID", 
        "Team Name", 
        "Team Venue Name",
        "Games Played",
        "Wins",
        "Losses",
        "Points",
        "Goals Per Game",
        "Game Date of First Game of Season",
        "Opponent Name in First Game of Season"
    ];
    const teamDataToArray = [
        data.id,
        data.name,
        data.venueName,
        data.gamesPlayed,
        data.wins,
        data.losses,
        data.points,
        data.gpg,
        data.gameDate,
        data.opponent
    ];
    const filename = `./csvs/${data.seasonId}-${data.name}.csv`
    fs.writeFile(filename, headers.join(',') + "\n" + teamDataToArray.join(',') + "\n", (err) => {
        if (err) {
            callback(err);
        } else {
            callback(void(0), filename);
        } 
    });
}

const writePlayerCsv = async function(data, callback) {
    const headers = [
        "Player ID",
        "Player Name",
        "Current Team",
        "Player Age",
        "Player Number",
        "Player Position",
        "If the player is a rookie",
        "Assists",
        "Goals",
        "Games",
        "Hits",
        "Points"
    ];
    const playerDataToArray = [
        data.id,
        data.name,
        data.team,
        data.age,
        data.number,
        data.position,
        data.rookie,
        data.assists,
        data.goals,
        data.games,
        data.hits,
        data.points
    ]
    const filename = `./csvs/${data.seasonId}-${data.name}.csv`
    fs.writeFile(filename, headers.join(',') + "\n" + playerDataToArray.join(',') + "\n", (err) => {
        if (err) {
            callback(err);
        } else {
            callback(void(0), filename);
        } 
    });
}

module.exports = {
    writeTeamCsv,
    writePlayerCsv
  }