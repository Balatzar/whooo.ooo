import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import Song from '../../../api/song/song'
import Party from '../../../api/party/party'

import './playlist.css'
import './playlist.html'
import '../song/song.js'

Template.playlist.onRendered(() => {
  Meteor.subscribe('parties.all')
  Meteor.subscribe('songs.all')
})

Template.playlist.helpers({
  played() {
    const party = Party.findOne(Template.currentData().playlistId)
    if (party) {
      return party.played.map(id => Song.findOne(id))
    }
  },

  current() {
    const party = Party.findOne(Template.currentData().playlistId)
    if (party) {
      return Song.findOne(party.currentSong)
    }
  },

  toPlay() {
    const party = Party.findOne(Template.currentData().playlistId)
    if (party) {
      return party.toPlay.map(id => Song.findOne(id))
    }
  },
})
