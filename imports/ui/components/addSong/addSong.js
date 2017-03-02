import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import './addSong.html'
import './addSong.css'

Template.addSong.events({
  'submit .js-addSong'(event) {
    event.preventDefault()
    const input = $('.js-inputUrl')
    Meteor.call('party.addSongFromUrl', input.val(), Template.currentData().playlistId, (err, res) => {
      if (err) {
        console.warn(err)
      } else {
        input.val('')
      }
    })
  }
})
