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

Template.partymobile.onRendered(() => {
  $('.header').click(function(){
    console.log($('.particpants'));
    $('.particpants').addClass('active');
  });
  Meteor.subscribe('parties.all')

})

Template.partymobile.helpers({
  party() {
    return Party.findOne({ slug: FlowRouter.current().params.slug })
  },

  started() {
    const party = Party.findOne({ slug: FlowRouter.current().params.slug })
    return party ? (party.started || party.creator === Session.get('username')) : false
  },
})
