import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/kadira:flow-router'

import '../burd/burd.js'

import './header.html';
import './header.css';

Template.header.helpers({
  getUser() {
    return Meteor.user() || false
  },
  isMobile: function () {
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) || width < 900){
      return true 
    }else{
      return false 
    }
  }
})

Template.header.events({
  'click .deco'() {
    Meteor.logout(err => {
      if (err) {
        console.warn(err)
      }
      else {
        FlowRouter.go('indexPage')
      }
    })
  }
})
