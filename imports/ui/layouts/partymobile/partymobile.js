import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { FlowRouter } from "meteor/kadira:flow-router"
import { Session } from "meteor/session"
import { $ } from "meteor/jquery"

import Party from "../../../api/party/party"

import "./partymobile.css"
import "./partymobile.html"
import "../../components/youtubeplayer/youtubeplayer.js"
import "../../components/searchSong/searchSong.js"
import "../../components/burd/burd.js"
import "../../components/playlist/playlist.js"
import "../../components/burd/burd.js"

Template.partymobile.onRendered(() => {
  Meteor.subscribe("parties.all", () => {
    if (!Party.findOne({ slug: FlowRouter.current().params.slug })) {
      const error = encodeURIComponent("Cette fête n'existe pas ! Oh non !")
      FlowRouter.go(`/create?error=${error}`)
    }
  })
  Meteor.subscribe("users.party", FlowRouter.current().params.slug)
})

Template.partymobile.events({
  "click .participants h2"() {
    $(".participants").toggleClass("active")
  },
  "click .js-showAddSong"() {
    $(".addSong").addClass("active")
  },
  "click .closeAddsong"() {
    $(".addSong").removeClass("active")
  }
})

Template.partymobile.helpers({
  getUsername() {
    return Session.get("username")
  },
  party() {
    console.log(Party.findOne({ slug: FlowRouter.current().params.slug }))
    return Party.findOne({ slug: FlowRouter.current().params.slug })
  },

  started() {
    const party = Party.findOne({ slug: FlowRouter.current().params.slug })
    return party
      ? party.started || party.creator === Session.get("username")
      : false
  },

  allBurds() {
    return Meteor.users.find()
  }
})
