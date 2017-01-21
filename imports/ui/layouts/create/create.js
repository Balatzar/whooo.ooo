import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router';

import './create.css'
import './create.html'

Template.create.events({
  'click .create'() {
    FlowRouter.go('createPartyPage');
  },

  'submit form'(event) {
    event.preventDefault()
    Session.set('username', event.target.username.value);
    FlowRouter.go('createPage');
  }
})
