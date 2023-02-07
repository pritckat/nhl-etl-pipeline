const request = require('superagent');

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
  console.log('submit')
}

module.exports = {
  getTeams,
  getTeamInfo
}