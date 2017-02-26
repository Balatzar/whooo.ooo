import { Meteor } from 'meteor/meteor'

Meteor.publish('users.party', function(slug) {
  return Meteor.users.find({
    'status.online': true,
    'profile.currentParty': slug
  })
})
