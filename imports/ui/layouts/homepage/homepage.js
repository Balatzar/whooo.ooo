import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { $ } from 'meteor/jquery'

import './homepage.html';
import './homepage.css';

Template.homepage.onRendered(() => {
  if (Session.get('username')) {
    FlowRouter.go('createPage');
  }
  $('.popup button').click(function(){
    $(this).parent().addClass('hidden');
    $('.dimmer').remove();
  });
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
