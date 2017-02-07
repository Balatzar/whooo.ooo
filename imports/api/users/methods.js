import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Accounts } from 'meteor/accounts-base'

Meteor.methods({
  'user.unsafeLoggin'(username) {
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username,
        password: 'insecure',
        profile: {
          validated: false,
        }
      })
    }
  }
})
