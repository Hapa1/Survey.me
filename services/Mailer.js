const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');
//What is mailer?

class Mailer extends helper.Mail {
  //constructor is called automatically when new is called
  constructor({ subject, recipients }, content) {
    super(); //super?

    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@mailstk.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = this.formatAddresses(recipients);

    this.addContent(this.body); //addContent when adding body
    this.addClickTracking();
    this.addRecipients(); //takes formatted list and registers it with email
  }

  formatAddresses(recipients) {
    //.map()???
    //for every recipient in the array, pull out email, format, and return
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }


  //Read sendgrid docs!
  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    const clickTracking = new helper.ClickTracking(true, true);

    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    //Personalization??
    const personalize = new helper.Personalization();
    //iterate over recipients and personalize each
    this.recipients.forEach(recipient => {
      personalize.addTo(recipient);
    });
    this.addPersonalization(personalize);

  }
  //async code using async await instead of promises
  async send() {
      const request = this.sgApi.emptyRequest({
        method: 'POST',
        path: '/v3/mail/send',
        body: this.toJSON()
      });

      const response = await this.sgApi.API(request);
      return response;
    }
}



module.exports = Mailer; //export to route handler

//const { mail } = sendgrid;
