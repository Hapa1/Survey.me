const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const User = mongoose.model('users')

module.exports = app => {

  app.get('/api/user/:_id', async (req, res) => {
    const user = await User.find({ _id: req.params})
    res.send(user[0]);
  });

};
