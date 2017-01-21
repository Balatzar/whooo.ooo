import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'

import './addsongform.css'
import './addsongform.html'

Template.addsongform.events({
  'submit form'(event) {
    event.preventDefault()
    console.log(event.target.id.value)
  }
})
