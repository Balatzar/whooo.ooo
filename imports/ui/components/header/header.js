import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

import '../burd/burd.js'

import './header.html';
import './header.css';

Template.header.helpers({
  getUsername() {
    return Session.get('username')
  }
})
