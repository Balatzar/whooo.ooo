import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'

import Party from '../../../api/party/party'
import Song from '../../../api/song/song'

import './party.css'
import './party.html'
import '../../components/youtubeplayer/youtubeplayer.js'
import '../../components/addsongform/addsongform.js'
import '../../components/burd/burd.js'
import '../../components/playlist/playlist.js'

Template.party.onRendered(() => {
  Meteor.subscribe('parties.all')
})

Template.party.helpers({
  getPlaylistId() {
    return FlowRouter.current().params.id
  },

  burds() {
    const party = Party.findOne(FlowRouter.current().params.id)
    return party ? party.burds : []
  },
})
