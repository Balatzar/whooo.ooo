// define your public routing here
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../../ui/layouts/homepage/homepage';
import '../../../ui/layouts/party/party';
import '../../../ui/layouts/create/create';

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

FlowRouter.route('/party/:id', {
  name: 'partyPage',
  action() {
    BlazeLayout.render('main', { content: 'party' });
  },
});
