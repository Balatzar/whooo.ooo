import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

import './addsongform.css'
import './addsongform.html'

Template.addsongform.events({
  'submit form'(event) {
    event.preventDefault()

    Meteor.call('song.search', event.target.url.value, (err, res) => {
      if (err) {
        console.warn(err)
      } else {
        console.log(res)
        Session.set('searchResults', res)
      }
    })
  },

  'click .js-searchResult'() {
    console.log(this)
    Meteor.call('party.addSong', this.snippet, Template.currentData().playlistId, (err, res) => {
      if (err) {
        console.warn(err)
      } else {
        $('.inputUrl').val('')
        Session.set('searchResults', null)
        $('.addSong').removeClass('active')
      }
    })
  }
})

Template.addsongform.helpers({
  searchResults() {
    return Session.get('searchResults')
  },
})
