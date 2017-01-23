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
    Session.set('username', event.target.username.value);
    FlowRouter.go('createPage');
  }
})
