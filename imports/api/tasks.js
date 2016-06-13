import { Mongo } from 'meteor/mongo'
import { Meteor} from 'meteor/meteor'
import {check} from 'meteor/check'
export const Tasks = new Mongo.Collection('tasks');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish tasks that are public or belong to the current user
  Meteor.publish('tasks', function tasksPublication() {
    return Tasks.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}




Meteor.methods({
  'tasks.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a task
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.insert({
          text,
          createdAt: new Date(),
          owner: Meteor.userId(),
          email: Meteor.user().emails[0].address,
        });


},

    'tasks.setPrivate'(taskId, setToPrivate) {
      check(setToPrivate, Boolean);
      check(taskId, String);

      const task = Tasks.findOne(taskId);

      // Make sure the user is logged in before inserting a task
      if (task.email != Meteor.user().emails[0].address) {
        throw new Meteor.Error('not-authorized');
      }

      Tasks.update(taskId, { $set: { private: setToPrivate } });
  },
  'tasks.remove'(taskId) {
    check(taskId, String);
    if (task.email != Meteor.user().emails[0].address) {
      throw new Meteor.Error('not-authorized');
    }
    Tasks.remove(taskId);
  },
  'tasks.setChecked'(taskId, setChecked) {
    check(taskId, String);
    check(setChecked, Boolean);

    Tasks.update(taskId, { $set: { checked: setChecked } });
  },
});
