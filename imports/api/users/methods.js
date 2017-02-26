import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { Accounts } from 'meteor/accounts-base'
import Party from '../party/party'

Meteor.methods({
  'user.unsafeLoggin'(username) {
    console.log('user.unsafeLoggin')
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
