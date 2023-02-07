const request = require('superagent');
const async = require('async');

const NOERROR = void(0);
const DONE = 'DONE';

let teams = void(0);

const getTeams = async function() {
  if (!teams) {
    try {
      let resp = await request.get('https://statsapi.web.nhl.com/api/v1/teams');
      teams = resp.body.teams;
      return teams;
    } catch (err) {
      console.error(err);
    }
  } else {
    return teams;
  }
}

const getTeamInfo = async function(team_id, year) {
  const team = teams.find(({ id }) => id === Number(team_id));
  const season_id = `${year}${Number(year) + 1}`;
  const teamInfo = {
    id: team.id,
    name: team.name,
    venueName: team.venue.name
  };
  let records = void(0);

  const getStandings = function(cb) {
    console.log('get standings');
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
    console.log('sift records');
    records.map(r => r.teamRecords).forEach(div => {
      div.forEach(t => {
        if (t.team.id === team.id) {
          console.log('found it');
          teamInfo.points = t.points;
          teamInfo.gamesPlayed = t.gamesPlayed;
          teamInfo.wins = t.leagueRecord.wins;
          teamInfo.losses = t.leagueRecord.losses;
          teamInfo.gpg = (t.goalsScored / t.gamesPlayed).toFixed(2);
        }
      })
    })
    cb(NOERROR, DONE);
  }

  const seriesHandler = function(error, response) {
    console.log('series handler');
    if (error) {
      console.log('error');
    } else {
      console.log('done', teamInfo);
    }
  }

  async.series({
    getStandings,
    siftRecords,
  }, seriesHandler)
}

module.exports = {
  getTeams,
  getTeamInfo
}