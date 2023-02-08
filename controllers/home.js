const api_util = require('../lib/api_util');
const csv_util = require('../lib/csv_util');
const path = require('path');
const fs = require('fs');

module.exports = {
  getIndex: async (req, res) => {
    const teams = await api_util.getTeams();
    res.render('index.ejs', {teams: teams});
  },

  submit: async (req, res) => {
    api_util.getTeamInfo(req.body.teamId.split('.')[0], req.body.teamYear, (err, info) => {
      if (err) {
        console.log('err', err)
      } else {
        csv_util.writeTeamCsv(info, (err, filename) => {
          if (err) {
            console.log('err', err);
          } else {
            res.set({
              'Location': '/'
            });
            res.download(path.resolve(filename), (err) => {
              if (err) {
                console.log(err);
              } else {
                fs.unlinkSync(path.resolve(filename))
              }
            });
          }
        })
      }
    });
  }
}