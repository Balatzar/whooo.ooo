import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import './addsongform.css'
import './addsongform.html'

Template.addsongform.events({
  'submit form'(event) {
    event.preventDefault()
    Meteor.call('party.addSong', event.target.url.value, Template.currentData().playlistId, (err, res) => {
      if (err) {
        console.warn(err)
      } else {
        event.target.url.value = ''
      }
    })
  }
})
