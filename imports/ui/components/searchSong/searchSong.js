import { Meteor } from "meteor/meteor"
import { Template } from "meteor/templating"
import { Session } from "meteor/session"
import { $ } from "meteor/jquery"

import "./searchSong.css"
import "./searchSong.html"

Template.searchSong.events({
  "submit form"(event) {
    event.preventDefault()

    Meteor.call("song.search", event.target.url.value, (err, res) => {
      if (err) {
        console.warn(err)
      } else {
        console.log(res)
        Session.set("searchResults", res.items)
        Session.set("nextPageToken", res.nextPageToken)
        Session.set("prevPageToken", res.prevPageToken)
      }
    })
  },

  "click .js-searchResult"() {
    console.log(this)
    Meteor.call(
      "party.addSongFromSearch",
      this,
      Template.currentData().playlistId,
      err => {
        if (err) {
          console.warn(err)
        } else {
          $(".inputUrl").val("")
          Session.set("searchResults", null)
          Session.set("nextPageToken", null)
          Session.set("prevPageToken", null)
          $(".addSong").removeClass("active")
        }
      }
    )
  },

  "click .js-nextResults"() {
    const query = $(".inputUrl").val()
    const nextPageToken = Session.get("nextPageToken")
    Meteor.call("song.searchNext", query, nextPageToken, (err, res) => {
      if (err) {
        console.warn(err)
      } else {
        console.log(res)
        Session.set("searchResults", res.items)
        Session.set("nextPageToken", res.nextPageToken)
        Session.set("prevPageToken", res.prevPageToken)
      }
    })
  },

  "click .js-previousResults"() {
    const query = $(".inputUrl").val()
    const prevPageToken = Session.get("prevPageToken")
    Meteor.call("song.searchNext", query, prevPageToken, (err, res) => {
      if (err) {
        console.warn(err)
      } else {
        console.log(res)
        Session.set("searchResults", res.items)
        Session.set("nextPageToken", res.nextPageToken)
        Session.set("prevPageToken", res.prevPageToken)
      }
    })
  },
})

Template.searchSong.helpers({
  searchResults() {
    return Session.get("searchResults")
  },

  nextPageToken() {
    return Session.get("nextPageToken")
  },

  prevPageToken() {
    return Session.get("prevPageToken")
  },
})
