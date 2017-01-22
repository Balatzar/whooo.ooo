import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router';

import './createparty.css'
import './createparty.html'

Template.createparty.events({
  'submit form'(event) {
    event.preventDefault()
    Meteor.call('party.create', {
      creator: Session.get('username'),
      name: event.target.name.value,
      url: event.target.url.value,
    }, (err, res) => {
      if (err) {
        console.warn(err)
      } else {
        FlowRouter.go(`/party/${res}`);
      }
    })
  }
})
