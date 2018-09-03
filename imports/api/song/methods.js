import { Meteor } from "meteor/meteor"
import { HTTP } from "meteor/http"
import { check } from "meteor/check"

import Song from "./song.js"
import SongParty from "../songParty/songParty.js"

const youtubeurl = "https://www.googleapis.com/youtube/v3"

Meteor.methods({
  "song.create"(song) {
    console.log("song.create")
    check(song, Object)
    return Song.insert(song)
  },

  "song.createFromUrl"(url) {
    console.log("song.createFromUrl")
    check(url, String)
    const str = url
    const intIndex =
      str.indexOf("v=") !== -1 ? str.indexOf("v=") + 2 : str.indexOf("be/") + 3
    const id = str.substring(intIndex, intIndex + 11)
    const song = Song.findOne({
      id,
    })
    console.log(song)
    if (song) {
      song.owner = this.userId
      return SongParty.insert(song)
    }
    try {
      const yturl = `${youtubeurl}/videos?part=snippet&id=${id}&key=${
        Meteor.settings.YOUTUBEAPI
      }`
      console.log(yturl)
      const res = HTTP.get(yturl)
      const yt = Object.assign({}, res.data.items[0].snippet, {
        id: res.data.items[0].id,
      })
      console.log(yt)
      Song.insert(yt)
      yt.owner = this.userId
      return SongParty.insert(yt)
    } catch (e) {
      throw e
    }
  },

  "song.search"(query) {
    console.log("song.search")
    check(query, String)
    try {
      const res = HTTP.get(
        `${youtubeurl}/search?part=snippet&q=${query}&videoEmbeddable=true&type=video&key=${
          Meteor.settings.YOUTUBEAPI
        }`
      )
      const results = res.data
      return results
    } catch (e) {
      throw e
    }
  },

  "song.searchNext"(query, nextPageToken) {
    console.log("song.searchNext")
    check(query, String)
    check(nextPageToken, String)
    const APIKEY = Meteor.settings.YOUTUBEAPI
    const url = `${youtubeurl}/search?part=snippet&q=${query}&pageToken=${nextPageToken}&videoEmbeddable=true&type=video&key=${APIKEY}`
    console.log(url)
    try {
      const res = HTTP.get(url)
      const results = res.data
      return results
    } catch (e) {
      throw e
    }
  },

  "song.searchPrevious"(query, prevPageToken) {
    console.log("song.searchPrevious")
    check(query, String)
    check(prevPageToken, String)
    const APIKEY = Meteor.settings.YOUTUBEAPI
    const url = `${youtubeurl}/search?part=snippet&q=${query}&pageToken=${prevPageToken}&videoEmbeddable=true&type=video&key=${APIKEY}`
    console.log(url)
    try {
      const res = HTTP.get(url)
      const results = res.data
      return results
    } catch (e) {
      throw e
    }
  },
})
