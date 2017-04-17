import { Meteor } from "meteor/meteor"
import { check } from "meteor/check"
import { Accounts } from "meteor/accounts-base"

Meteor.methods({
  "user.unsafeLoggin"(username) {
    console.log("user.unsafeLoggin")
    check(username, String)
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username,
        password: "insecure",
        profile: {
          validated: false
        }
      })
    }
  }
})
