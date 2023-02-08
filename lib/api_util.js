const request = require('superagent');
const async = require('async');

const NOERROR = void(0);
const DONE = 'DONE';

let teams = void(0);
let inactiveTeams = void(0);

const getInactiveTeams = async function() {
  let ids = teams.map(t => t.id);
  let inactiveIds = []
  for (let i = 1; i < ids[ids.length - 1]; i++) {
    if (!ids.find(id => id === i)) {
      inactiveIds.push(i);
    }
  }
  request
    .get(`https://statsapi.web.nhl.com/api/v1/teams/?teamId=${inactiveIds.join(',')}`)
    .end((err, res) => {
      if (err) {
        console.log(err);
      } else {
        inactiveTeams = res.body.teams;
      }
    })
}

const getTeams = async function() {
  if (!teams) {
    try {
      let resp = await request.get('https://statsapi.web.nhl.com/api/v1/teams');
      teams = resp.body.teams;
      await getInactiveTeams();
      return teams;
    } catch (err) {
      console.error(err);
    }
  } else {
    return teams;
  }
}
const getTeam = async function(team_id) {
  try {
    let resp = await request.get(`https://statsapi.web.nhl.com/api/v1/teams/${team_id}`);
    teams = resp.body.teams;
    await getInactiveTeams();
    return teams;
  } catch (err) {
    console.error(err);
  }
}

const getTeamInfo = async function(team_id, year, callback) {
  if (!teams) {
    await getTeams();
  }
  let team = teams.find(({ id }) => id === Number(team_id));

  if (!team) {
    callback('could not find team')
    return;
  }
  const season_id = `${year}${Number(year) + 1}`;

  const teamInfo = {
    id: team.id,
    name: team.name,
    venueName: team.venue.name,
    seasonId: season_id,
    current: false,
  };
  let records = void(0);
  let gameDates = void(0);

  const getFranchiseTeamIds = function(cb) {
    if (!teams || !inactiveTeams) {
      cb(NOERROR, DONE);
      return;
    }
    const something = inactiveTeams.filter(it => it.franchise.franchiseId === team.franchiseId)
    teamInfo.altIds = something.map(e => e.id);
    cb(NOERROR, DONE);
  }

  const getStandings = function(cb) {
    if (teamInfo.current) {
      cb(NOERROR, DONE);
      return;
    }
    request
      .get(`https://statsapi.web.nhl.com/api/v1/standings?season=${season_id}`)
      .end((err, res) => {
        if (err) {
          cb(err);
        } else {
          records = res.body.records
          cb(NOERROR, DONE);
        }
      })
  }

  const siftRecords = function(cb) {
    if (teamInfo.current) {
      cb(NOERROR, DONE);
      return;
    }
    records.map(r => r.teamRecords).forEach(div => {
      div.forEach(t => {
        if (t.team.id === team.id) {
          teamInfo.points = t.points;
          teamInfo.gamesPlayed = t.gamesPlayed;
          teamInfo.wins = t.leagueRecord.wins;
          teamInfo.losses = t.leagueRecord.losses;
          teamInfo.gpg = (t.goalsScored / t.gamesPlayed).toFixed(2);
        } else if (teamInfo.altIds.find(ai => ai == t.team.id)) {
          teamInfo.points = t.points;
          teamInfo.gamesPlayed = t.gamesPlayed;
          teamInfo.wins = t.leagueRecord.wins;
          teamInfo.losses = t.leagueRecord.losses;
          teamInfo.gpg = (t.goalsScored / t.gamesPlayed).toFixed(2);
          teamInfo.pastId = teamInfo.altIds.find(ai => ai == t.team.id)
        }
      })
    })
    cb(NOERROR, DONE);
  }

  const getCurrentYearStats = function(cb) {
    const currentYear = new Date().getFullYear();
    if (year != currentYear) {
      cb(NOERROR, DONE);
      return;
    }
    teamInfo.current = true;
    request
      .get(`https://statsapi.web.nhl.com/api/v1/teams/5/stats`)
      .end((err, res) => {
        const stats = res.body.stats[0].splits[0].stat
        if (stats) {
          teamInfo.points = stats.pts;
          teamInfo.gamesPlayed = stats.gamesPlayed;
          teamInfo.wins = stats.wins;
          teamInfo.losses = stats.losses;
          teamInfo.gpg = stats.goalsPerGame;
        }
      })
    cb(NOERROR, DONE)
  }

  const getSchedule = function(cb) {
    if (teamInfo.current) {
      request
        .get(`https://statsapi.web.nhl.com/api/v1/schedule?teamId=${teamInfo.id}`)
        .end((err, res) => {
          if (err) {
            cb(err);
          } else {
            gameDates = res.body.dates;
            cb(NOERROR, DONE)
          }
        })
    } else {
      const id = teamInfo.pastId ? teamInfo.pastId : teamInfo.id
      request
        .get(`https://statsapi.web.nhl.com/api/v1/schedule?season=${season_id}&?teamId=${id}`)
        .end((err, res) => {
          if (err) {
            cb(err);
          } else {
            gameDates = res.body.dates;
            cb(NOERROR, DONE);
          }
        })
    }
  }

  const findFirstGame = function(cb) {
    const id = teamInfo.pastId ? teamInfo.pastId : teamInfo.id
    let done = false;
    for (let i = 0; i < Object.keys(gameDates).length; i++) {
      const currentDate = gameDates[`${i}`];
      if (currentDate.totalGames) {
        currentDate.games.forEach(game => {
          if (game.teams.home.team.id == id || game.teams.away.team.id == id) {
            done = true;
            teamInfo.gameDate = game.gameDate;
            teamInfo.opponent = game.teams.away.team.id == id ? game.teams.home.team.name : game.teams.away.team.name;
          }
        })
      } 
      if (done) {
        break;
      }
    }
    cb(NOERROR, DONE);
  }

  const seriesHandler = function(error, response) {
    if (error) {
      callback(error);
    } else {
      callback(NOERROR, teamInfo);
    }
  }

  async.series({
    getFranchiseTeamIds,
    getCurrentYearStats,
    getStandings,
    siftRecords,
    getSchedule,
    findFirstGame,
  }, seriesHandler)
}

