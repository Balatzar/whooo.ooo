import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Session } from 'meteor/session'

import './create.css'
import './create.html'

Template.create.events({
  'click .create'() {
    FlowRouter.go('createPartyPage');
  },

  'submit form'(event) {
    event.preventDefault()
    const partyId = event.target.party_id.value
    if (!partyId) {
      return
    }
    FlowRouter.go(`/party/${partyId}`);
    Meteor.call('party.addBurd', Session.get('username'), partyId)
  }
})
