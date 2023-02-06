const request = require('superagent');

module.exports = {
  getIndex: async (req, res) => {
    try {
      const teams = await request.get('https://statsapi.web.nhl.com/api/v1/teams');
      res.render('index.ejs', {teams: teams.body.teams});
    } catch (err) {
      console.error(err);
    }
  },
}