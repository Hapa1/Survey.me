const _ = require('lodash');
const Path = require('path-parser').default;
const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = app => {
  app.get('/api/surveys', requireLogin, async (req, res) => {

    const surveys = await Survey.find({ _user: req.user.id }) //async code!!!
      .select({ recipients: false});
    res.send(surveys);
  });

  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.post('/api/surveys/webhooks', (req,res) => {
    const p = new Path('/api/surveys/:surveyId/:choice'); //parse obj, colons?
    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return {email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false }
            }
        },
        {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          lastResponded: new Date()
        }
        ).exec(); //executes query
      })
      .value();


    console.log("hi");
    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      //title: title
      title,
      subject,
      body,
      recipients: recipients.split(',').map(email => ({ email: email.trim() })),


      _user: req.user.id,
      dateSent: Date.now()
    });
    //recipients: recipients.split(',').map(email => ({email })),
    //recipients: recipients.split(',').map(email => { return { email: email }})
    //Send email here
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send(); //async function
      await survey.save(); //async function
      req.user.credits -= 1;
      req.user.surveys += 1;
      const user = await req.user.save(); //async function
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
