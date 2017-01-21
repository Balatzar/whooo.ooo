import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router';

import './homepage.html';
import './homepage.css';

Template.homepage.events({
  'submit form'(event) {
    event.preventDefault()
    Session.set('name', event.target.name.value);
    FlowRouter.go('createPage');
  }
})
