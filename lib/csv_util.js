const fs = require('fs');
const path = require('path');

const writeTeamCsv = async function(data, callback) {
    console.log('write team csv');
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

module.exports = {
    writeTeamCsv,
  }