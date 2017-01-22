import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router'

import './header.html';
import './header.css';

Template.header.helpers({
  getUsername() {
    return Session.get('username')
  }
})

Template.header.events({
  'click .deco'() {
    Session.set('username', null)
    FlowRouter.go('indexPage')
    location.reload()
  }
})
