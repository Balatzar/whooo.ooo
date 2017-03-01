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

    // Meteor.call('party.addSong', event.target.url.value, Template.currentData().playlistId, (err, res) => {
    //   if (err) {
    //     console.warn(err)
    //   } else {
    //     event.target.url.value = ''
    //   }
    // })
  },

  'click .js-searchResult'() {
    console.log(this)
  }
})

Template.addsongform.helpers({
  searchResults() {
    return Session.get('searchResults')
  },
})
