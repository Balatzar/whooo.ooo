// define your public routing here
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../ui/layouts/homepage/homepage';
import '../../../ui/layouts/party/party';
import '../../../ui/layouts/create/create';
import '../../../ui/layouts/createparty/createparty';
import '../../../ui/layouts/partymobile/partymobile';

FlowRouter.route('/', {
  name: 'indexPage',
  action() {
    BlazeLayout.render('main', { content: 'homepage' });
  },
});

FlowRouter.route('/create', {
  name: 'createPage',
  action() {
    BlazeLayout.render('main', { content: 'create' });
  },
});

FlowRouter.route('/create/party', {
  name: 'createPartyPage',
  action() {
    BlazeLayout.render('main', { content: 'createparty' });
  },
});

FlowRouter.route('/party/:slug', {
  name: 'partyPage',
  action() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    console.log(width);
    if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent) || width < 900){
      BlazeLayout.render('main', { content: 'partymobile' }); 
    }else{
      BlazeLayout.render('main', { content: 'party' }); 
    }
  },
});
