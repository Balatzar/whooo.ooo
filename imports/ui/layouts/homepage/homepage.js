import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { FlowRouter } from "meteor/kadira:flow-router"
import { $ } from "meteor/jquery"
import { Session } from "meteor/session"

import "./homepage.html"
import "./homepage.css"

Template.homepage.onRendered(() => {
  if (Meteor.userId()) {
    FlowRouter.go("createPage")
  }
  $(".popup button").click(function hideModale() {
    $(this).parent().addClass("hidden")
    $(".dimmer").remove()
    Session.set("seenModal", true)
  })
})

Template.homepage.helpers({
  seenModal() {
    return Session.get("seenModal")
  }
})

Template.homepage.events({
  "submit form"(event) {
    event.preventDefault()
    const username = event.target.username.value
    if (!username) {
      return
    }
    Meteor.call("user.unsafeLoggin", username, err => {
      if (err) {
        console.warn(err)
      } else {
        Meteor.loginWithPassword(username, "insecure", errLogin => {
          if (errLogin) {
            console.warn(errLogin)
          } else {
            const redirect = Session.get("redirectUrl")
            if (redirect) {
              Session.set("redirectUrl", "")
            }
            FlowRouter.go(redirect || "createPage")
          }
        })
      }
    })
  }
})
