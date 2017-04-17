import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { FlowRouter } from "meteor/kadira:flow-router"
import { isYtUrl } from "../../../api/song/song"

import "./createparty.css"
import "./createparty.html"

Template.createparty.events({
  "submit form"(event) {
    event.preventDefault()
    const name = event.target.name.value
    const url = event.target.url.value
    if (!name || !url || !isYtUrl.test(url)) {
      return
    }
    Meteor.call(
      "party.create",
      {
        name,
        url
      },
      (err, res) => {
        if (err) {
          console.warn(err)
        } else {
          FlowRouter.go(`/party/${res}`)
        }
      }
    )
  }
})
