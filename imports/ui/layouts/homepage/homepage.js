import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { $ } from 'meteor/jquery'

import './homepage.html';
import './homepage.css';

Template.homepage.onRendered(() => {
  if (Meteor.userId()) {
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
    Meteor.call('user.unsafeLoggin', username, (err, res) => {
      if (err) {
        console.warn(err)
      } else {
        Meteor.loginWithPassword(username, 'insecure', (errLogin, resLogin) => {
          if (errLogin) {
            console.warn(errLogin)
          } else {
            FlowRouter.go('createPage');
          }
        })
      }
    })
  }
})
