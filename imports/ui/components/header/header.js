import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { FlowRouter } from "meteor/kadira:flow-router"
import { $ } from "meteor/jquery"

import "../burd/burd.js"

import "./header.html"
import "./header.css"

Template.header.helpers({
  getUser() {
    return Meteor.user() || false
  },

  isMobile() {
    const width = $("body").width()
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      ) ||
      width < 900
    ) {
      return true
    }
    return false
  },
})

Template.header.events({
  "click .deco"() {
    Meteor.logout(err => {
      if (err) {
        console.warn(err)
      } else {
        FlowRouter.go("indexPage")
      }
    })
  },
})
