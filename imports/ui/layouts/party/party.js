import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'

import Party from '../../../api/party/party'
import Song from '../../../api/song/song'

import './party.css'
import './party.html'
import '../../components/youtubeplayer/youtubeplayer.js'
import '../../components/addSong/addSong.js'
import '../../components/burd/burd.js'
import '../../components/playlist/playlist.js'

Template.party.onRendered(() => {
  Meteor.subscribe('parties.all')
  Meteor.subscribe('users.party', FlowRouter.current().params.slug)
})

Template.party.helpers({
  party() {
    return Party.findOne({ slug: FlowRouter.current().params.slug })
  },

  nbBurds() {
    return Meteor.users.find().fetch().length
  },

  burdsPlural() {
    return Meteor.users.find().fetch().length > 1
  },

  allBurds() {
    return Meteor.users.find()
  }
})
