import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router'

import './homepage.html';
import './homepage.css';

Template.homepage.onRendered(() => {
  if (Session.get('username')) {
    FlowRouter.go('createPage');
  }
})

Template.homepage.events({
  'submit form'(event) {
    event.preventDefault()
    const username = event.target.username.value
    if (!username) {
      return
    }
    Session.set('username', username);
    FlowRouter.go('createPage');
  }
})
