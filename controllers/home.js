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
  },

  playerSubmit: async (req, res) => {
    if (!req.body.playerId || !req.body.playerYear) {
      res.status(400).json('playerId and playerYear required')
      return;
    }
    api_util.getPlayerInfo(req.body.playerId, req.body.playerYear, (err, info) => {
      if (err) {
        console.log('err', err)
        res.status(400).json(err)
      } else {
        csv_util.writePlayerCsv(info, (err, filename) => {
          if (err) {
            console.log('err', err);
            res.status(400).json(err)
          } else {
            res.set({
              'Location': '/'
            });
            res.download(path.resolve(filename), (err) => {
              if (err) {
                console.log(err);
                res.status(400).json(err)
              } else {
                fs.unlinkSync(path.resolve(filename))
              }
            });
          }
        })
      }
    });
  },

  teamSubmit: async (req, res) => {
    if (!req.body.teamId || !req.body.teamYear) {
      res.status(400).json('teamId and teamYear required')
      return;
    }
    api_util.getTeamInfo(req.body.teamId, req.body.teamYear, (err, info) => {
      if (err) {
        res.status(400).json(err)
      } else {
        csv_util.writeTeamCsv(info, (err, filename) => {
          if (err) {
            res.status(400).json(err)
          } else {
            res.set({
              'Location': '/'
            });
            res.download(path.resolve(filename), (err) => {
              if (err) {
                res.status(400).json(err)
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