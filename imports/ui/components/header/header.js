import { Meteor } from 'meteor/meteor'
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'
import { FlowRouter } from 'meteor/kadira:flow-router'

import '../burd/burd.js'

import './header.html';
import './header.css';

Template.header.helpers({
  getUsername() {
    return Session.get('username')
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
    Session.set('username', null)
    FlowRouter.go('indexPage')
    location.reload()
  }
})
