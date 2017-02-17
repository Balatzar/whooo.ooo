import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'
import { Session } from 'meteor/session'
import { $ } from 'meteor/jquery'

import Party from '../../../api/party/party'
import Song from '../../../api/song/song'

import './partymobile.css'
import './partymobile.html'
import '../../components/youtubeplayer/youtubeplayer.js'
import '../../components/addsongform/addsongform.js'
import '../../components/burd/burd.js'
import '../../components/playlist/playlist.js'
import '../../components/burd/burd.js'

Template.partymobile.onRendered(() => {
  Meteor.subscribe('parties.all')
})

Template.partymobile.events({
  "click .participants"(event) {
    $(event.target).addClass('active')
  },

  "click .js-showAddSong"() {
    $('.addSong').addClass('active')
  },
})

Template.partymobile.helpers({
  getUsername() {
    return Session.get('username')
  },
  party() {
    return Party.findOne({ slug: FlowRouter.current().params.slug })
  },

  started() {
    const party = Party.findOne({ slug: FlowRouter.current().params.slug })
    return party ? (party.started || party.creator === Session.get('username')) : false
  },
})
