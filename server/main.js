import { Meteor } from 'meteor/meteor';
import '../imports/api/tasks.js'
Meteor.startup(() => {
  // code to run on server at startup
  process.env.MAIL_URL = 'smtp://smtpdrone:smtp is bad@smtp.gmail.com:465';
});
