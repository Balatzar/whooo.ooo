import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

import Song from './song.js';

Meteor.methods({
  'song.create'(song) {
    const result = Song.insert(song)
  }
});
