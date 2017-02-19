import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Song from './song.js';

Meteor.methods({
  'song.create'(url) {
    console.log('song.create')
    const result = Song.insert(url)
    return result
  },
});
