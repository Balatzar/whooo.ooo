import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'

import './party.css'
import './party.html'
import '../../components/youtubeplayer/youtubeplayer.js'
import '../../components/addsongform/addsongform.js'

Template.party.helpers({
  getPlaylistId() {
    return FlowRouter.current().params.id
  }
})
