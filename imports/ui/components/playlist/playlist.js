import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"

import SongParty from "../../../api/songParty/songParty"
import Party from "../../../api/party/party"

import "./playlist.css"
import "./playlist.html"
import "../song/song.js"

Template.playlist.onRendered(() => {
  Meteor.subscribe("parties.all")
  Meteor.subscribe("songParties.all")
})

Template.playlist.helpers({
  played() {
    const party = Party.findOne(Template.currentData().playlistId)
    if (party) {
      return party.played.map(id => SongParty.findOne(id))
    }
    return []
  },

  current() {
    const party = Party.findOne(Template.currentData().playlistId)
    if (party) {
      return SongParty.findOne(party.currentSong)
    }
    return null
  },

  remaining() {
    const party = Party.findOne(Template.currentData().playlistId)
    if (party) {
      return party.toPlay.length
        ? `Il reste ${party.toPlay.length} chansons`
        : "Il n'y a aucune chanson restante apres celle-ci"
    }
    return ""
  },

  toPlay() {
    const party = Party.findOne(Template.currentData().playlistId)
    if (party) {
      return party.toPlay
        .map(id => SongParty.findOne(id))
        .sort((a, b) => a.votes.length < b.votes.length)
    }
    return []
  },
})
