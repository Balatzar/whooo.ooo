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
    Session.set('username', event.target.username.value);
    FlowRouter.go('createPage');
  }
})