const getPlayerInfo = async function(player_id, year, callback) {
  const season_id = `${year}${Number(year) + 1}`;
  const playerInfo = {
    id: player_id,
    seasonId: season_id
  }
  const getPlayer = function(cb) {
    request
      .get(`https://statsapi.web.nhl.com/api/v1/people/${player_id}/`)
      .end((err, res) => {
        if (err) {
          cb(err)
        } else {
          const player = res.body.people[0];
          playerInfo.name = player.fullName,
          playerInfo.team = player.currentTeam.name,
          playerInfo.age = player.currentAge,
          playerInfo.number = player.primaryNumber,
          playerInfo.position = player.primaryPosition.name,
          playerInfo.rookie = player.rookie,
          cb(NOERROR, DONE);
        }
      })
  }

  const getPlayerSeasonStats = function(cb) {
    request
      .get(`https://statsapi.web.nhl.com/api/v1/people/${player_id}/stats?stats=statsSingleSeason&season=${season_id}`)
      .end((err, res)=> {
        if (err) {
          cb(err);
        } else {
          if (res.body.stats && res.body.stats[0] && res.body.stats[0].splits[0] && res.body.stats[0].splits[0].stat) {
            const stats = res.body.stats[0].splits[0].stat;
            playerInfo.assists = stats.assists;
            playerInfo.goals = stats.goals;
            playerInfo.games = stats.games;
            playerInfo.hits = stats.hits;
            playerInfo.points = stats.points;
            cb(NOERROR, DONE);
          } else {
            playerInfo.assists = '';
            playerInfo.goals = '';
            playerInfo.games = '';
            playerInfo.hits = '';
            playerInfo.points = '';
            cb(NOERROR, DONE);
          }

        }
      })
  }

  const seriesHandler = function(error, response) {
    if (error) {
      callback(error);
    } else {
      callback(NOERROR, playerInfo);
    }
  }

  async.series({
    getPlayer,
    getPlayerSeasonStats,
  }, seriesHandler)
}

module.exports = {
  getTeams,
  getTeamInfo,
  getPlayerInfo
}