import { Meteor } from "meteor/meteor"
import { check } from "meteor/check"

Meteor.publish("users.party", slug => {
  check(slug, String)
  return Meteor.users.find({
    "status.online": true,
    "profile.currentParty": slug,
  })
})
