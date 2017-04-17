import { Template } from "meteor/templating"
import { FlowRouter } from "meteor/kadira:flow-router"
import { $ } from "meteor/jquery"

import "./create.css"
import "./create.html"
import "../../components/error/error"

Template.create.events({
  "click .create"() {
    FlowRouter.go("createPartyPage")
  },

  "submit form"(event) {
    event.preventDefault()
    const partyId = event.target.party_id.value.toLowerCase()
    if (!partyId) {
      return
    }
    FlowRouter.go(`/party/${partyId}`)
  }
})

Template.create.helpers({
  getError() {
    return FlowRouter.current().queryParams.error
  },
  isMobile() {
    const width = $("body").width()
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
        navigator.userAgent
      ) || width < 900
    ) {
      return true
    }
    return false
  }
})
