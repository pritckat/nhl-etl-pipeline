const api_util = require('../lib/api_util');

module.exports = {
  getIndex: async (req, res) => {
    const teams = await api_util.getTeams();
    res.render('index.ejs', {teams: teams});
  },

  submit: async (req, res) => {
    api_util.getTeamInfo(req.body.teamId.split('.')[0], req.body.teamYear);
    res.redirect('/');
  }
}